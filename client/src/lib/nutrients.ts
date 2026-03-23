// ============================================================
// FoodDB — Nutrient definitions, categories, and daily values
// Tropical Bauhaus design: data is the hero
// ============================================================

export interface NutrientDef {
  key: string;           // API field key
  label: string;         // Display label
  unit: string;          // Unit string
  category: NutrientCategory;
  dv?: number;           // Daily Value (for % DV calculation)
  warnHigh?: number;     // Threshold above which to show amber/red pill
  warnVeryHigh?: number;
}

export type NutrientCategory =
  | "energy"
  | "macros"
  | "fats"
  | "carbs"
  | "minerals"
  | "vitamins"
  | "other";

export const NUTRIENT_CATEGORIES: Record<NutrientCategory, { label: string; color: string }> = {
  energy:   { label: "Energy",           color: "jade" },
  macros:   { label: "Macronutrients",   color: "jade" },
  fats:     { label: "Fats",             color: "amber" },
  carbs:    { label: "Carbohydrates",    color: "amber" },
  minerals: { label: "Minerals",         color: "jade" },
  vitamins: { label: "Vitamins",         color: "jade" },
  other:    { label: "Other",            color: "amber" },
};

export const NUTRIENTS: NutrientDef[] = [
  // Energy
  { key: "energy",           label: "Energy",                    unit: "kcal", category: "energy",   dv: 2000 },
  // Macros
  { key: "protein",          label: "Protein",                   unit: "g",    category: "macros",   dv: 50 },
  { key: "carbohydrate",     label: "Carbohydrate",              unit: "g",    category: "macros",   dv: 275 },
  { key: "dietaryFibre",     label: "Dietary Fibre",             unit: "g",    category: "macros",   dv: 28 },
  { key: "water",            label: "Water",                     unit: "g",    category: "macros" },
  { key: "nitrogen",         label: "Nitrogen",                  unit: "g",    category: "macros" },
  // Fats
  { key: "fat",              label: "Total Fat",                 unit: "g",    category: "fats",     dv: 78,  warnHigh: 20, warnVeryHigh: 30 },
  { key: "saturatedFat",     label: "Saturated Fat",             unit: "g",    category: "fats",     dv: 20,  warnHigh: 5,  warnVeryHigh: 10 },
  { key: "transFat",         label: "Trans Fat",                 unit: "g",    category: "fats",     dv: 2,   warnHigh: 0.5, warnVeryHigh: 1 },
  { key: "polyunsaturatedFat", label: "Polyunsaturated Fat",     unit: "g",    category: "fats" },
  { key: "monounsaturatedFat", label: "Monounsaturated Fat",     unit: "g",    category: "fats" },
  { key: "omega3EPADHA",     label: "Omega-3 (EPA+DHA)",         unit: "mg",   category: "fats" },
  { key: "cholesterol",      label: "Cholesterol",               unit: "mg",   category: "fats",     dv: 300, warnHigh: 60, warnVeryHigh: 100 },
  // Carbs
  { key: "sugar",            label: "Sugar",                     unit: "g",    category: "carbs",    dv: 50,  warnHigh: 12, warnVeryHigh: 20 },
  { key: "addedSugar",       label: "Added Sugar",               unit: "g",    category: "carbs",    dv: 50,  warnHigh: 10, warnVeryHigh: 15 },
  { key: "glucose",          label: "Glucose",                   unit: "g",    category: "carbs" },
  { key: "fructose",         label: "Fructose",                  unit: "g",    category: "carbs" },
  { key: "maltose",          label: "Maltose",                   unit: "g",    category: "carbs" },
  { key: "galactose",        label: "Galactose",                 unit: "g",    category: "carbs" },
  { key: "sucrose",          label: "Sucrose",                   unit: "g",    category: "carbs" },
  { key: "lactose",          label: "Lactose",                   unit: "g",    category: "carbs" },
  { key: "starch",           label: "Starch",                    unit: "g",    category: "carbs" },
  // Minerals
  { key: "sodium",           label: "Sodium",                    unit: "mg",   category: "minerals", dv: 2300, warnHigh: 500, warnVeryHigh: 800 },
  { key: "potassium",        label: "Potassium",                 unit: "mg",   category: "minerals", dv: 4700 },
  { key: "calcium",          label: "Calcium",                   unit: "mg",   category: "minerals", dv: 1300 },
  { key: "iron",             label: "Iron",                      unit: "mg",   category: "minerals", dv: 18 },
  { key: "phosphorus",       label: "Phosphorus",                unit: "mg",   category: "minerals", dv: 1250 },
  { key: "selenium",         label: "Selenium",                  unit: "μg",   category: "minerals", dv: 55 },
  { key: "zinc",             label: "Zinc",                      unit: "mg",   category: "minerals", dv: 11 },
  // Vitamins
  { key: "vitA",             label: "Vitamin A",                 unit: "μg",   category: "vitamins", dv: 900 },
  { key: "retinol",          label: "Retinol",                   unit: "μg",   category: "vitamins" },
  { key: "bCarotene",        label: "B-carotene",                unit: "μg",   category: "vitamins" },
  { key: "thiamine",         label: "Thiamine (Vitamin B1)",     unit: "mg",   category: "vitamins", dv: 1.2 },
  { key: "riboflavin",       label: "Riboflavin (Vitamin B2)",   unit: "mg",   category: "vitamins", dv: 1.3 },
  { key: "vitB6",            label: "Vitamin B6",                unit: "mg",   category: "vitamins", dv: 1.7 },
  { key: "folicAcid",        label: "Folic Acid (Vitamin B9)",   unit: "μg",   category: "vitamins", dv: 400 },
  { key: "vitB12",           label: "Vitamin B12",               unit: "μg",   category: "vitamins", dv: 2.4 },
  { key: "vitC",             label: "Vitamin C",                 unit: "mg",   category: "vitamins", dv: 90 },
  { key: "vitD",             label: "Vitamin D",                 unit: "IU",   category: "vitamins", dv: 800 },
  { key: "vitE",             label: "Vitamin E",                 unit: "IU",   category: "vitamins", dv: 22 },
  { key: "vitK",             label: "Vitamin K",                 unit: "μg",   category: "vitamins", dv: 120 },
];

export const NUTRIENT_MAP = new Map(NUTRIENTS.map(n => [n.key, n]));

export type NutrientData = Record<string, number | null>;

export interface FoodItem {
  crId: string;
  id?: string;
  name: string;
  description?: string;
  foodGroup?: string;
  foodSubgroup?: string;
  category?: string;
  productType?: string;
  ediblePortion?: number;
  defaultServingSize?: string;
  defaultWeight_g?: number;
  alternativeServingSizes?: string;
  sourceOfData?: string;
  yearOfData?: number | string;
  nutrientsPer100g: NutrientData;
  nutrientsPerServing?: NutrientData;
  // For paste-imported records
  _source?: "api" | "paste" | "manual";
  _importedAt?: string;
}

export interface FoodSearchResult {
  id: string;
  crId: string;
  name: string;
  description?: string;
  l1Category?: string;
  l2Category?: string;
  type?: string;
  totalCount?: number;
}

/** Scale nutrient values from per-100g to a custom weight */
export function scaleNutrients(nutrients: NutrientData, weightG: number): NutrientData {
  const factor = weightG / 100;
  const result: NutrientData = {};
  for (const [key, val] of Object.entries(nutrients)) {
    result[key] = val !== null && val !== undefined ? parseFloat((val * factor).toFixed(3)) : null;
  }
  return result;
}

/** Format a nutrient value for display */
export function formatNutrientValue(value: number | null | undefined, unit: string): string {
  if (value === null || value === undefined) return "—";
  if (value === 0) return `0 ${unit}`;
  if (value < 0.01) return `<0.01 ${unit}`;
  if (value < 1) return `${value.toFixed(2)} ${unit}`;
  if (value < 10) return `${value.toFixed(1)} ${unit}`;
  return `${Math.round(value)} ${unit}`;
}

/** Get severity level for a nutrient value (for coloring) */
export function getNutrientSeverity(def: NutrientDef, value: number | null, per100g = true): "normal" | "warn" | "high" {
  if (value === null || value === undefined || !def.warnHigh) return "normal";
  const v = per100g ? value : value;
  if (def.warnVeryHigh && v >= def.warnVeryHigh) return "high";
  if (v >= def.warnHigh) return "warn";
  return "normal";
}

/** Get % of Daily Value */
export function getDVPercent(def: NutrientDef, value: number | null): number | null {
  if (!def.dv || value === null || value === undefined) return null;
  return Math.round((value / def.dv) * 100);
}
