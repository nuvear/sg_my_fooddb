/**
 * Innuir FoodDB — Contribution Layer DB Helpers
 *
 * Query helpers for food_submissions, food_corrections, and user_feedback tables.
 */

import { eq, desc, sql } from "drizzle-orm";
import { getDb } from "./db";
import {
  foodSubmissions, type InsertFoodSubmission,
  foodCorrections, type InsertFoodCorrection,
  userFeedback, type InsertUserFeedback,
} from "../drizzle/schema";

// ── Food Submissions ──────────────────────────────────────────────────────────

export async function createFoodSubmission(data: InsertFoodSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(foodSubmissions).values(data);
  return result;
}

export async function getFoodSubmissions(
  status: "pending" | "approved" | "rejected" | "needs_info" | "all" = "all",
  limit = 50,
  offset = 0
) {
  const db = await getDb();
  if (!db) return [];
  if (status !== "all") {
    return db
      .select()
      .from(foodSubmissions)
      .where(eq(foodSubmissions.status, status))
      .orderBy(desc(foodSubmissions.createdAt))
      .limit(limit)
      .offset(offset);
  }
  return db
    .select()
    .from(foodSubmissions)
    .orderBy(desc(foodSubmissions.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getFoodSubmissionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select().from(foodSubmissions).where(eq(foodSubmissions.id, id));
  return row ?? null;
}

export async function getUserFoodSubmissions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(foodSubmissions)
    .where(eq(foodSubmissions.userId, userId))
    .orderBy(desc(foodSubmissions.createdAt));
}

export async function reviewFoodSubmission(
  id: number,
  reviewedBy: number,
  status: "approved" | "rejected" | "needs_info",
  reviewNote?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(foodSubmissions)
    .set({ status, reviewedBy, reviewNote: reviewNote ?? null, reviewedAt: new Date() })
    .where(eq(foodSubmissions.id, id));
}

// ── Food Corrections ──────────────────────────────────────────────────────────

export async function createFoodCorrection(data: InsertFoodCorrection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(foodCorrections).values(data);
  return result;
}

export async function getFoodCorrections(
  status: "pending" | "approved" | "rejected" | "all" = "all",
  limit = 50,
  offset = 0
) {
  const db = await getDb();
  if (!db) return [];
  if (status !== "all") {
    return db
      .select()
      .from(foodCorrections)
      .where(eq(foodCorrections.status, status))
      .orderBy(desc(foodCorrections.createdAt))
      .limit(limit)
      .offset(offset);
  }
  return db
    .select()
    .from(foodCorrections)
    .orderBy(desc(foodCorrections.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getUserFoodCorrections(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(foodCorrections)
    .where(eq(foodCorrections.userId, userId))
    .orderBy(desc(foodCorrections.createdAt));
}

export async function reviewFoodCorrection(
  id: number,
  reviewedBy: number,
  status: "approved" | "rejected",
  reviewNote?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(foodCorrections)
    .set({ status, reviewedBy, reviewNote: reviewNote ?? null, reviewedAt: new Date() })
    .where(eq(foodCorrections.id, id));
}

// ── User Feedback ─────────────────────────────────────────────────────────────

export async function createUserFeedback(data: InsertUserFeedback) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(userFeedback).values(data);
  return result;
}

export async function getUserFeedbackList(
  status: "open" | "acknowledged" | "resolved" | "closed" | "all" = "all",
  limit = 50,
  offset = 0
) {
  const db = await getDb();
  if (!db) return [];
  if (status !== "all") {
    return db
      .select()
      .from(userFeedback)
      .where(eq(userFeedback.status, status))
      .orderBy(desc(userFeedback.createdAt))
      .limit(limit)
      .offset(offset);
  }
  return db
    .select()
    .from(userFeedback)
    .orderBy(desc(userFeedback.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getUserOwnFeedback(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(userFeedback)
    .where(eq(userFeedback.userId, userId))
    .orderBy(desc(userFeedback.createdAt));
}

export async function replyToFeedback(
  id: number,
  status: "open" | "acknowledged" | "resolved" | "closed",
  adminReply?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(userFeedback)
    .set({ status, adminReply: adminReply ?? null })
    .where(eq(userFeedback.id, id));
}

// ── Admin contribution stats ──────────────────────────────────────────────────

export async function getContributionStats() {
  const db = await getDb();
  if (!db) return {
    submissions: { total: 0, pending: 0 },
    corrections: { total: 0, pending: 0 },
    feedback: { total: 0, open: 0 },
  };

  const [subStats] = await db
    .select({
      total: sql<number>`count(*)`,
      pending: sql<number>`sum(case when status='pending' then 1 else 0 end)`,
    })
    .from(foodSubmissions);

  const [corrStats] = await db
    .select({
      total: sql<number>`count(*)`,
      pending: sql<number>`sum(case when status='pending' then 1 else 0 end)`,
    })
    .from(foodCorrections);

  const [fbStats] = await db
    .select({
      total: sql<number>`count(*)`,
      open: sql<number>`sum(case when status='open' then 1 else 0 end)`,
    })
    .from(userFeedback);

  return {
    submissions: { total: Number(subStats?.total ?? 0), pending: Number(subStats?.pending ?? 0) },
    corrections: { total: Number(corrStats?.total ?? 0), pending: Number(corrStats?.pending ?? 0) },
    feedback: { total: Number(fbStats?.total ?? 0), open: Number(fbStats?.open ?? 0) },
  };
}
