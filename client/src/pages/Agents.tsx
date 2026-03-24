// ============================================================
// FoodDB — Background Agent Status Page
// Design: Tropical Bauhaus — operational dashboard aesthetic
// Shows real-time status of all background enrichment agents
// ============================================================

import { useState, useEffect } from "react";
import {
  Activity, CheckCircle2, XCircle, Clock, RefreshCw,
  Database, Utensils, Image, Globe, ChevronDown, ChevronUp,
  Zap, AlertTriangle, Play
} from "lucide-react";

// ── Agent definitions ─────────────────────────────────────────
interface AgentDef {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  schedule: string;
  sources: string[];
  outputTarget: string;
  color: string;
}

const AGENTS: AgentDef[] = [
  {
    id: "agent-1-hpb",
    name: "HPB Database Sync",
    description: "Syncs the Singapore HPB Food Composition Database — 2,557 foods with 41 nutrients per item.",
    icon: <Database size={16} />,
    schedule: "Weekly (Mon 2 AM SGT)",
    sources: ["HPB Singapore", "data.gov.sg"],
    outputTarget: "fooddb.json (main database)",
    color: "162",
  },
  {
    id: "agent-2-my",
    name: "Malaysia Food DB Sync",
    description: "Syncs Malaysian food composition data from MySihat and MARDI research publications.",
    icon: <Database size={16} />,
    schedule: "Weekly (Mon 3 AM SGT)",
    sources: ["MySihat MY", "MARDI", "UPM Food Lab"],
    outputTarget: "fooddb.json (MY entries)",
    color: "162",
  },
  {
    id: "agent-3-icon",
    name: "Dish Icon Generator",
    description: "Generates copyright-free AI flat-vector illustrations for newly discovered dishes. Each icon is unique and culturally accurate.",
    icon: <Image size={16} />,
    schedule: "Daily (3 AM SGT)",
    sources: ["AI Image Generation", "FoodDB dish list"],
    outputTarget: "webdev-static-assets/dish-*.png",
    color: "55",
  },
  {
    id: "agent-4-menu-scraper",
    name: "Restaurant Menu Scraper",
    description: "Discovers and scrapes menus from 20+ iconic SG/MY venues via GrabFood, Foodpanda, and direct website scraping. Extracts dish names, descriptions, prices, and images.",
    icon: <Utensils size={16} />,
    schedule: "Daily (2 AM SGT)",
    sources: ["GrabFood SG/MY", "Foodpanda SG/MY", "Restaurant websites"],
    outputTarget: "restaurantData.ts (SCRAPED_DISHES)",
    color: "40",
  },
  {
    id: "agent-5-nutrition",
    name: "Nutritional Estimator",
    description: "Maps scraped dish names to FoodDB nutritional entries using fuzzy matching and a curated SG/MY dish lookup table with 30+ dish profiles.",
    icon: <Zap size={16} />,
    schedule: "Daily after Agent 4 (2:30 AM SGT)",
    sources: ["Scraped menus", "HPB lookup table", "FoodDB fuzzy match"],
    outputTarget: "enriched_menus.json",
    color: "280",
  },
  {
    id: "agent-6-web",
    name: "Web Discovery Agent",
    description: "Crawls food blogs, hawker centre directories, and review sites to discover new venues and dishes not yet in the database.",
    icon: <Globe size={16} />,
    schedule: "Weekly (Sun 1 AM SGT)",
    sources: ["HungryGoWhere", "Burpple", "TimeOut SG/MY", "TripAdvisor"],
    outputTarget: "discovery_queue.json",
    color: "200",
  },
];

// ── Pipeline run log (mock + real) ────────────────────────────
interface PipelineRun {
  timestamp: string;
  status: "success" | "partial" | "failed" | "running";
  venues_scraped: number;
  dishes_found: number;
  duration_s: number;
  notes: string;
}

const MOCK_RUN_HISTORY: PipelineRun[] = [
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "success",
    venues_scraped: 20,
    dishes_found: 60,
    duration_s: 42,
    notes: "Dry run — all 20 venues responded. GrabFood: 15/20, Foodpanda: 3/20, Website: 2/20.",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "partial",
    venues_scraped: 17,
    dishes_found: 48,
    duration_s: 68,
    notes: "3 venues returned no data (Tai Hwa, Air Itam, Baba Charlie — no online menu).",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    status: "success",
    venues_scraped: 20,
    dishes_found: 63,
    duration_s: 38,
    notes: "Full run. Song Fa added 4 new seasonal dishes.",
  },
];

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="rounded-xl p-3 border" style={{ background: "white", borderColor: "oklch(0.90 0.005 65)" }}>
      <div className="text-xl font-black" style={{ fontFamily: "Sora, sans-serif", color: `oklch(0.30 0.12 ${color})` }}>{value}</div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: "oklch(0.45 0.015 65)" }}>{label}</div>
      {sub && <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.60 0.015 65)" }}>{sub}</div>}
    </div>
  );
}

// ── Agent Card ────────────────────────────────────────────────
function AgentCard({ agent, isActive }: { agent: AgentDef; isActive: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = isActive ? "oklch(0.35 0.12 162)" : "oklch(0.55 0.015 65)";
  const statusBg = isActive ? "oklch(0.93 0.06 162)" : "oklch(0.95 0.005 65)";
  const statusLabel = isActive ? "Active" : "Idle";
  const statusIcon = isActive ? <CheckCircle2 size={11} /> : <Clock size={11} />;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "oklch(0.90 0.005 65)", background: "white" }}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `oklch(0.93 0.06 ${agent.color})`, color: `oklch(0.30 0.12 ${agent.color})` }}>
            {agent.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                {agent.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: statusBg, color: statusColor }}>
                {statusIcon} {statusLabel}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.50 0.015 65)" }}>
              {agent.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[11px] font-semibold mt-2.5"
          style={{ color: `oklch(0.35 0.10 ${agent.color})` }}
        >
          Details {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>

        {expanded && (
          <div className="mt-2.5 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg p-2.5" style={{ background: "oklch(0.97 0.008 65)" }}>
                <div className="text-[10px] font-bold mb-1" style={{ color: "oklch(0.45 0.015 65)" }}>SCHEDULE</div>
                <div className="text-xs" style={{ color: "oklch(0.30 0.015 65)" }}>{agent.schedule}</div>
              </div>
              <div className="rounded-lg p-2.5" style={{ background: "oklch(0.97 0.008 65)" }}>
                <div className="text-[10px] font-bold mb-1" style={{ color: "oklch(0.45 0.015 65)" }}>OUTPUT</div>
                <div className="text-xs font-mono truncate" style={{ color: "oklch(0.30 0.015 65)" }}>{agent.outputTarget}</div>
              </div>
            </div>
            <div className="rounded-lg p-2.5" style={{ background: "oklch(0.97 0.008 65)" }}>
              <div className="text-[10px] font-bold mb-1" style={{ color: "oklch(0.45 0.015 65)" }}>DATA SOURCES</div>
              <div className="flex flex-wrap gap-1">
                {agent.sources.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `oklch(0.93 0.04 ${agent.color})`, color: `oklch(0.35 0.08 ${agent.color})` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Run History Row ───────────────────────────────────────────
function RunRow({ run }: { run: PipelineRun }) {
  const statusConfig = {
    success: { icon: <CheckCircle2 size={12} />, color: "oklch(0.35 0.12 162)", bg: "oklch(0.93 0.06 162)", label: "Success" },
    partial: { icon: <AlertTriangle size={12} />, color: "oklch(0.35 0.12 55)", bg: "oklch(0.93 0.06 55)", label: "Partial" },
    failed: { icon: <XCircle size={12} />, color: "oklch(0.35 0.12 15)", bg: "oklch(0.93 0.06 15)", label: "Failed" },
    running: { icon: <RefreshCw size={12} className="animate-spin" />, color: "oklch(0.35 0.12 200)", bg: "oklch(0.93 0.06 200)", label: "Running" },
  };
  const cfg = statusConfig[run.status];
  const date = new Date(run.timestamp);

  return (
    <div className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "oklch(0.93 0.005 65)" }}>
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: cfg.bg, color: cfg.color }}>
        {cfg.icon} {cfg.label}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold" style={{ color: "oklch(0.30 0.015 65)" }}>
            {date.toLocaleDateString("en-SG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="text-[10px]" style={{ color: "oklch(0.55 0.015 65)" }}>
            {run.venues_scraped} venues · {run.dishes_found} dishes · {run.duration_s}s
          </span>
        </div>
        <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "oklch(0.50 0.015 65)" }}>
          {run.notes}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Agents() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Simulate a live status refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setRefreshing(false);
    }, 1200);
  };

  // Auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(() => setLastRefresh(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const activeAgents = ["agent-4-menu-scraper", "agent-5-nutrition"];

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.008 65)" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.16 0.04 280) 0%, oklch(0.20 0.05 200) 100%)", minHeight: "160px" }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: "oklch(0.85 0.12 200)", transform: "translate(30%, -30%)" }} />
        <div className="container py-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.85 0.12 200)" }}>
                <Activity size={18} style={{ color: "oklch(0.20 0.10 200)" }} />
              </div>
              <div>
                <h1 className="text-xl font-black" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.97 0.02 65)" }}>
                  Background Agents
                </h1>
                <p className="text-xs" style={{ color: "oklch(0.75 0.04 65)" }}>
                  Autonomous enrichment pipeline — running 24/7
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "oklch(0.25 0.04 65 / 0.4)", color: "oklch(0.85 0.04 65)" }}
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-xl p-2.5 text-center" style={{ background: "oklch(0.22 0.04 65 / 0.5)" }}>
              <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.90 0.10 200)" }}>6</div>
              <div className="text-[10px] font-semibold" style={{ color: "oklch(0.70 0.04 65)" }}>Agents</div>
            </div>
            <div className="rounded-xl p-2.5 text-center" style={{ background: "oklch(0.22 0.04 65 / 0.5)" }}>
              <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.90 0.10 162)" }}>2</div>
              <div className="text-[10px] font-semibold" style={{ color: "oklch(0.70 0.04 65)" }}>Active Now</div>
            </div>
            <div className="rounded-xl p-2.5 text-center" style={{ background: "oklch(0.22 0.04 65 / 0.5)" }}>
              <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.90 0.10 55)" }}>20</div>
              <div className="text-[10px] font-semibold" style={{ color: "oklch(0.70 0.04 65)" }}>Venues</div>
            </div>
            <div className="rounded-xl p-2.5 text-center" style={{ background: "oklch(0.22 0.04 65 / 0.5)" }}>
              <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.90 0.10 280)" }}>Daily</div>
              <div className="text-[10px] font-semibold" style={{ color: "oklch(0.70 0.04 65)" }}>Cadence</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 space-y-4">

        {/* Pipeline Architecture */}
        <div className="rounded-2xl border p-4" style={{ background: "white", borderColor: "oklch(0.90 0.005 65)" }}>
          <h2 className="text-sm font-bold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.22 0.015 65)" }}>
            Enrichment Pipeline
          </h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {[
              { step: "1", label: "Scrape", sub: "GrabFood / Foodpanda / Web", color: "40" },
              { step: "→", label: "", sub: "", color: "65", isArrow: true },
              { step: "2", label: "Estimate", sub: "Nutrition matching", color: "280" },
              { step: "→", label: "", sub: "", color: "65", isArrow: true },
              { step: "3", label: "Merge", sub: "Into restaurantData.ts", color: "162" },
              { step: "→", label: "", sub: "", color: "65", isArrow: true },
              { step: "4", label: "Live", sub: "PWA auto-updates", color: "55" },
            ].map((s, i) =>
              s.isArrow ? (
                <div key={i} className="text-lg flex-shrink-0" style={{ color: "oklch(0.70 0.015 65)" }}>→</div>
              ) : (
                <div key={i} className="rounded-xl p-2.5 text-center flex-shrink-0 min-w-[80px]" style={{ background: `oklch(0.93 0.04 ${s.color})` }}>
                  <div className="text-base font-black" style={{ color: `oklch(0.30 0.12 ${s.color})`, fontFamily: "Sora, sans-serif" }}>{s.step}</div>
                  <div className="text-[11px] font-bold" style={{ color: `oklch(0.30 0.10 ${s.color})` }}>{s.label}</div>
                  <div className="text-[9px]" style={{ color: `oklch(0.45 0.08 ${s.color})` }}>{s.sub}</div>
                </div>
              )
            )}
          </div>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "oklch(0.50 0.015 65)" }}>
            Runs daily at <strong>2:00 AM SGT</strong>. Each run scrapes all 20 target venues, estimates nutritional values for discovered dishes, and patches the live PWA data — no manual intervention required.
          </p>
        </div>

        {/* Agent Cards */}
        <div>
          <h2 className="text-sm font-bold mb-2.5" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.22 0.015 65)" }}>
            Agent Registry
          </h2>
          <div className="space-y-2.5">
            {AGENTS.map(agent => (
              <AgentCard key={agent.id} agent={agent} isActive={activeAgents.includes(agent.id)} />
            ))}
          </div>
        </div>

        {/* Run History */}
        <div className="rounded-2xl border p-4" style={{ background: "white", borderColor: "oklch(0.90 0.005 65)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.22 0.015 65)" }}>
              Recent Pipeline Runs
            </h2>
            <span className="text-[10px]" style={{ color: "oklch(0.60 0.015 65)" }}>
              Last refreshed: {lastRefresh.toLocaleTimeString("en-SG")}
            </span>
          </div>
          <div>
            {MOCK_RUN_HISTORY.map((run, i) => (
              <RunRow key={i} run={run} />
            ))}
          </div>
        </div>

        {/* Coverage Map */}
        <div className="rounded-2xl border p-4" style={{ background: "white", borderColor: "oklch(0.90 0.005 65)" }}>
          <h2 className="text-sm font-bold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.22 0.015 65)" }}>
            Venue Coverage
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { region: "🇸🇬 Singapore", venues: 12, dishes: 38, color: "162" },
              { region: "🇲🇾 Penang", venues: 3, dishes: 9, color: "55" },
              { region: "🇲🇾 Kuala Lumpur", venues: 3, dishes: 9, color: "40" },
              { region: "🇲🇾 Malacca", venues: 2, dishes: 6, color: "280" },
            ].map(r => (
              <div key={r.region} className="rounded-xl p-3 border" style={{ borderColor: "oklch(0.90 0.005 65)" }}>
                <div className="text-sm font-bold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>{r.region}</div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: `oklch(0.30 0.12 ${r.color})` }}>{r.venues}</div>
                    <div className="text-[10px]" style={{ color: "oklch(0.55 0.015 65)" }}>venues</div>
                  </div>
                  <div>
                    <div className="text-lg font-black" style={{ fontFamily: "Sora, sans-serif", color: `oklch(0.30 0.12 ${r.color})` }}>{r.dishes}</div>
                    <div className="text-[10px]" style={{ color: "oklch(0.55 0.015 65)" }}>dishes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl p-4 border" style={{ background: "oklch(0.97 0.03 280)", borderColor: "oklch(0.88 0.06 280)" }}>
          <div className="flex items-start gap-3">
            <Play size={16} style={{ color: "oklch(0.35 0.12 280)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: "oklch(0.25 0.12 280)" }}>Next Phases (Roadmap)</p>
              <ul className="text-xs space-y-1" style={{ color: "oklch(0.40 0.08 280)" }}>
                <li>• <strong>Phase 2:</strong> Expand to 50+ venues (Jalan Alor, Geylang Serai, Gurney Drive)</li>
                <li>• <strong>Phase 3:</strong> Add hotel dining venues (Raffles, MBS, Shangri-La coffee houses)</li>
                <li>• <strong>Phase 4:</strong> Live menu change detection — alert when seasonal dishes appear</li>
                <li>• <strong>Phase 5:</strong> User-submitted dish corrections with confidence scoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
