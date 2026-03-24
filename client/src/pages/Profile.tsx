// FoodDB — Personal Profile & Onboarding
// Collects: age, gender, height, weight, activity level, health objectives, dietary preferences
// Calculates: TDEE, macro targets, sodium target

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  User, Scale, Ruler, Activity, Target, Leaf, ChevronRight, ChevronLeft,
  CheckCircle, Loader2, Heart, Flame, Droplets, Dumbbell
} from "lucide-react";

const OBJECTIVES = [
  { id: "weight_loss",       label: "Weight Loss",         icon: "⬇️", desc: "Calorie deficit, fat reduction" },
  { id: "weight_gain",       label: "Weight Gain",         icon: "⬆️", desc: "Calorie surplus, muscle building" },
  { id: "balanced",          label: "Balanced Nutrition",  icon: "⚖️", desc: "Maintain weight, eat well" },
  { id: "low_sodium",        label: "Low Sodium",          icon: "🧂", desc: "Heart health, blood pressure" },
  { id: "high_protein",      label: "High Protein",        icon: "💪", desc: "Muscle gain, satiety" },
  { id: "vegetarian",        label: "Vegetarian",          icon: "🥦", desc: "Plant-based focus" },
  { id: "diabetes_friendly", label: "Diabetes Friendly",   icon: "🩺", desc: "Low GI, controlled carbs" },
  { id: "heart_healthy",     label: "Heart Healthy",       icon: "❤️", desc: "Low sat fat, high fibre" },
];

const DIETARY_PREFS = [
  { id: "halal",       label: "Halal",       icon: "🌙" },
  { id: "vegetarian",  label: "Vegetarian",  icon: "🥗" },
  { id: "vegan",       label: "Vegan",       icon: "🌱" },
  { id: "gluten_free", label: "Gluten Free", icon: "🌾" },
  { id: "dairy_free",  label: "Dairy Free",  icon: "🥛" },
  { id: "nut_free",    label: "Nut Free",    icon: "🥜" },
];

const ACTIVITY_LEVELS = [
  { id: "sedentary",   label: "Sedentary",     desc: "Little or no exercise", multiplier: "×1.2" },
  { id: "light",       label: "Light",         desc: "1–3 days/week",         multiplier: "×1.375" },
  { id: "moderate",    label: "Moderate",      desc: "3–5 days/week",         multiplier: "×1.55" },
  { id: "active",      label: "Active",        desc: "6–7 days/week",         multiplier: "×1.725" },
  { id: "very_active", label: "Very Active",   desc: "Athlete / physical job", multiplier: "×1.9" },
];

const STEPS = ["basics", "goals", "diet", "review"] as const;
type Step = (typeof STEPS)[number];

export default function Profile() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Form state
  const [step, setStep] = useState<Step>("basics");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">("moderate");
  const [objectives, setObjectives] = useState<string[]>(["balanced"]);
  const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);
  const [calculatedTargets, setCalculatedTargets] = useState<{
    dailyCalorieTarget: number;
    dailySodiumTargetMg: number;
    dailyProteinTargetG: number;
    dailyCarbTargetG: number;
    dailyFatTargetG: number;
    dailyFibreTargetG: number;
    bmr: number;
    tdee: number;
  } | null>(null);

  const { data: existingProfile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const calculateTargets = trpc.profile.calculateTargets.useMutation({
    onSuccess: (data) => setCalculatedTargets(data),
  });

  const saveProfile = trpc.profile.save.useMutation({
    onSuccess: () => {
      toast.success("Profile saved! Your personal food plan is ready.");
      navigate("/calendar");
    },
    onError: () => toast.error("Failed to save profile. Please try again."),
  });

  // Pre-fill from existing profile
  useEffect(() => {
    if (existingProfile) {
      if (existingProfile.age) setAge(String(existingProfile.age));
      if (existingProfile.gender) setGender(existingProfile.gender as "male" | "female" | "other");
      if (existingProfile.heightCm) setHeightCm(String(existingProfile.heightCm));
      if (existingProfile.weightKg) setWeightKg(String(existingProfile.weightKg));
      if (existingProfile.activityLevel) setActivityLevel(existingProfile.activityLevel as typeof activityLevel);
      if (existingProfile.objectives) setObjectives(existingProfile.objectives as string[]);
      if (existingProfile.dietaryPreferences) setDietaryPrefs(existingProfile.dietaryPreferences as string[]);
    }
  }, [existingProfile]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.98 0.003 90)" }}>
        <Loader2 className="animate-spin" style={{ color: "oklch(0.32 0.10 162)" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "oklch(0.98 0.003 90)" }}>
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.93 0.04 162)" }}>
            <User size={28} style={{ color: "oklch(0.32 0.10 162)" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
            Sign in to personalise
          </h1>
          <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            Create your personal food plan — track calories, sodium, and get AI-powered meal suggestions tailored to your goals.
          </p>
          <Button
            onClick={() => window.location.href = getLoginUrl()}
            className="w-full"
            style={{ background: "oklch(0.32 0.10 162)", color: "white" }}
          >
            Sign in with Manus
          </Button>
        </div>
      </div>
    );
  }

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const toggleObjective = (id: string) => {
    setObjectives(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const toggleDietaryPref = (id: string) => {
    setDietaryPrefs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    if (step === "basics") {
      if (!age || !heightCm || !weightKg) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep("goals");
    } else if (step === "goals") {
      if (objectives.length === 0) {
        toast.error("Please select at least one goal");
        return;
      }
      setStep("diet");
    } else if (step === "diet") {
      // Calculate targets before review
      await calculateTargets.mutateAsync({
        age: parseInt(age),
        gender,
        heightCm: parseFloat(heightCm),
        weightKg: parseFloat(weightKg),
        activityLevel,
        objectives,
      });
      setStep("review");
    } else if (step === "review") {
      if (!calculatedTargets) return;
      await saveProfile.mutateAsync({
        age: parseInt(age),
        gender,
        heightCm: parseFloat(heightCm),
        weightKg: parseFloat(weightKg),
        activityLevel,
        objectives,
        dietaryPreferences: dietaryPrefs,
        ...calculatedTargets,
        onboardingCompleted: 1,
      });
    }
  };

  const handleBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]!);
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "oklch(0.98 0.003 90)" }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "oklch(0.32 0.10 162)" }}>
            <Target size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
            Your Food Profile
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            Personalise your nutrition plan in 4 steps
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "oklch(0.55 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            {STEPS.map((s, i) => (
              <span key={s} className={i <= stepIndex ? "font-semibold" : ""} style={{ color: i <= stepIndex ? "oklch(0.32 0.10 162)" : undefined }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            ))}
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(0.90 0.006 162)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "oklch(0.32 0.10 162)" }} />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border p-6 shadow-sm" style={{ background: "white", borderColor: "oklch(0.90 0.006 162)" }}>

          {/* Step 1: Basics */}
          {step === "basics" && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                About You
              </h2>

              {/* Gender */}
              <div>
                <Label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.35 0.015 65)" }}>Gender</Label>
                <div className="flex gap-2">
                  {(["male", "female", "other"] as const).map(g => (
                    <button key={g} onClick={() => setGender(g)}
                      className="flex-1 py-2 rounded-lg text-sm font-medium border transition-all"
                      style={{
                        borderColor: gender === g ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                        background: gender === g ? "oklch(0.93 0.04 162)" : "white",
                        color: gender === g ? "oklch(0.25 0.10 162)" : "oklch(0.45 0.015 65)",
                        fontFamily: "Nunito Sans, sans-serif",
                      }}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <Label className="text-sm font-semibold mb-1.5 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <User size={13} className="inline mr-1" />Age (years)
                </Label>
                <Input type="number" value={age} onChange={e => setAge(e.target.value)}
                  placeholder="e.g. 35" min={1} max={120}
                  className="h-10 text-sm" style={{ fontFamily: "Nunito Sans, sans-serif" }} />
              </div>

              {/* Height */}
              <div>
                <Label className="text-sm font-semibold mb-1.5 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <Ruler size={13} className="inline mr-1" />Height (cm)
                </Label>
                <Input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)}
                  placeholder="e.g. 165" min={50} max={300}
                  className="h-10 text-sm" style={{ fontFamily: "Nunito Sans, sans-serif" }} />
              </div>

              {/* Weight */}
              <div>
                <Label className="text-sm font-semibold mb-1.5 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <Scale size={13} className="inline mr-1" />Weight (kg)
                </Label>
                <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)}
                  placeholder="e.g. 65" min={10} max={500}
                  className="h-10 text-sm" style={{ fontFamily: "Nunito Sans, sans-serif" }} />
              </div>

              {/* Activity Level */}
              <div>
                <Label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.35 0.015 65)" }}>
                  <Activity size={13} className="inline mr-1" />Activity Level
                </Label>
                <div className="space-y-2">
                  {ACTIVITY_LEVELS.map(level => (
                    <button key={level.id} onClick={() => setActivityLevel(level.id as typeof activityLevel)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all"
                      style={{
                        borderColor: activityLevel === level.id ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                        background: activityLevel === level.id ? "oklch(0.93 0.04 162)" : "white",
                      }}>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: activityLevel === level.id ? "oklch(0.25 0.10 162)" : "oklch(0.25 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                          {level.label}
                        </div>
                        <div className="text-xs" style={{ color: "oklch(0.55 0.015 65)" }}>{level.desc}</div>
                      </div>
                      <span className="text-xs font-mono" style={{ color: "oklch(0.45 0.10 162)" }}>{level.multiplier}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === "goals" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                Health Objectives
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                Select all that apply. Your calorie and macro targets will be calculated accordingly.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {OBJECTIVES.map(obj => {
                  const active = objectives.includes(obj.id);
                  return (
                    <button key={obj.id} onClick={() => toggleObjective(obj.id)}
                      className="p-3 rounded-xl border text-left transition-all"
                      style={{
                        borderColor: active ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                        background: active ? "oklch(0.93 0.04 162)" : "white",
                      }}>
                      <div className="text-lg mb-1">{obj.icon}</div>
                      <div className="text-xs font-bold" style={{ color: active ? "oklch(0.25 0.10 162)" : "oklch(0.25 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                        {obj.label}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.55 0.015 65)" }}>{obj.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Dietary Preferences */}
          {step === "diet" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                Dietary Preferences
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                Optional — helps the AI suggest appropriate dishes.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DIETARY_PREFS.map(pref => {
                  const active = dietaryPrefs.includes(pref.id);
                  return (
                    <button key={pref.id} onClick={() => toggleDietaryPref(pref.id)}
                      className="p-3 rounded-xl border text-center transition-all"
                      style={{
                        borderColor: active ? "oklch(0.32 0.10 162)" : "oklch(0.88 0.008 90)",
                        background: active ? "oklch(0.93 0.04 162)" : "white",
                      }}>
                      <div className="text-xl mb-1">{pref.icon}</div>
                      <div className="text-xs font-semibold" style={{ color: active ? "oklch(0.25 0.10 162)" : "oklch(0.35 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                        {pref.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              {calculateTargets.isPending && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.45 0.10 162)" }}>
                  <Loader2 size={14} className="animate-spin" />
                  Calculating your targets...
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === "review" && calculatedTargets && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                Your Daily Targets
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                Based on your profile (BMR: {calculatedTargets.bmr} kcal, TDEE: {calculatedTargets.tdee} kcal)
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Flame size={16} />, label: "Calories", value: `${calculatedTargets.dailyCalorieTarget}`, unit: "kcal", color: "oklch(0.55 0.18 30)" },
                  { icon: <Droplets size={16} />, label: "Sodium", value: `${calculatedTargets.dailySodiumTargetMg}`, unit: "mg", color: "oklch(0.40 0.12 220)" },
                  { icon: <Dumbbell size={16} />, label: "Protein", value: `${calculatedTargets.dailyProteinTargetG}`, unit: "g", color: "oklch(0.45 0.14 140)" },
                  { icon: <Activity size={16} />, label: "Carbs", value: `${calculatedTargets.dailyCarbTargetG}`, unit: "g", color: "oklch(0.50 0.14 60)" },
                  { icon: <Heart size={16} />, label: "Fat", value: `${calculatedTargets.dailyFatTargetG}`, unit: "g", color: "oklch(0.45 0.14 300)" },
                  { icon: <Leaf size={16} />, label: "Fibre", value: `${calculatedTargets.dailyFibreTargetG}`, unit: "g", color: "oklch(0.40 0.12 162)" },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-xl border text-center"
                    style={{ borderColor: "oklch(0.90 0.006 162)", background: "oklch(0.98 0.003 90)" }}>
                    <div className="flex items-center justify-center gap-1 mb-1" style={{ color: item.color }}>
                      {item.icon}
                      <span className="text-xs font-semibold" style={{ fontFamily: "Nunito Sans, sans-serif" }}>{item.label}</span>
                    </div>
                    <div className="text-xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
                      {item.value}
                    </div>
                    <div className="text-xs" style={{ color: "oklch(0.55 0.015 65)" }}>{item.unit}/day</div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl" style={{ background: "oklch(0.93 0.04 162)" }}>
                <p className="text-xs font-medium" style={{ color: "oklch(0.25 0.10 162)", fontFamily: "Nunito Sans, sans-serif" }}>
                  <CheckCircle size={12} className="inline mr-1" />
                  Targets calculated using Mifflin-St Jeor equation. You can adjust these anytime from your profile.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-4">
          {stepIndex > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 h-11"
              style={{ fontFamily: "Nunito Sans, sans-serif", borderColor: "oklch(0.88 0.008 90)" }}>
              <ChevronLeft size={16} className="mr-1" />Back
            </Button>
          )}
          <Button onClick={handleNext}
            disabled={saveProfile.isPending || calculateTargets.isPending}
            className="flex-1 h-11 font-semibold"
            style={{ background: "oklch(0.32 0.10 162)", color: "white", fontFamily: "Nunito Sans, sans-serif" }}>
            {saveProfile.isPending ? (
              <><Loader2 size={14} className="animate-spin mr-2" />Saving...</>
            ) : step === "review" ? (
              <><CheckCircle size={14} className="mr-2" />Save & Start Planning</>
            ) : (
              <>Next<ChevronRight size={16} className="ml-1" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
