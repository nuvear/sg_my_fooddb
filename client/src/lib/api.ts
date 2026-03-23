// ============================================================
// FoodDB — SG FoodID API client + LocalStorage DB
// ============================================================

import type { FoodItem, FoodSearchResult, NutrientData } from "./nutrients";

const API_BASE = "https://pphtpc.hpb.gov.sg/bff/v1/food-portal";
const LOCAL_DB_KEY = "fooddb_local_records";
const CACHE_KEY = "fooddb_detail_cache";

// ── SG FoodID Live API ──────────────────────────────────────

export async function searchFoods(
  query: string,
  page = 1,
  productType = "Generic"
): Promise<{ items: FoodSearchResult[]; total: number }> {
  const params = new URLSearchParams({
    pageNumber: String(page),
    productType,
    ...(query ? { searchText: query } : {}),
  });
  const res = await fetch(`${API_BASE}/foods?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data: FoodSearchResult[] = await res.json();
  return {
    items: data,
    total: data[0]?.totalCount ?? data.length,
  };
}

export async function getFoodDetail(crId: string): Promise<FoodItem | null> {
  // Check cache first
  const cache = getDetailCache();
  if (cache[crId]) return cache[crId];

  const res = await fetch(`${API_BASE}/foods/details/${crId}`);
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

  // Cache it
  cache[crId] = food;
  saveDetailCache(cache);
  return food;
}

function getDetailCache(): Record<string, FoodItem> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}");
  } catch { return {}; }
}
function saveDetailCache(cache: Record<string, FoodItem>) {
  try {
    // Keep max 200 entries to avoid storage overflow
    const keys = Object.keys(cache);
    if (keys.length > 200) {
      const toDelete = keys.slice(0, keys.length - 200);
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

    // Extract metadata fields
    const getField = (label: string): string | undefined => {
      const idx = lines.findIndex(l => l.toLowerCase().startsWith(label.toLowerCase()));
      if (idx >= 0 && idx + 1 < lines.length) return lines[idx + 1];
      return undefined;
    };

    // First non-metadata line is the food name
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

    // Generate a crId from the name if not present
    food.crId = `PASTE_${food.name.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase().slice(0, 30)}_${Date.now()}`;

    // Find the nutrient labels section
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

    // Map labels to API keys
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

    // Find where nutrient values start — look for "Per 100" line
    const per100Idx = lines.findIndex(l => l.startsWith("Per 100"));
    if (per100Idx < 0) {
      // Try to find values by looking for the numeric block after the labels
      food.nutrientsPer100g = {};
      food.nutrientsPerServing = {};
      return food as FoodItem;
    }

    // Values come after the "Per 100" line(s) — they alternate per100 / perServing
    // Find the line after "Per <weight>" (second column header)
    const perServingIdx = lines.findIndex((l, i) => i > per100Idx && l.startsWith("Per "));
    const valuesStartIdx = (perServingIdx > 0 ? perServingIdx : per100Idx) + 1;

    // Extract serving weight from "Per 325 ml" style
    const servingLine = perServingIdx > 0 ? lines[perServingIdx] : "";
    const servingMatch = servingLine.match(/Per\s+([\d.]+)/);
    if (servingMatch) food.defaultWeight_g = parseFloat(servingMatch[1]);

    // Values alternate: per100, perServing, per100, perServing, ...
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
