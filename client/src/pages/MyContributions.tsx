/**
 * Innuir FoodDB — My Contributions Page
 *
 * Shows the logged-in user's own food submissions, corrections, and feedback
 * with their review status.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { PlusCircle, AlertTriangle, MessageSquare, ArrowLeft, Clock, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
// Minimal types for display
interface FoodSubmission { id: number; foodName: string; category?: string | null; country?: string | null; status: string; reviewNote?: string | null; createdAt: Date; }
interface FoodCorrection { id: number; foodName: string; field: string; currentValue?: string | null; suggestedValue: string; status: string; reviewNote?: string | null; createdAt: Date; }
interface UserFeedback { id: number; subject: string; type: string; message: string; status: string; adminReply?: string | null; createdAt: Date; }

type Tab = "submissions" | "corrections" | "feedback";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:      { label: "Pending Review", color: "oklch(0.45 0.10 60)",  bg: "oklch(0.97 0.04 60)",  icon: <Clock size={12} /> },
  approved:     { label: "Approved",       color: "oklch(0.35 0.12 162)", bg: "oklch(0.95 0.04 162)", icon: <CheckCircle2 size={12} /> },
  rejected:     { label: "Rejected",       color: "oklch(0.40 0.15 25)",  bg: "oklch(0.97 0.04 25)",  icon: <XCircle size={12} /> },
  needs_info:   { label: "Needs Info",     color: "oklch(0.40 0.12 280)", bg: "oklch(0.96 0.04 280)", icon: <HelpCircle size={12} /> },
  open:         { label: "Open",           color: "oklch(0.45 0.10 60)",  bg: "oklch(0.97 0.04 60)",  icon: <Clock size={12} /> },
  acknowledged: { label: "Acknowledged",   color: "oklch(0.40 0.12 280)", bg: "oklch(0.96 0.04 280)", icon: <HelpCircle size={12} /> },
  resolved:     { label: "Resolved",       color: "oklch(0.35 0.12 162)", bg: "oklch(0.95 0.04 162)", icon: <CheckCircle2 size={12} /> },
  closed:       { label: "Closed",         color: "oklch(0.50 0.01 65)",  bg: "oklch(0.96 0.005 65)", icon: <XCircle size={12} /> },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.icon} {cfg.label}
    </span>
  );
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

export default function MyContributions() {
  const [tab, setTab] = useState<Tab>("submissions");
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const submissions = trpc.contributions.mySubmissions.useQuery(undefined, { enabled: isAuthenticated });
  const corrections = trpc.contributions.myCorrections.useQuery(undefined, { enabled: isAuthenticated });
  const feedback    = trpc.contributions.myFeedback.useQuery(undefined, { enabled: isAuthenticated });

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Please log in to view your contributions.</p>
        <Button asChild><a href={getLoginUrl()}>Sign In</a></Button>
      </div>
    );
  }

  const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode; count?: number }> = [
    { id: "submissions", label: "Food Submissions", icon: <PlusCircle size={14} />,    count: submissions.data?.length },
    { id: "corrections", label: "Corrections",      icon: <AlertTriangle size={14} />, count: corrections.data?.length },
    { id: "feedback",    label: "Feedback",          icon: <MessageSquare size={14} />, count: feedback.data?.length },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/contribute")}
        className="flex items-center gap-1 text-sm mb-4 hover:underline"
        style={{ color: "oklch(0.45 0.08 162)" }}
      >
        <ArrowLeft size={14} /> Back to Contribute
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
          My Contributions
        </h1>
        <Button size="sm" onClick={() => navigate("/contribute")}>
          <PlusCircle size={14} className="mr-1.5" /> New Contribution
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all"
            style={{
              borderColor: tab === t.id ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
              color: tab === t.id ? "white" : "oklch(0.40 0.015 65)",
              background: tab === t.id ? "oklch(0.32 0.10 162)" : "white",
            }}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: tab === t.id ? "rgba(255,255,255,0.25)" : "oklch(0.92 0.01 162)",
                  color: tab === t.id ? "white" : "oklch(0.35 0.08 162)",
                }}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "submissions" && (
        <SubmissionsList data={submissions.data} loading={submissions.isLoading} onContribute={() => navigate("/contribute?tab=food")} />
      )}
      {tab === "corrections" && (
        <CorrectionsList data={corrections.data} loading={corrections.isLoading} onContribute={() => navigate("/contribute?tab=correction")} />
      )}
      {tab === "feedback" && (
        <FeedbackList data={feedback.data} loading={feedback.isLoading} onContribute={() => navigate("/contribute?tab=feedback")} />
      )}
    </div>
  );
}

function EmptyState({ message, onContribute }: { message: string; onContribute: () => void }) {
  return (
    <div className="text-center py-16 rounded-2xl border border-dashed" style={{ borderColor: "oklch(0.88 0.008 90)" }}>
      <p className="text-gray-400 mb-3">{message}</p>
      <Button size="sm" variant="outline" onClick={onContribute}>Make a contribution</Button>
    </div>
  );
}

function SubmissionsList({ data, loading, onContribute }: { data?: FoodSubmission[]; loading: boolean; onContribute: () => void }) {
  if (loading) return <div className="text-center py-8 text-gray-400">Loading...</div>;
  if (!data?.length) return <EmptyState message="No food submissions yet." onContribute={onContribute} />;
  return (
    <div className="space-y-3">
      {data.map(s => (
        <div key={s.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)" }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm" style={{ color: "oklch(0.20 0.015 65)", fontFamily: "Sora, sans-serif" }}>{s.foodName}</p>
              {s.category && <p className="text-xs text-gray-400 mt-0.5">{s.category} · {s.country ?? "Unknown country"}</p>}
            </div>
            <StatusBadge status={s.status} />
          </div>
          {s.reviewNote && (
            <p className="text-xs mt-2 p-2 rounded-lg bg-gray-50 text-gray-600">
              <span className="font-semibold">Review note:</span> {s.reviewNote}
            </p>
          )}
          <p className="text-[10px] text-gray-300 mt-2">{formatDate(s.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

function CorrectionsList({ data, loading, onContribute }: { data?: FoodCorrection[]; loading: boolean; onContribute: () => void }) {
  if (loading) return <div className="text-center py-8 text-gray-400">Loading...</div>;
  if (!data?.length) return <EmptyState message="No corrections reported yet." onContribute={onContribute} />;
  return (
    <div className="space-y-3">
      {data.map(c => (
        <div key={c.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)" }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm" style={{ color: "oklch(0.20 0.015 65)", fontFamily: "Sora, sans-serif" }}>{c.foodName}</p>
              <p className="text-xs text-gray-400 mt-0.5">Field: <span className="font-medium">{c.field}</span> · {c.currentValue ?? "—"} → <span className="font-medium text-green-700">{c.suggestedValue}</span></p>
            </div>
            <StatusBadge status={c.status} />
          </div>
          {c.reviewNote && (
            <p className="text-xs mt-2 p-2 rounded-lg bg-gray-50 text-gray-600">
              <span className="font-semibold">Review note:</span> {c.reviewNote}
            </p>
          )}
          <p className="text-[10px] text-gray-300 mt-2">{formatDate(c.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

function FeedbackList({ data, loading, onContribute }: { data?: UserFeedback[]; loading: boolean; onContribute: () => void }) {
  if (loading) return <div className="text-center py-8 text-gray-400">Loading...</div>;
  if (!data?.length) return <EmptyState message="No feedback sent yet." onContribute={onContribute} />;
  return (
    <div className="space-y-3">
      {data.map(f => (
        <div key={f.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)" }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm" style={{ color: "oklch(0.20 0.015 65)", fontFamily: "Sora, sans-serif" }}>{f.subject}</p>
              <p className="text-xs text-gray-400 mt-0.5 capitalize">{f.type.replace("_", " ")}</p>
            </div>
            <StatusBadge status={f.status} />
          </div>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{f.message}</p>
          {f.adminReply && (
            <p className="text-xs mt-2 p-2 rounded-lg bg-blue-50 text-blue-700">
              <span className="font-semibold">Team reply:</span> {f.adminReply}
            </p>
          )}
          <p className="text-[10px] text-gray-300 mt-2">{formatDate(f.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
