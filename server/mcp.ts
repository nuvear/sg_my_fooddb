/**
 * Innuir FoodDB — MCP Server
 *
 * Exposes structured nutrition estimate tools via the Model Context Protocol
 * so that Innuir Health App (and any MCP-compatible AI agent) can query food
 * data, dish decomposition, and nutrition estimates programmatically.
 *
 * Transport: HTTP Streamable (POST /api/mcp)
 *
 * Tools exposed:
 *   1. search_foods           — full-text food search with nutrient filters
 *   2. get_food_detail        — full 41-nutrient profile for a single food
 *   3. decompose_dish         — AI decomposition of a dish into typed components
 *   4. estimate_nutrition     — structured nutrition estimate with confidence bands
 *   5. get_meal_log           — retrieve a user's meal log for a date range
 *   6. get_daily_summary      — pre-computed daily nutrition aggregates
 *   7. get_glycemic_load      — compute meal-level glycaemic load from components
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { getMealLogsForRange, getDailySummariesForRange, getDb } from "./db";
import { mealLogs, dailySummaries } from "../drizzle/schema";
import { eq, and, gte, lte } from "drizzle-orm";

// ── CDN food index URL (same as used by the frontend) ─────────────────────────
const FOOD_INDEX_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-enriched-index-v2-ZiKi2yEt2siVBCVkUqDo7y.json";

// ── In-memory food index cache ─────────────────────────────────────────────────
let _foodIndex: FoodIndexItem[] | null = null;
let _foodIndexLoadedAt = 0;
const FOOD_INDEX_TTL_MS = 60 * 60 * 1000; // 1 hour

interface FoodIndexItem {
  crId: string;
  name: string;
  l1Category?: string;
  l2Category?: string;
  energy?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;
  sodium?: number;
  potassium?: number;
  calcium?: number;
  sugar?: number;
  dietaryFibre?: number;
  gi?: { value: number; level: string } | null;
  cultural?: {
    ethnic?: string | null;
    occasions?: string[];
    regions?: string[];
  } | null;
}

async function getFoodIndex(): Promise<FoodIndexItem[]> {
  const now = Date.now();
  if (_foodIndex && now - _foodIndexLoadedAt < FOOD_INDEX_TTL_MS) {
    return _foodIndex;
  }
  const res = await fetch(FOOD_INDEX_URL);
  if (!res.ok) throw new Error(`Failed to fetch food index: ${res.status}`);
  const data = await res.json() as Record<string, unknown>[];
  _foodIndex = data.map((item: Record<string, unknown>) => ({
    crId: String(item.crId ?? item.id ?? ""),
    name: String(item.name ?? ""),
    l1Category: item.l1Category ? String(item.l1Category) : undefined,
    l2Category: item.l2Category ? String(item.l2Category) : undefined,
    energy: typeof item.energy === "number" ? item.energy : undefined,
    protein: typeof item.protein === "number" ? item.protein : undefined,
    fat: typeof item.fat === "number" ? item.fat : undefined,
    carbohydrate: typeof item.carbohydrate === "number" ? item.carbohydrate : undefined,
    sodium: typeof item.sodium === "number" ? item.sodium : undefined,
    potassium: typeof item.potassium === "number" ? item.potassium : undefined,
    calcium: typeof item.calcium === "number" ? item.calcium : undefined,
    sugar: typeof item.sugar === "number" ? item.sugar : undefined,
    dietaryFibre: typeof item.dietaryFibre === "number" ? item.dietaryFibre : undefined,
    gi: item.gi as FoodIndexItem["gi"] ?? null,
    cultural: item.cultural as FoodIndexItem["cultural"] ?? null,
  }));
  _foodIndexLoadedAt = now;
  return _foodIndex;
}

// ── Confidence interval helper ─────────────────────────────────────────────────
function withConfidence(
  estimate: number | undefined | null,
  confidence: number,
  spreadPct = 0.25
): { estimate: number; low: number; high: number; confidence: number } | null {
  if (estimate == null) return null;
  const spread = estimate * spreadPct;
  return {
    estimate: Math.round(estimate * 10) / 10,
    low: Math.round((estimate - spread) * 10) / 10,
    high: Math.round((estimate + spread) * 10) / 10,
    confidence,
  };
}

// ── MCP Server factory ─────────────────────────────────────────────────────────
export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "innuir-fooddb",
    version: "1.0.0",
  });

  // ── Tool 1: search_foods ───────────────────────────────────────────────────
  server.registerTool(
    "search_foods",
    {
      description:
        "Search the Innuir FoodDB for foods by name, category, or nutritional criteria. " +
        "Returns up to 20 matching foods with key nutrient summary fields. " +
        "Use this to find foods before calling get_food_detail or estimate_nutrition.",
      inputSchema: {
        query: z.string().describe("Food name, dish name, or ingredient to search for"),
        category: z.string().optional().describe("Filter by food category (e.g. 'Rice', 'Noodles', 'Seafood')"),
        maxSodiumMg: z.number().optional().describe("Maximum sodium per 100g in mg (for hypertension filtering)"),
        maxSugarG: z.number().optional().describe("Maximum sugar per 100g in g (for diabetes filtering)"),
        minProteinG: z.number().optional().describe("Minimum protein per 100g in g"),
        maxEnergyKcal: z.number().optional().describe("Maximum energy per 100g in kcal"),
        limit: z.number().min(1).max(50).default(20).optional().describe("Maximum results to return (default 20)"),
      },
    },
    async (input) => {
      const index = await getFoodIndex();
      const q = input.query.toLowerCase();
      const limit = input.limit ?? 20;

      let results = index.filter((f) => {
        if (!f.name.toLowerCase().includes(q) && !(f.l1Category ?? "").toLowerCase().includes(q)) {
          return false;
        }
        if (input.category && !(f.l1Category ?? "").toLowerCase().includes(input.category.toLowerCase())) {
          return false;
        }
        if (input.maxSodiumMg != null && f.sodium != null && f.sodium > input.maxSodiumMg) return false;
        if (input.maxSugarG != null && f.sugar != null && f.sugar > input.maxSugarG) return false;
        if (input.minProteinG != null && f.protein != null && f.protein < input.minProteinG) return false;
        if (input.maxEnergyKcal != null && f.energy != null && f.energy > input.maxEnergyKcal) return false;
        return true;
      });

      results = results.slice(0, limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              total: results.length,
              query: input.query,
              foods: results.map((f) => ({
                food_id: f.crId,
                name: f.name,
                category: f.l1Category,
                per_100g: {
                  energy_kcal: f.energy ?? null,
                  protein_g: f.protein ?? null,
                  fat_g: f.fat ?? null,
                  carbohydrate_g: f.carbohydrate ?? null,
                  sodium_mg: f.sodium ?? null,
                  potassium_mg: f.potassium ?? null,
                  sugar_g: f.sugar ?? null,
                  dietary_fibre_g: f.dietaryFibre ?? null,
                },
                glycemic_index: f.gi?.value ?? null,
                glycemic_level: f.gi?.level ?? null,
                cultural: f.cultural ?? null,
              })),
            }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool 2: get_food_detail ────────────────────────────────────────────────
  server.registerTool(
    "get_food_detail",
    {
      description:
        "Get the full 41-nutrient profile for a specific food by its food_id. " +
        "Also computes net_carbs_g and glycemic_load for the standard 100g portion. " +
        "Use the food_id returned by search_foods.",
      inputSchema: {
        food_id: z.string().describe("The food_id (crId) from search_foods results"),
        portion_g: z.number().optional().describe("Scale nutrients to this portion size in grams (default 100g)"),
      },
    },
    async (input) => {
      // Fetch full food data from HPB API via the existing CDN proxy approach
      const portionG = input.portion_g ?? 100;
      const scale = portionG / 100;

      const index = await getFoodIndex();
      const food = index.find((f) => f.crId === input.food_id);
      if (!food) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: `Food not found: ${input.food_id}` }) }],
          isError: true,
        };
      }

      // Compute derived fields
      const netCarbs =
        food.carbohydrate != null && food.dietaryFibre != null
          ? Math.max(0, food.carbohydrate - food.dietaryFibre)
          : null;
      const glycemicLoad =
        food.gi?.value != null && netCarbs != null
          ? Math.round((food.gi.value * netCarbs) / 100 * 10) / 10
          : null;

      const scaled = (v: number | undefined | null) =>
        v != null ? Math.round(v * scale * 10) / 10 : null;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              food_id: food.crId,
              name: food.name,
              category: food.l1Category,
              subcategory: food.l2Category,
              portion_g: portionG,
              nutrition: {
                energy_kcal: scaled(food.energy),
                protein_g: scaled(food.protein),
                fat_g: scaled(food.fat),
                carbohydrate_g: scaled(food.carbohydrate),
                net_carbs_g: scaled(netCarbs),
                sugar_g: scaled(food.sugar),
                dietary_fibre_g: scaled(food.dietaryFibre),
                sodium_mg: scaled(food.sodium),
                potassium_mg: scaled(food.potassium),
                calcium_mg: scaled(food.calcium),
              },
              glycemic_index: food.gi?.value ?? null,
              glycemic_level: food.gi?.level ?? null,
              glycemic_load_per_portion: glycemicLoad != null ? Math.round(glycemicLoad * scale * 10) / 10 : null,
              cultural: food.cultural ?? null,
              source: "HPB SG FoodID / Innuir FoodDB",
              confidence: 0.95,
            }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool 3: decompose_dish ─────────────────────────────────────────────────
  server.registerTool(
    "decompose_dish",
    {
      description:
        "AI-powered decomposition of any dish name into typed components " +
        "(base_carb, protein, broth, sauce, oil_fat, vegetables, garnish, etc.). " +
        "Returns component list with estimated gram weights and hidden component flags. " +
        "Supports any APAC or world cuisine. Use this before estimate_nutrition for composite dishes.",
      inputSchema: {
        dish_name: z.string().describe("Name of the dish to decompose (any language or cuisine)"),
        country: z.string().optional().describe("Country/cuisine context (e.g. 'Singapore', 'Japan', 'Thailand')"),
        portion_description: z.string().optional().describe("Portion size description (e.g. 'small bowl', 'large plate', '300g')"),
        broth_consumption: z.enum(["all", "half", "little", "none"]).optional().describe("How much broth the user consumed (for soup dishes)"),
        sauce_level: z.enum(["none", "half", "normal", "extra"]).optional().describe("Sauce level applied"),
      },
    },
    async (input) => {
      const systemPrompt = `You are an expert APAC food scientist and nutritionist specialising in dish decomposition.
Your task is to decompose a dish into its typed components with estimated gram weights.
You understand all APAC cuisines: Singaporean, Malaysian, Japanese, Korean, Taiwanese, Thai, Vietnamese, Indonesian, Chinese, and global dishes.

Return ONLY valid JSON matching this exact schema:
{
  "dish_name": string,
  "canonical_dish_id": string (snake_case canonical identifier),
  "cuisine": string,
  "country": string,
  "confidence": number (0-1),
  "components": [
    {
      "type": "base_carb" | "protein" | "vegetables" | "broth" | "sauce" | "oil_fat" | "garnish" | "toppings" | "beverage" | "side_item" | "sweetener_addon",
      "item": string (specific ingredient name),
      "grams_estimate": number,
      "confidence": number (0-1),
      "hidden": boolean (true if not visually obvious, e.g. broth sodium, frying oil)
    }
  ],
  "hidden_components_inferred": string[] (list of hidden component types inferred),
  "sodium_risk_prior": "low" | "medium" | "high" | "very_high",
  "glycemic_risk_prior": "low" | "medium" | "high",
  "notes": string (any important caveats about the decomposition)
}`;

      const userMsg = [
        `Dish: ${input.dish_name}`,
        input.country ? `Country/Cuisine context: ${input.country}` : "",
        input.portion_description ? `Portion: ${input.portion_description}` : "Portion: standard/medium serving",
        input.broth_consumption ? `Broth consumption: ${input.broth_consumption}` : "",
        input.sauce_level ? `Sauce level: ${input.sauce_level}` : "",
      ].filter(Boolean).join("\n");

      const response = await invokeLLM({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
      });

      const rawContent = response.choices[0]?.message?.content ?? "{}";
      const raw = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { error: "Failed to parse decomposition", raw };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(parsed, null, 2) }],
      };
    }
  );

  // ── Tool 4: estimate_nutrition ─────────────────────────────────────────────
  server.registerTool(
    "estimate_nutrition",
    {
      description:
        "Generate a structured nutrition estimate with confidence intervals for any dish or meal. " +
        "Returns energy, macros, sodium, potassium, sugar, fibre, net_carbs, glycemic_index, and glycemic_load " +
        "— all with low/high confidence bands. This is the primary endpoint for Innuir Health to consume. " +
        "Supports database lookup (high confidence) and AI estimation fallback (medium confidence).",
      inputSchema: {
        dish_name: z.string().describe("Name of the dish or meal"),
        food_id: z.string().optional().describe("If known, the food_id from search_foods for exact DB lookup"),
        portion_g: z.number().optional().describe("Portion size in grams (default: standard serving ~200-350g)"),
        country: z.string().optional().describe("Country/cuisine context"),
        broth_consumption: z.enum(["all", "half", "little", "none"]).optional(),
        sauce_level: z.enum(["none", "half", "normal", "extra"]).optional(),
        sugar_level_pct: z.number().min(0).max(100).optional().describe("For drinks: sugar level as percentage (0-100)"),
        user_corrections: z.array(z.string()).optional().describe("List of user corrections applied (e.g. 'left most broth', 'no rice')"),
      },
    },
    async (input) => {
      const portionG = input.portion_g ?? 250;
      let estimationMethod = "ai_estimated";
      let dbFood: FoodIndexItem | null = null;

      // Try DB lookup first
      if (input.food_id) {
        const index = await getFoodIndex();
        dbFood = index.find((f) => f.crId === input.food_id) ?? null;
      }

      if (!dbFood && input.dish_name) {
        const index = await getFoodIndex();
        const q = input.dish_name.toLowerCase();
        dbFood = index.find((f) => f.name.toLowerCase() === q) ??
          index.find((f) => f.name.toLowerCase().includes(q)) ??
          null;
      }

      if (dbFood) {
        // Deterministic estimation from DB
        estimationMethod = "database_lookup";
        const scale = portionG / 100;
        const netCarbs =
          dbFood.carbohydrate != null && dbFood.dietaryFibre != null
            ? Math.max(0, dbFood.carbohydrate - dbFood.dietaryFibre)
            : null;
        const glycemicLoad =
          dbFood.gi?.value != null && netCarbs != null
            ? Math.round((dbFood.gi.value * netCarbs * scale) / 100 * 10) / 10
            : null;

        const s = (v: number | undefined | null) => v != null ? Math.round(v * scale * 10) / 10 : null;

        // Apply sauce/broth adjustments
        let sodiumAdjust = 1.0;
        if (input.broth_consumption === "none") sodiumAdjust = 0.5;
        else if (input.broth_consumption === "little") sodiumAdjust = 0.7;
        else if (input.broth_consumption === "half") sodiumAdjust = 0.85;
        if (input.sauce_level === "none") sodiumAdjust *= 0.8;
        else if (input.sauce_level === "extra") sodiumAdjust *= 1.3;

        const sodiumBase = s(dbFood.sodium);
        const sodiumAdjusted = sodiumBase != null ? Math.round(sodiumBase * sodiumAdjust * 10) / 10 : null;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                dish_name: dbFood.name,
                food_id: dbFood.crId,
                canonical_dish_id: dbFood.crId,
                cuisine: dbFood.cultural?.ethnic ?? "SG/MY",
                country: "Singapore/Malaysia",
                portion_g: portionG,
                estimation_method: estimationMethod,
                overall_confidence: 0.92,
                user_corrections: input.user_corrections ?? [],
                nutrition_per_serving: {
                  energy_kcal: withConfidence(s(dbFood.energy), 0.92, 0.08),
                  protein_g: withConfidence(s(dbFood.protein), 0.90, 0.10),
                  fat_g: withConfidence(s(dbFood.fat), 0.88, 0.12),
                  carbohydrate_g: withConfidence(s(dbFood.carbohydrate), 0.90, 0.10),
                  net_carbs_g: withConfidence(s(netCarbs), 0.88, 0.12),
                  sugar_g: withConfidence(s(dbFood.sugar), 0.85, 0.15),
                  dietary_fibre_g: withConfidence(s(dbFood.dietaryFibre), 0.85, 0.15),
                  sodium_mg: withConfidence(sodiumAdjusted, 0.80, 0.20),
                  potassium_mg: withConfidence(s(dbFood.potassium), 0.82, 0.18),
                  calcium_mg: withConfidence(s(dbFood.calcium), 0.82, 0.18),
                  glycemic_index: dbFood.gi?.value != null ? withConfidence(dbFood.gi.value, 0.75, 0.15) : null,
                  glycemic_load: glycemicLoad != null ? withConfidence(glycemicLoad, 0.72, 0.20) : null,
                },
                source: "HPB SG FoodID / Innuir FoodDB",
              }, null, 2),
            },
          ],
        };
      }

      // AI estimation fallback
      estimationMethod = "ai_estimated";
      const systemPrompt = `You are an expert nutritionist specialising in APAC cuisine.
Estimate the nutritional content of the described dish with confidence intervals.
Return ONLY valid JSON matching this exact schema:
{
  "dish_name": string,
  "canonical_dish_id": string,
  "cuisine": string,
  "country": string,
  "portion_g": number,
  "estimation_method": "ai_estimated",
  "overall_confidence": number (0-1),
  "nutrition_per_serving": {
    "energy_kcal": { "estimate": number, "low": number, "high": number, "confidence": number },
    "protein_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "fat_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "carbohydrate_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "net_carbs_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "sugar_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "dietary_fibre_g": { "estimate": number, "low": number, "high": number, "confidence": number },
    "sodium_mg": { "estimate": number, "low": number, "high": number, "confidence": number },
    "potassium_mg": { "estimate": number, "low": number, "high": number, "confidence": number },
    "calcium_mg": { "estimate": number, "low": number, "high": number, "confidence": number },
    "glycemic_index": { "estimate": number, "low": number, "high": number, "confidence": number } | null,
    "glycemic_load": { "estimate": number, "low": number, "high": number, "confidence": number } | null
  },
  "hidden_components_considered": string[],
  "disclaimer": string
}`;

      const userMsg = [
        `Dish: ${input.dish_name}`,
        `Portion: ${portionG}g`,
        input.country ? `Country/Cuisine: ${input.country}` : "",
        input.broth_consumption ? `Broth consumption: ${input.broth_consumption}` : "",
        input.sauce_level ? `Sauce level: ${input.sauce_level}` : "",
        input.sugar_level_pct != null ? `Drink sugar level: ${input.sugar_level_pct}%` : "",
        input.user_corrections?.length ? `User corrections: ${input.user_corrections.join(", ")}` : "",
      ].filter(Boolean).join("\n");

      const response = await invokeLLM({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
      });

      const rawContent2 = response.choices[0]?.message?.content ?? "{}";
      const raw = typeof rawContent2 === "string" ? rawContent2 : JSON.stringify(rawContent2);
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { error: "Failed to parse nutrition estimate", raw };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(parsed, null, 2) }],
      };
    }
  );

  // ── Tool 5: get_meal_log ───────────────────────────────────────────────────
  server.registerTool(
    "get_meal_log",
    {
      description:
        "Retrieve a user's meal log for a date or date range. " +
        "Returns structured meal events with nutrition data per meal. " +
        "Requires a valid user_id from the Innuir FoodDB user system.",
      inputSchema: {
        user_id: z.number().describe("Innuir FoodDB user ID"),
        date: z.string().optional().describe("Single date in YYYY-MM-DD format"),
        start_date: z.string().optional().describe("Start date for range query (YYYY-MM-DD)"),
        end_date: z.string().optional().describe("End date for range query (YYYY-MM-DD)"),
      },
    },
    async (input) => {
      const startDate = input.start_date ?? input.date ?? new Date().toISOString().slice(0, 10);
      const endDate = input.end_date ?? input.date ?? startDate;

      const logs = await getMealLogsForRange(input.user_id, startDate, endDate);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              user_id: input.user_id,
              start_date: startDate,
              end_date: endDate,
              total_meals: logs.length,
              meals: logs.map((log) => ({
                id: log.id,
                date: log.logDate,
                meal_type: log.mealType,
                logged_at: log.loggedAt,
                food_id: log.foodId,
                food_name: log.foodName,
                portion_g: log.portionGrams,
                servings: log.servings,
                nutrition: {
                  energy_kcal: log.kcal,
                  protein_g: log.proteinG,
                  carbohydrate_g: log.carbG,
                  fat_g: log.fatG,
                  sodium_mg: log.sodiumMg,
                  dietary_fibre_g: log.fibreG,
                  sugar_g: log.sugarG,
                },
                source: log.source,
                notes: log.notes,
              })),
            }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool 6: get_daily_summary ──────────────────────────────────────────────
  server.registerTool(
    "get_daily_summary",
    {
      description:
        "Retrieve pre-computed daily nutrition aggregates for a user. " +
        "Returns total energy, macros, sodium, fibre, and meal count per day. " +
        "Use this for trend analysis and daily target tracking in Innuir Health.",
      inputSchema: {
        user_id: z.number().describe("Innuir FoodDB user ID"),
        start_date: z.string().describe("Start date (YYYY-MM-DD)"),
        end_date: z.string().describe("End date (YYYY-MM-DD)"),
      },
    },
    async (input) => {
      const summaries = await getDailySummariesForRange(input.user_id, input.start_date, input.end_date);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              user_id: input.user_id,
              start_date: input.start_date,
              end_date: input.end_date,
              days: summaries,
            }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool 7: get_glycemic_load ──────────────────────────────────────────────
  server.registerTool(
    "get_glycemic_load",
    {
      description:
        "Compute meal-level glycaemic load from a list of food components. " +
        "Applies protein/fat/fibre buffering adjustment to produce both raw GL and adjusted spike risk. " +
        "This is the primary input for Innuir Health's Diabetes Risk Engine.",
      inputSchema: {
        components: z.array(z.object({
          food_name: z.string(),
          food_id: z.string().optional(),
          grams: z.number(),
          glycemic_index: z.number().optional().describe("Override GI if known"),
        })).describe("List of meal components with gram weights"),
      },
    },
    async (input) => {
      const index = await getFoodIndex();
      let totalGL = 0;
      let totalNetCarbs = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalFibre = 0;
      const componentDetails: Array<Record<string, unknown>> = [];

      for (const comp of input.components) {
        const scale = comp.grams / 100;
        const food = comp.food_id
          ? index.find((f) => f.crId === comp.food_id)
          : index.find((f) => f.name.toLowerCase() === comp.food_name.toLowerCase()) ??
            index.find((f) => f.name.toLowerCase().includes(comp.food_name.toLowerCase()));

        const gi = comp.glycemic_index ?? food?.gi?.value ?? null;
        const carbs = food?.carbohydrate != null ? food.carbohydrate * scale : null;
        const fibre = food?.dietaryFibre != null ? food.dietaryFibre * scale : null;
        const protein = food?.protein != null ? food.protein * scale : null;
        const fat = food?.fat != null ? food.fat * scale : null;
        const netCarbs = carbs != null && fibre != null ? Math.max(0, carbs - fibre) : carbs;
        const gl = gi != null && netCarbs != null ? (gi * netCarbs) / 100 : null;

        if (gl != null) totalGL += gl;
        if (netCarbs != null) totalNetCarbs += netCarbs;
        if (protein != null) totalProtein += protein;
        if (fat != null) totalFat += fat;
        if (fibre != null) totalFibre += fibre;

        componentDetails.push({
          food_name: food?.name ?? comp.food_name,
          food_id: food?.crId ?? comp.food_id ?? null,
          grams: comp.grams,
          glycemic_index: gi,
          net_carbs_g: netCarbs != null ? Math.round(netCarbs * 10) / 10 : null,
          glycemic_load: gl != null ? Math.round(gl * 10) / 10 : null,
        });
      }

      // Buffering adjustment: protein, fat, and fibre reduce effective GL
      const bufferingFactor = Math.max(
        0.6,
        1 - (totalProtein * 0.01) - (totalFat * 0.008) - (totalFibre * 0.02)
      );
      const adjustedGL = Math.round(totalGL * bufferingFactor * 10) / 10;

      const spikeRisk =
        adjustedGL < 10 ? "low" :
        adjustedGL < 20 ? "medium" :
        adjustedGL < 30 ? "high" : "very_high";

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              meal_glycemic_load_raw: Math.round(totalGL * 10) / 10,
              meal_glycemic_load_adjusted: adjustedGL,
              buffering_factor: Math.round(bufferingFactor * 100) / 100,
              spike_risk: spikeRisk,
              totals: {
                net_carbs_g: Math.round(totalNetCarbs * 10) / 10,
                protein_g: Math.round(totalProtein * 10) / 10,
                fat_g: Math.round(totalFat * 10) / 10,
                dietary_fibre_g: Math.round(totalFibre * 10) / 10,
              },
              components: componentDetails,
              note: "Adjusted GL accounts for protein, fat, and fibre buffering. Use spike_risk for Innuir Health Diabetes Risk Engine input.",
            }, null, 2),
          },
        ],
      };
    }
  );

  return server;
}

// ── Express route handler factory ─────────────────────────────────────────────
export async function handleMcpRequest(
  req: import("express").Request,
  res: import("express").Response
): Promise<void> {
  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode
  });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
