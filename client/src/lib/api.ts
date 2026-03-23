// ============================================================
// FoodDB — API client
// Primary: Bundled CDN data (2,557 foods, offline-capable)
// Secondary: HPB SG FoodID live API via CORS proxy
// ============================================================

import type { FoodItem, FoodSearchResult, NutrientData } from "./nutrients";
import { intelligentSearch, buildFuseIndex, type SearchEngineResult } from "./searchEngine";

// CDN-hosted bundled data (scraped from HPB SG FoodID)
const CDN_INDEX_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/foods_index_full_2e881a76.json";
const CDN_DATA_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/sgfoodid_generic_full_a52e9b3f.json";

// CORS proxy for live HPB API queries
const CORS_PROXY = "https://corsproxy.io/?url=";
const API_BASE = "https://pphtpc.hpb.gov.sg/bff/v1/food-portal";

const LOCAL_DB_KEY = "fooddb_local_records";
const CACHE_KEY = "fooddb_detail_cache";

// ── Bundled data cache ──────────────────────────────────────

let _indexCache: FoodSearchResult[] | null = null;
let _dataCache: Record<string, FoodItem> | null = null;

async function getIndex(): Promise<FoodSearchResult[]> {
  if (_indexCache) return _indexCache;
  try {
    const res = await fetch(CDN_INDEX_URL);
    if (!res.ok) throw new Error("CDN index fetch failed");
    const raw: Array<{
      crId: string; id?: string; name: string; description?: string;
      foodGroup?: string; foodSubgroup?: string; productType?: string;
      defaultServingSize?: string;
      energy?: number | null; protein?: number | null; fat?: number | null;
      saturatedFat?: number | null; carbohydrate?: number | null;
      sugar?: number | null; addedSugar?: number | null;
      dietaryFibre?: number | null; sodium?: number | null;
      potassium?: number | null; calcium?: number | null;
      iron?: number | null; cholesterol?: number | null;
    }> = await res.json();
    _indexCache = raw.map(r => ({
      id: r.crId,
      crId: r.crId,
      name: r.name,
      description: r.description,
      l1Category: r.foodGroup,
      l2Category: r.foodSubgroup,
      type: r.productType,
      // Extended nutrient summary fields for search filtering and card display
      energy: r.energy,
      protein: r.protein,
      fat: r.fat,
      saturatedFat: r.saturatedFat,
      carbohydrate: r.carbohydrate,
      sugar: r.sugar,
      addedSugar: r.addedSugar,
      dietaryFibre: r.dietaryFibre,
      sodium: r.sodium,
      potassium: r.potassium,
      calcium: r.calcium,
      iron: r.iron,
      cholesterol: r.cholesterol,
    }));
    return _indexCache;
  } catch {
    return [];
  }
}

async function getFullData(): Promise<Record<string, FoodItem>> {
  if (_dataCache) return _dataCache;
  try {
    const res = await fetch(CDN_DATA_URL);
    if (!res.ok) throw new Error("CDN data fetch failed");
    const raw = await res.json();
    // Handle both array format (new full dataset) and object format (legacy)
    if (Array.isArray(raw)) {
      const map: Record<string, FoodItem> = {};
      for (const food of raw as FoodItem[]) {
        if (food.crId) map[food.crId] = food;
      }
      _dataCache = map;
    } else {
      _dataCache = raw as Record<string, FoodItem>;
    }
    return _dataCache!;
  } catch {
    return {};
  }
}

// ── Search ──────────────────────────────────────────────────

export type SmartSearchResult = SearchEngineResult & { source: "engine" | "local" | "live" };

// Re-export for use in UI components
export type { SearchEngineResult, ParsedQuery, SearchResult, QueryType } from "./searchEngine";

export async function searchFoods(
  query: string,
  page = 1,
  _productType = "Generic"
): Promise<SmartSearchResult> {
  // Load the index (cached after first fetch)
  const index = await getIndex();

  // Build Fuse index if not already built
  if (index.length > 0) {
    buildFuseIndex(index);
  }

  // Run intelligent search engine
  const result = await intelligentSearch(query, index, page, 25);
  return { ...result, source: "engine" };
}

// ── Food Detail ─────────────────────────────────────────────

export async function getFoodDetail(crId: string): Promise<FoodItem | null> {
  // Check detail cache first
  const cache = getDetailCache();
  if (cache[crId]) return cache[crId];

  // 1. Check bundled full data
  const fullData = await getFullData();
  if (fullData[crId]) {
    const food = fullData[crId];
    cache[crId] = food;
    saveDetailCache(cache);
    return food;
  }

  // 2. Check local DB
  const local = getLocalRecords().find(r => r.crId === crId);
  if (local) return local;

  // 3. Live API via CORS proxy
  try {
    const url = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/foods/details/${crId}`)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const raw = await res.json();

    const food: FoodItem = {
      crId: raw.crId,
      name: raw.name,
      description: raw.description,
      foodGroup: raw.l1Category,
      foodSubgroup: raw.l2Category,
      category: raw.category,
      ediblePortion: raw.ediblePortion,
      defaultServingSize: raw.defaultPortion,
      defaultWeight_g: raw.defaultWeight,
      alternativeServingSizes: raw.alternativePortions,
      sourceOfData: raw.sourceOfData,
      yearOfData: raw.yearOfData,
      nutrientsPer100g: raw.baseFoodNutrients ?? {},
      nutrientsPerServing: raw.calculatedFoodNutrients ?? {},
      _source: "api",
    };

    cache[crId] = food;
    saveDetailCache(cache);
    return food;
  } catch {
    return null;
  }
}

// ── Detail cache ─────────────────────────────────────────────

function getDetailCache(): Record<string, FoodItem> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}");
  } catch { return {}; }
}
function saveDetailCache(cache: Record<string, FoodItem>) {
  try {
    const keys = Object.keys(cache);
    if (keys.length > 300) {
      const toDelete = keys.slice(0, keys.length - 300);
      toDelete.forEach(k => delete cache[k]);
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* storage full */ }
}

// ── Local DB (paste-imported records) ──────────────────────

export function getLocalRecords(): FoodItem[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_DB_KEY) ?? "[]");
  } catch { return []; }
}

export function saveLocalRecord(food: FoodItem): void {
  const records = getLocalRecords();
  const idx = records.findIndex(r => r.crId === food.crId);
  if (idx >= 0) {
    records[idx] = { ...food, _importedAt: new Date().toISOString() };
  } else {
    records.push({ ...food, _source: "paste", _importedAt: new Date().toISOString() });
  }
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(records));
}

export function deleteLocalRecord(crId: string): void {
  const records = getLocalRecords().filter(r => r.crId !== crId);
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(records));
}

export function exportLocalDB(): string {
  return JSON.stringify(getLocalRecords(), null, 2);
}

export function importLocalDB(jsonStr: string): number {
  const records: FoodItem[] = JSON.parse(jsonStr);
  const existing = getLocalRecords();
  const map = new Map(existing.map(r => [r.crId, r]));
  for (const r of records) map.set(r.crId, r);
  const merged = Array.from(map.values());
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(merged));
  return records.length;
}

// ── Paste Parser ────────────────────────────────────────────

/**
 * Parses the HPB SG FoodID copy-paste format into a FoodItem.
 *
 * Expected format (as copied from the HPB website):
 * <Food Name>
 * <Description>
 * Food Group:
 * <Group>
 * Food Subgroup:
 * <Subgroup>
 * Edible Portion:
 * <X%>
 * Default Serving Size:
 * <size>
 * ...
 * [nutrient labels list]
 * Per 100ml / Per 100g
 * Per <weight> ml/g
 * <value1>
 * <value2>
 * ...
 */
export function parsePasteEntry(text: string): FoodItem | null {
  try {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 5) return null;

    const food: Partial<FoodItem> = { _source: "paste" };

    const getField = (label: string): string | undefined => {
      const idx = lines.findIndex(l => l.toLowerCase().startsWith(label.toLowerCase()));
      if (idx >= 0 && idx + 1 < lines.length) return lines[idx + 1];
      return undefined;
    };

    food.name = lines[0];
    food.description = lines[1];
    food.foodGroup = getField("Food Group:");
    food.foodSubgroup = getField("Food Subgroup:");
    food.sourceOfData = getField("Source of Data:");
    food.defaultServingSize = getField("Default Serving Size:");
    food.alternativeServingSizes = getField("Alternative Serving Size");

    const edibleStr = getField("Edible Portion:");
    if (edibleStr) food.ediblePortion = parseFloat(edibleStr);

    const yearStr = getField("Last Updated:");
    if (yearStr) food.yearOfData = yearStr;

    food.crId = `PASTE_${food.name!.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase().slice(0, 30)}_${Date.now()}`;

    const nutrientLabels = [
      "Energy (kcal)", "Protein (g)", "Total Fat (g)", "Saturated Fat (g)",
      "Trans Fat (g)", "Carbohydrate (g)", "Sugar (g)", "Added Sugar (g)",
      "Dietary Fibre (g)", "Sodium (mg)", "Potassium (mg)", "Calcium (mg)",
      "Iron (mg)", "Water (g)", "Nitrogen (g)", "Polyunsaturated Fat (g)",
      "Monounsaturated Fat (g)", "Omega-3 (EPA+DHA) (mg)", "Cholesterol (mg)",
      "Glucose (g)", "Fructose (g)", "Maltose (g)", "Galactose (g)",
      "Sucrose (g)", "Lactose (g)", "Starch (g)", "Vitamin A (μg)",
      "Retinol (μg)", "B-carotene (μg)", "Thiamine (Vitamin B1) (mg)",
      "Riboflavin (Vitamin B2) (mg)", "Vitamin B6 (mg)", "Folic Acid (Vitamin B9) (μg)",
      "Vitamin B12 (μg)", "Vitamin C (mg)", "Vitamin D (IU)", "Vitamin E (IU)",
      "Vitamin K (μg)", "Phosphorus (mg)", "Selenium (μg)", "Zinc (mg)"
    ];

    const labelToKey: Record<string, string> = {
      "Energy (kcal)": "energy",
      "Protein (g)": "protein",
      "Total Fat (g)": "fat",
      "Saturated Fat (g)": "saturatedFat",
      "Trans Fat (g)": "transFat",
      "Carbohydrate (g)": "carbohydrate",
      "Sugar (g)": "sugar",
      "Added Sugar (g)": "addedSugar",
      "Dietary Fibre (g)": "dietaryFibre",
      "Sodium (mg)": "sodium",
      "Potassium (mg)": "potassium",
      "Calcium (mg)": "calcium",
      "Iron (mg)": "iron",
      "Water (g)": "water",
      "Nitrogen (g)": "nitrogen",
      "Polyunsaturated Fat (g)": "polyunsaturatedFat",
      "Monounsaturated Fat (g)": "monounsaturatedFat",
      "Omega-3 (EPA+DHA) (mg)": "omega3EPADHA",
      "Cholesterol (mg)": "cholesterol",
      "Glucose (g)": "glucose",
      "Fructose (g)": "fructose",
      "Maltose (g)": "maltose",
      "Galactose (g)": "galactose",
      "Sucrose (g)": "sucrose",
      "Lactose (g)": "lactose",
      "Starch (g)": "starch",
      "Vitamin A (μg)": "vitA",
      "Retinol (μg)": "retinol",
      "B-carotene (μg)": "bCarotene",
      "Thiamine (Vitamin B1) (mg)": "thiamine",
      "Riboflavin (Vitamin B2) (mg)": "riboflavin",
      "Vitamin B6 (mg)": "vitB6",
      "Folic Acid (Vitamin B9) (μg)": "folicAcid",
      "Vitamin B12 (μg)": "vitB12",
      "Vitamin C (mg)": "vitC",
      "Vitamin D (IU)": "vitD",
      "Vitamin E (IU)": "vitE",
      "Vitamin K (μg)": "vitK",
      "Phosphorus (mg)": "phosphorus",
      "Selenium (μg)": "selenium",
      "Zinc (mg)": "zinc",
    };

    const per100Idx = lines.findIndex(l => l.startsWith("Per 100"));
    if (per100Idx < 0) {
      food.nutrientsPer100g = {};
      food.nutrientsPerServing = {};
      return food as FoodItem;
    }

    const perServingIdx = lines.findIndex((l, i) => i > per100Idx && l.startsWith("Per "));
    const valuesStartIdx = (perServingIdx > 0 ? perServingIdx : per100Idx) + 1;

    const servingLine = perServingIdx > 0 ? lines[perServingIdx] : "";
    const servingMatch = servingLine.match(/Per\s+([\d.]+)/);
    if (servingMatch) food.defaultWeight_g = parseFloat(servingMatch[1]);

    const per100Values: NutrientData = {};
    const perServingValues: NutrientData = {};

    let valueIdx = valuesStartIdx;
    for (let i = 0; i < nutrientLabels.length; i++) {
      const key = labelToKey[nutrientLabels[i]];
      if (!key) { valueIdx += 2; continue; }

      const v1 = lines[valueIdx];
      const v2 = lines[valueIdx + 1];
      valueIdx += 2;

      const parseVal = (s: string): number | null => {
        if (!s || s === "-" || s === "—" || s.toLowerCase() === "trace") return null;
        const n = parseFloat(s.replace(/[^0-9.-]/g, ""));
        return isNaN(n) ? null : n;
      };

      per100Values[key] = parseVal(v1);
      perServingValues[key] = parseVal(v2);
    }

    food.nutrientsPer100g = per100Values;
    food.nutrientsPerServing = perServingValues;

    return food as FoodItem;
  } catch (e) {
    console.error("Paste parse error:", e);
    return null;
  }
}
