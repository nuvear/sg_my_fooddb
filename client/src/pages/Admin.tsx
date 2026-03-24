// ============================================================
// FoodDB — Admin Dashboard
// Features:
//   - Stats overview (users, restaurants, dishes, meal logs)
//   - Restaurant approval workflow (pending → approved / rejected)
//   - Background agent run history
//   - Quick links to all admin sub-sections
// Access: admin role only
// ============================================================

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import {
  Users, UtensilsCrossed, ChefHat, BookOpen, Activity,
  CheckCircle2, XCircle, Clock, AlertCircle, RefreshCw,
  ShieldCheck, Database, Zap, TrendingUp, Eye, ThumbsUp, ThumbsDown
} from "lucide-react";
import { toast } from "sonner";

// ── Tier badge colours ────────────────────────────────────────
const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  "hawker-legend":  { bg: "#fef3c7", text: "#92400e" },
  "premium-local":  { bg: "#dbeafe", text: "#1e40af" },
  "fine-dining":    { bg: "#f3e8ff", text: "#6b21a8" },
  "chain":          { bg: "#f0fdf4", text: "#166534" },
  "mamak":          { bg: "#fff7ed", text: "#9a3412" },
  "kopitiam":       { bg: "#fdf4ff", text: "#7e22ce" },
};

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  pending:  { icon: <Clock size={13} />,        color: "#92400e", bg: "#fef3c7", label: "Pending" },
  approved: { icon: <CheckCircle2 size={13} />, color: "#166534", bg: "#dcfce7", label: "Approved" },
  rejected: { icon: <XCircle size={13} />,      color: "#991b1b", bg: "#fee2e2", label: "Rejected" },
  draft:    { icon: <AlertCircle size={13} />,  color: "#1e40af", bg: "#dbeafe", label: "Draft" },
};

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: number | string;
  sub?: string; color: string;
}) {
  return (
    <div className="rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + "20" }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>{value}</div>
        <div className="text-xs font-semibold" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>{label}</div>
        {sub && <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.60 0.015 65)" }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Restaurant Row ────────────────────────────────────────────
function RestaurantRow({ restaurant, onReview }: {
  restaurant: {
    id: number; name: string; shortName?: string | null; tier: string;
    region: string; area?: string | null; status: string;
    awards?: string[] | null; submittedAt?: Date | null;
  };
  onReview: (id: number, status: "approved" | "rejected", note?: string) => void;
}) {
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const tierCfg = TIER_COLORS[restaurant.tier] ?? { bg: "#f8fafc", text: "#475569" };
  const statusCfg = STATUS_CONFIG[restaurant.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="border rounded-xl p-4 mb-3" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
              {restaurant.name}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: tierCfg.bg, color: tierCfg.text }}>
              {restaurant.tier}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: statusCfg.bg, color: statusCfg.color }}>
              {statusCfg.icon} {statusCfg.label}
            </span>
          </div>
          <div className="text-xs" style={{ color: "oklch(0.55 0.015 65)" }}>
            {restaurant.region} {restaurant.area ? `· ${restaurant.area}` : ""}
            {restaurant.awards && restaurant.awards.length > 0 && (
              <span className="ml-2 font-semibold" style={{ color: "oklch(0.50 0.14 60)" }}>
                ★ {restaurant.awards.join(", ")}
              </span>
            )}
          </div>
        </div>

        {restaurant.status === "pending" && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onReview(restaurant.id, "approved")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
              style={{ background: "#dcfce7", color: "#166534" }}
            >
              <ThumbsUp size={12} /> Approve
            </button>
            <button
              onClick={() => setShowNote(v => !v)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
              style={{ background: "#fee2e2", color: "#991b1b" }}
            >
              <ThumbsDown size={12} /> Reject
            </button>
          </div>
        )}
      </div>

      {showNote && (
        <div className="mt-3 flex gap-2">
          <input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Reason for rejection (optional)..."
            className="flex-1 text-xs px-3 py-1.5 rounded-lg border outline-none focus:ring-1"
            style={{ borderColor: "oklch(0.85 0.006 162)", fontFamily: "Nunito Sans, sans-serif" }}
          />
          <button
            onClick={() => { onReview(restaurant.id, "rejected", note); setShowNote(false); }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "#fee2e2", color: "#991b1b" }}
          >
            Confirm Reject
          </button>
        </div>
      )}
    </div>
  );
}

// ── Agent Run Row ─────────────────────────────────────────────
function AgentRunRow({ run }: {
  run: { file: string; date: string; status: string; dishesFound: number; errorCount: number; lineCount: number };
}) {
  const isSuccess = run.status === "success";
  return (
    <div className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "oklch(0.93 0.004 162)" }}>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isSuccess ? "bg-green-500" : "bg-amber-500"}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.25 0.015 65)" }}>
          {run.date.replace(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/, "$3/$2/$1 $4:$5:$6")}
        </div>
        <div className="text-[10px]" style={{ color: "oklch(0.55 0.015 65)" }}>
          {run.dishesFound} dishes found · {run.lineCount} log lines · {run.errorCount} errors
        </div>
      </div>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={{ background: isSuccess ? "#dcfce7" : "#fef3c7", color: isSuccess ? "#166534" : "#92400e" }}
      >
        {run.status}
      </span>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────
export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected" | "draft">("pending");

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = trpc.admin.stats.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
    retry: false,
  });

  const { data: restaurantList, isLoading: restsLoading, refetch: refetchRests } = trpc.admin.listRestaurants.useQuery(
    { status: statusFilter, limit: 50, offset: 0 },
    { enabled: !!user && user.role === "admin", retry: false }
  );

  const { data: agentHistory, isLoading: agentLoading } = trpc.admin.agentHistory.useQuery(
    { limit: 10 },
    { enabled: !!user && user.role === "admin", retry: false }
  );

  const reviewMutation = trpc.admin.reviewRestaurant.useMutation({
    onSuccess: () => {
      toast.success("Restaurant status updated");
      refetchRests();
      refetchStats();
    },
    onError: (err) => toast.error(err.message),
  });

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw size={24} className="animate-spin" style={{ color: "oklch(0.32 0.10 162)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <ShieldCheck size={48} style={{ color: "oklch(0.32 0.10 162)" }} />
        <h2 className="text-xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Admin Access Required</h2>
        <p className="text-sm text-center max-w-xs" style={{ color: "oklch(0.50 0.015 65)" }}>
          Please sign in with an admin account to access this section.
        </p>
        <a
          href={getLoginUrl()}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ background: "oklch(0.32 0.10 162)" }}
        >
          Sign In
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6">
        <XCircle size={48} style={{ color: "oklch(0.55 0.18 30)" }} />
        <h2 className="text-xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Access Denied</h2>
        <p className="text-sm text-center max-w-xs" style={{ color: "oklch(0.50 0.015 65)" }}>
          Your account does not have admin privileges. Contact the database owner to request access.
        </p>
        <Link href="/">
          <button className="px-6 py-2.5 rounded-full text-sm font-semibold border-2" style={{ borderColor: "oklch(0.32 0.10 162)", color: "oklch(0.32 0.10 162)" }}>
            Back to Explore
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.003 90)" }}>
      {/* ── Header ── */}
      <div className="border-b px-6 md:px-10 py-5" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={20} style={{ color: "oklch(0.32 0.10 162)" }} />
              <h1 className="text-xl font-extrabold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
                Admin Dashboard
              </h1>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              Signed in as <strong>{user.name ?? user.email}</strong> · Role: <strong>admin</strong>
            </p>
          </div>
          <button
            onClick={() => { refetchStats(); refetchRests(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:bg-gray-50"
            style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.45 0.015 65)" }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 space-y-8">

        {/* ── Stats Grid ── */}
        <section>
          <h2 className="text-sm font-bold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.30 0.015 65)" }}>
            Overview
          </h2>
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "oklch(0.93 0.004 162)" }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard icon={<Users size={18} />} label="Total Users" value={stats?.totalUsers ?? 0} color="oklch(0.32 0.10 162)" />
              <StatCard icon={<UtensilsCrossed size={18} />} label="Restaurants" value={stats?.totalRestaurants ?? 0} color="oklch(0.40 0.14 60)" />
              <StatCard icon={<Clock size={18} />} label="Pending Review" value={stats?.pendingRestaurants ?? 0} sub="Awaiting approval" color="oklch(0.55 0.18 80)" />
              <StatCard icon={<CheckCircle2 size={18} />} label="Approved" value={stats?.approvedRestaurants ?? 0} color="oklch(0.45 0.14 140)" />
              <StatCard icon={<ChefHat size={18} />} label="Dishes" value={stats?.totalDishes ?? 0} color="oklch(0.40 0.14 280)" />
              <StatCard icon={<BookOpen size={18} />} label="Meal Logs" value={stats?.totalMealLogs ?? 0} color="oklch(0.45 0.12 200)" />
            </div>
          )}
        </section>

        {/* ── Quick Nav ── */}
        <section>
          <h2 className="text-sm font-bold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.30 0.015 65)" }}>
            Admin Sections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/admin/restaurants", icon: <UtensilsCrossed size={20} />, label: "Restaurants", desc: "Manage & approve venues", color: "oklch(0.40 0.14 60)" },
              { href: "/agents", icon: <Activity size={20} />, label: "Agents", desc: "Enrichment pipeline", color: "oklch(0.32 0.10 162)" },
              { href: "/mcp", icon: <Zap size={20} />, label: "MCP API", desc: "Third-party integration", color: "oklch(0.40 0.14 280)" },
              { href: "/", icon: <Database size={20} />, label: "Food DB", desc: "Search & explore", color: "oklch(0.45 0.12 200)" },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <div className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: item.color + "20" }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <div className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>{item.label}</div>
                  <div className="text-[11px]" style={{ color: "oklch(0.55 0.015 65)" }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Restaurant Approval ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.30 0.015 65)" }}>
              Restaurant Approval Queue
            </h2>
            <div className="flex gap-1">
              {(["pending", "approved", "rejected", "all"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: statusFilter === s ? "oklch(0.32 0.10 162)" : "white",
                    color: statusFilter === s ? "white" : "oklch(0.45 0.015 65)",
                    border: `1px solid ${statusFilter === s ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)"}`,
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {restsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "oklch(0.93 0.004 162)" }} />
              ))}
            </div>
          ) : restaurantList && restaurantList.length > 0 ? (
            restaurantList.map(r => (
              <RestaurantRow
                key={r.id}
                restaurant={r}
                onReview={(id, status, note) => reviewMutation.mutate({ id, status, reviewNote: note })}
              />
            ))
          ) : (
            <div className="text-center py-10 rounded-xl border" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
              <CheckCircle2 size={32} className="mx-auto mb-2" style={{ color: "oklch(0.45 0.14 140)" }} />
              <p className="text-sm font-semibold" style={{ color: "oklch(0.35 0.015 65)" }}>
                No {statusFilter === "all" ? "" : statusFilter} restaurants
              </p>
              <p className="text-xs mt-1" style={{ color: "oklch(0.60 0.015 65)" }}>
                {statusFilter === "pending" ? "All caught up — no restaurants awaiting review." : `No restaurants with status "${statusFilter}".`}
              </p>
            </div>
          )}
        </section>

        {/* ── Agent Run History ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} style={{ color: "oklch(0.32 0.10 162)" }} />
            <h2 className="text-sm font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.30 0.015 65)" }}>
              Background Agent Runs
            </h2>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
            {agentLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-8 rounded animate-pulse" style={{ background: "oklch(0.93 0.004 162)" }} />
                ))}
              </div>
            ) : agentHistory && agentHistory.length > 0 ? (
              agentHistory.map(run => <AgentRunRow key={run.file} run={run} />)
            ) : (
              <div className="text-center py-6">
                <Activity size={28} className="mx-auto mb-2" style={{ color: "oklch(0.70 0.015 65)" }} />
                <p className="text-sm" style={{ color: "oklch(0.55 0.015 65)" }}>No agent runs recorded yet.</p>
                <p className="text-xs mt-1" style={{ color: "oklch(0.65 0.015 65)" }}>
                  The pipeline runs daily at 2:00 AM SGT. Run <code className="px-1 rounded bg-gray-100">python3 run_pipeline.py</code> manually to start.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Restaurants in Static Data ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} style={{ color: "oklch(0.32 0.10 162)" }} />
            <h2 className="text-sm font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.30 0.015 65)" }}>
              Static Restaurant Data (Seed)
            </h2>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
            <p className="text-sm" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              The curated seed dataset of 17 iconic SG/MY venues is stored in <code className="px-1 rounded" style={{ background: "oklch(0.95 0.004 162)" }}>client/src/lib/restaurantData.ts</code>.
              These are visible to all users on the <strong>Restaurants</strong> page. Venues submitted via the agent pipeline appear in the approval queue above before being published.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link href="/restaurants">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:bg-gray-50" style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.45 0.015 65)" }}>
                  <Eye size={12} /> View Public Page
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
