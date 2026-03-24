// FoodDB ImportPaste — paste HPB SG FoodID entries to import into local DB
// Tropical Bauhaus: monospace paste area, structured preview, jade confirm button

import { useState } from "react";
import { ClipboardPaste, CheckCircle, AlertCircle, Database, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { parsePasteEntry, saveLocalRecord } from "@/lib/api";
import { NUTRIENTS, formatNutrientValue } from "@/lib/nutrients";
import type { FoodItem } from "@/lib/nutrients";

const EXAMPLE_PASTE = `100 Plus (any flavour)
Carbonated isotonic beverage, available in various flavourings
Food Group:
Beverages
Food Subgroup:
Electrolyte/Energy drinks
Edible Portion:
100%
Default Serving Size:
1 can = 325ml
Alternative Serving Size(s):
1 bottle = 500ml
Source of Data:
NIP
Last Updated:
2025

Energy (kcal)
Protein (g)
Total Fat (g)
Saturated Fat (g)
Trans Fat (g)
Carbohydrate (g)
Sugar (g)
Added Sugar (g)
Dietary Fibre (g)
Sodium (mg)
Potassium (mg)
Calcium (mg)
Iron (mg)
Water (g)
Nitrogen (g)
Polyunsaturated Fat (g)
Monounsaturated Fat (g)
Omega-3 (EPA+DHA) (mg)
Cholesterol (mg)
Glucose (g)
Fructose (g)
Maltose (g)
Galactose (g)
Sucrose (g)
Lactose (g)
Starch (g)
Vitamin A (μg)
Retinol (μg)
B-carotene (μg)
Thiamine (Vitamin B1) (mg)
Riboflavin (Vitamin B2) (mg)
Vitamin B6 (mg)
Folic Acid (Vitamin B9) (μg)
Vitamin B12 (μg)
Vitamin C (mg)
Vitamin D (IU)
Vitamin E (IU)
Vitamin K (μg)
Phosphorus (mg)
Selenium (μg)
Zinc (mg)
 View More Nutrients
Per 100ml
Per
325 
ml
25
81
0
0
0
0
0
0
0
0
6.2
20.15
6.09
19.79
-
-
0
0
42
137
-
-
4
13
0
0
-
-
-
-
0
0
0
0
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
0
0
-
-
-
-
-
-
-
-
-
-
-
-
-
-
0
0
-
-
-
-
-
-
-
-
-
-
-
-`;

export default function ImportPaste() {
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState<FoodItem | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCrId, setEditCrId] = useState("");

  const handleParse = () => {
    setParseError(null);
    setSaved(false);
    const result = parsePasteEntry(pasteText);
    if (!result) {
      setParseError("Could not parse this text. Please make sure it's copied from the HPB SG FoodID website.");
      setParsed(null);
      return;
    }
    setParsed(result);
    setEditName(result.name ?? "");
    setEditCrId(result.crId ?? "");
  };

  const handleSave = () => {
    if (!parsed) return;
    const record: FoodItem = {
      ...parsed,
      name: editName || parsed.name,
      crId: editCrId || parsed.crId,
    };
    saveLocalRecord(record);
    setSaved(true);
    toast.success(`"${record.name}" saved to local database`);
  };

  const handleReset = () => {
    setPasteText("");
    setParsed(null);
    setParseError(null);
    setSaved(false);
    setEditName("");
    setEditCrId("");
  };

  const loadExample = () => {
    setPasteText(EXAMPLE_PASTE);
    setParsed(null);
    setParseError(null);
    setSaved(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="jade-block px-4 md:px-8 py-5">
        <h1 className="text-xl font-extrabold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#F7F9FC" }}>
          Paste & Import
        </h1>
        <p className="text-sm opacity-75" style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Inter, sans-serif" }}>
          Copy a food entry from the HPB SG FoodID website and paste it here to save to your local database
        </p>
      </div>

      <div className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left: Paste input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#2F3A4A" }}>
                Paste HPB Food Entry
              </label>
              <button
                onClick={loadExample}
                className="text-xs underline"
                style={{ color: "#6D5BD0", fontFamily: "Inter, sans-serif" }}
              >
                Load example
              </button>
            </div>

            <Textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              placeholder={`Paste the full food entry from https://pphtpc.hpb.gov.sg/web/sgfoodid/tools/food-search\n\nInclude everything from the food name down to the nutrient values.`}
              className="font-mono text-xs h-80 resize-none border-2"
              style={{
                borderColor: pasteText ? "#6D5BD0" : "#DDE3EE",
                background: "oklch(0.99 0 0)",
                lineHeight: "1.6",
              }}
            />

            <div className="flex gap-2 mt-3">
              <Button
                onClick={handleParse}
                disabled={!pasteText.trim()}
                className="flex-1 gap-1.5 font-semibold"
                style={{
                  background: "#6D5BD0",
                  color: "#F7F9FC",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <ClipboardPaste size={14} /> Parse Entry
              </Button>
              {pasteText && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  size="sm"
                  className="gap-1"
                >
                  <X size={13} /> Clear
                </Button>
              )}
            </div>

            {parseError && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-lg text-sm"
                style={{ background: "oklch(0.94 0.06 25)", color: "oklch(0.45 0.18 25)" }}>
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                {parseError}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 p-3 rounded-lg text-xs space-y-1.5"
              style={{ background: "oklch(0.94 0.015 162)", color: "oklch(0.40 0.08 162)", fontFamily: "Inter, sans-serif" }}>
              <p className="font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>How to copy from HPB:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to <a href="https://pphtpc.hpb.gov.sg/web/sgfoodid/tools/food-search" target="_blank" rel="noopener" className="underline" style={{ color: "#6D5BD0" }}>HPB SG FoodID</a></li>
                <li>Search for a food and open its detail page</li>
                <li>Select all text on the page (Ctrl+A or Cmd+A)</li>
                <li>Copy (Ctrl+C or Cmd+C) and paste here</li>
              </ol>
              <p className="mt-1">The parser will extract the food name, metadata, and all 41 nutrient values automatically.</p>
            </div>
          </div>

          {/* Right: Parsed preview */}
          <div>
            {!parsed && !parseError && (
              <div className="flex flex-col items-center justify-center h-full min-h-48 rounded-xl border-2 border-dashed"
                style={{ borderColor: "#DDE3EE", color: "oklch(0.65 0.01 90)" }}>
                <ClipboardPaste size={32} className="mb-3 opacity-40" />
                <p className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  Parsed entry will appear here
                </p>
              </div>
            )}

            {parsed && (
              <div className="border rounded-xl overflow-hidden" style={{ borderColor: "#DDE3EE" }}>
                {/* Preview header */}
                <div className="jade-block px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: "#A899F0" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#F7F9FC" }}>
                      Parsed Successfully
                    </span>
                  </div>
                  {saved && (
                    <span className="pill-badge pill-green text-[10px]">Saved</span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  {/* Editable name */}
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                      Food Name
                    </label>
                    <Input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="h-8 text-sm font-semibold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  {/* Editable ID */}
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                      Record ID (auto-generated, can edit)
                    </label>
                    <Input
                      value={editCrId}
                      onChange={e => setEditCrId(e.target.value)}
                      className="h-8 text-xs font-mono"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs"
                    style={{ color: "oklch(0.40 0.08 162)", fontFamily: "Inter, sans-serif" }}>
                    {parsed.foodGroup && <div><strong>Group:</strong> {parsed.foodGroup}</div>}
                    {parsed.foodSubgroup && <div><strong>Subgroup:</strong> {parsed.foodSubgroup}</div>}
                    {parsed.defaultServingSize && <div><strong>Serving:</strong> {parsed.defaultServingSize}</div>}
                    {parsed.ediblePortion && <div><strong>Edible:</strong> {parsed.ediblePortion}%</div>}
                    {parsed.sourceOfData && <div><strong>Source:</strong> {parsed.sourceOfData}</div>}
                    {parsed.yearOfData && <div><strong>Year:</strong> {parsed.yearOfData}</div>}
                  </div>

                  {/* Key nutrients preview */}
                  <div>
                    <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                      Key Nutrients (per 100g)
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["energy", "protein", "fat", "carbohydrate", "sugar", "sodium"].map(key => {
                        const def = NUTRIENTS.find(n => n.key === key);
                        const val = parsed.nutrientsPer100g?.[key];
                        return (
                          <div key={key} className="text-center p-2 rounded" style={{ background: "oklch(0.94 0.015 162)" }}>
                            <div className="nutrient-value text-sm font-bold" style={{ color: "#1C1C2E" }}>
                              {val !== null && val !== undefined ? formatNutrientValue(val as number, def?.unit ?? "") : "—"}
                            </div>
                            <div className="text-[9px]" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
                              {def?.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nutrient count */}
                  <div className="text-xs" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
                    {Object.values(parsed.nutrientsPer100g ?? {}).filter(v => v !== null).length} of 41 nutrients parsed
                  </div>

                  {/* Save button */}
                  <Button
                    onClick={handleSave}
                    disabled={saved}
                    className="w-full gap-1.5 font-semibold"
                    style={{
                      background: saved ? "#A899F0" : "#A899F0",
                      color: saved ? "#F7F9FC" : "#0A1F44",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <Database size={14} />
                    {saved ? "Saved to Local DB" : "Save to Local Database"}
                  </Button>

                  {saved && (
                    <p className="text-xs text-center" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
                      View in{" "}
                      <a href="/db" className="underline" style={{ color: "#6D5BD0" }}>
                        My Database <ChevronRight size={10} className="inline" />
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
