// FoodDB — Calorie & Sodium Calculator
// Features: TDEE calculator, sodium intake calculator, BMI, daily targets

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Flame, Droplets, Scale, Ruler, Activity, Calculator as CalcIcon,
  ChevronDown, ChevronUp, Info, Loader2, CheckCircle
} from "lucide-react";

type Gender = "male" | "female" | "other";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (desk job, no exercise)",
  light: "Light (1–3 days/week)",
  moderate: "Moderate (3–5 days/week)",
  active: "Active (6–7 days/week)",
  very_active: "Very Active (athlete / physical job)",
};

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
};

// Singapore/Malaysia sodium reference foods
const SG_SODIUM_EXAMPLES = [
  { food: "Chicken Rice (1 plate)", sodium: 850, kcal: 607 },
  { food: "Laksa (1 bowl)", sodium: 1620, kcal: 589 },
  { food: "Char Kway Teow (1 plate)", sodium: 1340, kcal: 744 },
  { food: "Nasi Lemak (standard)", sodium: 680, kcal: 644 },
  { food: "Mee Goreng (1 plate)", sodium: 1180, kcal: 660 },
  { food: "Bak Kut Teh (1 bowl)", sodium: 920, kcal: 380 },
  { food: "Wonton Mee (1 bowl)", sodium: 1050, kcal: 450 },
  { food: "Satay (5 sticks)", sodium: 420, kcal: 310 },
  { food: "Roti Prata (2 plain)", sodium: 380, kcal: 340 },
  { food: "Hokkien Mee (1 plate)", sodium: 1240, kcal: 620 },
];

function NutrientBar({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const over = value > max;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
        <span style={{ color: "#2F3A4A" }}>{label}</span>
        <span style={{ color: over ? "oklch(0.55 0.20 30)" : "#2F3A4A" }}>
          {Math.round(value)} / {max} {unit} {over && "⚠️"}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(0.92 0.006 162)" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: over ? "oklch(0.55 0.20 30)" : color }} />
      </div>
    </div>
  );
}

export default function Calculator() {
  const { isAuthenticated } = useAuth();

  // Calorie calculator state
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [objectives, setObjectives] = useState<string[]>(["balanced"]);
  const [calorieResult, setCalorieResult] = useState<{
    bmr: number; tdee: number; dailyCalorieTarget: number;
    dailySodiumTargetMg: number; dailyProteinTargetG: number;
    dailyCarbTargetG: number; dailyFatTargetG: number; dailyFibreTargetG: number;
  } | null>(null);

  // Sodium tracker state
  const [sodiumItems, setSodiumItems] = useState<{ name: string; sodium: number }[]>([]);
  const [sodiumName, setSodiumName] = useState("");
  const [sodiumValue, setSodiumValue] = useState("");
  const [showSodiumRef, setShowSodiumRef] = useState(false);

  const calculateTargets = trpc.profile.calculateTargets.useMutation({
    onSuccess: (data) => setCalorieResult(data),
    onError: () => toast.error("Calculation failed"),
  });

  const saveProfile = trpc.profile.save.useMutation({
    onSuccess: () => toast.success("Targets saved to your profile!"),
    onError: () => toast.error("Please sign in to save targets"),
  });

  const handleCalculate = () => {
    if (!age || !heightCm || !weightKg) {
      toast.error("Please fill in all fields");
      return;
    }
    calculateTargets.mutate({
      age: parseInt(age),
      gender,
      heightCm: parseFloat(heightCm),
      weightKg: parseFloat(weightKg),
      activityLevel,
      objectives,
    });
  };

  const handleSaveToProfile = () => {
    if (!calorieResult) return;
    saveProfile.mutate({
      age: parseInt(age),
      gender,
      heightCm: parseFloat(heightCm),
      weightKg: parseFloat(weightKg),
      activityLevel,
      objectives,
      ...calorieResult,
      onboardingCompleted: 1,
    });
  };

  const addSodiumItem = () => {
    if (!sodiumName || !sodiumValue) return;
    setSodiumItems(prev => [...prev, { name: sodiumName, sodium: parseFloat(sodiumValue) }]);
    setSodiumName("");
    setSodiumValue("");
  };

  const totalSodium = sodiumItems.reduce((s, i) => s + i.sodium, 0);
  const sodiumTarget = calorieResult?.dailySodiumTargetMg ?? 2000;

  // BMI calculation
  const bmi = heightCm && weightKg
    ? parseFloat(weightKg) / Math.pow(parseFloat(heightCm) / 100, 2)
    : null;
  const bmiCategory = bmi === null ? null
    : bmi < 18.5 ? { label: "Underweight", color: "oklch(0.40 0.12 220)" }
    : bmi < 23 ? { label: "Normal (Asian)", color: "oklch(0.45 0.14 140)" }
    : bmi < 27.5 ? { label: "Overweight (Asian)", color: "oklch(0.55 0.18 60)" }
    : { label: "Obese (Asian)", color: "oklch(0.55 0.20 30)" };

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: "#F7F9FC" }}>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
            Nutrition Calculators
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            Calculate your daily calorie and sodium targets based on your body and goals.
          </p>
        </div>

        {/* ── CALORIE CALCULATOR ── */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "white", borderColor: "#DDE3EE" }}>
          <div className="px-5 py-4 flex items-center gap-2"
            style={{ borderBottom: "1px solid #DDE3EE", background: "oklch(0.97 0.04 30)" }}>
            <Flame size={18} style={{ color: "oklch(0.55 0.18 30)" }} />
            <h2 className="text-base font-bold" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.25 0.015 65)" }}>
              Calorie Calculator (TDEE)
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {/* Gender */}
            <div>
              <Label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.35 0.015 65)" }}>Gender</Label>
              <div className="flex gap-2">
                {(["male", "female", "other"] as Gender[]).map(g => (
                  <button key={g} onClick={() => setGender(g)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium border transition-all"
                    style={{
                      borderColor: gender === g ? "oklch(0.55 0.18 30)" : "#DDE3EE",
                      background: gender === g ? "oklch(0.97 0.04 30)" : "white",
                      color: gender === g ? "oklch(0.40 0.18 30)" : "#4A5568",
                      fontFamily: "Inter, sans-serif",
                    }}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.35 0.015 65)" }}>Age</Label>
                <Input type="number" value={age} onChange={e => setAge(e.target.value)}
                  placeholder="35" min={1} max={120} className="h-9 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <Ruler size={10} className="inline mr-0.5" />Height (cm)
                </Label>
                <Input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)}
                  placeholder="165" min={50} max={300} className="h-9 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <Scale size={10} className="inline mr-0.5" />Weight (kg)
                </Label>
                <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)}
                  placeholder="65" min={10} max={500} className="h-9 text-sm" />
              </div>
            </div>

            {/* BMI display */}
            {bmi !== null && bmiCategory && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{ background: "oklch(0.97 0.02 90)", border: "1px solid #DDE3EE" }}>
                <span style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>BMI:</span>
                <span className="font-bold" style={{ color: bmiCategory.color, fontFamily: "Inter, sans-serif" }}>{bmi.toFixed(1)}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${bmiCategory.color}20`, color: bmiCategory.color }}>
                  {bmiCategory.label}
                </span>
                <span className="text-xs ml-auto" style={{ color: "#8B9AB0" }}>Asian cutoffs used</span>
              </div>
            )}

            {/* Activity level */}
            <div>
              <Label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                <Activity size={12} className="inline mr-1" />Activity Level
              </Label>
              <select value={activityLevel} onChange={e => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full h-9 px-3 rounded-lg border text-sm"
                style={{ borderColor: "#DDE3EE", fontFamily: "Inter, sans-serif", color: "oklch(0.25 0.015 65)" }}>
                {(Object.entries(ACTIVITY_LABELS) as [ActivityLevel, string][]).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div>
              <Label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.35 0.015 65)" }}>Goal</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: "balanced", label: "Maintain" },
                  { id: "weight_loss", label: "Lose Weight (−20%)" },
                  { id: "weight_gain", label: "Gain Weight (+10%)" },
                  { id: "low_sodium", label: "Low Sodium" },
                  { id: "high_protein", label: "High Protein" },
                ].map(obj => (
                  <button key={obj.id}
                    onClick={() => setObjectives(prev =>
                      prev.includes(obj.id) ? prev.filter(o => o !== obj.id) : [...prev.filter(o => !["balanced", "weight_loss", "weight_gain"].includes(o) || !["balanced", "weight_loss", "weight_gain"].includes(obj.id)), obj.id]
                    )}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                    style={{
                      borderColor: objectives.includes(obj.id) ? "oklch(0.55 0.18 30)" : "#DDE3EE",
                      background: objectives.includes(obj.id) ? "oklch(0.97 0.04 30)" : "white",
                      color: objectives.includes(obj.id) ? "oklch(0.40 0.18 30)" : "#4A5568",
                      fontFamily: "Inter, sans-serif",
                    }}>
                    {obj.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleCalculate} disabled={calculateTargets.isPending}
              className="w-full h-10 font-semibold"
              style={{ background: "oklch(0.55 0.18 30)", color: "white", fontFamily: "Inter, sans-serif" }}>
              {calculateTargets.isPending ? <Loader2 size={14} className="animate-spin mr-2" /> : <CalcIcon size={14} className="mr-2" />}
              Calculate My Targets
            </Button>

            {/* Results */}
            {calorieResult && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl text-center" style={{ background: "oklch(0.97 0.04 30)", border: "1px solid oklch(0.88 0.12 30)" }}>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "oklch(0.45 0.15 30)", fontFamily: "Inter, sans-serif" }}>BMR</div>
                    <div className="text-xl font-bold" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.30 0.18 30)" }}>{calorieResult.bmr}</div>
                    <div className="text-xs" style={{ color: "#8B9AB0" }}>kcal (at rest)</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: "oklch(0.97 0.04 30)", border: "1px solid oklch(0.88 0.12 30)" }}>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "oklch(0.45 0.15 30)", fontFamily: "Inter, sans-serif" }}>TDEE</div>
                    <div className="text-xl font-bold" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.30 0.18 30)" }}>{calorieResult.tdee}</div>
                    <div className="text-xs" style={{ color: "#8B9AB0" }}>kcal (maintenance)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl space-y-3" style={{ background: "#F7F9FC", border: "1px solid #DDE3EE" }}>
                  <div className="text-sm font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                    Daily Targets (Goal: {calorieResult.dailyCalorieTarget} kcal)
                  </div>
                  <NutrientBar label="Calories" value={0} max={calorieResult.dailyCalorieTarget} color="oklch(0.55 0.18 30)" unit="kcal" />
                  <NutrientBar label="Protein" value={0} max={calorieResult.dailyProteinTargetG} color="oklch(0.45 0.14 140)" unit="g" />
                  <NutrientBar label="Carbohydrates" value={0} max={calorieResult.dailyCarbTargetG} color="oklch(0.50 0.14 60)" unit="g" />
                  <NutrientBar label="Fat" value={0} max={calorieResult.dailyFatTargetG} color="oklch(0.45 0.14 300)" unit="g" />
                  <NutrientBar label="Fibre" value={0} max={calorieResult.dailyFibreTargetG} color="oklch(0.40 0.12 162)" unit="g" />
                  <NutrientBar label="Sodium" value={0} max={calorieResult.dailySodiumTargetMg} color="oklch(0.40 0.12 220)" unit="mg" />
                </div>

                {isAuthenticated && (
                  <Button onClick={handleSaveToProfile} disabled={saveProfile.isPending}
                    variant="outline" className="w-full h-9 text-sm"
                    style={{ borderColor: "oklch(0.55 0.18 30)", color: "oklch(0.40 0.18 30)", fontFamily: "Inter, sans-serif" }}>
                    {saveProfile.isPending ? <Loader2 size={12} className="animate-spin mr-1" /> : <CheckCircle size={12} className="mr-1" />}
                    Save to My Profile
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── SODIUM CALCULATOR ── */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "white", borderColor: "#DDE3EE" }}>
          <div className="px-5 py-4 flex items-center gap-2"
            style={{ borderBottom: "1px solid #DDE3EE", background: "oklch(0.96 0.04 220)" }}>
            <Droplets size={18} style={{ color: "oklch(0.40 0.12 220)" }} />
            <h2 className="text-base font-bold" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.25 0.015 65)" }}>
              Sodium Intake Calculator
            </h2>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
              style={{ background: "oklch(0.88 0.10 220)", color: "oklch(0.30 0.12 220)" }}>
              WHO limit: 2,000 mg/day
            </span>
          </div>
          <div className="p-5 space-y-4">
            {/* Total display */}
            <div className="text-center py-3">
              <div className="text-4xl font-bold" style={{ fontFamily: "Inter, sans-serif", color: totalSodium > sodiumTarget ? "oklch(0.55 0.20 30)" : "oklch(0.40 0.12 220)" }}>
                {Math.round(totalSodium)}
              </div>
              <div className="text-sm" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
                mg sodium consumed / {sodiumTarget} mg target
              </div>
              {totalSodium > sodiumTarget && (
                <div className="mt-1 text-xs font-semibold" style={{ color: "oklch(0.55 0.20 30)" }}>
                  ⚠️ {Math.round(totalSodium - sodiumTarget)} mg over daily limit
                </div>
              )}
            </div>

            {/* Progress bar */}
            <NutrientBar label="Sodium Today" value={totalSodium} max={sodiumTarget} color="oklch(0.40 0.12 220)" unit="mg" />

            {/* Add item */}
            <div className="flex gap-2">
              <Input value={sodiumName} onChange={e => setSodiumName(e.target.value)}
                placeholder="Food name" className="h-9 text-sm flex-1"
                onKeyDown={e => e.key === "Enter" && addSodiumItem()} />
              <Input value={sodiumValue} onChange={e => setSodiumValue(e.target.value)}
                placeholder="Na (mg)" type="number" className="h-9 text-sm w-24"
                onKeyDown={e => e.key === "Enter" && addSodiumItem()} />
              <Button onClick={addSodiumItem} className="h-9 px-3"
                style={{ background: "oklch(0.40 0.12 220)", color: "white" }}>
                Add
              </Button>
            </div>

            {/* Item list */}
            {sodiumItems.length > 0 && (
              <div className="space-y-1.5">
                {sodiumItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg"
                    style={{ background: "oklch(0.97 0.02 220)", border: "1px solid oklch(0.90 0.008 220)" }}>
                    <span className="text-sm" style={{ color: "oklch(0.30 0.015 65)", fontFamily: "Inter, sans-serif" }}>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.40 0.12 220)" }}>{item.sodium} mg</span>
                      <button onClick={() => setSodiumItems(prev => prev.filter((_, j) => j !== i))}
                        className="text-xs" style={{ color: "oklch(0.60 0.015 65)" }}>✕</button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setSodiumItems([])}
                  className="w-full h-8 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  Clear All
                </Button>
              </div>
            )}

            {/* SG/MY reference foods */}
            <div>
              <button onClick={() => setShowSodiumRef(v => !v)}
                className="flex items-center gap-1.5 text-sm font-semibold w-full"
                style={{ color: "oklch(0.40 0.12 220)", fontFamily: "Inter, sans-serif" }}>
                <Info size={13} />
                SG/MY Food Sodium Reference
                {showSodiumRef ? <ChevronUp size={13} className="ml-auto" /> : <ChevronDown size={13} className="ml-auto" />}
              </button>
              {showSodiumRef && (
                <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor: "oklch(0.90 0.008 220)" }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: "oklch(0.94 0.04 220)" }}>
                        <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.30 0.12 220)", fontFamily: "Inter, sans-serif" }}>Dish</th>
                        <th className="text-right px-3 py-2 font-semibold" style={{ color: "oklch(0.30 0.12 220)" }}>Na (mg)</th>
                        <th className="text-right px-3 py-2 font-semibold" style={{ color: "oklch(0.30 0.12 220)" }}>kcal</th>
                        <th className="px-2 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {SG_SODIUM_EXAMPLES.map((item, i) => (
                        <tr key={i} style={{ borderTop: "1px solid oklch(0.94 0.004 220)", background: i % 2 === 0 ? "white" : "oklch(0.98 0.01 220)" }}>
                          <td className="px-3 py-2" style={{ color: "oklch(0.30 0.015 65)", fontFamily: "Inter, sans-serif" }}>{item.food}</td>
                          <td className="px-3 py-2 text-right font-semibold"
                            style={{ color: item.sodium > 1000 ? "oklch(0.55 0.20 30)" : item.sodium > 600 ? "oklch(0.50 0.16 60)" : "oklch(0.40 0.12 220)" }}>
                            {item.sodium}
                          </td>
                          <td className="px-3 py-2 text-right" style={{ color: "oklch(0.50 0.015 65)" }}>{item.kcal}</td>
                          <td className="px-2 py-2">
                            <button onClick={() => { setSodiumName(item.food); setSodiumValue(String(item.sodium)); }}
                              className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{ background: "oklch(0.93 0.04 220)", color: "oklch(0.35 0.12 220)" }}>
                              Use
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* WHO note */}
            <div className="p-3 rounded-xl text-xs" style={{ background: "oklch(0.96 0.04 220)", border: "1px solid oklch(0.88 0.08 220)" }}>
              <p style={{ color: "oklch(0.35 0.12 220)", fontFamily: "Inter, sans-serif" }}>
                <strong>WHO recommendation:</strong> Less than 2,000 mg sodium per day for adults.
                Singapore HPB recommends less than 2,000 mg/day. High sodium intake is linked to hypertension,
                which affects 1 in 3 Singaporeans aged 30–69.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
