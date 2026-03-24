// FoodDB — Food Calendar (Day / Week / Month planner)
// Features: meal logging, daily totals vs targets, progress rings, AI suggestions

import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronRight, Plus, Trash2, Loader2, Sparkles,
  Flame, Droplets, Dumbbell, Leaf, User, Calendar as CalIcon
} from "lucide-react";
import { Streamdown } from "streamdown";

type ViewMode = "day" | "week" | "month";
type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "supper";

const MEAL_TYPES: { id: MealType; label: string; icon: string; color: string }[] = [
  { id: "breakfast", label: "Breakfast", icon: "🌅", color: "oklch(0.55 0.18 60)" },
  { id: "lunch",     label: "Lunch",     icon: "☀️", color: "oklch(0.50 0.16 50)" },
  { id: "dinner",    label: "Dinner",    icon: "🌙", color: "oklch(0.40 0.14 280)" },
  { id: "snack",     label: "Snack",     icon: "🍎", color: "oklch(0.45 0.16 30)" },
  { id: "supper",    label: "Supper",    icon: "🌃", color: "oklch(0.35 0.12 220)" },
];

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0]!;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-SG", { weekday: "short", day: "numeric", month: "short" });
}

function getWeekDays(baseDate: Date): string[] {
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - ((baseDate.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateStr(d);
  });
}

function getMonthDays(year: number, month: number): string[] {
  const days: string[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(toDateStr(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

interface ProgressRingProps {
  value: number;
  max: number;
  color: string;
  size?: number;
  label: string;
  unit: string;
}

function ProgressRing({ value, max, color, size = 64, label, unit }: ProgressRingProps) {
  const pct = Math.min(1, max > 0 ? value / max : 0);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const over = value > max * 1.1;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.92 0.004 286)" strokeWidth={6} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={over ? "oklch(0.55 0.20 30)" : color}
            strokeWidth={6} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold leading-none" style={{ fontFamily: "Inter, sans-serif", color: over ? "oklch(0.55 0.20 30)" : "#0A1F44" }}>
            {Math.round(value)}
          </span>
          <span className="text-[8px]" style={{ color: "#8B9AB0" }}>{unit}</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>{label}</span>
      <span className="text-[9px]" style={{ color: "oklch(0.60 0.015 65)" }}>/{max}{unit}</span>
    </div>
  );
}

export default function Calendar() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()));
  const [addingMeal, setAddingMeal] = useState<MealType | null>(null);
  const [newFoodName, setNewFoodName] = useState("");
  const [newKcal, setNewKcal] = useState("");
  const [newSodium, setNewSodium] = useState("");
  const [newServings, setNewServings] = useState("1");
  const [aiMealType, setAiMealType] = useState<MealType | null>(null);
  const [aiText, setAiText] = useState<string | null>(null);

  const utils = trpc.useUtils();

  // Compute date ranges
  const weekDays = useMemo(() => getWeekDays(new Date(selectedDate + "T12:00:00")), [selectedDate]);
  const monthDays = useMemo(() => {
    const d = new Date(selectedDate + "T12:00:00");
    return getMonthDays(d.getFullYear(), d.getMonth());
  }, [selectedDate]);

  const rangeStart = viewMode === "day" ? selectedDate : viewMode === "week" ? weekDays[0]! : monthDays[0]!;
  const rangeEnd = viewMode === "day" ? selectedDate : viewMode === "week" ? weekDays[6]! : monthDays[monthDays.length - 1]!;

  const { data: profile } = trpc.profile.get.useQuery(undefined, { enabled: isAuthenticated });
  const { data: dayLogs, isLoading: logsLoading } = trpc.meals.getForDate.useQuery(
    { date: selectedDate }, { enabled: isAuthenticated }
  );
  const { data: daySummary } = trpc.calendar.getDaySummary.useQuery(
    { date: selectedDate }, { enabled: isAuthenticated }
  );
  const { data: monthSummaries } = trpc.calendar.getMonthSummaries.useQuery(
    { startDate: rangeStart, endDate: rangeEnd },
    { enabled: isAuthenticated && viewMode !== "day" }
  );

  const addMeal = trpc.meals.add.useMutation({
    onSuccess: () => {
      utils.meals.getForDate.invalidate({ date: selectedDate });
      utils.calendar.getDaySummary.invalidate({ date: selectedDate });
      utils.calendar.getMonthSummaries.invalidate();
      setAddingMeal(null);
      setNewFoodName("");
      setNewKcal("");
      setNewSodium("");
      setNewServings("1");
      toast.success("Meal logged!");
    },
    onError: () => toast.error("Failed to log meal"),
  });

  const deleteMeal = trpc.meals.delete.useMutation({
    onSuccess: () => {
      utils.meals.getForDate.invalidate({ date: selectedDate });
      utils.calendar.getDaySummary.invalidate({ date: selectedDate });
      utils.calendar.getMonthSummaries.invalidate();
      toast.success("Meal removed");
    },
  });

  const generateAi = trpc.ai.generateSuggestion.useMutation({
    onSuccess: (data) => {
      setAiText(data.suggestionText);
    },
    onError: () => toast.error("AI suggestion failed"),
  });

  const navigateDate = (dir: -1 | 1) => {
    const d = new Date(selectedDate + "T12:00:00");
    if (viewMode === "day") d.setDate(d.getDate() + dir);
    else if (viewMode === "week") d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    setSelectedDate(toDateStr(d));
  };

  const calorieTarget = profile?.dailyCalorieTarget ?? 2000;
  const sodiumTarget = profile?.dailySodiumTargetMg ?? 2000;
  const proteinTarget = profile?.dailyProteinTargetG ?? 50;
  const fibreTarget = profile?.dailyFibreTargetG ?? 25;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F9FC" }}>
        <Loader2 className="animate-spin" style={{ color: "#6D5BD0" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#F7F9FC" }}>
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "#EDE9FB" }}>
            <CalIcon size={28} style={{ color: "#6D5BD0" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
            Sign in to plan meals
          </h1>
          <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            Track your food calendar, log meals, and get AI suggestions tailored to your health goals.
          </p>
          <Button onClick={() => window.location.href = getLoginUrl()}
            className="w-full" style={{ background: "#6D5BD0", color: "white" }}>
            Sign in with Manus
          </Button>
        </div>
      </div>
    );
  }

  const mealsByType = MEAL_TYPES.reduce((acc, mt) => {
    acc[mt.id] = (dayLogs ?? []).filter(l => l.mealType === mt.id);
    return acc;
  }, {} as Record<MealType, typeof dayLogs>);

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FC" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 border-b px-4 md:px-8 py-3"
        style={{ background: "#FFFFFF", borderColor: "#DDE3EE" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* View mode tabs */}
          <div className="flex gap-1 rounded-lg p-0.5" style={{ background: "oklch(0.92 0.006 162)" }}>
            {(["day", "week", "month"] as ViewMode[]).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
                style={{
                  background: viewMode === mode ? "white" : "transparent",
                  color: viewMode === mode ? "oklch(0.25 0.10 162)" : "oklch(0.50 0.015 65)",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: viewMode === mode ? "0 1px 3px oklch(0 0 0 / 0.1)" : "none",
                }}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Date navigation */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigateDate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100">
              <ChevronLeft size={16} style={{ color: "#2F3A4A" }} />
            </button>
            <span className="text-sm font-semibold min-w-[120px] text-center"
              style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.25 0.015 65)" }}>
              {viewMode === "day" ? formatDate(selectedDate) :
               viewMode === "week" ? `${formatDate(weekDays[0]!)} – ${formatDate(weekDays[6]!)}` :
               new Date(selectedDate + "T12:00:00").toLocaleDateString("en-SG", { month: "long", year: "numeric" })}
            </span>
            <button onClick={() => navigateDate(1)} className="p-1.5 rounded-lg hover:bg-gray-100">
              <ChevronRight size={16} style={{ color: "#2F3A4A" }} />
            </button>
          </div>

          {/* Today button */}
          <button onClick={() => setSelectedDate(toDateStr(new Date()))}
            className="text-xs px-3 py-1.5 rounded-lg border font-medium"
            style={{ borderColor: "#DDE3EE", color: "#2F3A4A", fontFamily: "Inter, sans-serif" }}>
            Today
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {/* ── DAY VIEW ── */}
        {viewMode === "day" && (
          <div className="space-y-4">
            {/* Daily progress rings */}
            {daySummary && (
              <div className="rounded-2xl border p-4" style={{ background: "white", borderColor: "#DDE3EE" }}>
                <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                  Today's Progress
                </h3>
                <div className="flex justify-around">
                  <ProgressRing value={daySummary.totalKcal ?? 0} max={calorieTarget} color="oklch(0.55 0.18 30)" label="Calories" unit="kcal" />
                  <ProgressRing value={daySummary.totalSodiumMg ?? 0} max={sodiumTarget} color="oklch(0.40 0.12 220)" label="Sodium" unit="mg" />
                  <ProgressRing value={daySummary.totalProteinG ?? 0} max={proteinTarget} color="oklch(0.45 0.14 140)" label="Protein" unit="g" />
                  <ProgressRing value={daySummary.totalFibreG ?? 0} max={fibreTarget} color="oklch(0.40 0.12 162)" label="Fibre" unit="g" />
                </div>
              </div>
            )}

            {/* Meal sections */}
            {MEAL_TYPES.map(mt => {
              const logs = mealsByType[mt.id] ?? [];
              const isAdding = addingMeal === mt.id;
              return (
                <div key={mt.id} className="rounded-2xl border overflow-hidden"
                  style={{ background: "white", borderColor: "#DDE3EE" }}>
                  {/* Meal header */}
                  <div className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: logs.length > 0 || isAdding ? "1px solid #DDE3EE" : "none" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{mt.icon}</span>
                      <span className="text-sm font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                        {mt.label}
                      </span>
                      {logs.length > 0 && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ background: "#EDE9FB", color: "#6D5BD0" }}>
                          {Math.round(logs.reduce((s, l) => s + (l.kcal ?? 0) * (l.servings ?? 1), 0))} kcal
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setAiMealType(mt.id); setAiText(null); generateAi.mutate({ date: selectedDate, mealType: mt.id }); }}
                        className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        title="AI Suggestion">
                        <Sparkles size={14} style={{ color: "oklch(0.50 0.14 60)" }} />
                      </button>
                      <button onClick={() => setAddingMeal(isAdding ? null : mt.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Plus size={14} style={{ color: "#6D5BD0" }} />
                      </button>
                    </div>
                  </div>

                  {/* Logged items */}
                  {logs.map(log => (
                    <div key={log.id} className="flex items-center justify-between px-4 py-2.5"
                      style={{ borderBottom: "1px solid oklch(0.96 0.003 90)" }}>
                      <div>
                        <div className="text-sm font-medium" style={{ color: "oklch(0.25 0.015 65)", fontFamily: "Inter, sans-serif" }}>
                          {log.foodName}
                          {(log.servings ?? 1) !== 1 && <span className="text-xs ml-1" style={{ color: "#8B9AB0" }}>×{log.servings}</span>}
                        </div>
                        <div className="flex gap-2 mt-0.5">
                          {log.kcal && <span className="text-[10px]" style={{ color: "oklch(0.55 0.18 30)" }}>{Math.round((log.kcal ?? 0) * (log.servings ?? 1))} kcal</span>}
                          {log.sodiumMg && <span className="text-[10px]" style={{ color: "oklch(0.40 0.12 220)" }}>{Math.round((log.sodiumMg ?? 0) * (log.servings ?? 1))}mg Na</span>}
                        </div>
                      </div>
                      <button onClick={() => deleteMeal.mutate({ id: log.id })}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={12} style={{ color: "oklch(0.55 0.18 30)" }} />
                      </button>
                    </div>
                  ))}

                  {/* AI suggestion panel */}
                  {aiMealType === mt.id && (
                    <div className="px-4 py-3" style={{ background: "oklch(0.97 0.04 60)", borderTop: "1px solid oklch(0.90 0.008 60)" }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles size={12} style={{ color: "oklch(0.50 0.14 60)" }} />
                        <span className="text-xs font-semibold" style={{ color: "oklch(0.40 0.14 60)", fontFamily: "Inter, sans-serif" }}>
                          AI Suggestion
                        </span>
                        {generateAi.isPending && <Loader2 size={10} className="animate-spin ml-1" style={{ color: "oklch(0.50 0.14 60)" }} />}
                      </div>
                      {aiText && (
                        <div className="text-xs" style={{ color: "oklch(0.30 0.015 65)", fontFamily: "Inter, sans-serif" }}>
                          <Streamdown>{aiText}</Streamdown>
                        </div>
                      )}
                      <button onClick={() => setAiMealType(null)} className="mt-2 text-xs" style={{ color: "#8B9AB0" }}>
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Add meal form */}
                  {isAdding && (
                    <div className="px-4 py-3 space-y-2" style={{ background: "#F7F9FC", borderTop: "1px solid #DDE3EE" }}>
                      <Input value={newFoodName} onChange={e => setNewFoodName(e.target.value)}
                        placeholder="Food name (e.g. Chicken Rice)" className="h-9 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={newKcal} onChange={e => setNewKcal(e.target.value)}
                          placeholder="kcal" type="number" className="h-9 text-sm" />
                        <Input value={newSodium} onChange={e => setNewSodium(e.target.value)}
                          placeholder="Na (mg)" type="number" className="h-9 text-sm" />
                        <Input value={newServings} onChange={e => setNewServings(e.target.value)}
                          placeholder="Servings" type="number" min="0.1" step="0.1" className="h-9 text-sm" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          if (!newFoodName.trim()) { toast.error("Enter a food name"); return; }
                          addMeal.mutate({
                            logDate: selectedDate,
                            mealType: mt.id,
                            foodName: newFoodName.trim(),
                            kcal: newKcal ? parseFloat(newKcal) : undefined,
                            sodiumMg: newSodium ? parseFloat(newSodium) : undefined,
                            servings: parseFloat(newServings) || 1,
                            source: "manual",
                          });
                        }}
                          disabled={addMeal.isPending}
                          className="flex-1 h-8 text-xs"
                          style={{ background: "#6D5BD0", color: "white" }}>
                          {addMeal.isPending ? <Loader2 size={12} className="animate-spin" /> : "Add"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setAddingMeal(null)}
                          className="h-8 text-xs">Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* No profile nudge */}
            {!profile?.onboardingCompleted && (
              <div className="rounded-2xl border p-4 flex items-center justify-between"
                style={{ background: "oklch(0.97 0.04 60)", borderColor: "oklch(0.88 0.10 60)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "oklch(0.35 0.14 60)", fontFamily: "Inter, sans-serif" }}>
                    Set up your profile to see targets
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.10 60)" }}>
                    Get personalised calorie, sodium, and macro goals
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate("/profile")}
                  className="text-xs" style={{ background: "oklch(0.50 0.16 60)", color: "white" }}>
                  <User size={12} className="mr-1" />Setup
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── WEEK VIEW ── */}
        {viewMode === "week" && (
          <div className="space-y-3">
            {weekDays.map(day => {
              const summary = (monthSummaries ?? []).find(s => {
                const sd = s.summaryDate instanceof Date ? toDateStr(s.summaryDate) : String(s.summaryDate).split("T")[0];
                return sd === day;
              });
              const kcal = summary?.totalKcal ?? 0;
              const pct = Math.min(1, kcal / calorieTarget);
              const isToday = day === toDateStr(new Date());
              return (
                <button key={day} onClick={() => { setSelectedDate(day); setViewMode("day"); }}
                  className="w-full rounded-xl border p-3 text-left transition-all hover:shadow-sm"
                  style={{
                    background: isToday ? "#EDE9FB" : "white",
                    borderColor: isToday ? "#6D5BD0" : "#DDE3EE",
                  }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif", color: isToday ? "oklch(0.25 0.10 162)" : "oklch(0.25 0.015 65)" }}>
                      {formatDate(day)}
                    </span>
                    <span className="text-xs" style={{ color: "oklch(0.50 0.015 65)" }}>
                      {Math.round(kcal)} / {calorieTarget} kcal
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(0.92 0.006 162)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct * 100}%`, background: kcal > calorieTarget ? "oklch(0.55 0.20 30)" : "#6D5BD0" }} />
                  </div>
                  {summary && (
                    <div className="flex gap-3 mt-1.5">
                      <span className="text-[10px]" style={{ color: "oklch(0.40 0.12 220)" }}>Na {Math.round(summary.totalSodiumMg ?? 0)}mg</span>
                      <span className="text-[10px]" style={{ color: "oklch(0.45 0.14 140)" }}>Protein {Math.round(summary.totalProteinG ?? 0)}g</span>
                      <span className="text-[10px]" style={{ color: "oklch(0.50 0.015 65)" }}>{summary.mealCount ?? 0} meals</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── MONTH VIEW ── */}
        {viewMode === "month" && (
          <div>
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <div key={d} className="text-center text-xs font-semibold py-1"
                  style={{ color: "#8B9AB0", fontFamily: "Inter, sans-serif" }}>{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Leading empty cells */}
              {Array.from({ length: (new Date(monthDays[0]! + "T12:00:00").getDay() + 6) % 7 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {monthDays.map(day => {
                const summary = (monthSummaries ?? []).find(s => {
                  const sd = s.summaryDate instanceof Date ? toDateStr(s.summaryDate) : String(s.summaryDate).split("T")[0];
                  return sd === day;
                });
                const kcal = summary?.totalKcal ?? 0;
                const pct = Math.min(1, kcal / calorieTarget);
                const isToday = day === toDateStr(new Date());
                const isSelected = day === selectedDate;
                return (
                  <button key={day} onClick={() => { setSelectedDate(day); setViewMode("day"); }}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center transition-all hover:shadow-sm relative overflow-hidden"
                    style={{
                      background: isSelected ? "#6D5BD0" : isToday ? "#EDE9FB" : "white",
                      border: `1px solid ${isSelected ? "#6D5BD0" : "#DDE3EE"}`,
                    }}>
                    {/* Calorie fill bar */}
                    {kcal > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 transition-all"
                        style={{ height: `${pct * 100}%`, background: isSelected ? "oklch(0.25 0.10 162 / 0.3)" : "oklch(0.32 0.10 162 / 0.12)" }} />
                    )}
                    <span className="relative text-xs font-bold z-10"
                      style={{ color: isSelected ? "white" : isToday ? "oklch(0.25 0.10 162)" : "oklch(0.25 0.015 65)", fontFamily: "Inter, sans-serif" }}>
                      {new Date(day + "T12:00:00").getDate()}
                    </span>
                    {kcal > 0 && (
                      <span className="relative text-[8px] z-10"
                        style={{ color: isSelected ? "oklch(0.90 0.04 162)" : "oklch(0.50 0.015 65)" }}>
                        {Math.round(kcal)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "oklch(0.60 0.015 65)", fontFamily: "Inter, sans-serif" }}>
              Numbers show daily kcal. Bar fill = % of {calorieTarget} kcal target. Tap a day to log meals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
