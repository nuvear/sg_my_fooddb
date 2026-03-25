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
/**
 * Restaurants — admin-curated venue database with approval workflow.
 */
export const restaurants = mysqlTable("restaurants", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  shortName: varchar("shortName", { length: 64 }),
  description: text("description"),
  culturalNote: text("culturalNote"),
  operatingSince: varchar("operatingSince", { length: 32 }),
  tier: mysqlEnum("tier", ["hawker-legend","premium-local","fine-dining","chain","mamak","kopitiam"]).notNull().default("hawker-legend"),
  awards: json("awards").$type<string[]>().default([]),
  region: mysqlEnum("region", ["singapore","penang","kl","malacca","johor","malaysia"]).notNull().default("singapore"),
  area: varchar("area", { length: 256 }),
  ethnic: json("ethnic").$type<string[]>().default([]),
  occasions: json("occasions").$type<string[]>().default([]),
  dietary: json("dietary").$type<string[]>().default([]),
  website: varchar("website", { length: 512 }),
  michelinNote: text("michelinNote"),
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  iconUrl: varchar("iconUrl", { length: 512 }),
  status: mysqlEnum("status", ["pending","approved","rejected","draft"]).notNull().default("pending"),
  submittedBy: int("submittedBy"),
  reviewedBy: int("reviewedBy"),
  reviewNote: text("reviewNote"),
  submittedAt: timestamp("submittedAt").defaultNow(),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type RestaurantRecord = typeof restaurants.$inferSelect;
export type InsertRestaurantRecord = typeof restaurants.$inferInsert;

/**
 * Restaurant dishes — per-dish records with image and approval tracking.
 */
export const restaurantDishes = mysqlTable("restaurant_dishes", {
  id: int("id").autoincrement().primaryKey(),
  restaurantId: int("restaurantId").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  estimatedKcal: float("estimatedKcal"),
  proteinG: float("proteinG"),
  carbG: float("carbG"),
  fatG: float("fatG"),
  sodiumMg: float("sodiumMg"),
  healthFlags: json("healthFlags").$type<string[]>().default([]),
  iconUrl: varchar("iconUrl", { length: 512 }),
  imageUrl: varchar("imageUrl", { length: 512 }),
  imageStatus: mysqlEnum("imageStatus", ["pending","generated","approved","rejected"]).default("pending"),
  foodDbId: varchar("foodDbId", { length: 64 }),
  status: mysqlEnum("status", ["pending","approved","rejected"]).notNull().default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type RestaurantDishRecord = typeof restaurantDishes.$inferSelect;
export type InsertRestaurantDishRecord = typeof restaurantDishes.$inferInsert;

/**
 * ── User Contribution Layer ───────────────────────────────────────────────────
 *
 * Three contribution types:
 *   1. food_submissions  — users submit new foods missing from the database
 *   2. food_corrections  — users flag incorrect data on existing foods
 *   3. user_feedback     — general feedback, bug reports, feature requests
 */

/**
 * food_submissions — new food entries submitted by users.
 * Admin reviews and either approves (adds to FoodDB) or rejects.
 */
export const foodSubmissions = mysqlTable("food_submissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),                                        // null for anonymous
  // Basic food info
  foodName: varchar("foodName", { length: 256 }).notNull(),
  localNames: text("localNames"),                               // comma-separated aliases
  category: varchar("category", { length: 128 }),
  country: varchar("country", { length: 64 }),
  cuisine: varchar("cuisine", { length: 64 }),
  description: text("description"),
  // Nutrition (per 100g) — all optional, user fills what they know
  energyKcal: float("energyKcal"),
  proteinG: float("proteinG"),
  fatG: float("fatG"),
  carbG: float("carbG"),
  sugarG: float("sugarG"),
  sodiumMg: float("sodiumMg"),
  fibreG: float("fibreG"),
  // Source evidence
  sourceUrl: text("sourceUrl"),                                 // recipe URL, packaging photo, etc.
  sourceNotes: text("sourceNotes"),
  // Review workflow
  status: mysqlEnum("status", ["pending", "approved", "rejected", "needs_info"])
    .default("pending").notNull(),
  reviewedBy: int("reviewedBy"),                                // admin userId
  reviewNote: text("reviewNote"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FoodSubmission = typeof foodSubmissions.$inferSelect;
export type InsertFoodSubmission = typeof foodSubmissions.$inferInsert;

/**
 * food_corrections — users flag incorrect nutrient data on existing foods.
 */
export const foodCorrections = mysqlTable("food_corrections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  // Target food
  foodId: varchar("foodId", { length: 64 }).notNull(),          // crId from FoodDB index
  foodName: varchar("foodName", { length: 256 }).notNull(),
  // What is wrong
  field: varchar("field", { length: 64 }).notNull(),            // e.g. "sodium", "energy", "name"
  currentValue: text("currentValue"),                           // what the DB currently shows
  suggestedValue: text("suggestedValue").notNull(),             // what the user believes is correct
  reason: text("reason"),                                       // free-text explanation
  sourceUrl: text("sourceUrl"),                                 // supporting evidence
  // Review workflow
  status: mysqlEnum("status", ["pending", "approved", "rejected"])
    .default("pending").notNull(),
  reviewedBy: int("reviewedBy"),
  reviewNote: text("reviewNote"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FoodCorrection = typeof foodCorrections.$inferSelect;
export type InsertFoodCorrection = typeof foodCorrections.$inferInsert;

/**
 * user_feedback — general feedback, bug reports, and feature requests.
 */
export const userFeedback = mysqlTable("user_feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  type: mysqlEnum("type", ["bug", "feature_request", "data_quality", "general"])
    .default("general").notNull(),
  subject: varchar("subject", { length: 256 }).notNull(),
  message: text("message").notNull(),
  rating: int("rating"),                                        // 1-5 star rating (optional)
  pageContext: varchar("pageContext", { length: 128 }),         // which page they were on
  status: mysqlEnum("status", ["open", "acknowledged", "resolved", "closed"])
    .default("open").notNull(),
  adminReply: text("adminReply"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserFeedback = typeof userFeedback.$inferSelect;
export type InsertUserFeedback = typeof userFeedback.$inferInsert;
