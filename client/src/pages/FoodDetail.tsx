// ============================================================
// FoodDB — Food Detail Page
// Tropical Bauhaus: cultural storytelling + clinical nutrition
// Cultural layer: heritage story, GI, ethnic tradition, regional variants
// ============================================================

import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import {
  ArrowLeft, Loader2, AlertCircle, Info, Download,
  BookOpen, MapPin, Users, Leaf, Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getFoodDetail } from "@/lib/api";
import { scaleNutrients, formatNutrientValue, NUTRIENT_MAP } from "@/lib/nutrients";
import NutrientTable from "@/components/NutrientTable";
import type { FoodItem } from "@/lib/nutrients";
import {
  getCulturalProfile,
  getGIData,
  ETHNIC_TRADITIONS,
  MEAL_OCCASIONS,
  REGIONS,
  DIETARY_TAGS,
} from "@/lib/culturalData";

// ── Quick stat card ──────────────────────────────────────────

function StatCard({
  label, value, unit, highlight
}: {
  label: string; value: number | null | undefined; unit: string;
  highlight?: "warn" | "good" | "neutral";
}) {
  const colors = {
    warn:    { bg: "oklch(0.28 0.09 60)",  text: "oklch(0.98 0.005 90)", sub: "oklch(0.80 0.08 60)" },
    good:    { bg: "oklch(0.26 0.09 162)", text: "oklch(0.98 0.005 90)", sub: "oklch(0.80 0.06 162)" },
    neutral: { bg: "oklch(0.28 0.09 162)", text: "oklch(0.98 0.005 90)", sub: "oklch(0.80 0.04 162)" },
  }[highlight ?? "neutral"];

  return (
    <div className="rounded-lg px-3 py-2.5 text-center" style={{ background: colors.bg }}>
      <div
        className="text-xl font-extrabold leading-tight"
        style={{ color: colors.text, fontFamily: "Sora, sans-serif" }}
      >
        {value !== null && value !== undefined ? (
          value < 1 ? value.toFixed(1) : Math.round(value as number)
        ) : "—"}
      </div>
      <div className="text-[10px] mt-0.5 opacity-80" style={{ color: colors.sub, fontFamily: "Nunito Sans, sans-serif" }}>
        {label} ({unit})
      </div>
    </div>
  );
}

// ── Cultural story card ──────────────────────────────────────

function CulturalStoryCard({ food }: { food: FoodItem }) {
  const profile = getCulturalProfile(food.name, food.foodGroup);
  const gi = getGIData(food.name, food.foodGroup);

  if (!profile && gi.level === "unknown") return null;

  return (
    <div
      className="mx-4 md:mx-8 my-4 rounded-2xl overflow-hidden border"
      style={{ borderColor: "oklch(0.88 0.008 90)", background: "white" }}
    >
      {/* Cultural header */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ background: "oklch(0.14 0.08 162)" }}
      >
        <BookOpen size={14} style={{ color: "oklch(0.75 0.10 162)" }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "oklch(0.75 0.10 162)", fontFamily: "Sora, sans-serif" }}
        >
          Food Culture & Heritage
        </span>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-5">
        {/* Left: Story + heritage note */}
        <div>
          {profile?.story && (
            <div className="mb-4">
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "oklch(0.30 0.08 162)", fontFamily: "Nunito Sans, sans-serif" }}
              >
                "{profile.story}"
              </p>
            </div>
          )}

          {profile?.heritageNote && (
            <div
              className="rounded-xl p-3 mb-4"
              style={{ background: "oklch(0.95 0.04 162)", borderLeft: "3px solid oklch(0.32 0.10 162)" }}
            >
              <div className="flex items-start gap-2">
                <Leaf size={13} className="mt-0.5 flex-shrink-0" style={{ color: "oklch(0.32 0.10 162)" }} />
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.32 0.10 162)", fontFamily: "Nunito Sans, sans-serif" }}>
                  {profile.heritageNote}
                </p>
              </div>
            </div>
          )}

          {/* Ethnic traditions */}
          {profile?.ethnic && profile.ethnic.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {profile.ethnic.map(e => {
                const t = ETHNIC_TRADITIONS[e];
                return t ? (
                  <span
                    key={e}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: t.bgColor, color: t.color, border: `1px solid ${t.color}30` }}
                  >
                    {t.label}
                  </span>
                ) : null;
              })}
            </div>
          )}

          {/* Dietary tags */}
          {profile?.dietary && profile.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {profile.dietary.map(d => {
                const tag = DIETARY_TAGS[d];
                return tag ? (
                  <span
                    key={d}
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: tag.bgColor, color: tag.color, border: `1px solid ${tag.color}30` }}
                  >
                    {tag.label}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Right: Regional variants + occasions + GI */}
        <div className="space-y-4">
          {/* GI card */}
          {gi.level !== "unknown" && (
            <div
              className="rounded-xl p-3"
              style={{ background: gi.bgColor, border: `1px solid ${gi.color}30` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Flame size={13} style={{ color: gi.color }} />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: gi.color, fontFamily: "Sora, sans-serif" }}>
                  Glycaemic Index
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold" style={{ color: gi.color, fontFamily: "Sora, sans-serif" }}>
                  {gi.value ?? "~"}
                </span>
                <span className="text-sm font-semibold" style={{ color: gi.color }}>
                  {gi.label}
                </span>
              </div>
              <p className="text-xs mt-1 opacity-80" style={{ color: gi.color, fontFamily: "Nunito Sans, sans-serif" }}>
                {gi.level === "low" ? "Slow glucose release — suitable for blood sugar management" :
                 gi.level === "medium" ? "Moderate glucose release — consume in balanced portions" :
                 "Rapid glucose release — limit for diabetes management"}
              </p>
            </div>
          )}

          {/* Regional variants */}
          {profile?.regionalVariants && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} style={{ color: "oklch(0.45 0.12 280)" }} />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "oklch(0.45 0.12 280)", fontFamily: "Sora, sans-serif" }}>
                  Regional Variants
                </span>
              </div>
              <div
                className="rounded-xl p-3 text-xs leading-relaxed"
                style={{ background: "oklch(0.96 0.04 280)", color: "oklch(0.35 0.12 280)", fontFamily: "Nunito Sans, sans-serif" }}
              >
                {profile.regionalVariants.split(" · ").map((variant, i) => (
                  <div key={i} className="flex items-start gap-1.5 mb-1 last:mb-0">
                    <span className="mt-0.5 flex-shrink-0">·</span>
                    <span>{variant}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meal occasions */}
          {profile?.occasions && profile.occasions.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Users size={12} style={{ color: "oklch(0.45 0.12 60)" }} />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "oklch(0.45 0.12 60)", fontFamily: "Sora, sans-serif" }}>
                  Best Enjoyed At
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.occasions.map(occ => {
                  const o = MEAL_OCCASIONS[occ];
                  return o ? (
                    <span
                      key={occ}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "oklch(0.96 0.04 60)", color: "oklch(0.40 0.12 60)", border: "1px solid oklch(0.80 0.10 60)" }}
                    >
                      {o.icon} {o.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Regions */}
          {profile?.regions && profile.regions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {profile.regions.map(reg => {
                const r = REGIONS[reg];
                return r ? (
                  <span
                    key={reg}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "oklch(0.96 0.004 286)", color: "oklch(0.40 0.015 65)", border: "1px solid oklch(0.88 0.004 286)" }}
                  >
                    {r.flag} {r.label}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

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

  const n = food.nutrientsPer100g;
  const sodiumHighlight = n.sodium != null ? (n.sodium > 600 ? "warn" : n.sodium < 150 ? "good" : "neutral") : "neutral";
  const sugarHighlight = n.sugar != null ? (n.sugar > 15 ? "warn" : n.sugar < 3 ? "good" : "neutral") : "neutral";

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "oklch(0.98 0.003 90)" }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="jade-block px-4 md:px-8 py-5">
        <Link href="/">
          <button
            className="flex items-center gap-1.5 text-xs mb-3 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}
          >
            <ArrowLeft size={13} /> Back to Explorer
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
              {/* GI badge inline */}
              {(() => {
                const gi = getGIData(food.name, food.foodGroup);
                return gi.level !== "unknown" ? (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: gi.bgColor, color: gi.color }}
                  >
                    {gi.label}
                  </span>
                ) : null;
              })()}
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

        {/* Quick stats — 7 key nutrients */}
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-4">
          <StatCard label="Energy" value={n.energy} unit="kcal" />
          <StatCard label="Protein" value={n.protein} unit="g" highlight={n.protein != null && n.protein >= 10 ? "good" : "neutral"} />
          <StatCard label="Total Fat" value={n.fat} unit="g" highlight={n.fat != null && n.fat > 20 ? "warn" : "neutral"} />
          <StatCard label="Carbs" value={n.carbohydrate} unit="g" />
          <StatCard label="Sugar" value={n.sugar} unit="g" highlight={sugarHighlight as "warn" | "good" | "neutral"} />
          <StatCard label="Sodium" value={n.sodium} unit="mg" highlight={sodiumHighlight as "warn" | "good" | "neutral"} />
          <StatCard label="Fibre" value={n.dietaryFibre} unit="g" highlight={n.dietaryFibre != null && n.dietaryFibre >= 3 ? "good" : "neutral"} />
        </div>

        {/* Secondary minerals row */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          <StatCard label="Potassium" value={n.potassium} unit="mg" />
          <StatCard label="Calcium" value={n.calcium} unit="mg" highlight={n.calcium != null && n.calcium >= 100 ? "good" : "neutral"} />
          <StatCard label="Iron" value={n.iron} unit="mg" highlight={n.iron != null && n.iron >= 2 ? "good" : "neutral"} />
          <StatCard label="Cholesterol" value={n.cholesterol} unit="mg" highlight={n.cholesterol != null && n.cholesterol > 100 ? "warn" : "neutral"} />
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

      {/* ── Cultural Story Card ─────────────────────────────── */}
      <CulturalStoryCard food={food} />

      {/* ── Weight calculator ──────────────────────────────── */}
      <div
        className="px-4 md:px-8 py-3 border-b flex flex-wrap items-center gap-3 mx-4 md:mx-8 rounded-xl mb-2"
        style={{ background: "white", borderColor: "oklch(0.88 0.008 90)", border: "1px solid oklch(0.88 0.008 90)" }}
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
      <div className="flex-1 overflow-auto px-4 md:px-8 pb-4">
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
        <strong>—</strong> No data available · <strong>Trace</strong> Present below minimum detection limit · Data from HPB SG FoodID · GI values are approximate estimates from published literature
      </div>
    </div>
  );
}
