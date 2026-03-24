import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db helpers
vi.mock("./db", () => ({
  getUserProfile: vi.fn().mockResolvedValue(null),
  upsertUserProfile: vi.fn().mockResolvedValue(undefined),
  getMealLogsForDate: vi.fn().mockResolvedValue([]),
  addMealLog: vi.fn().mockResolvedValue({ id: 1 }),
  deleteMealLog: vi.fn().mockResolvedValue(undefined),
  getDailySummary: vi.fn().mockResolvedValue({ totalKcal: 0, totalSodiumMg: 0, totalProteinG: 0, totalFibreG: 0, mealCount: 0 }),
  getDailySummariesForRange: vi.fn().mockResolvedValue([]),
  getAiSuggestionsForDate: vi.fn().mockResolvedValue([]),
  saveAiSuggestion: vi.fn().mockResolvedValue({ id: 1 }),
  updateAiSuggestionAccepted: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Try Chicken Rice for lunch — ~600 kcal, 850mg sodium." } }],
  }),
}));

function makeCtx(userId = 1): TrpcContext {
  return {
    user: {
      id: userId,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("profile.calculateTargets", () => {
  it("calculates BMR and TDEE for a male user", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.profile.calculateTargets({
      age: 35,
      gender: "male",
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      objectives: ["balanced"],
    });
    expect(result.bmr).toBeGreaterThan(1500);
    expect(result.tdee).toBeGreaterThan(result.bmr);
    expect(result.dailyCalorieTarget).toBeGreaterThan(0);
    expect(result.dailySodiumTargetMg).toBe(2000);
  });

  it("applies weight loss deficit for weight_loss objective", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const balanced = await caller.profile.calculateTargets({
      age: 35, gender: "female", heightCm: 165, weightKg: 65,
      activityLevel: "moderate", objectives: ["balanced"],
    });
    const weightLoss = await caller.profile.calculateTargets({
      age: 35, gender: "female", heightCm: 165, weightKg: 65,
      activityLevel: "moderate", objectives: ["weight_loss"],
    });
    expect(weightLoss.dailyCalorieTarget).toBeLessThan(balanced.dailyCalorieTarget);
  });

  it("sets low sodium target for low_sodium objective", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.profile.calculateTargets({
      age: 40, gender: "male", heightCm: 170, weightKg: 80,
      activityLevel: "light", objectives: ["low_sodium"],
    });
    expect(result.dailySodiumTargetMg).toBe(1500);
  });
});

describe("meals.add", () => {
  it("adds a meal log entry", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.meals.add({
      logDate: "2026-03-24",
      mealType: "lunch",
      foodName: "Chicken Rice",
      kcal: 607,
      sodiumMg: 850,
      servings: 1,
      source: "manual",
    });
    expect(result).toBeDefined();
  });
});

describe("ai.generateSuggestion", () => {
  it("returns a suggestion text", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.ai.generateSuggestion({
      date: "2026-03-24",
      mealType: "lunch",
    });
    expect(result.suggestionText).toContain("Chicken Rice");
  });
});
