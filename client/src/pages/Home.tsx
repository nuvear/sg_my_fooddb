// FoodDB Home — Tropical Bauhaus search page
// Hero banner with SG/MY food image, live search bar, results grid

import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { Search, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchFoods } from "@/lib/api";
import type { FoodSearchResult } from "@/lib/nutrients";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-hero-iyRvqRrDQ2nDSt5EGi6x2x.webp";

const POPULAR_SEARCHES = [
  "Nasi Lemak", "Char Kway Teow", "Laksa", "Chicken Rice",
  "Roti Canai", "Satay", "Mee Goreng", "Wonton Mee",
  "Bak Chor Mee", "Curry Puff", "Kaya Toast", "Teh Tarik",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodSearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string, p = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const { items, total: t } = await searchFoods(q, p);
      setResults(prev => append ? [...prev, ...items] : items);
      setTotal(t);
      setPage(p);
      setHasSearched(true);
    } catch (e: any) {
      setError("Unable to reach the SG FoodID database. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load — show first page of all foods
  useEffect(() => {
    doSearch("", 1);
  }, []);

  // Debounced search on query change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query, 1);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const loadMore = () => doSearch(query, page + 1, true);

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
          style={{ background: "linear-gradient(to right, oklch(0.12 0.09 162 / 0.85) 0%, oklch(0.12 0.09 162 / 0.4) 60%, transparent 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
          <h1
            className="text-2xl md:text-3xl font-extrabold leading-tight mb-1"
            style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}
          >
            SG & MY Food Database
          </h1>
          <p className="text-sm md:text-base" style={{ color: "oklch(0.85 0.04 162)" }}>
            2,500+ foods · 41 nutrient fields · HPB SG FoodID data
          </p>
        </div>
      </div>

      {/* ── Search bar ────────────────────────────────────── */}
      <div
        className="px-4 md:px-8 py-4 border-b sticky top-0 z-10"
        style={{ background: "oklch(0.98 0.005 90)", borderColor: "oklch(0.88 0.008 90)" }}
      >
        <div className="max-w-2xl mx-auto relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "oklch(0.52 0.015 65)" }}
          />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search foods — e.g. Nasi Lemak, Char Kway Teow, Laksa..."
            className="pl-9 h-10 text-sm border-2 focus-visible:ring-0"
            style={{
              borderColor: query ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          />
          {loading && (
            <Loader2
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin"
              style={{ color: "oklch(0.32 0.10 162)" }}
            />
          )}
        </div>

        {/* Popular searches */}
        {!query && (
          <div className="max-w-2xl mx-auto mt-2 flex flex-wrap gap-1.5">
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

      {/* ── Results ───────────────────────────────────────── */}
      <div className="flex-1 px-4 md:px-8 py-4">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg mb-4 text-sm"
            style={{ background: "oklch(0.94 0.06 25)", color: "oklch(0.45 0.18 25)" }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {hasSearched && (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs" style={{ color: "oklch(0.52 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              {query ? `${total.toLocaleString()} results for "${query}"` : `${total.toLocaleString()} foods in database`}
            </p>
            <span className="text-xs" style={{ color: "oklch(0.52 0.015 65)" }}>
              Showing {results.length}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map(item => (
            <FoodCard key={item.crId} item={item} />
          ))}
        </div>

        {/* Load more */}
        {results.length < total && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loading}
              className="border-2 font-semibold text-sm px-6"
              style={{
                borderColor: "oklch(0.32 0.10 162)",
                color: "oklch(0.32 0.10 162)",
                fontFamily: "Sora, sans-serif",
              }}
            >
              {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
              Load More ({total - results.length} remaining)
            </Button>
          </div>
        )}

        {!loading && results.length === 0 && hasSearched && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold mb-1" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
              No foods found
            </p>
            <p className="text-sm" style={{ color: "oklch(0.52 0.015 65)" }}>
              Try a different search term, or{" "}
              <Link href="/import" className="underline" style={{ color: "oklch(0.32 0.10 162)" }}>
                paste an entry from HPB
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FoodCard({ item }: { item: FoodSearchResult }) {
  const groupColor = getGroupColor(item.l1Category ?? "");

  return (
    <Link href={`/food/${item.crId}`}>
      <div className="food-card p-4 cursor-pointer h-full flex flex-col">
        {/* Category badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="pill-badge text-[10px]"
            style={{
              background: groupColor.bg,
              color: groupColor.text,
              fontFamily: "Sora, sans-serif",
            }}
          >
            {item.l1Category ?? "Food"}
          </span>
          <ChevronRight size={14} style={{ color: "oklch(0.65 0.07 162)", flexShrink: 0, marginTop: 2 }} />
        </div>

        {/* Name */}
        <h3
          className="font-bold text-sm leading-snug mb-1 flex-1"
          style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}
        >
          {item.name}
        </h3>

        {/* Description */}
        {item.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.52 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}
          >
            {item.description}
          </p>
        )}

        {/* Subgroup */}
        {item.l2Category && (
          <div className="mt-2 pt-2 border-t" style={{ borderColor: "oklch(0.92 0.004 90)" }}>
            <span className="text-[10px]" style={{ color: "oklch(0.65 0.07 162)", fontFamily: "Nunito Sans, sans-serif" }}>
              {item.l2Category}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

const GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  "Beverages":          { bg: "oklch(0.90 0.06 220)", text: "oklch(0.28 0.10 220)" },
  "Cereals & Grains":   { bg: "oklch(0.94 0.06 75)",  text: "oklch(0.40 0.14 65)" },
  "Meat & Poultry":     { bg: "oklch(0.93 0.05 25)",  text: "oklch(0.42 0.15 25)" },
  "Vegetables":         { bg: "oklch(0.90 0.06 145)",  text: "oklch(0.28 0.10 145)" },
  "Fruits":             { bg: "oklch(0.93 0.08 55)",   text: "oklch(0.42 0.14 55)" },
  "Seafood":            { bg: "oklch(0.90 0.06 200)",  text: "oklch(0.28 0.10 200)" },
  "Dairy":              { bg: "oklch(0.94 0.03 90)",   text: "oklch(0.40 0.06 65)" },
  "Snacks":             { bg: "oklch(0.93 0.07 35)",   text: "oklch(0.42 0.15 35)" },
  "Mixed Dishes":       { bg: "oklch(0.90 0.06 162)",  text: "oklch(0.28 0.10 162)" },
};

function getGroupColor(group: string): { bg: string; text: string } {
  for (const [key, val] of Object.entries(GROUP_COLORS)) {
    if (group.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return { bg: "oklch(0.92 0.03 162)", text: "oklch(0.32 0.10 162)" };
}
