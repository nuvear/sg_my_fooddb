// ============================================================
// FoodDB — Intelligent Search Engine (4-Layer Architecture)
//
// Layer 1: Fuse.js fuzzy search (instant, offline, typo-tolerant)
// Layer 2: Rule-based nutrition parser (deterministic, 0ms, offline)
// Layer 3: LLM fallback (complex natural language, optional)
// Layer 4: Composite ranking engine (weighted score fusion)
//
// Design: Tropical Bauhaus — data is the hero
// ============================================================

import Fuse from "fuse.js";
import type { FoodSearchResult } from "./nutrients";

// ── Types ────────────────────────────────────────────────────

export type QueryType = "simple" | "nutrition" | "mixed" | "natural";

export interface NutritionFilter {
  nutrient: string;       // e.g. "sodium", "energy", "protein"
  operator: "max" | "min" | "eq";
  value: number;
  unit?: string;
}

export interface ParsedQuery {
  type: QueryType;
  keywords: string[];
  filters: NutritionFilter[];
  categoryHints: string[];
  confidence: number;     // 0–1, how confident the rule parser is
  rawQuery: string;
  llmInterpretation?: string;  // Set by Layer 3 if triggered
}

export interface SearchResult extends FoodSearchResult {
  score: number;          // 0–1, higher = better match
  fuseScore: number;      // Layer 1 contribution
  nutritionScore: number; // Layer 2 contribution
  matchedFilters: string[]; // Which nutrition filters matched
  queryType: QueryType;
}

// ── Layer 2: Rule-Based Nutrition Parser ────────────────────

// Maps natural language terms to nutrient keys and thresholds
const NUTRITION_RULES: Array<{
  pattern: RegExp;
  nutrient: string;
  operator: "max" | "min";
  value?: number;
  // If no value, extract from query (e.g. "under 300 kcal")
}> = [
  // Energy
  { pattern: /\blow[- ]cal(orie)?s?\b/i,      nutrient: "energy",     operator: "max", value: 200 },
  { pattern: /\bhigh[- ]cal(orie)?s?\b/i,     nutrient: "energy",     operator: "min", value: 400 },
  { pattern: /\blight\b/i,                    nutrient: "energy",     operator: "max", value: 250 },
  { pattern: /\bheavy\b|\brich\b/i,           nutrient: "energy",     operator: "min", value: 400 },
  // Protein
  { pattern: /\bhigh[- ]protein\b/i,          nutrient: "protein",    operator: "min", value: 15 },
  { pattern: /\bprotein[- ]rich\b/i,          nutrient: "protein",    operator: "min", value: 15 },
  { pattern: /\blow[- ]protein\b/i,           nutrient: "protein",    operator: "max", value: 5 },
  // Fat
  { pattern: /\blow[- ]fat\b/i,              nutrient: "fat",         operator: "max", value: 5 },
  { pattern: /\bhigh[- ]fat\b/i,             nutrient: "fat",         operator: "min", value: 15 },
  { pattern: /\blow[- ]sat(urated)?\b/i,     nutrient: "saturatedFat",operator: "max", value: 2 },
  // Sodium
  { pattern: /\blow[- ]sodium\b/i,           nutrient: "sodium",      operator: "max", value: 200 },
  { pattern: /\blow[- ]salt\b/i,             nutrient: "sodium",      operator: "max", value: 200 },
  { pattern: /\bhigh[- ]sodium\b/i,          nutrient: "sodium",      operator: "min", value: 500 },
  // Sugar
  { pattern: /\blow[- ]sugar\b/i,            nutrient: "sugar",       operator: "max", value: 5 },
  { pattern: /\bno[- ]sugar\b/i,             nutrient: "sugar",       operator: "max", value: 1 },
  { pattern: /\bsugar[- ]free\b/i,           nutrient: "sugar",       operator: "max", value: 0.5 },
  { pattern: /\bhigh[- ]sugar\b/i,           nutrient: "sugar",       operator: "min", value: 15 },
  // Fibre
  { pattern: /\bhigh[- ]fi(b|br)e\b/i,      nutrient: "dietaryFibre",operator: "min", value: 5 },
  { pattern: /\bfi(b|br)e[- ]rich\b/i,      nutrient: "dietaryFibre",operator: "min", value: 5 },
  // Carbs
  { pattern: /\blow[- ]carb\b/i,             nutrient: "carbohydrate",operator: "max", value: 10 },
  { pattern: /\bketo\b/i,                    nutrient: "carbohydrate",operator: "max", value: 5 },
  // Cholesterol
  { pattern: /\blow[- ]cholesterol\b/i,      nutrient: "cholesterol", operator: "max", value: 20 },
];

// Numeric threshold patterns: "under 300 kcal", "less than 500mg sodium", "above 20g protein"
const NUMERIC_PATTERNS: Array<{
  pattern: RegExp;
  nutrientMap: Record<string, string>;
}> = [
  {
    pattern: /\b(under|less than|below|max|at most|<)\s*(\d+(?:\.\d+)?)\s*(kcal|cal|calories?)\b/i,
    nutrientMap: { kcal: "energy", cal: "energy", calories: "energy", calorie: "energy" },
  },
  {
    pattern: /\b(over|more than|above|min|at least|>)\s*(\d+(?:\.\d+)?)\s*(kcal|cal|calories?)\b/i,
    nutrientMap: { kcal: "energy", cal: "energy", calories: "energy", calorie: "energy" },
  },
  {
    pattern: /\b(under|less than|below|max|<)\s*(\d+(?:\.\d+)?)\s*(g|grams?)\s*(protein|fat|carb|carbs|sugar|fibre|fiber)\b/i,
    nutrientMap: { protein: "protein", fat: "fat", carb: "carbohydrate", carbs: "carbohydrate", sugar: "sugar", fibre: "dietaryFibre", fiber: "dietaryFibre" },
  },
  {
    pattern: /\b(over|more than|above|min|>)\s*(\d+(?:\.\d+)?)\s*(g|grams?)\s*(protein|fat|carb|carbs|sugar|fibre|fiber)\b/i,
    nutrientMap: { protein: "protein", fat: "fat", carb: "carbohydrate", carbs: "carbohydrate", sugar: "sugar", fibre: "dietaryFibre", fiber: "dietaryFibre" },
  },
  {
    pattern: /\b(under|less than|below|max|<)\s*(\d+(?:\.\d+)?)\s*(mg)\s*(sodium|salt|potassium|calcium|iron)\b/i,
    nutrientMap: { sodium: "sodium", salt: "sodium", potassium: "potassium", calcium: "calcium", iron: "iron" },
  },
];

// Food category keywords → food group hints
const CATEGORY_HINTS: Array<{ pattern: RegExp; hint: string }> = [
  { pattern: /\bbreakfast\b/i,         hint: "Grains and staples" },
  { pattern: /\bdinner\b|\blunch\b/i,  hint: "Mixed" },
  { pattern: /\bdrink\b|\bbeverage\b/i,hint: "Beverages" },
  { pattern: /\bsnack\b/i,             hint: "Snacks" },
  { pattern: /\bvegetable\b|\bveg\b/i, hint: "Vegetables" },
  { pattern: /\bfruit\b/i,             hint: "Fruit" },
  { pattern: /\bseafood\b|\bfish\b/i,  hint: "Fish and seafood" },
  { pattern: /\bmeat\b/i,              hint: "Meat and alternatives" },
  { pattern: /\bdairy\b|\bmilk\b|\byogurt\b/i, hint: "Dairy and eggs" },
  { pattern: /\brice\b|\bnoodle\b|\bpasta\b/i,  hint: "Grains and staples" },
  { pattern: /\bdessert\b|\bsweet\b/i, hint: "Desserts" },
  { pattern: /\bnut\b|\blegume\b/i,    hint: "Nuts and legumes" },
];

// Detect query type
export function detectQueryType(query: string): QueryType {
  const q = query.trim();
  if (q.length < 3) return "simple";

  const hasNutritionKeyword = /\b(low|high|under|less|more|rich|free|keto|light|heavy|protein|sodium|sugar|fat|calorie|kcal|fibre|fiber|carb|cholesterol|vitamin|mineral)\b/i.test(q);
  const hasNaturalLanguage = /\b(something|want|need|looking for|after|without|not too|good for|healthy|diet|workout|dinner|lunch|breakfast|snack|quick|easy|spicy|mild)\b/i.test(q);
  const wordCount = q.split(/\s+/).length;

  if (hasNaturalLanguage && wordCount > 4) return "natural";
  if (hasNutritionKeyword) return wordCount > 3 ? "mixed" : "nutrition";
  return "simple";
}

// Parse nutrition filters from query
export function parseNutritionFilters(query: string): NutritionFilter[] {
  const filters: NutritionFilter[] = [];
  const seen = new Set<string>();

  // Apply rule patterns
  for (const rule of NUTRITION_RULES) {
    if (rule.pattern.test(query) && !seen.has(rule.nutrient)) {
      filters.push({
        nutrient: rule.nutrient,
        operator: rule.operator,
        value: rule.value!,
      });
      seen.add(rule.nutrient);
    }
  }

  // Apply numeric patterns
  for (const np of NUMERIC_PATTERNS) {
    const match = query.match(np.pattern);
    if (match) {
      const direction = match[1].toLowerCase();
      const value = parseFloat(match[2]);
      const unitOrNutrient = (match[4] || match[3] || "").toLowerCase();
      const nutrient = np.nutrientMap[unitOrNutrient] || np.nutrientMap[match[3]?.toLowerCase()];
      if (nutrient && !seen.has(nutrient)) {
        const isMax = /under|less|below|max|at most|</.test(direction);
        filters.push({ nutrient, operator: isMax ? "max" : "min", value });
        seen.add(nutrient);
      }
    }
  }

  return filters;
}

// Extract category hints from query
function parseCategoryHints(query: string): string[] {
  return CATEGORY_HINTS
    .filter(ch => ch.pattern.test(query))
    .map(ch => ch.hint);
}

// Strip nutrition keywords to get clean food name keywords
function extractKeywords(query: string): string[] {
  const stripped = query
    .replace(/\b(low|high|under|less than|more than|above|below|over|max|min|at most|at least|rich in|free|no |without )\b/gi, " ")
    .replace(/\b\d+(?:\.\d+)?\s*(kcal|cal|calories?|g|mg|μg)\b/gi, " ")
    .replace(/\b(sodium|protein|fat|sugar|carb|carbs|fibre|fiber|cholesterol|calorie|keto|light|heavy)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.split(/\s+/).filter(w => w.length > 1);
}

// Full query parser
export function parseQuery(query: string): ParsedQuery {
  const type = detectQueryType(query);
  const filters = parseNutritionFilters(query);
  const categoryHints = parseCategoryHints(query);
  const keywords = extractKeywords(query);
  const confidence = filters.length > 0 ? 0.9 : type === "simple" ? 1.0 : 0.4;

  return { type, keywords, filters, categoryHints, confidence, rawQuery: query };
}

// ── Layer 3: LLM Fallback ────────────────────────────────────

const LLM_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "";
const LLM_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY || "";

export async function parseLLMQuery(query: string): Promise<ParsedQuery> {
  const base = parseQuery(query);

  if (!LLM_API_URL || !LLM_API_KEY) return base;

  try {
    const systemPrompt = `You are a food nutrition search assistant for Singapore and Malaysia foods.
Parse the user's natural language food query into structured search parameters.
Available food groups: Grains and staples, Beverages, Meat and alternatives, Snacks, Vegetables, Fish and seafood, Poultry, Mixed, Nuts and legumes, Dairy and eggs, Fruit, Desserts, Oils seasonings and condiments, Miscellaneous, Sugar and confectionery.
Available nutrient keys: energy (kcal), protein (g), fat (g), saturatedFat (g), transFat (g), carbohydrate (g), sugar (g), addedSugar (g), dietaryFibre (g), sodium (mg), potassium (mg), calcium (mg), iron (mg), cholesterol (mg).

Respond ONLY with valid JSON in this exact format:
{
  "keywords": ["word1", "word2"],
  "filters": [{"nutrient": "sodium", "operator": "max", "value": 200}],
  "categoryHints": ["Vegetables"],
  "interpretation": "one sentence describing what you understood"
}`;

    const res = await fetch(`${LLM_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return base;
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return base;

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      ...base,
      keywords: parsed.keywords ?? base.keywords,
      filters: [...base.filters, ...(parsed.filters ?? [])].filter(
        (f, i, arr) => arr.findIndex(x => x.nutrient === f.nutrient) === i
      ),
      categoryHints: [...base.categoryHints, ...(parsed.categoryHints ?? [])],
      confidence: 0.95,
      llmInterpretation: parsed.interpretation,
    };
  } catch {
    return base;
  }
}

// ── Layer 1: Fuse.js Setup ───────────────────────────────────

let _fuse: Fuse<FoodSearchResult> | null = null;

export function buildFuseIndex(items: FoodSearchResult[]): void {
  _fuse = new Fuse(items, {
    keys: [
      { name: "name",        weight: 0.6 },
      { name: "description", weight: 0.2 },
      { name: "l1Category",  weight: 0.1 },
      { name: "l2Category",  weight: 0.1 },
    ],
    threshold: 0.4,        // 0 = exact, 1 = match anything
    distance: 100,
    minMatchCharLength: 2,
    includeScore: true,
    useExtendedSearch: false,
    ignoreLocation: true,
  });
}

export function fuseSearch(query: string, limit = 200): Array<{ item: FoodSearchResult; score: number }> {
  if (!_fuse) return [];
  if (!query.trim()) return [];
  const results = _fuse.search(query, { limit });
  return results.map(r => ({
    item: r.item,
    score: 1 - (r.score ?? 0.5),  // Fuse score is 0=perfect, invert to 1=perfect
  }));
}

// ── Layer 2: Nutrition Filter Application ───────────────────

// The index only has macro summaries; full nutrient data is in the detail cache
// We use the index's energy/protein/fat/carbs/sodium fields for filtering
interface IndexedFood extends FoodSearchResult {
  energy?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;
  sodium?: number;
}

export function applyNutritionFilters(
  items: IndexedFood[],
  filters: NutritionFilter[]
): { item: IndexedFood; nutritionScore: number; matchedFilters: string[] }[] {
  if (filters.length === 0) {
    return items.map(item => ({ item, nutritionScore: 0, matchedFilters: [] }));
  }

  return items.map(item => {
    let matchCount = 0;
    const matchedFilters: string[] = [];

    for (const filter of filters) {
      const value = (item as unknown as Record<string, unknown>)[filter.nutrient] as number | undefined;
      if (value === undefined || value === null) continue;

      const passes =
        filter.operator === "max" ? value <= filter.value :
        filter.operator === "min" ? value >= filter.value :
        Math.abs(value - filter.value) < filter.value * 0.1;

      if (passes) {
        matchCount++;
        matchedFilters.push(filter.nutrient);
      }
    }

    const nutritionScore = filters.length > 0 ? matchCount / filters.length : 0;
    return { item, nutritionScore, matchedFilters };
  });
}

// ── Layer 4: Composite Ranking ───────────────────────────────

const WEIGHTS = {
  fuse:      0.5,
  nutrition: 0.3,
  category:  0.2,
};

export function rankResults(
  fuseResults: Array<{ item: FoodSearchResult; score: number }>,
  nutritionResults: Array<{ item: IndexedFood; nutritionScore: number; matchedFilters: string[] }>,
  parsedQuery: ParsedQuery,
  allItems: IndexedFood[],
  page = 1,
  pageSize = 25
): { results: SearchResult[]; total: number } {
  const nutritionMap = new Map(nutritionResults.map(r => [r.item.crId, r]));
  const fuseMap = new Map(fuseResults.map(r => [r.item.crId, r]));

  // Determine which items to rank
  let candidates: IndexedFood[];
  if (fuseResults.length > 0 && parsedQuery.keywords.length > 0) {
    // Use Fuse results as primary candidates
    candidates = fuseResults.map(r => r.item as IndexedFood);
  } else if (parsedQuery.filters.length > 0) {
    // No keywords — filter all items by nutrition
    candidates = allItems;
  } else {
    candidates = allItems;
  }

  // Apply nutrition filters to candidates
  const withNutrition = applyNutritionFilters(candidates, parsedQuery.filters);

  // Score each candidate
  const scored: SearchResult[] = withNutrition.map(({ item, nutritionScore, matchedFilters }) => {
    const fuseEntry = fuseMap.get(item.crId);
    const fuseScore = fuseEntry?.score ?? (parsedQuery.keywords.length === 0 ? 0.5 : 0);

    // Category bonus
    const categoryScore = parsedQuery.categoryHints.some(h =>
      item.l1Category?.toLowerCase().includes(h.toLowerCase())
    ) ? 1 : 0;

    const finalScore =
      (WEIGHTS.fuse * fuseScore) +
      (WEIGHTS.nutrition * nutritionScore) +
      (WEIGHTS.category * categoryScore);

    return {
      ...item,
      score: finalScore,
      fuseScore,
      nutritionScore,
      matchedFilters,
      queryType: parsedQuery.type,
    };
  });

  // Filter: if nutrition filters exist, require at least partial match
  const filtered = parsedQuery.filters.length > 0
    ? scored.filter(r => r.matchedFilters.length > 0 || r.fuseScore > 0.6)
    : scored;

  // Sort: by score descending, then alphabetically
  filtered.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.01) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const results = filtered.slice(start, start + pageSize);

  return { results, total };
}

// ── Main Search Entry Point ──────────────────────────────────

export type SearchEngineResult = {
  items: SearchResult[];
  total: number;
  parsedQuery: ParsedQuery;
  source: "engine";
  usedLLM: boolean;
};

export async function intelligentSearch(
  query: string,
  allItems: FoodSearchResult[],
  page = 1,
  pageSize = 25
): Promise<SearchEngineResult> {
  // Ensure Fuse index is built
  if (!_fuse && allItems.length > 0) {
    buildFuseIndex(allItems);
  }

  const q = query.trim();

  // Empty query: return all items paginated
  if (!q) {
    const start = (page - 1) * pageSize;
    return {
      items: allItems.slice(start, start + pageSize).map(item => ({
        ...item,
        score: 1,
        fuseScore: 1,
        nutritionScore: 0,
        matchedFilters: [],
        queryType: "simple" as QueryType,
      })),
      total: allItems.length,
      parsedQuery: { type: "simple", keywords: [], filters: [], categoryHints: [], confidence: 1, rawQuery: "" },
      source: "engine",
      usedLLM: false,
    };
  }

  // Detect query type
  const queryType = detectQueryType(q);

  // Decide whether to use LLM
  const shouldUseLLM = queryType === "natural" && LLM_API_URL && LLM_API_KEY;

  // Parse query (with or without LLM)
  const parsedQuery = shouldUseLLM
    ? await parseLLMQuery(q)
    : parseQuery(q);

  // Layer 1: Fuse search on keywords
  const fuseQuery = parsedQuery.keywords.join(" ") || q;
  const fuseResults = parsedQuery.type !== "nutrition"
    ? fuseSearch(fuseQuery, 500)
    : [];

  // Layer 4: Rank and paginate
  const { results, total } = rankResults(
    fuseResults,
    [],  // nutrition applied inside rankResults
    parsedQuery,
    allItems as IndexedFood[],
    page,
    pageSize
  );

  return {
    items: results,
    total,
    parsedQuery,
    source: "engine",
    usedLLM: shouldUseLLM,
  };
}
