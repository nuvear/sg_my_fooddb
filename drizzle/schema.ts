import {
  int,
  float,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  date,
  tinyint,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User health profile — set during onboarding, editable at any time.
 */
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  age: int("age"),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  heightCm: float("heightCm"),
  weightKg: float("weightKg"),
  activityLevel: mysqlEnum("activityLevel", [
    "sedentary", "light", "moderate", "active", "very_active",
  ]),
  objectives: json("objectives").$type<string[]>().default([]),
  dailyCalorieTarget: int("dailyCalorieTarget"),
  dailySodiumTargetMg: int("dailySodiumTargetMg").default(2000),
  dailyProteinTargetG: float("dailyProteinTargetG"),
  dailyCarbTargetG: float("dailyCarbTargetG"),
  dailyFatTargetG: float("dailyFatTargetG"),
  dailyFibreTargetG: float("dailyFibreTargetG").default(25),
  dietaryPreferences: json("dietaryPreferences").$type<string[]>().default([]),
  onboardingCompleted: tinyint("onboardingCompleted").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * Meal log — each entry is one food item consumed at a specific time.
 */
export const mealLogs = mysqlTable("meal_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  logDate: date("logDate").notNull(),
  mealType: mysqlEnum("mealType", ["breakfast", "lunch", "dinner", "snack", "supper"]).notNull(),
  loggedAt: timestamp("loggedAt").defaultNow().notNull(),
  foodId: varchar("foodId", { length: 64 }),
  foodName: varchar("foodName", { length: 256 }).notNull(),
  portionDescription: varchar("portionDescription", { length: 128 }),
  portionGrams: float("portionGrams"),
  servings: float("servings").default(1),
  kcal: float("kcal"),
  proteinG: float("proteinG"),
  carbG: float("carbG"),
  fatG: float("fatG"),
  sodiumMg: float("sodiumMg"),
  fibreG: float("fibreG"),
  sugarG: float("sugarG"),
  source: mysqlEnum("source", ["search", "restaurant", "manual", "ai_suggestion"]).default("search"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MealLog = typeof mealLogs.$inferSelect;
export type InsertMealLog = typeof mealLogs.$inferInsert;

/**
 * Daily summaries — pre-computed aggregates per user per day.
 */
export const dailySummaries = mysqlTable("daily_summaries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  summaryDate: date("summaryDate").notNull(),
  totalKcal: float("totalKcal").default(0),
  totalProteinG: float("totalProteinG").default(0),
  totalCarbG: float("totalCarbG").default(0),
  totalFatG: float("totalFatG").default(0),
  totalSodiumMg: float("totalSodiumMg").default(0),
  totalFibreG: float("totalFibreG").default(0),
  totalSugarG: float("totalSugarG").default(0),
  mealCount: int("mealCount").default(0),
  goalAdherenceScore: float("goalAdherenceScore"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailySummary = typeof dailySummaries.$inferSelect;
export type InsertDailySummary = typeof dailySummaries.$inferInsert;

/**
 * AI suggestions — personalised meal recommendations.
 */
export const aiSuggestions = mysqlTable("ai_suggestions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  suggestionDate: date("suggestionDate").notNull(),
  mealType: mysqlEnum("mealType", ["breakfast", "lunch", "dinner", "snack", "supper"]).notNull(),
  suggestionText: text("suggestionText").notNull(),
  foodIds: json("foodIds").$type<string[]>().default([]),
  rationale: text("rationale"),
  accepted: tinyint("accepted"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiSuggestion = typeof aiSuggestions.$inferSelect;
export type InsertAiSuggestion = typeof aiSuggestions.$inferInsert;