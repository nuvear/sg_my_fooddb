// ============================================================
// FoodDB — Cultural Food Explorer (Home Page)
// Design: Tropical Bauhaus — food culture is the hero
// Cultural dimensions: Ethnic · Occasion · Generation · Region · Dietary
// Food cards: Calories · Na · K · Mg · Ca · Sugar · GI
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import {
  Search, ChevronRight, Loader2, AlertCircle, Zap, Brain, Filter,
  X, Sparkles, UtensilsCrossed, MapPin, Users, Leaf, Heart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchFoods } from "@/lib/api";
import type { SearchResult, ParsedQuery, QueryType } from "@/lib/searchEngine";
import {
  CULTURAL_SEARCH_PRESETS,
  ETHNIC_TRADITIONS,
  MEAL_OCCASIONS,
  REGIONS,
  getGIData,
  getCulturalProfile,
  type CulturalSearchPreset,
} from "@/lib/culturalData";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-culture-hero-ZiKi2yEt2siVBCVkUqDo7y.webp";

// ── Cultural dimension tab config ────────────────────────────

type DimensionTab = "all" | "ethnic" | "occasion" | "generation" | "region" | "dietary" | "trending";

const DIMENSION_TABS: Array<{ id: DimensionTab; label: string; icon: React.ReactNode }> = [
  { id: "all",        label: "All",         icon: <UtensilsCrossed size={13} /> },
  { id: "ethnic",     label: "Tradition",   icon: <Leaf size={13} /> },
  { id: "occasion",   label: "Occasion",    icon: <span className="text-xs">🕐</span> },
  { id: "generation", label: "Generation",  icon: <Users size={13} /> },
  { id: "region",     label: "Region",      icon: <MapPin size={13} /> },
  { id: "dietary",    label: "Dietary",     icon: <Heart size={13} /> },
  { id: "trending",   label: "Trending",    icon: <Sparkles size={13} /> },
];

// ── Query type badge config ──────────────────────────────────
const QUERY_TYPE_CONFIG: Record<QueryType, {
  label: string; icon: React.ReactNode; color: string; bg: string; border: string;
}> = {
  simple:    { label: "Fuzzy Search",     icon: <Zap size={11} />,      color: "oklch(0.32 0.10 162)", bg: "oklch(0.95 0.04 162)", border: "oklch(0.75 0.08 162)" },
  nutrition: { label: "Nutrition Filter", icon: <Filter size={11} />,   color: "oklch(0.40 0.12 60)",  bg: "oklch(0.97 0.04 80)",  border: "oklch(0.80 0.10 60)" },
  mixed:     { label: "Smart Search",     icon: <Brain size={11} />,    color: "oklch(0.35 0.14 280)", bg: "oklch(0.96 0.04 280)", border: "oklch(0.78 0.10 280)" },
  natural:   { label: "AI-Powered",       icon: <Sparkles size={11} />, color: "oklch(0.38 0.16 30)",  bg: "oklch(0.97 0.04 30)",  border: "oklch(0.80 0.12 30)" },
};

const NUTRIENT_LABELS: Record<string, string> = {
  energy: "Energy", protein: "Protein", fat: "Fat", saturatedFat: "Sat. Fat",
  carbohydrate: "Carbs", sugar: "Sugar", sodium: "Sodium", potassium: "Potassium",
  calcium: "Calcium", iron: "Iron", dietaryFibre: "Fibre",
};
const NUTRIENT_UNITS: Record<string, string> = {
  energy: "kcal", protein: "g", fat: "g", saturatedFat: "g", carbohydrate: "g",
  sugar: "g", sodium: "mg", potassium: "mg", calcium: "mg", iron: "mg", dietaryFibre: "g",
};

// ── Mini nutrient chip component ─────────────────────────────

interface MiniNutrientChipProps {
  label: string;
  value: number | null | undefined;
  unit: string;
  highlight?: "warn" | "good" | "neutral";
}

function MiniNutrientChip({ label, value, unit, highlight = "neutral" }: MiniNutrientChipProps) {
  const displayVal = value === null || value === undefined ? "—" : value < 1 ? value.toFixed(1) : Math.round(value).toString();
  const colors = {
    warn:    { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
    good:    { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
    neutral: { bg: "#f8fafc", text: "#475569", border: "#e2e8f0" },
  }[highlight];

  return (
    <div
      className="flex flex-col items-center px-2 py-1 rounded-md min-w-0"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: colors.text, fontFamily: "Nunito Sans, sans-serif" }}>
        {label}
      </span>
      <span className="text-xs font-bold leading-tight" style={{ color: colors.text, fontFamily: "Sora, sans-serif" }}>
        {displayVal}
        {value !== null && value !== undefined && (
          <span className="text-[9px] font-normal ml-0.5">{unit}</span>
        )}
      </span>
    </div>
  );
}

// ── GI Badge — only shown when confirmed GI data exists ──────

interface GIBadgeProps {
  // Accept either direct gi object from index or fallback to name lookup
  gi?: { value: number; level: string } | null;
  foodName?: string;
  foodGroup?: string;
}

function GIBadge({ gi, foodName, foodGroup }: GIBadgeProps) {
  // Use direct GI data from index if available
  let giData = gi;
  // Fallback to name-based lookup only if no direct data
  if (!giData && foodName) {
    const looked = getGIData(foodName, foodGroup);
    if (looked.level !== "unknown" && looked.value != null && looked.value > 0) {
      giData = { value: looked.value, level: looked.level };
    }
  }
  if (!giData || giData.value == null || giData.value <= 0) return null;

  const levelConfig: Record<string, { bg: string; color: string; label: string }> = {
    low:        { bg: "#dcfce7", color: "#166534", label: `Low GI (${giData.value})` },
    medium:     { bg: "#fef9c3", color: "#854d0e", label: `Med GI (${giData.value})` },
    high:       { bg: "#fee2e2", color: "#991b1b", label: `High GI (${giData.value})` },
    negligible: { bg: "#f1f5f9", color: "#475569", label: `GI ~0` },
  };
  const cfg = levelConfig[giData.level] ?? levelConfig.low;
  return (
    <span
      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
    >
      {cfg.label}
    </span>
  );
}

// ── Cultural badge ────────────────────────────────────────────

interface CulturalBadgeProps {
  // Accept direct cultural object from index or fallback to name lookup
  cultural?: { ethnic?: string | null; ethnicAll?: string[] } | null;
  foodName?: string;
  foodGroup?: string;
}

function CulturalBadge({ cultural, foodName, foodGroup }: CulturalBadgeProps) {
  // Use direct cultural data from index if available
  const ethnicKey = cultural?.ethnic ?? (foodName ? getCulturalProfile(foodName, foodGroup)?.ethnic?.[0] : null);
  if (!ethnicKey) return null;
  const tradition = ETHNIC_TRADITIONS[ethnicKey as keyof typeof ETHNIC_TRADITIONS];
  if (!tradition) return null;
  return (
    <span
      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ background: tradition.bgColor, color: tradition.color, border: `1px solid ${tradition.color}30` }}
    >
      {tradition.label}
    </span>
  );
}

// ── Food Card ─────────────────────────────────────────────────

function FoodCard({ food }: { food: SearchResult }) {
  // Use cultural data from index first, fall back to hardcoded profile for stories
  const profile = getCulturalProfile(food.name, food.l1Category);
  const hasStory = !!profile?.story;
  // Use occasions/regions from index cultural data if available, else from profile
  const occasions = food.cultural?.occasions?.length ? food.cultural.occasions : (profile?.occasions ?? []);
  const regions = food.cultural?.regions?.length ? food.cultural.regions : (profile?.regions ?? []);

  // Determine highlight levels for nutrients
  const sodiumHighlight: "warn" | "good" | "neutral" =
    food.sodium != null ? (food.sodium > 600 ? "warn" : food.sodium < 150 ? "good" : "neutral") : "neutral";
  const sugarHighlight: "warn" | "good" | "neutral" =
    food.sugar != null ? (food.sugar > 15 ? "warn" : food.sugar < 3 ? "good" : "neutral") : "neutral";

  return (
    <Link href={`/food/${food.crId}`}>
      <div
        className="group rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
        style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}
      >
        {/* ── Card header ── */}
        <div className="px-4 pt-3 pb-2">
          {/* Top row: category + cultural + GI badges */}
          <div className="flex items-start gap-1.5 flex-wrap mb-2">
            {food.l1Category && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: "oklch(0.32 0.10 162)", background: "oklch(0.93 0.04 162)" }}
              >
                {food.l1Category}
              </span>
            )}
            <CulturalBadge cultural={food.cultural} foodName={food.name} foodGroup={food.l1Category} />
            <GIBadge gi={food.gi} foodName={food.name} foodGroup={food.l1Category} />
            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0 mt-0.5"
              style={{ color: "oklch(0.32 0.10 162)" }}
            />
          </div>

          {/* Food name */}
          <h3
            className="font-bold text-sm leading-snug mb-1 group-hover:text-[oklch(0.25_0.10_162)] transition-colors"
            style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}
          >
            {food.name}
          </h3>

          {/* Cultural story snippet (if available) */}
          {hasStory ? (
            <p
              className="text-[11px] leading-relaxed line-clamp-2 italic mb-2"
              style={{ color: "oklch(0.50 0.06 162)", fontFamily: "Nunito Sans, sans-serif" }}
            >
              {profile!.story}
            </p>
          ) : food.description ? (
            <p
              className="text-[11px] leading-relaxed line-clamp-2 mb-2"
              style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}
            >
              {food.description}
            </p>
          ) : null}

          {/* Meal occasion icons */}
          {occasions.length > 0 && (
            <div className="flex gap-1 mb-2">
              {occasions.slice(0, 3).map(occ => (
                <span key={occ} className="text-xs" title={MEAL_OCCASIONS[occ as keyof typeof MEAL_OCCASIONS]?.label}>
                  {MEAL_OCCASIONS[occ as keyof typeof MEAL_OCCASIONS]?.icon}
                </span>
              ))}
              {regions.slice(0, 2).map(reg => (
                <span key={reg} className="text-xs" title={REGIONS[reg as keyof typeof REGIONS]?.label}>
                  {REGIONS[reg as keyof typeof REGIONS]?.flag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Nutrient mini-panel ── */}
        <div
          className="px-3 pb-3 pt-1 grid grid-cols-4 gap-1"
          style={{ borderTop: "1px solid oklch(0.94 0.006 162)" }}
        >
          <MiniNutrientChip
            label="Cal"
            value={food.energy}
            unit="kcal"
            highlight={food.energy != null ? (food.energy > 500 ? "warn" : food.energy < 150 ? "good" : "neutral") : "neutral"}
          />
          <MiniNutrientChip label="Na" value={food.sodium} unit="mg" highlight={sodiumHighlight} />
          <MiniNutrientChip label="K" value={food.potassium} unit="mg" highlight="neutral" />
          <MiniNutrientChip label="Ca" value={food.calcium} unit="mg" highlight="neutral" />
          <MiniNutrientChip label="Sugar" value={food.sugar} unit="g" highlight={sugarHighlight} />
          <MiniNutrientChip label="Fibre" value={food.dietaryFibre} unit="g" highlight={food.dietaryFibre != null && food.dietaryFibre >= 3 ? "good" : "neutral"} />
          <MiniNutrientChip label="Protein" value={food.protein} unit="g" highlight={food.protein != null && food.protein >= 10 ? "good" : "neutral"} />
          <MiniNutrientChip label="Fat" value={food.fat} unit="g" highlight={food.fat != null && food.fat > 20 ? "warn" : "neutral"} />
        </div>

        {/* Matched filter indicators */}
        {food.matchedFilters.length > 0 && (
          <div
            className="px-3 pb-2 flex gap-1 flex-wrap"
          >
            {food.matchedFilters.slice(0, 3).map(f => (
              <span
                key={f}
                className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ color: "oklch(0.32 0.10 162)", background: "oklch(0.93 0.04 162)" }}
              >
                ✓ {NUTRIENT_LABELS[f] ?? f}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ── Cultural Preset Pill ──────────────────────────────────────

function PresetPill({ preset, active, onClick }: {
  preset: CulturalSearchPreset;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap hover:scale-105"
      style={{
        fontFamily: "Nunito Sans, sans-serif",
        borderColor: active ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
        color: active ? "oklch(0.98 0.005 90)" : "oklch(0.40 0.015 65)",
        background: active ? "oklch(0.32 0.10 162)" : "white",
        boxShadow: active ? "0 2px 8px oklch(0.32 0.10 162 / 0.3)" : "none",
      }}
    >
      <span>{preset.icon}</span>
      <span>{preset.label}</span>
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [parsedQuery, setParsedQuery] = useState<ParsedQuery | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<DimensionTab>("all");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string, p = 1, append = false) => {
    if (p === 1) setLoading(true);
    else setIsLoadingMore(true);
    setError(null);
    try {
      const res = await searchFoods(q, p);
      setResults(prev => append ? [...prev, ...res.items] : res.items);
      setTotal(res.total);
      setPage(p);
      setHasSearched(true);
      setParsedQuery(res.parsedQuery);
    } catch (e: unknown) {
      console.error(e);
      setError("Unable to load food data. Please check your connection.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => { doSearch("", 1); }, []);

  // Debounced search on query change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query, 1);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const loadMore = () => doSearch(query, page + 1, true);
  const clearQuery = () => { setQuery(""); setActivePreset(null); };

  const handlePreset = (preset: CulturalSearchPreset) => {
    if (activePreset === preset.id) {
      setActivePreset(null);
      setQuery("");
    } else {
      setActivePreset(preset.id);
      setQuery(preset.query);
    }
  };

  const filteredPresets = activeTab === "all"
    ? CULTURAL_SEARCH_PRESETS
    : CULTURAL_SEARCH_PRESETS.filter(p => p.category === activeTab);

  const qConfig = parsedQuery ? QUERY_TYPE_CONFIG[parsedQuery.type] : null;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "oklch(0.98 0.003 90)" }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Singapore and Malaysia food culture"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, oklch(0.10 0.09 162 / 0.92) 0%, oklch(0.12 0.09 162 / 0.60) 50%, oklch(0.15 0.06 60 / 0.30) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🇸🇬</span>
            <span className="text-lg">🇲🇾</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "oklch(0.32 0.10 162 / 0.8)", color: "oklch(0.95 0.04 162)", backdropFilter: "blur(4px)" }}
            >
              2,557 Foods · 41 Nutrients · Cultural Explorer
            </span>
          </div>
          <h1
            className="text-2xl md:text-4xl font-extrabold leading-tight mb-1"
            style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}
          >
            The Transnational Plate
          </h1>
          <p
            className="text-sm md:text-base max-w-lg"
            style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}
          >
            Explore Singapore & Malaysia's living food heritage — from Kopitiam breakfasts to Mamak late nights, Nyonya feasts to Gen Z fusion.
          </p>
        </div>
      </div>

      {/* ── Sticky search + cultural dimensions ───────────── */}
      <div
        className="sticky top-0 z-20 border-b"
        style={{ background: "oklch(0.99 0.002 90)", borderColor: "oklch(0.90 0.006 162)" }}
      >
        {/* Search bar */}
        <div className="px-4 md:px-8 pt-3 pb-2">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "oklch(0.52 0.015 65)" }}
              />
              <Input
                value={query}
                onChange={e => { setQuery(e.target.value); setActivePreset(null); }}
                placeholder='Try "Malay breakfast", "Penang hawker", "low sodium seniors"...'
                className="pl-9 pr-9 h-10 text-sm border-2 focus-visible:ring-0"
                style={{
                  borderColor: query ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                  fontFamily: "Nunito Sans, sans-serif",
                  transition: "border-color 0.2s",
                  background: "white",
                }}
              />
              {query && (
                <button
                  onClick={clearQuery}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              )}
              {loading && (
                <Loader2
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin"
                  style={{ color: "oklch(0.32 0.10 162)" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Dimension tabs */}
        <div className="px-4 md:px-8 pb-2">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {DIMENSION_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                  style={{
                    fontFamily: "Nunito Sans, sans-serif",
                    background: activeTab === tab.id ? "oklch(0.32 0.10 162)" : "transparent",
                    color: activeTab === tab.id ? "white" : "oklch(0.50 0.015 65)",
                    border: `1px solid ${activeTab === tab.id ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)"}`,
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cultural preset pills */}
        <div className="px-4 md:px-8 pb-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filteredPresets.map(preset => (
                <PresetPill
                  key={preset.id}
                  preset={preset}
                  active={activePreset === preset.id}
                  onClick={() => handlePreset(preset)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results area ──────────────────────────────────── */}
      <div className="flex-1 px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto">

          {/* ── Query interpretation banner ─────────────── */}
          {query && parsedQuery && qConfig && (
            <div
              className="mb-4 rounded-xl px-4 py-2.5 flex flex-wrap items-center gap-2 text-xs border"
              style={{ background: qConfig.bg, borderColor: qConfig.border }}
            >
              <span
                className="flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full"
                style={{ color: qConfig.color, background: "white", border: `1px solid ${qConfig.border}` }}
              >
                {qConfig.icon}
                {qConfig.label}
              </span>
              {parsedQuery.filters.map(f => (
                <span
                  key={f.nutrient}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.40 0.12 60)", background: "oklch(0.97 0.04 80)", border: "1px solid oklch(0.80 0.10 60)" }}
                >
                  <Filter size={9} />
                  {NUTRIENT_LABELS[f.nutrient] ?? f.nutrient}{" "}
                  {f.operator === "max" ? "≤" : "≥"}{f.value}{NUTRIENT_UNITS[f.nutrient] ?? ""}
                </span>
              ))}
              {parsedQuery.categoryHints.map(h => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.35 0.14 280)", background: "oklch(0.96 0.04 280)", border: "1px solid oklch(0.78 0.10 280)" }}
                >
                  {h}
                </span>
              ))}
              {/* Cultural dimension chips */}
              {parsedQuery.culturalIntent?.ethnicFilters.map(e => (
                <span key={`e-${e}`} className="px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.35 0.16 140)", background: "oklch(0.95 0.06 140)", border: "1px solid oklch(0.75 0.12 140)" }}>
                  {ETHNIC_TRADITIONS[e]?.label ?? e}
                </span>
              ))}
              {parsedQuery.culturalIntent?.occasionFilters.map(o => (
                <span key={`o-${o}`} className="px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.35 0.16 50)", background: "oklch(0.97 0.06 50)", border: "1px solid oklch(0.80 0.12 50)" }}>
                  {o}
                </span>
              ))}
              {parsedQuery.culturalIntent?.regionFilters.map(r => (
                <span key={`r-${r}`} className="px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.35 0.14 220)", background: "oklch(0.96 0.04 220)", border: "1px solid oklch(0.78 0.10 220)" }}>
                  {r}
                </span>
              ))}
              {parsedQuery.culturalIntent?.generationFilters.map(g => (
                <span key={`g-${g}`} className="px-2 py-0.5 rounded-full font-medium"
                  style={{ color: "oklch(0.35 0.14 300)", background: "oklch(0.96 0.04 300)", border: "1px solid oklch(0.78 0.10 300)" }}>
                  {g}
                </span>
              ))}
              {parsedQuery.llmInterpretation && (
                <span style={{ color: qConfig.color }} className="italic">
                  "{parsedQuery.llmInterpretation}"
                </span>
              )}
            </div>
          )}

          {/* ── Results header ───────────────────────────── */}
          {hasSearched && !loading && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                {total.toLocaleString()} food{total !== 1 ? "s" : ""}
                {query ? ` for "${query}"` : " in database"}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: "oklch(0.60 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                <span>Cal · Na · K · Ca · Sugar · Fibre · Protein · Fat</span>
              </span>
            </div>
          )}

          {/* ── Error state ──────────────────────────────── */}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-xl border mb-4" style={{ borderColor: "oklch(0.80 0.12 30)", background: "oklch(0.97 0.04 30)" }}>
              <AlertCircle size={16} style={{ color: "oklch(0.55 0.18 30)" }} />
              <span className="text-sm" style={{ color: "oklch(0.40 0.15 30)" }}>{error}</span>
            </div>
          )}

          {/* ── Loading skeleton ─────────────────────────── */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border animate-pulse overflow-hidden"
                  style={{ borderColor: "oklch(0.92 0.004 286)", background: "white" }}
                >
                  <div className="p-4">
                    <div className="flex gap-1 mb-2">
                      <div className="h-4 w-16 rounded-full" style={{ background: "oklch(0.90 0.004 286)" }} />
                      <div className="h-4 w-12 rounded-full" style={{ background: "oklch(0.90 0.004 286)" }} />
                    </div>
                    <div className="h-4 w-3/4 rounded mb-1" style={{ background: "oklch(0.88 0.004 286)" }} />
                    <div className="h-3 w-full rounded mb-1" style={{ background: "oklch(0.92 0.004 286)" }} />
                    <div className="h-3 w-2/3 rounded" style={{ background: "oklch(0.92 0.004 286)" }} />
                  </div>
                  <div className="px-3 pb-3 pt-1 grid grid-cols-4 gap-1" style={{ borderTop: "1px solid oklch(0.94 0.006 162)" }}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="h-10 rounded-md" style={{ background: "oklch(0.94 0.004 286)" }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Results grid ─────────────────────────────── */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map(food => (
                <FoodCard key={food.crId} food={food} />
              ))}
            </div>
          )}

          {/* ── Empty state ──────────────────────────────── */}
          {!loading && hasSearched && results.length === 0 && !error && (
            <div className="text-center py-16">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.93 0.04 162)" }}
              >
                <UtensilsCrossed size={28} style={{ color: "oklch(0.32 0.10 162)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.25 0.015 65)" }}
              >
                No foods found
              </h3>
              <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                Try a cultural dimension — or use one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {CULTURAL_SEARCH_PRESETS.slice(0, 6).map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handlePreset(preset)}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors hover:border-[oklch(0.32_0.10_162)] hover:text-[oklch(0.32_0.10_162)]"
                    style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.52 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Load more ────────────────────────────────── */}
          {!loading && results.length > 0 && results.length < total && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:shadow-md disabled:opacity-50"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  borderColor: "oklch(0.32 0.10 162)",
                  color: "oklch(0.32 0.10 162)",
                  background: "white",
                }}
              >
                {isLoadingMore ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Loading more...
                  </span>
                ) : (
                  `Load more · ${(total - results.length).toLocaleString()} remaining`
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
