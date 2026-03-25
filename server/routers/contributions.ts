/**
 * Innuir FoodDB — Contribution Router
 *
 * Procedures:
 *   contributions.submitFood          — authenticated user submits a new food
 *   contributions.submitCorrection     — authenticated user flags incorrect data
 *   contributions.submitFeedback       — any user (incl. anon) sends feedback
 *   contributions.mySubmissions        — list own food submissions
 *   contributions.myCorrections        — list own corrections
 *   contributions.myFeedback           — list own feedback
 *   contributions.adminList            — admin: list all contributions by type
 *   contributions.adminReview          — admin: approve/reject/reply
 *   contributions.adminStats           — admin: pending counts
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import {
  createFoodSubmission, createFoodCorrection, createUserFeedback,
  getUserFoodSubmissions, getUserFoodCorrections, getUserOwnFeedback,
  getFoodSubmissions, getFoodCorrections, getUserFeedbackList,
  reviewFoodSubmission, reviewFoodCorrection, replyToFeedback,
  getContributionStats,
} from "../contributionDb";

// ── Admin guard ───────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ── Router ────────────────────────────────────────────────────────────────────
export const contributionsRouter = router({

  // ── Submit a new food ───────────────────────────────────────────────────────
  submitFood: protectedProcedure
    .input(z.object({
      foodName: z.string().min(2).max(256),
      localNames: z.string().optional(),
      category: z.string().optional(),
      country: z.string().optional(),
      cuisine: z.string().optional(),
      description: z.string().optional(),
      energyKcal: z.number().nonnegative().optional(),
      proteinG: z.number().nonnegative().optional(),
      fatG: z.number().nonnegative().optional(),
      carbG: z.number().nonnegative().optional(),
      sugarG: z.number().nonnegative().optional(),
      sodiumMg: z.number().nonnegative().optional(),
      fibreG: z.number().nonnegative().optional(),
      sourceUrl: z.string().url().optional().or(z.literal("")),
      sourceNotes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await createFoodSubmission({
        ...input,
        userId: ctx.user.id,
        sourceUrl: input.sourceUrl || null,
      });
      return { success: true };
    }),

  // ── Submit a correction ─────────────────────────────────────────────────────
  submitCorrection: protectedProcedure
    .input(z.object({
      foodId: z.string().min(1).max(64),
      foodName: z.string().min(1).max(256),
      field: z.string().min(1).max(64),
      currentValue: z.string().optional(),
      suggestedValue: z.string().min(1),
      reason: z.string().optional(),
      sourceUrl: z.string().url().optional().or(z.literal("")),
    }))
    .mutation(async ({ ctx, input }) => {
      await createFoodCorrection({
        ...input,
        userId: ctx.user.id,
        sourceUrl: input.sourceUrl || null,
      });
      return { success: true };
    }),

  // ── Submit feedback (public — no login required) ────────────────────────────
  submitFeedback: publicProcedure
    .input(z.object({
      type: z.enum(["bug", "feature_request", "data_quality", "general"]).default("general"),
      subject: z.string().min(3).max(256),
      message: z.string().min(10),
      rating: z.number().int().min(1).max(5).optional(),
      pageContext: z.string().max(128).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await createUserFeedback({
        ...input,
        userId: (ctx as { user?: { id: number } }).user?.id ?? null,
      });
      return { success: true };
    }),

  // ── My submissions ──────────────────────────────────────────────────────────
  mySubmissions: protectedProcedure.query(async ({ ctx }) => {
    return getUserFoodSubmissions(ctx.user.id);
  }),

  myCorrections: protectedProcedure.query(async ({ ctx }) => {
    return getUserFoodCorrections(ctx.user.id);
  }),

  myFeedback: protectedProcedure.query(async ({ ctx }) => {
    return getUserOwnFeedback(ctx.user.id);
  }),

  // ── Admin: list ─────────────────────────────────────────────────────────────
  adminList: adminProcedure
    .input(z.object({
      type: z.enum(["submissions", "corrections", "feedback"]),
      status: z.string().optional(),
      limit: z.number().int().min(1).max(100).default(50),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const { type, status = "all", limit, offset } = input;
      if (type === "submissions") {
        return getFoodSubmissions(status as Parameters<typeof getFoodSubmissions>[0], limit, offset);
      }
      if (type === "corrections") {
        return getFoodCorrections(status as Parameters<typeof getFoodCorrections>[0], limit, offset);
      }
      return getUserFeedbackList(status as Parameters<typeof getUserFeedbackList>[0], limit, offset);
    }),

  // ── Admin: review ───────────────────────────────────────────────────────────
  adminReview: adminProcedure
    .input(z.object({
      type: z.enum(["submission", "correction", "feedback"]),
      id: z.number().int(),
      status: z.string(),
      note: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { type, id, status, note } = input;
      if (type === "submission") {
        await reviewFoodSubmission(
          id, ctx.user.id,
          status as "approved" | "rejected" | "needs_info",
          note
        );
      } else if (type === "correction") {
        await reviewFoodCorrection(
          id, ctx.user.id,
          status as "approved" | "rejected",
          note
        );
      } else {
        await replyToFeedback(
          id,
          status as "open" | "acknowledged" | "resolved" | "closed",
          note
        );
      }
      return { success: true };
    }),

  // ── Admin: stats ────────────────────────────────────────────────────────────
  adminStats: adminProcedure.query(async () => {
    return getContributionStats();
  }),
});
