import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { contributionsRouter } from "./routers/contributions";
import {
  getUserProfile, upsertUserProfile,
  getMealLogsForDate, getMealLogsForRange, addMealLog, deleteMealLog,
  getDailySummary, getDailySummariesForRange,
  getAiSuggestionsForDate, saveAiSuggestion, updateAiSuggestionAccepted,
  getAdminStats, getRestaurantsForAdmin, updateRestaurantStatus, getAgentRunHistory,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  contributions: contributionsRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getUserProfile(ctx.user.id);
    }),

    save: protectedProcedure
      .input(z.object({
        age: z.number().min(1).max(120).optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        heightCm: z.number().min(50).max(300).optional(),
        weightKg: z.number().min(10).max(500).optional(),
        activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]).optional(),
        objectives: z.array(z.string()).optional(),
        dietaryPreferences: z.array(z.string()).optional(),
        dailyCalorieTarget: z.number().optional(),
        dailySodiumTargetMg: z.number().optional(),
        dailyProteinTargetG: z.number().optional(),
        dailyCarbTargetG: z.number().optional(),
        dailyFatTargetG: z.number().optional(),
        dailyFibreTargetG: z.number().optional(),
        onboardingCompleted: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return upsertUserProfile({ userId: ctx.user.id, ...input });
      }),

    calculateTargets: protectedProcedure
      .input(z.object({
        age: z.number(),
        gender: z.enum(["male", "female", "other"]),
        heightCm: z.number(),
        weightKg: z.number(),
        activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
        objectives: z.array(z.string()),
      }))
      .mutation(async ({ input }) => {
        const { age, gender, heightCm, weightKg, activityLevel, objectives } = input;
        let bmr: number;
        if (gender === "male") {
          bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
          bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }
        const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
        const tdee = Math.round(bmr * activityMultipliers[activityLevel]);
        let calorieTarget = tdee;
        if (objectives.includes("weight_loss")) calorieTarget = Math.round(tdee * 0.8);
        if (objectives.includes("weight_gain")) calorieTarget = Math.round(tdee * 1.1);
        const proteinPct = objectives.includes("high_protein") ? 0.30 : 0.20;
        const fatPct = 0.30;
        const carbPct = 1 - proteinPct - fatPct;
        return {
          dailyCalorieTarget: calorieTarget,
          dailySodiumTargetMg: objectives.includes("low_sodium") ? 1500 : 2000,
          dailyProteinTargetG: Math.round((calorieTarget * proteinPct) / 4),
          dailyCarbTargetG: Math.round((calorieTarget * carbPct) / 4),
          dailyFatTargetG: Math.round((calorieTarget * fatPct) / 9),
          dailyFibreTargetG: 25,
          bmr: Math.round(bmr),
          tdee,
        };
      }),
  }),

  meals: router({
    getForDate: protectedProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ ctx, input }) => {
        return getMealLogsForDate(ctx.user.id, input.date);
      }),

    getForRange: protectedProcedure
      .input(z.object({ startDate: z.string(), endDate: z.string() }))
      .query(async ({ ctx, input }) => {
        return getMealLogsForRange(ctx.user.id, input.startDate, input.endDate);
      }),

    add: protectedProcedure
      .input(z.object({
        logDate: z.string(),
        mealType: z.enum(["breakfast", "lunch", "dinner", "snack", "supper"]),
        foodId: z.string().optional(),
        foodName: z.string(),
        portionDescription: z.string().optional(),
        portionGrams: z.number().optional(),
        servings: z.number().default(1),
        kcal: z.number().optional(),
        proteinG: z.number().optional(),
        carbG: z.number().optional(),
        fatG: z.number().optional(),
        sodiumMg: z.number().optional(),
        fibreG: z.number().optional(),
        sugarG: z.number().optional(),
        source: z.enum(["search", "restaurant", "manual", "ai_suggestion"]).default("search"),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await addMealLog({ userId: ctx.user.id, ...input, logDate: new Date(input.logDate + "T00:00:00.000Z") });
        return getDailySummary(ctx.user.id, input.logDate);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteMealLog(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  calendar: router({
    getDaySummary: protectedProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ ctx, input }) => {
        return getDailySummary(ctx.user.id, input.date);
      }),

    getMonthSummaries: protectedProcedure
      .input(z.object({ startDate: z.string(), endDate: z.string() }))
      .query(async ({ ctx, input }) => {
        return getDailySummariesForRange(ctx.user.id, input.startDate, input.endDate);
      }),
  }),

  ai: router({
    getSuggestions: protectedProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ ctx, input }) => {
        return getAiSuggestionsForDate(ctx.user.id, input.date);
      }),

    generateSuggestion: protectedProcedure
      .input(z.object({
        date: z.string(),
        mealType: z.enum(["breakfast", "lunch", "dinner", "snack", "supper"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const profile = await getUserProfile(ctx.user.id);
        const todaySummary = await getDailySummary(ctx.user.id, input.date);
        const objectives = (profile?.objectives as string[]) ?? [];
        const calorieTarget = profile?.dailyCalorieTarget ?? 2000;
        const sodiumTarget = profile?.dailySodiumTargetMg ?? 2000;
        const consumedKcal = todaySummary?.totalKcal ?? 0;
        const consumedSodium = todaySummary?.totalSodiumMg ?? 0;
        const mealBudgets: Record<string, number> = { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.05, supper: 0.05 };
        const mealKcalBudget = Math.round(calorieTarget * (mealBudgets[input.mealType] ?? 0.25));

        const systemMsg: string = "You are a Singapore and Malaysia food nutrition expert. Help users make healthy food choices from local hawker centres and restaurants.";
        const userMsg: string = `User objectives: ${objectives.join(", ") || "balanced nutrition"}. Daily target: ${calorieTarget} kcal, ${sodiumTarget}mg sodium. Consumed today: ${Math.round(consumedKcal)} kcal, ${Math.round(consumedSodium)}mg sodium. Meal: ${input.mealType} (~${mealKcalBudget} kcal budget). Dietary preferences: ${(profile?.dietaryPreferences as string[])?.join(", ") || "none"}. Suggest 2-3 specific Singapore or Malaysia dishes with estimated calories and sodium. Be friendly and encouraging.`;
        const response = await invokeLLM({
          messages: [
            { role: "system" as const, content: systemMsg },
            { role: "user" as const, content: userMsg },
          ],
        });

        const rawContent = response.choices[0]?.message?.content;
        const suggestionText: string = typeof rawContent === "string" ? rawContent : "Unable to generate suggestion at this time.";
        await saveAiSuggestion({
          userId: ctx.user.id,
          suggestionDate: new Date(input.date + "T00:00:00.000Z"),
          mealType: input.mealType,
          suggestionText,
          rationale: `Objectives: ${objectives.join(", ")}. Budget: ${mealKcalBudget} kcal.`,
        });
        return { suggestionText };
      }),

    acceptSuggestion: protectedProcedure
      .input(z.object({ id: z.number(), accepted: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        await updateAiSuggestionAccepted(input.id, ctx.user.id, input.accepted);
        return { success: true };
      }),
  }),

  admin: router({
    // Admin-only: get dashboard stats
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAdminStats();
    }),

    // Admin-only: list restaurants with optional status filter
    listRestaurants: protectedProcedure
      .input(z.object({
        status: z.enum(["pending","approved","rejected","draft","all"]).default("all"),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return getRestaurantsForAdmin(input.status, input.limit, input.offset);
      }),

    // Admin-only: approve / reject a restaurant
    reviewRestaurant: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["approved","rejected","pending","draft"]),
        reviewNote: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await updateRestaurantStatus(input.id, input.status, ctx.user.id, input.reviewNote);
        return { success: true };
      }),

    // Admin-only: get agent run history
    agentHistory: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return getAgentRunHistory(input.limit);
      }),
  }),
});

export type AppRouter = typeof appRouter;
