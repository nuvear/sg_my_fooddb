// FoodDB FoodDetail — full 41-nutrient breakdown with custom weight calculator
// Tropical Bauhaus: split-screen, bold jade header, Space Mono numerics

import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Loader2, AlertCircle, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getFoodDetail } from "@/lib/api";
import { scaleNutrients, formatNutrientValue, NUTRIENT_MAP } from "@/lib/nutrients";
import NutrientTable from "@/components/NutrientTable";
import type { FoodItem } from "@/lib/nutrients";

export default function FoodDetail() {
  const { crId } = useParams<{ crId: string }>();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customWeight, setCustomWeight] = useState<string>("");

  useEffect(() => {
    if (!crId) return;
    setLoading(true);
    setError(null);
    getFoodDetail(crId)
      .then(f => {
        setFood(f);
        if (f?.defaultWeight_g) setCustomWeight(String(f.defaultWeight_g));
      })
      .catch(() => setError("Failed to load food details."))
      .finally(() => setLoading(false));
  }, [crId]);

  const customW = parseFloat(customWeight) || null;
  const scaledNutrients = food && customW
    ? scaleNutrients(food.nutrientsPer100g, customW)
    : null;

  const exportCSV = () => {
    if (!food) return;
    const rows = [
      ["Nutrient", "Unit", "Per 100g", customW ? `Per ${customW}g` : "Per Serving"],
    ];
    for (const [key, val] of Object.entries(food.nutrientsPer100g)) {
      const def = NUTRIENT_MAP.get(key);
      if (!def) continue;
      const scaled = scaledNutrients?.[key] ?? null;
      rows.push([def.label, def.unit, String(val ?? ""), String(scaled ?? "")]);
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${food.name.replace(/[^a-zA-Z0-9]/g, "_")}_nutrients.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin" style={{ color: "oklch(0.32 0.10 162)" }} />
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="p-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 gap-1">
            <ArrowLeft size={14} /> Back
          </Button>
        </Link>
        <div className="flex items-center gap-2 p-4 rounded-lg"
          style={{ background: "oklch(0.94 0.06 25)", color: "oklch(0.45 0.18 25)" }}>
          <AlertCircle size={16} />
          {error ?? "Food not found."}
        </div>
      </div>
    );
  }

  const energyVal = food.nutrientsPer100g["energy"];
  const proteinVal = food.nutrientsPer100g["protein"];
  const fatVal = food.nutrientsPer100g["fat"];
  const carbVal = food.nutrientsPer100g["carbohydrate"];
  const sodiumVal = food.nutrientsPer100g["sodium"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="jade-block px-4 md:px-8 py-5">
        <Link href="/">
          <button className="flex items-center gap-1.5 text-xs mb-3 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}>
            <ArrowLeft size={13} /> Back to Search
          </button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {food.foodGroup && (
                <span className="pill-badge pill-green text-[10px]">{food.foodGroup}</span>
              )}
              {food.foodSubgroup && (
                <span className="text-xs opacity-60" style={{ color: "oklch(0.85 0.04 162)" }}>
                  › {food.foodSubgroup}
                </span>
              )}
            </div>
            <h1
              className="text-xl md:text-2xl font-extrabold leading-tight mb-1"
              style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}
            >
              {food.name}
            </h1>
            {food.description && (
              <p className="text-sm opacity-75" style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}>
                {food.description}
              </p>
            )}
          </div>

          <Button
            onClick={exportCSV}
            size="sm"
            className="shrink-0 gap-1.5 text-xs font-semibold"
            style={{
              background: "oklch(0.78 0.16 75)",
              color: "oklch(0.18 0.015 65)",
              fontFamily: "Sora, sans-serif",
            }}
          >
            <Download size={13} /> Export CSV
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
          {[
            { label: "Energy", value: energyVal, unit: "kcal" },
            { label: "Protein", value: proteinVal, unit: "g" },
            { label: "Total Fat", value: fatVal, unit: "g" },
            { label: "Carbs", value: carbVal, unit: "g" },
            { label: "Sodium", value: sodiumVal, unit: "mg" },
          ].map(({ label, value, unit }) => (
            <div
              key={label}
              className="rounded-md px-3 py-2 text-center"
              style={{ background: "oklch(0.28 0.09 162)" }}
            >
              <div className="nutrient-value text-lg font-bold" style={{ color: "oklch(0.98 0.005 90)" }}>
                {value !== null && value !== undefined ? Math.round(value as number) : "—"}
              </div>
              <div className="text-[10px] opacity-60" style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}>
                {label} ({unit})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Metadata strip ─────────────────────────────────── */}
      <div
        className="px-4 md:px-8 py-3 border-b flex flex-wrap gap-x-6 gap-y-1 text-xs"
        style={{ background: "oklch(0.96 0.01 162)", borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.40 0.08 162)", fontFamily: "Nunito Sans, sans-serif" }}
      >
        {food.defaultServingSize && <span><strong>Default Serving:</strong> {food.defaultServingSize}</span>}
        {food.alternativeServingSizes && <span><strong>Alt Serving:</strong> {food.alternativeServingSizes}</span>}
        {food.ediblePortion !== undefined && <span><strong>Edible Portion:</strong> {food.ediblePortion}%</span>}
        {food.sourceOfData && <span><strong>Source:</strong> {food.sourceOfData}</span>}
        {food.yearOfData && <span><strong>Updated:</strong> {food.yearOfData}</span>}
        {food.crId && <span><strong>ID:</strong> {food.crId}</span>}
      </div>

      {/* ── Weight calculator ──────────────────────────────── */}
      <div
        className="px-4 md:px-8 py-3 border-b flex flex-wrap items-center gap-3"
        style={{ background: "oklch(0.98 0.005 90)", borderColor: "oklch(0.88 0.008 90)" }}
      >
        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
          <Info size={14} />
          Calculate for custom weight:
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={customWeight}
            onChange={e => setCustomWeight(e.target.value)}
            placeholder="e.g. 200"
            className="w-24 h-8 text-sm text-right font-mono"
            min={1}
            max={2000}
          />
          <span className="text-sm" style={{ color: "oklch(0.52 0.015 65)" }}>grams</span>
        </div>
        {customW && (
          <span className="text-xs px-2 py-1 rounded" style={{ background: "oklch(0.90 0.06 162)", color: "oklch(0.28 0.10 162)", fontFamily: "Nunito Sans, sans-serif" }}>
            Showing values for {customW}g portion
          </span>
        )}
      </div>

      {/* ── Nutrient table ─────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <NutrientTable
          per100g={food.nutrientsPer100g}
          perServing={food.nutrientsPerServing}
          servingLabel={food.defaultServingSize ? `Per Serving (${food.defaultServingSize})` : undefined}
          weightG={food.defaultWeight_g}
          customWeight={customW ?? undefined}
        />
      </div>

      {/* Footer note */}
      <div
        className="px-4 md:px-8 py-3 text-xs border-t"
        style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.65 0.01 90)", fontFamily: "Nunito Sans, sans-serif" }}
      >
        <strong>—</strong> No data available · <strong>Trace</strong> Present below minimum detection limit · Data from HPB SG FoodID
      </div>
    </div>
  );
}
