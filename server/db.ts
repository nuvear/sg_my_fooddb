import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, InsertUserProfile, InsertMealLog, InsertDailySummary, InsertAiSuggestion,
  aiSuggestions, dailySummaries, mealLogs, userProfiles, users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertUserProfile(profile: InsertUserProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getUserProfile(profile.userId);
  if (existing) {
    await db.update(userProfiles).set(profile).where(eq(userProfiles.userId, profile.userId));
  } else {
    await db.insert(userProfiles).values(profile);
  }
  return getUserProfile(profile.userId);
}

// Helper: convert YYYY-MM-DD string to Date for Drizzle date columns
function toDate(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00.000Z");
}

export async function getMealLogsForDate(userId: number, date: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mealLogs)
    .where(and(
      eq(mealLogs.userId, userId),
      eq(mealLogs.logDate, toDate(date)),
    ))
    .orderBy(mealLogs.loggedAt);
}

export async function getMealLogsForRange(userId: number, startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mealLogs)
    .where(and(
      eq(mealLogs.userId, userId),
      gte(mealLogs.logDate, toDate(startDate)),
      lte(mealLogs.logDate, toDate(endDate)),
    ))
    .orderBy(mealLogs.logDate, mealLogs.loggedAt);
}

export async function addMealLog(log: InsertMealLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const logWithDate = { ...log, logDate: typeof log.logDate === "string" ? toDate(log.logDate as string) : log.logDate };
  const result = await db.insert(mealLogs).values(logWithDate);
  const logDateStr = log.logDate instanceof Date ? log.logDate.toISOString().split("T")[0]! : String(log.logDate);
  await recomputeDailySummary(log.userId, logDateStr);
  return result;
}

export async function deleteMealLog(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(mealLogs)
    .where(and(eq(mealLogs.id, id), eq(mealLogs.userId, userId))).limit(1);
  if (existing.length === 0) throw new Error("Meal log not found");
  await db.delete(mealLogs).where(and(eq(mealLogs.id, id), eq(mealLogs.userId, userId)));
  const logDate = existing[0].logDate;
  const dateStr: string = logDate instanceof Date ? (logDate.toISOString().split("T")[0] ?? "") : String(logDate);
  await recomputeDailySummary(userId, dateStr);
}

export async function getDailySummary(userId: number, date: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(dailySummaries)
    .where(and(
      eq(dailySummaries.userId, userId),
      eq(dailySummaries.summaryDate, toDate(date)),
    )).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getDailySummariesForRange(userId: number, startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dailySummaries)
    .where(and(
      eq(dailySummaries.userId, userId),
      gte(dailySummaries.summaryDate, toDate(startDate)),
      lte(dailySummaries.summaryDate, toDate(endDate)),
    ))
    .orderBy(dailySummaries.summaryDate);
}

export async function recomputeDailySummary(userId: number, date: string) {
  const db = await getDb();
  if (!db) return;
  const logs = await getMealLogsForDate(userId, date);
  const summary: InsertDailySummary = {
    userId,
    summaryDate: toDate(date),
    totalKcal: logs.reduce((s, l) => s + (l.kcal ?? 0) * (l.servings ?? 1), 0),
    totalProteinG: logs.reduce((s, l) => s + (l.proteinG ?? 0) * (l.servings ?? 1), 0),
    totalCarbG: logs.reduce((s, l) => s + (l.carbG ?? 0) * (l.servings ?? 1), 0),
    totalFatG: logs.reduce((s, l) => s + (l.fatG ?? 0) * (l.servings ?? 1), 0),
    totalSodiumMg: logs.reduce((s, l) => s + (l.sodiumMg ?? 0) * (l.servings ?? 1), 0),
    totalFibreG: logs.reduce((s, l) => s + (l.fibreG ?? 0) * (l.servings ?? 1), 0),
    totalSugarG: logs.reduce((s, l) => s + (l.sugarG ?? 0) * (l.servings ?? 1), 0),
    mealCount: logs.length,
  };
  const existing = await getDailySummary(userId, date);
  if (existing) {
    await db.update(dailySummaries).set(summary)
      .where(and(
        eq(dailySummaries.userId, userId),
        eq(dailySummaries.summaryDate, toDate(date)),
      ));
  } else {
    await db.insert(dailySummaries).values(summary);
  }
}

export async function getAiSuggestionsForDate(userId: number, date: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(aiSuggestions)
    .where(and(
      eq(aiSuggestions.userId, userId),
      eq(aiSuggestions.suggestionDate, toDate(date)),
    ))
    .orderBy(aiSuggestions.createdAt);
}

export async function saveAiSuggestion(suggestion: InsertAiSuggestion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const s = { ...suggestion, suggestionDate: typeof suggestion.suggestionDate === "string" ? toDate(suggestion.suggestionDate as string) : suggestion.suggestionDate };
  await db.insert(aiSuggestions).values(s);
}

export async function updateAiSuggestionAccepted(id: number, userId: number, accepted: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(aiSuggestions)
    .set({ accepted: accepted ? 1 : 0 })
    .where(and(eq(aiSuggestions.id, id), eq(aiSuggestions.userId, userId)));
}
