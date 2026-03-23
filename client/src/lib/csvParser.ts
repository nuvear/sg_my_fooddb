// ============================================================
// FoodDB — CSV Parser for HPB SG FoodID CSV format
// Each CSV file = one food item with metadata + 41 nutrients
// ============================================================

import type { FoodItem, NutrientData } from "./nutrients";

// Maps CSV row label → internal nutrient key
const LABEL_TO_KEY: Record<string, string> = {
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
  "Vitamin A (\u03bcg)": "vitA",
  "Retinol (\u03bcg)": "retinol",
  "B-carotene (\u03bcg)": "bCarotene",
  "Thiamine (Vitamin B1) (mg)": "thiamine",
  "Riboflavin (Vitamin B2) (mg)": "riboflavin",
  "Vitamin B6 (mg)": "vitB6",
  "Folic Acid (Vitamin B9) (\u03bcg)": "folicAcid",
  "Vitamin B12 (\u03bcg)": "vitB12",
  "Vitamin C (mg)": "vitC",
  "Vitamin D (IU)": "vitD",
  "Vitamin E (IU)": "vitE",
  "Vitamin K (\u03bcg)": "vitK",
  "Phosphorus (mg)": "phosphorus",
  "Selenium (\u03bcg)": "selenium",
  "Zinc (mg)": "zinc",
};

/** Parse a raw CSV value: "-" or empty → null, "Trace" → 0.001, number → number */
function parseVal(s: string): number | null {
  const t = s.trim();
  if (!t || t === "-" || t === "—") return null;
  if (t.toLowerCase() === "trace") return 0.001;
  const n = parseFloat(t.replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? null : n;
}

/**
 * Parse a single CSV line respecting quoted fields.
 * Handles: "field with, comma", unquoted field
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/**
 * Parse a single HPB food CSV file content into a FoodItem.
 * Returns null if the file cannot be parsed.
 */
export function parseFoodCSV(csvText: string, filename = "unknown.csv"): FoodItem | null {
  try {
    // Strip BOM if present
    const text = csvText.replace(/^\uFEFF/, "");
    const rawLines = text.split(/\r?\n/);
    const lines = rawLines.map(l => parseCsvLine(l));

    const getMetaValue = (label: string): string | undefined => {
      const row = lines.find(r => r[0]?.trim().toLowerCase() === label.toLowerCase());
      return row?.[1]?.trim() || undefined;
    };

    const name = getMetaValue("Food Name");
    if (!name) return null;

    const description = getMetaValue("Description");
    const foodGroup = getMetaValue("Food Group");
    const foodSubgroup = getMetaValue("Food Subgroup");
    const ediblePortionStr = getMetaValue("Edible Portion");
    const defaultServingSize = getMetaValue("Default Serving Size");
    const alternativeServingSizes = getMetaValue("Alternative Serving Size(s)");
    const sourceOfData = getMetaValue("Source of Data");
    const yearOfData = getMetaValue("Last Updated");

    // Parse edible portion percentage
    let ediblePortion: number | undefined;
    if (ediblePortionStr) {
      const ep = parseFloat(ediblePortionStr.replace("%", "").trim());
      if (!isNaN(ep)) ediblePortion = ep;
    }

    // Find the header row that defines columns (e.g. ",Per 100ml,Per Serving (325ml)")
    const headerRowIdx = lines.findIndex(r =>
      r.some(cell => cell.trim().toLowerCase().startsWith("per 100"))
    );

    // Parse serving weight from header (e.g. "Per Serving (325ml)" → 325)
    let defaultWeight_g: number | undefined;
    if (headerRowIdx >= 0) {
      const headerRow = lines[headerRowIdx];
      const servingHeader = headerRow.find(c => /per serving/i.test(c));
      if (servingHeader) {
        const match = servingHeader.match(/([\d.]+)/);
        if (match) defaultWeight_g = parseFloat(match[1]);
      }
    }

    // Parse nutrient rows (everything after the header row)
    const per100g: NutrientData = {};
    const perServing: NutrientData = {};

    if (headerRowIdx >= 0) {
      for (let i = headerRowIdx + 1; i < lines.length; i++) {
        const row = lines[i];
        const label = row[0]?.trim();
        if (!label) continue;

        const key = LABEL_TO_KEY[label];
        if (!key) continue; // skip footnotes and unknown rows

        per100g[key] = parseVal(row[1] ?? "");
        perServing[key] = parseVal(row[2] ?? "");
      }
    }

    // Generate a stable crId from the filename (strip date suffix and extension)
    // e.g. "100_Plus_any_flavour_23032026.csv" → "CSV_100_PLUS_ANY_FLAVOUR"
    const baseName = filename.replace(/\.csv$/i, "").replace(/_\d{8}$/, "");
    const crId = `CSV_${baseName.toUpperCase().replace(/[^A-Z0-9]/g, "_").slice(0, 50)}`;

    return {
      crId,
      name,
      description,
      foodGroup,
      foodSubgroup,
      ediblePortion,
      defaultServingSize,
      defaultWeight_g,
      alternativeServingSizes: alternativeServingSizes === "-" ? undefined : alternativeServingSizes,
      sourceOfData,
      yearOfData,
      nutrientsPer100g: per100g,
      nutrientsPerServing: perServing,
      _source: "paste",
      _importedAt: new Date().toISOString(),
    };
  } catch (e) {
    console.error(`CSV parse error in ${filename}:`, e);
    return null;
  }
}

/** Parse result summary */
export interface ParseResult {
  imported: FoodItem[];
  failed: string[];
  skipped: string[];
}
