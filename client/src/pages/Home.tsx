// ============================================================
// FoodDB — Home / Search Page
// Tropical Bauhaus: bold structure, jade/amber palette
// Intelligent Search: 4-layer engine with query type badges
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { Search, ChevronRight, Loader2, AlertCircle, Zap, Brain, Filter, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchFoods } from "@/lib/api";
import type { SearchResult, ParsedQuery, QueryType } from "@/lib/searchEngine";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-hero-iyRvqRrDQ2nDSt5EGi6x2x.webp";

const POPULAR_SEARCHES = [
  "Nasi Lemak", "Char Kway Teow", "Laksa", "Chicken Rice",
  "Roti Canai", "Satay", "Mee Goreng", "Wonton Mee",
  "Bak Chor Mee", "Curry Puff", "Kaya Toast", "Teh Tarik",
];

const SMART_QUERIES = [
  "low sodium vegetables",
  "high protein breakfast",
  "low calorie snacks",
  "sugar free drinks",
  "high fibre grains",
  "low fat seafood",
];

// ── Query type badge config ──────────────────────────────────
const QUERY_TYPE_CONFIG: Record<QueryType, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}> = {
  simple: {
    label: "Fuzzy Search",
    icon: <Zap size={11} />,
    color: "oklch(0.32 0.10 162)",
    bg: "oklch(0.95 0.04 162)",
    border: "oklch(0.75 0.08 162)",
  },
  nutrition: {
    label: "Nutrition Filter",
    icon: <Filter size={11} />,
    color: "oklch(0.40 0.12 60)",
    bg: "oklch(0.97 0.04 80)",
    border: "oklch(0.80 0.10 60)",
  },
  mixed: {
    label: "Smart Search",
    icon: <Brain size={11} />,
    color: "oklch(0.35 0.14 280)",
    bg: "oklch(0.96 0.04 280)",
    border: "oklch(0.78 0.10 280)",
  },
  natural: {
    label: "AI-Powered",
    icon: <Sparkles size={11} />,
    color: "oklch(0.38 0.16 30)",
    bg: "oklch(0.97 0.04 30)",
    border: "oklch(0.80 0.12 30)",
  },
};

// Nutrient display names for filter chips
const NUTRIENT_LABELS: Record<string, string> = {
  energy: "Energy", protein: "Protein", fat: "Fat", saturatedFat: "Sat. Fat",
  transFat: "Trans Fat", carbohydrate: "Carbs", sugar: "Sugar", addedSugar: "Added Sugar",
  dietaryFibre: "Fibre", sodium: "Sodium", potassium: "Potassium", calcium: "Calcium",
  iron: "Iron", cholesterol: "Cholesterol",
};

const NUTRIENT_UNITS: Record<string, string> = {
  energy: "kcal", protein: "g", fat: "g", saturatedFat: "g", transFat: "g",
  carbohydrate: "g", sugar: "g", addedSugar: "g", dietaryFibre: "g",
  sodium: "mg", potassium: "mg", calcium: "mg", iron: "mg", cholesterol: "mg",
};

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

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query, 1);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const loadMore = () => doSearch(query, page + 1, true);
  const clearQuery = () => setQuery("");

  const qConfig = parsedQuery ? QUERY_TYPE_CONFIG[parsedQuery.type] : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Singapore and Malaysia foods"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, oklch(0.12 0.09 162 / 0.88) 0%, oklch(0.12 0.09 162 / 0.45) 60%, transparent 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
          <h1
            className="text-2xl md:text-3xl font-extrabold leading-tight mb-1"
            style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}
          >
            SG & MY Food Database
          </h1>
          <p className="text-sm md:text-base mb-3" style={{ color: "oklch(0.85 0.04 162)" }}>
            2,557 foods · 41 nutrient fields · Intelligent search
          </p>
          {/* Smart query suggestions */}
          <div className="flex flex-wrap gap-1.5">
            {SMART_QUERIES.slice(0, 3).map(sq => (
              <button
                key={sq}
                onClick={() => setQuery(sq)}
                className="text-xs px-2.5 py-1 rounded-full border transition-all hover:scale-105"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  borderColor: "oklch(0.75 0.08 162 / 0.6)",
                  color: "oklch(0.92 0.04 162)",
                  background: "oklch(0.15 0.06 162 / 0.5)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search bar ────────────────────────────────────── */}
      <div
        className="px-4 md:px-8 py-3 border-b sticky top-0 z-10"
        style={{ background: "oklch(0.98 0.005 90)", borderColor: "oklch(0.88 0.008 90)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(0.52 0.015 65)" }}
            />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Try "low sodium vegetables" or "high protein breakfast"...'
              className="pl-9 pr-9 h-10 text-sm border-2 focus-visible:ring-0"
              style={{
                borderColor: query ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                fontFamily: "Nunito Sans, sans-serif",
                transition: "border-color 0.2s",
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
            {loading && !query && (
              <Loader2
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin"
                style={{ color: "oklch(0.32 0.10 162)" }}
              />
            )}
          </div>

          {/* Popular searches (when no query) */}
          {!query && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {POPULAR_SEARCHES.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors hover:border-[oklch(0.32_0.10_162)] hover:text-[oklch(0.32_0.10_162)]"
                  style={{
                    fontFamily: "Nunito Sans, sans-serif",
                    borderColor: "oklch(0.88 0.008 90)",
                    color: "oklch(0.52 0.015 65)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Results area ──────────────────────────────────── */}
      <div className="flex-1 px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Query interpretation banner ─────────────── */}
          {query && parsedQuery && qConfig && (
            <div
              className="mb-3 rounded-lg px-4 py-2.5 flex flex-wrap items-center gap-2 text-xs border"
              style={{ background: qConfig.bg, borderColor: qConfig.border }}
            >
              {/* Query type badge */}
              <span
                className="flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full"
                style={{ color: qConfig.color, background: "white", border: `1px solid ${qConfig.border}` }}
              >
                {qConfig.icon}
                {qConfig.label}
              </span>

              {/* Active nutrition filters */}
              {parsedQuery.filters.map(f => (
                <span
                  key={f.nutrient}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium"
                  style={{
                    color: "oklch(0.40 0.12 60)",
                    background: "oklch(0.97 0.04 80)",
                    border: "1px solid oklch(0.80 0.10 60)",
                  }}
                >
                  <Filter size={9} />
                  {NUTRIENT_LABELS[f.nutrient] ?? f.nutrient}
                  {" "}
                  {f.operator === "max" ? "≤" : "≥"}
                  {" "}
                  {f.value}{NUTRIENT_UNITS[f.nutrient] ?? ""}
                </span>
              ))}

              {/* Category hints */}
              {parsedQuery.categoryHints.map(h => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{
                    color: "oklch(0.35 0.14 280)",
                    background: "oklch(0.96 0.04 280)",
                    border: "1px solid oklch(0.78 0.10 280)",
                  }}
                >
                  {h}
                </span>
              ))}

              {/* LLM interpretation */}
              {parsedQuery.llmInterpretation && (
                <span style={{ color: qConfig.color }} className="italic">
                  "{parsedQuery.llmInterpretation}"
                </span>
              )}

              {/* Loading indicator for LLM */}
              {loading && query && (
                <Loader2 size={12} className="animate-spin ml-auto" style={{ color: qConfig.color }} />
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
              {results.length > 0 && parsedQuery?.type !== "simple" && (
                <span className="text-xs" style={{ color: "oklch(0.60 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                  Ranked by relevance
                </span>
              )}
            </div>
          )}

          {/* ── Error state ──────────────────────────────── */}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg border mb-4" style={{ borderColor: "oklch(0.80 0.12 30)", background: "oklch(0.97 0.04 30)" }}>
              <AlertCircle size={16} style={{ color: "oklch(0.55 0.18 30)" }} />
              <span className="text-sm" style={{ color: "oklch(0.40 0.15 30)" }}>{error}</span>
            </div>
          )}

          {/* ── Loading skeleton ─────────────────────────── */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border animate-pulse"
                  style={{ borderColor: "oklch(0.92 0.004 286)", background: "oklch(0.97 0.002 286)" }}
                >
                  <div className="h-3 w-20 rounded mb-2" style={{ background: "oklch(0.90 0.004 286)" }} />
                  <div className="h-4 w-3/4 rounded mb-1" style={{ background: "oklch(0.88 0.004 286)" }} />
                  <div className="h-3 w-1/2 rounded" style={{ background: "oklch(0.92 0.004 286)" }} />
                </div>
              ))}
            </div>
          )}

          {/* ── Results grid ─────────────────────────────── */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {results.map(food => (
                <Link key={food.crId} href={`/food/${food.crId}`}>
                  <div
                    className="group rounded-xl p-4 border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      borderColor: "oklch(0.90 0.006 162)",
                      background: "white",
                    }}
                  >
                    {/* Category badge + match indicators */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: "oklch(0.32 0.10 162)",
                          background: "oklch(0.93 0.04 162)",
                          fontFamily: "Nunito Sans, sans-serif",
                        }}
                      >
                        {food.l1Category ?? "Food"}
                      </span>
                      {/* Matched nutrition filter indicators */}
                      {food.matchedFilters.length > 0 && (
                        <div className="flex gap-1">
                          {food.matchedFilters.slice(0, 2).map(f => (
                            <span
                              key={f}
                              className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                              style={{
                                color: "oklch(0.40 0.12 60)",
                                background: "oklch(0.95 0.05 80)",
                                fontSize: "10px",
                              }}
                            >
                              ✓ {NUTRIENT_LABELS[f] ?? f}
                            </span>
                          ))}
                        </div>
                      )}
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
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

                    {/* Description */}
                    {food.description && (
                      <p
                        className="text-xs leading-relaxed line-clamp-2"
                        style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}
                      >
                        {food.description}
                      </p>
                    )}

                    {/* Subgroup */}
                    {food.l2Category && (
                      <p
                        className="text-xs mt-1.5 font-medium"
                        style={{ color: "oklch(0.55 0.08 162)", fontFamily: "Nunito Sans, sans-serif" }}
                      >
                        {food.l2Category}
                      </p>
                    )}
                  </div>
                </Link>
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
                <Search size={28} style={{ color: "oklch(0.32 0.10 162)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.25 0.015 65)" }}
              >
                No foods found
              </h3>
              <p className="text-sm mb-4" style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                Try adjusting your search or use one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SMART_QUERIES.map(sq => (
                  <button
                    key={sq}
                    onClick={() => setQuery(sq)}
                    className="text-sm px-3 py-1.5 rounded-full border transition-colors hover:border-[oklch(0.32_0.10_162)] hover:text-[oklch(0.32_0.10_162)]"
                    style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.52 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Load more ────────────────────────────────── */}
          {!loading && results.length > 0 && results.length < total && (
            <div className="mt-6 text-center">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all hover:shadow-md disabled:opacity-50"
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  borderColor: "oklch(0.32 0.10 162)",
                  color: "oklch(0.32 0.10 162)",
                  background: "white",
                }}
              >
                {isLoadingMore ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Loading...
                  </span>
                ) : (
                  `Load more (${total - results.length} remaining)`
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
