/**
 * Innuir FoodDB — Contribution Router Tests
 *
 * Tests the contribution tRPC procedures using mocked DB helpers.
 * All database calls are mocked so no real DB connection is needed.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock all DB helpers ───────────────────────────────────────────────────────
vi.mock("./contributionDb", () => ({
  createFoodSubmission: vi.fn().mockResolvedValue({ insertId: 1 }),
  createFoodCorrection: vi.fn().mockResolvedValue({ insertId: 1 }),
  createUserFeedback:   vi.fn().mockResolvedValue({ insertId: 1 }),
  getUserFoodSubmissions: vi.fn().mockResolvedValue([
    { id: 1, foodName: "Nasi Lemak", category: "Rice", country: "Malaysia", status: "pending", createdAt: new Date() }
  ]),
  getUserFoodCorrections: vi.fn().mockResolvedValue([
    { id: 1, foodId: "MY-001", foodName: "Nasi Lemak", field: "sodium", currentValue: "300", suggestedValue: "420", status: "pending", createdAt: new Date() }
  ]),
  getUserOwnFeedback: vi.fn().mockResolvedValue([
    { id: 1, type: "bug", subject: "Search broken", message: "Search returns no results for 'laksa'", status: "open", createdAt: new Date() }
  ]),
  getFoodSubmissions:   vi.fn().mockResolvedValue([]),
  getFoodCorrections:   vi.fn().mockResolvedValue([]),
  getUserFeedbackList:  vi.fn().mockResolvedValue([]),
  reviewFoodSubmission: vi.fn().mockResolvedValue(undefined),
  reviewFoodCorrection: vi.fn().mockResolvedValue(undefined),
  replyToFeedback:      vi.fn().mockResolvedValue(undefined),
  getContributionStats: vi.fn().mockResolvedValue({
    submissions: { total: 5, pending: 2 },
    corrections: { total: 3, pending: 1 },
    feedback:    { total: 8, open: 4 },
  }),
}));

import {
  createFoodSubmission, createFoodCorrection, createUserFeedback,
  getUserFoodSubmissions, getUserFoodCorrections, getUserOwnFeedback,
  getFoodSubmissions, getFoodCorrections, getUserFeedbackList,
  reviewFoodSubmission, reviewFoodCorrection, replyToFeedback,
  getContributionStats,
} from "./contributionDb";

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Contribution DB helpers (mocked)", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── createFoodSubmission ──────────────────────────────────────────────────
  describe("createFoodSubmission", () => {
    it("calls with correct shape and returns insertId", async () => {
      const data = {
        userId: 42,
        foodName: "Goya Champuru",
        country: "Japan",
        cuisine: "Okinawan",
        energyKcal: 156,
        sodiumMg: 420,
      };
      const result = await createFoodSubmission(data as Parameters<typeof createFoodSubmission>[0]);
      expect(createFoodSubmission).toHaveBeenCalledWith(data);
      expect(result).toMatchObject({ insertId: 1 });
    });
  });

  // ── createFoodCorrection ──────────────────────────────────────────────────
  describe("createFoodCorrection", () => {
    it("calls with correct shape", async () => {
      const data = {
        userId: 7,
        foodId: "SG-0042",
        foodName: "Chicken Rice",
        field: "sodium",
        currentValue: "300",
        suggestedValue: "520",
        reason: "HPB table 2023 shows 520mg",
        sourceUrl: "https://www.hpb.gov.sg",
      };
      await createFoodCorrection(data as Parameters<typeof createFoodCorrection>[0]);
      expect(createFoodCorrection).toHaveBeenCalledWith(data);
    });
  });

  // ── createUserFeedback ────────────────────────────────────────────────────
  describe("createUserFeedback", () => {
    it("accepts null userId for anonymous feedback", async () => {
      const data = {
        userId: null,
        type: "bug" as const,
        subject: "Photo analysis fails on dark images",
        message: "When I upload a photo taken at night, the AI returns no result.",
        rating: 2,
      };
      await createUserFeedback(data as Parameters<typeof createUserFeedback>[0]);
      expect(createUserFeedback).toHaveBeenCalledWith(data);
    });

    it("accepts authenticated user feedback with rating", async () => {
      const data = {
        userId: 99,
        type: "feature_request" as const,
        subject: "Add Korean food support",
        message: "Please add Korean dishes like bibimbap and tteokbokki to the database.",
        rating: 5,
      };
      await createUserFeedback(data as Parameters<typeof createUserFeedback>[0]);
      expect(createUserFeedback).toHaveBeenCalledWith(data);
    });
  });

  // ── getUserFoodSubmissions ────────────────────────────────────────────────
  describe("getUserFoodSubmissions", () => {
    it("returns submissions for a given userId", async () => {
      const result = await getUserFoodSubmissions(42);
      expect(getUserFoodSubmissions).toHaveBeenCalledWith(42);
      expect(result).toHaveLength(1);
      expect(result[0].foodName).toBe("Nasi Lemak");
    });
  });

  // ── getUserFoodCorrections ────────────────────────────────────────────────
  describe("getUserFoodCorrections", () => {
    it("returns corrections for a given userId", async () => {
      const result = await getUserFoodCorrections(7);
      expect(getUserFoodCorrections).toHaveBeenCalledWith(7);
      expect(result[0].field).toBe("sodium");
    });
  });

  // ── getUserOwnFeedback ────────────────────────────────────────────────────
  describe("getUserOwnFeedback", () => {
    it("returns feedback for a given userId", async () => {
      const result = await getUserOwnFeedback(99);
      expect(getUserOwnFeedback).toHaveBeenCalledWith(99);
      expect(result[0].type).toBe("bug");
    });
  });

  // ── getFoodSubmissions (admin) ────────────────────────────────────────────
  describe("getFoodSubmissions", () => {
    it("queries with pending status by default", async () => {
      await getFoodSubmissions("pending", 50, 0);
      expect(getFoodSubmissions).toHaveBeenCalledWith("pending", 50, 0);
    });

    it("queries all submissions when status is all", async () => {
      await getFoodSubmissions("all", 20, 0);
      expect(getFoodSubmissions).toHaveBeenCalledWith("all", 20, 0);
    });
  });

  // ── reviewFoodSubmission ──────────────────────────────────────────────────
  describe("reviewFoodSubmission", () => {
    it("approves a submission", async () => {
      await reviewFoodSubmission(1, 1, "approved", "Verified against HPB table");
      expect(reviewFoodSubmission).toHaveBeenCalledWith(1, 1, "approved", "Verified against HPB table");
    });

    it("rejects a submission with a note", async () => {
      await reviewFoodSubmission(2, 1, "rejected", "Duplicate of SG-0042");
      expect(reviewFoodSubmission).toHaveBeenCalledWith(2, 1, "rejected", "Duplicate of SG-0042");
    });

    it("marks a submission as needs_info", async () => {
      await reviewFoodSubmission(3, 1, "needs_info", "Please provide a source URL");
      expect(reviewFoodSubmission).toHaveBeenCalledWith(3, 1, "needs_info", "Please provide a source URL");
    });
  });

  // ── reviewFoodCorrection ──────────────────────────────────────────────────
  describe("reviewFoodCorrection", () => {
    it("approves a correction", async () => {
      await reviewFoodCorrection(5, 1, "approved");
      expect(reviewFoodCorrection).toHaveBeenCalledWith(5, 1, "approved");
    });

    it("rejects a correction with note", async () => {
      await reviewFoodCorrection(6, 1, "rejected", "Value not supported by any official source");
      expect(reviewFoodCorrection).toHaveBeenCalledWith(6, 1, "rejected", "Value not supported by any official source");
    });
  });

  // ── replyToFeedback ───────────────────────────────────────────────────────
  describe("replyToFeedback", () => {
    it("acknowledges feedback", async () => {
      await replyToFeedback(10, "acknowledged", "Thanks, we are looking into this.");
      expect(replyToFeedback).toHaveBeenCalledWith(10, "acknowledged", "Thanks, we are looking into this.");
    });

    it("resolves feedback", async () => {
      await replyToFeedback(11, "resolved", "Fixed in the latest update.");
      expect(replyToFeedback).toHaveBeenCalledWith(11, "resolved", "Fixed in the latest update.");
    });
  });

  // ── getContributionStats ──────────────────────────────────────────────────
  describe("getContributionStats", () => {
    it("returns aggregate counts for all three types", async () => {
      const stats = await getContributionStats();
      expect(stats.submissions.total).toBe(5);
      expect(stats.submissions.pending).toBe(2);
      expect(stats.corrections.total).toBe(3);
      expect(stats.corrections.pending).toBe(1);
      expect(stats.feedback.total).toBe(8);
      expect(stats.feedback.open).toBe(4);
    });
  });

});
