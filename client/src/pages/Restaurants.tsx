// ============================================================
// FoodDB — Restaurants & Hawker Stalls Page (v2)
// Design: Tropical Bauhaus — food culture is the hero
// ============================================================

import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import {
  RESTAURANTS,
  DISH_ICONS,
  TIER_LABELS,
  AWARD_LABELS,
  HEALTH_FLAG_LABELS,
  getMichelinRestaurants,
  type Restaurant,
  type RestaurantTier,
  type AwardBadge,
  type RestaurantDish,
} from "@/lib/restaurantData";
import {
  MapPin, Utensils, Filter, X,
  BookOpen, Clock, Search, ChevronDown, ChevronUp
} from "lucide-react";

// ── Dish icon fallback map ────────────────────────────────────
const DISH_ICON_FALLBACK: Array<[string, string]> = [
  ["chicken rice", DISH_ICONS.chickenRice],
  ["chicken", DISH_ICONS.chickenRice],
  ["laksa", DISH_ICONS.laksa],
  ["crab", DISH_ICONS.chilliCrab],
  ["kway teow", DISH_ICONS.charKwayTeow],
  ["char kway", DISH_ICONS.charKwayTeow],
  ["bak kut", DISH_ICONS.bakKutTeh],
  ["pork rib", DISH_ICONS.bakKutTeh],
  ["satay", DISH_ICONS.satay],
  ["hokkien mee", DISH_ICONS.hokkienMee],
  ["hokkien", DISH_ICONS.hokkienMee],
  ["roti", DISH_ICONS.rotiCanai],
  ["nasi lemak", DISH_ICONS.nasiLemak],
  ["nasi kandar", DISH_ICONS.nasiPadang],
  ["nasi padang", DISH_ICONS.nasiPadang],
  ["nasi", DISH_ICONS.nasiLemak],
  ["popiah", DISH_ICONS.popiah],
  ["kaya", DISH_ICONS.kayaToast],
  ["prawn mee", DISH_ICONS.prawnMee],
  ["prawn", DISH_ICONS.prawnMee],
  ["mee rebus", DISH_ICONS.meeRebus],
  ["wonton", DISH_ICONS.wontonMee],
  ["noodle", DISH_ICONS.wontonMee],
  ["mee", DISH_ICONS.wontonMee],
];

function getDishIcon(dish: RestaurantDish): string {
  if (dish.iconUrl) return dish.iconUrl;
  const name = dish.name.toLowerCase();
  for (const [key, url] of DISH_ICON_FALLBACK) {
    if (name.includes(key)) return url;
  }
  return DISH_ICONS.nasiLemak;
}

// ── Award Badge ───────────────────────────────────────────────
function AwardChip({ award }: { award: AwardBadge }) {
  const isMichelin = award.startsWith("michelin");
  const label = AWARD_LABELS[award];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{
        background: isMichelin ? "oklch(0.95 0.06 280)" : "oklch(0.95 0.06 45)",
        color: isMichelin ? "oklch(0.30 0.15 280)" : "oklch(0.35 0.12 45)",
      }}
    >
      {isMichelin ? "⭐" : "🏆"} {label}
    </span>
  );
}

// ── Tier Badge ────────────────────────────────────────────────
const TIER_COLORS: Record<RestaurantTier, { bg: string; color: string }> = {
  "hawker-legend":  { bg: "oklch(0.95 0.06 162)", color: "oklch(0.28 0.12 162)" },
  "premium-local":  { bg: "oklch(0.95 0.06 200)", color: "oklch(0.28 0.12 200)" },
  "fine-dining":    { bg: "oklch(0.95 0.06 280)", color: "oklch(0.28 0.12 280)" },
  "chain":          { bg: "oklch(0.95 0.04 65)",  color: "oklch(0.35 0.08 65)" },
  "mamak":          { bg: "oklch(0.95 0.06 40)",  color: "oklch(0.30 0.12 40)" },
  "kopitiam":       { bg: "oklch(0.95 0.06 55)",  color: "oklch(0.30 0.12 55)" },
};

function TierBadge({ tier }: { tier: RestaurantTier }) {
  const c = TIER_COLORS[tier];
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.color }}>
      {TIER_LABELS[tier]}
    </span>
  );
}

// ── Health Flag Chip ──────────────────────────────────────────
function HealthFlagChip({ flag, note }: { flag: string; note?: string }) {
  const meta = HEALTH_FLAG_LABELS[flag as keyof typeof HEALTH_FLAG_LABELS];
  if (!meta) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: meta.bg, color: meta.color }}>
        {meta.label}
      </span>
      {note && <span className="text-[9px] px-1" style={{ color: "#8B9AB0" }}>↳ {note}</span>}
    </div>
  );
}

// ── Dish Card ─────────────────────────────────────────────────
function DishCard({ dish, onSearchClick }: { dish: RestaurantDish; onSearchClick: (term: string) => void }) {
  const iconUrl = getDishIcon(dish);
  return (
    <div className="rounded-xl border overflow-hidden flex" style={{ borderColor: "oklch(0.90 0.005 65)", background: "white" }}>
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden" style={{ background: "oklch(0.97 0.02 65)" }}>
        <img src={iconUrl} alt={dish.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0 p-2.5">
        <div className="flex items-start justify-between gap-1 mb-1">
          <span className="text-xs font-bold leading-snug" style={{ color: "oklch(0.22 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            {dish.name}
          </span>
          {dish.estimatedKcal && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: "oklch(0.93 0.06 55)", color: "oklch(0.35 0.12 55)" }}>
              ~{dish.estimatedKcal} kcal
            </span>
          )}
        </div>
        {dish.description && (
          <p className="text-[11px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: "oklch(0.50 0.015 65)" }}>
            {dish.description}
          </p>
        )}
        <div className="flex items-center gap-1 flex-wrap">
          {dish.healthFlags.slice(0, 3).map((hf, j) => (
            <HealthFlagChip key={j} flag={hf.flag} note={hf.note} />
          ))}
          <button
            onClick={() => onSearchClick(dish.name)}
            className="ml-auto flex items-center gap-0.5 text-[10px] font-semibold hover:underline"
            style={{ color: "#6D5BD0" }}
          >
            <Search size={9} /> Nutrition
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Restaurant Card ───────────────────────────────────────────
function RestaurantCard({ restaurant, onSearchDish }: { restaurant: Restaurant; onSearchDish: (term: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [showCulture, setShowCulture] = useState(false);

  const regionEmoji: Record<string, string> = {
    singapore: "🇸🇬", penang: "🇲🇾", kl: "🇲🇾",
    malacca: "🇲🇾", johor: "🇲🇾", malaysia: "🇲🇾",
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: "oklch(0.90 0.005 65)" }}>
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: "oklch(0.95 0.04 55)" }}>
            {regionEmoji[restaurant.region] || "🍽️"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1.5 flex-wrap mb-1">
              <TierBadge tier={restaurant.tier} />
              {restaurant.awards.slice(0, 2).map(a => <AwardChip key={a} award={a} />)}
            </div>
            <h3 className="font-bold text-base leading-snug" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              {restaurant.area && (
                <div className="flex items-center gap-1">
                  <MapPin size={10} style={{ color: "#8B9AB0" }} />
                  <span className="text-[11px]" style={{ color: "#8B9AB0" }}>{restaurant.area}</span>
                </div>
              )}
              {restaurant.operatingSince && (
                <div className="flex items-center gap-1">
                  <Clock size={10} style={{ color: "#8B9AB0" }} />
                  <span className="text-[11px]" style={{ color: "#8B9AB0" }}>Est. {restaurant.operatingSince}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs mt-2.5 leading-relaxed" style={{ color: "oklch(0.50 0.015 65)" }}>
          {restaurant.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {restaurant.ethnic.map(e => (
            <span key={e} className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: "oklch(0.95 0.03 162)", color: "oklch(0.35 0.08 162)" }}>
              {e}
            </span>
          ))}
        </div>
      </div>

      {restaurant.culturalNote && (
        <div className="px-4 pb-2">
          <button
            className="flex items-center gap-1.5 text-xs font-semibold w-full text-left"
            style={{ color: "oklch(0.38 0.12 55)" }}
            onClick={() => setShowCulture(!showCulture)}
          >
            <BookOpen size={12} />
            Cultural Story
            {showCulture ? <ChevronUp size={12} className="ml-auto" /> : <ChevronDown size={12} className="ml-auto" />}
          </button>
          {showCulture && (
            <div className="mt-2 rounded-xl p-3 text-xs leading-relaxed" style={{ background: "oklch(0.97 0.04 55)", color: "oklch(0.35 0.08 55)", borderLeft: "3px solid oklch(0.70 0.10 55)" }}>
              {restaurant.culturalNote}
            </div>
          )}
        </div>
      )}

      <div className="px-4 pb-4">
        <button
          className="flex items-center gap-1.5 text-xs font-semibold mb-2 w-full"
          style={{ color: "#6D5BD0" }}
          onClick={() => setExpanded(!expanded)}
        >
          <Utensils size={12} />
          {restaurant.signatureDishes.length} Signature Dish{restaurant.signatureDishes.length > 1 ? "es" : ""}
          {expanded ? <ChevronUp size={12} className="ml-auto" /> : <ChevronDown size={12} className="ml-auto" />}
        </button>
        {expanded && (
          <div className="space-y-2">
            {restaurant.signatureDishes.map((dish, i) => (
              <DishCard key={i} dish={dish} onSearchClick={onSearchDish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Filter config ─────────────────────────────────────────────
const REGION_FILTERS = [
  { value: "all", label: "All Regions" },
  { value: "singapore", label: "🇸🇬 Singapore" },
  { value: "penang", label: "🇲🇾 Penang" },
  { value: "kl", label: "🇲🇾 Kuala Lumpur" },
  { value: "malaysia", label: "🇲🇾 Malaysia" },
];

const TIER_FILTERS: { value: RestaurantTier | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "hawker-legend", label: "Hawker Legends" },
  { value: "premium-local", label: "Premium Local" },
  { value: "fine-dining", label: "Fine Dining" },
  { value: "chain", label: "Chains" },
  { value: "mamak", label: "Mamak" },
];

const STATS = [
  { label: "Venues", value: RESTAURANTS.length.toString() },
  { label: "Michelin", value: getMichelinRestaurants().length.toString() },
  { label: "Countries", value: "2" },
  { label: "Dishes", value: RESTAURANTS.reduce((a, r) => a + r.signatureDishes.length, 0).toString() },
];

export default function Restaurants() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState<RestaurantTier | "all">("all");
  const [michelinOnly, setMichelinOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = RESTAURANTS;
    if (regionFilter !== "all") list = list.filter(r => r.region === regionFilter);
    if (tierFilter !== "all") list = list.filter(r => r.tier === tierFilter);
    if (michelinOnly) list = list.filter(r => r.awards.some(a => a.startsWith("michelin")));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.shortName.toLowerCase().includes(q) ||
        r.area?.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.culturalNote?.toLowerCase().includes(q) ?? false) ||
        r.signatureDishes.some(d => d.name.toLowerCase().includes(q) || (d.description?.toLowerCase().includes(q) ?? false)) ||
        r.ethnic.some(e => e.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery, regionFilter, tierFilter, michelinOnly]);

  function handleSearchDish(term: string) {
    navigate(`/?q=${encodeURIComponent(term)}`);
  }

  const hasFilters = regionFilter !== "all" || tierFilter !== "all" || michelinOnly || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.008 65)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.18 0.04 162) 0%, oklch(0.22 0.06 55) 100%)", minHeight: "200px" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "oklch(0.85 0.12 55)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "oklch(0.85 0.12 162)", transform: "translate(-30%, 30%)" }} />
        <div className="container py-8 relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "oklch(0.85 0.12 55)" }}>
              🏮
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.97 0.02 65)" }}>
                Hawker Legends &amp; Restaurants
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "oklch(0.80 0.04 65)" }}>
                Iconic venues of Singapore &amp; Malaysia with cultural stories and nutritional intelligence
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {STATS.map(s => (
              <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: "oklch(0.25 0.04 65 / 0.4)" }}>
                <div className="text-lg font-black" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.90 0.10 55)" }}>{s.value}</div>
                <div className="text-[10px] font-semibold" style={{ color: "oklch(0.75 0.04 65)" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B9AB0" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search venues, dishes, or ethnic tradition..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border-0 outline-none"
              style={{ background: "white", color: "#0A1F44", boxShadow: "0 2px 8px oklch(0.10 0.02 65 / 0.15)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} style={{ color: "#8B9AB0" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="sticky top-0 z-20 border-b" style={{ background: "white", borderColor: "oklch(0.92 0.005 65)" }}>
        <div className="container py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            <Filter size={13} style={{ color: "#8B9AB0", flexShrink: 0 }} />
            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-full border font-semibold cursor-pointer flex-shrink-0 outline-none"
              style={{ background: regionFilter !== "all" ? "oklch(0.92 0.06 162)" : "white", borderColor: "oklch(0.88 0.005 65)", color: "oklch(0.25 0.015 65)" }}>
              {REGION_FILTERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <select value={tierFilter} onChange={e => setTierFilter(e.target.value as RestaurantTier | "all")}
              className="text-xs px-3 py-1.5 rounded-full border font-semibold cursor-pointer flex-shrink-0 outline-none"
              style={{ background: tierFilter !== "all" ? "oklch(0.92 0.06 162)" : "white", borderColor: "oklch(0.88 0.005 65)", color: "oklch(0.25 0.015 65)" }}>
              {TIER_FILTERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <button onClick={() => setMichelinOnly(!michelinOnly)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold flex-shrink-0 transition-colors"
              style={{ background: michelinOnly ? "oklch(0.92 0.06 280)" : "white", borderColor: michelinOnly ? "oklch(0.60 0.12 280)" : "oklch(0.88 0.005 65)", color: michelinOnly ? "oklch(0.28 0.12 280)" : "#2F3A4A" }}>
              ⭐ Michelin Only
            </button>
            {hasFilters && (
              <button onClick={() => { setRegionFilter("all"); setTierFilter("all"); setMichelinOnly(false); setSearchQuery(""); }}
                className="flex items-center gap-1 text-xs font-semibold flex-shrink-0 ml-auto"
                style={{ color: "#6D5BD0" }}>
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "#4A5568" }}>
            {filtered.length} venue{filtered.length !== 1 ? "s" : ""}{searchQuery && ` matching "${searchQuery}"`}
          </p>
          <p className="text-xs" style={{ color: "oklch(0.60 0.015 65)" }}>Tap a dish to search nutrition DB</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: "#EDE9FB" }}>🏮</div>
            <h3 className="font-bold text-lg mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>No venues found</h3>
            <p className="text-sm" style={{ color: "#8B9AB0" }}>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} onSearchDish={handleSearchDish} />
            ))}
          </div>
        )}

        {/* Cultural Context Banner */}
        <div className="mt-6 rounded-2xl p-5 border" style={{ background: "oklch(0.97 0.04 162)", borderColor: "oklch(0.88 0.06 162)" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🌏</span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: "oklch(0.25 0.10 162)" }}>The Transnational Plate</p>
              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.40 0.08 162)" }}>
                Singapore and Malaysia share a food culture shaped by centuries of migration, trade, and cultural exchange.
                Hainanese, Hokkien, Teochew, Cantonese, Malay, Indian Muslim, and Peranakan traditions have merged into
                a cuisine that is simultaneously local and transnational — dishes that exist nowhere else on earth.
              </p>
            </div>
          </div>
        </div>

        {/* Agent notice */}
        <div className="mt-3 rounded-2xl p-4 border" style={{ background: "oklch(0.97 0.03 55)", borderColor: "oklch(0.88 0.06 55)" }}>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🤖</span>
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: "oklch(0.30 0.10 55)" }}>Background Enrichment Agents</p>
              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.45 0.08 55)" }}>
                Agent 4 (Restaurant Menu Scraper) continuously discovers new venues and menu items across SG &amp; MY.
                Agent 5 (Dish Icon Generator) creates copyright-free AI illustrations — all dish icons above were AI-generated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
