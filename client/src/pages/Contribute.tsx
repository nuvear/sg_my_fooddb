/**
 * Innuir FoodDB — Contribute Page
 *
 * Three contribution flows:
 *   1. Submit a new food (missing from database)
 *   2. Report a data correction on an existing food
 *   3. Send general feedback / bug report
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  PlusCircle, AlertTriangle, MessageSquare, CheckCircle2,
  ChevronRight, Star, Loader2, ArrowLeft,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ── Schemas ───────────────────────────────────────────────────────────────────

const submitFoodSchema = z.object({
  foodName: z.string().min(2, "Name must be at least 2 characters").max(256),
  localNames: z.string().optional(),
  category: z.string().optional(),
  country: z.string().optional(),
  cuisine: z.string().optional(),
  description: z.string().optional(),
  energyKcal: z.string().optional(),
  proteinG: z.string().optional(),
  fatG: z.string().optional(),
  carbG: z.string().optional(),
  sugarG: z.string().optional(),
  sodiumMg: z.string().optional(),
  fibreG: z.string().optional(),
  sourceUrl: z.string().optional(),
  sourceNotes: z.string().optional(),
});

const correctionSchema = z.object({
  foodId: z.string().min(1, "Food ID is required"),
  foodName: z.string().min(1, "Food name is required"),
  field: z.string().min(1, "Please select a field"),
  currentValue: z.string().optional(),
  suggestedValue: z.string().min(1, "Please provide the correct value"),
  reason: z.string().optional(),
  sourceUrl: z.string().optional(),
});

const feedbackSchema = z.object({
  type: z.enum(["bug", "feature_request", "data_quality", "general"]),
  subject: z.string().min(3, "Subject is too short").max(256),
  message: z.string().min(10, "Please write at least 10 characters"),
  rating: z.number().int().min(1).max(5).optional(),
  pageContext: z.string().optional(),
});

type SubmitFoodForm = z.infer<typeof submitFoodSchema>;
type CorrectionForm = z.infer<typeof correctionSchema>;
type FeedbackForm = z.infer<typeof feedbackSchema>;

// ── Tab type ──────────────────────────────────────────────────────────────────
type Tab = "food" | "correction" | "feedback";

const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode; desc: string }> = [
  { id: "food",       label: "Submit Food",     icon: <PlusCircle size={16} />,    desc: "Add a missing food to the database" },
  { id: "correction", label: "Report Error",    icon: <AlertTriangle size={16} />, desc: "Fix incorrect nutrition data" },
  { id: "feedback",   label: "Send Feedback",   icon: <MessageSquare size={16} />, desc: "Bug reports & feature requests" },
];

const NUTRIENT_FIELDS = [
  { value: "energy",      label: "Energy (kcal)" },
  { value: "protein",     label: "Protein (g)" },
  { value: "fat",         label: "Total Fat (g)" },
  { value: "carbohydrate",label: "Carbohydrates (g)" },
  { value: "sugar",       label: "Sugar (g)" },
  { value: "sodium",      label: "Sodium (mg)" },
  { value: "fibre",       label: "Dietary Fibre (g)" },
  { value: "calcium",     label: "Calcium (mg)" },
  { value: "potassium",   label: "Potassium (mg)" },
  { value: "iron",        label: "Iron (mg)" },
  { value: "name",        label: "Food Name / Alias" },
  { value: "category",    label: "Category" },
  { value: "description", label: "Description" },
  { value: "gi",          label: "Glycaemic Index (GI)" },
  { value: "other",       label: "Other" },
];

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ value, onChange }: { value?: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="transition-colors"
        >
          <Star
            size={20}
            className={n <= (hover || value || 0)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}

// ── Submit Food Form ──────────────────────────────────────────────────────────
function SubmitFoodForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubmitFoodForm>({
    resolver: zodResolver(submitFoodSchema),
  });
  const mutation = trpc.contributions.submitFood.useMutation({
    onSuccess: () => {
      toast.success("Thank you! Your food submission has been received and is pending review.");
      reset();
    },
    onError: (e) => toast.error(e.message),
  });

  const onSubmit = (data: SubmitFoodForm) => {
    const parseNum = (v?: string) => v ? parseFloat(v) : undefined;
    mutation.mutate({
      ...data,
      energyKcal: parseNum(data.energyKcal),
      proteinG: parseNum(data.proteinG),
      fatG: parseNum(data.fatG),
      carbG: parseNum(data.carbG),
      sugarG: parseNum(data.sugarG),
      sodiumMg: parseNum(data.sodiumMg),
      fibreG: parseNum(data.fibreG),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Food Name <span className="text-red-500">*</span>
          </label>
          <Input {...register("foodName")} placeholder="e.g. Goya Champuru" />
          {errors.foodName && <p className="text-red-500 text-xs mt-1">{errors.foodName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Local / Alternate Names</label>
          <Input {...register("localNames")} placeholder="e.g. Bitter melon stir-fry, 苦瓜炒" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Category</label>
          <Input {...register("category")} placeholder="e.g. Stir-fry, Soup, Dessert" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Country of Origin</label>
          <Input {...register("country")} placeholder="e.g. Japan, Singapore, Malaysia" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Cuisine</label>
          <Input {...register("cuisine")} placeholder="e.g. Okinawan, Nyonya, Malay" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Description</label>
          <Textarea {...register("description")} rows={2} placeholder="Brief description of the dish..." />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: "oklch(0.25 0.015 65)" }}>
          Nutrition (per 100g) — fill in what you know
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: "energyKcal", label: "Energy (kcal)" },
            { key: "proteinG",   label: "Protein (g)" },
            { key: "fatG",       label: "Fat (g)" },
            { key: "carbG",      label: "Carbs (g)" },
            { key: "sugarG",     label: "Sugar (g)" },
            { key: "sodiumMg",   label: "Sodium (mg)" },
            { key: "fibreG",     label: "Fibre (g)" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-medium mb-1 text-gray-500">{label}</label>
              <Input
                type="number"
                step="any"
                min="0"
                {...register(key as keyof SubmitFoodForm)}
                placeholder="—"
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Source URL</label>
          <Input {...register("sourceUrl")} placeholder="https://..." type="url" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Source Notes</label>
          <Input {...register("sourceNotes")} placeholder="e.g. HPB table, packaging label" />
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <PlusCircle size={16} className="mr-2" />}
        Submit Food
      </Button>
    </form>
  );
}

// ── Report Correction Form ────────────────────────────────────────────────────
function ReportCorrectionForm({ prefillFoodId, prefillFoodName }: { prefillFoodId?: string; prefillFoodName?: string }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CorrectionForm>({
    resolver: zodResolver(correctionSchema),
    defaultValues: { foodId: prefillFoodId ?? "", foodName: prefillFoodName ?? "" },
  });
  const mutation = trpc.contributions.submitCorrection.useMutation({
    onSuccess: () => {
      toast.success("Correction reported. Our team will review it shortly.");
      reset();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Food ID <span className="text-red-500">*</span>
          </label>
          <Input {...register("foodId")} placeholder="e.g. SG-0001 (from food detail page)" />
          {errors.foodId && <p className="text-red-500 text-xs mt-1">{errors.foodId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Food Name <span className="text-red-500">*</span>
          </label>
          <Input {...register("foodName")} placeholder="e.g. Nasi Lemak" />
          {errors.foodName && <p className="text-red-500 text-xs mt-1">{errors.foodName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Field to Correct <span className="text-red-500">*</span>
          </label>
          <Select onValueChange={v => setValue("field", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a field..." />
            </SelectTrigger>
            <SelectContent>
              {NUTRIENT_FIELDS.map(f => (
                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.field && <p className="text-red-500 text-xs mt-1">{errors.field.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Current Value (as shown)</label>
          <Input {...register("currentValue")} placeholder="What the database shows now" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Correct Value <span className="text-red-500">*</span>
          </label>
          <Input {...register("suggestedValue")} placeholder="What it should be" />
          {errors.suggestedValue && <p className="text-red-500 text-xs mt-1">{errors.suggestedValue.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Reason / Evidence</label>
          <Textarea {...register("reason")} rows={2} placeholder="Why is this wrong? What is your source?" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Source URL</label>
          <Input {...register("sourceUrl")} placeholder="https://..." type="url" />
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto" variant="outline">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <AlertTriangle size={16} className="mr-2" />}
        Report Correction
      </Button>
    </form>
  );
}

// ── Feedback Form ─────────────────────────────────────────────────────────────
function FeedbackForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { type: "general" },
  });
  const rating = watch("rating");
  const mutation = trpc.contributions.submitFeedback.useMutation({
    onSuccess: () => {
      toast.success("Feedback sent! Thank you for helping us improve Innuir FoodDB.");
      reset();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Type</label>
          <Select onValueChange={v => setValue("type", v as FeedbackForm["type"])} defaultValue="general">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature_request">Feature Request</SelectItem>
              <SelectItem value="data_quality">Data Quality Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>Overall Rating</label>
          <StarRating value={rating} onChange={v => setValue("rating", v)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Subject <span className="text-red-500">*</span>
          </label>
          <Input {...register("subject")} placeholder="Brief summary of your feedback" />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1" style={{ color: "oklch(0.25 0.015 65)" }}>
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea {...register("message")} rows={4} placeholder="Describe your feedback in detail..." />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <MessageSquare size={16} className="mr-2" />}
        Send Feedback
      </Button>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Contribute() {
  const [activeTab, setActiveTab] = useState<Tab>("food");
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Read ?tab= from URL to support deep-linking from food detail page
  const urlTab = typeof window !== "undefined"
    ? (new URLSearchParams(window.location.search).get("tab") as Tab | null)
    : null;
  const [tab, setTab] = useState<Tab>(urlTab ?? "food");

  // Read ?foodId= and ?foodName= for pre-filling the correction form
  const prefillFoodId = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("foodId") ?? undefined
    : undefined;
  const prefillFoodName = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("foodName") ?? undefined
    : undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm mb-4 hover:underline"
          style={{ color: "oklch(0.45 0.08 162)" }}
        >
          <ArrowLeft size={14} /> Back to Search
        </button>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
          Contribute to Innuir FoodDB
        </h1>
        <p className="text-sm" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
          Help us build the most complete Asian food nutrition database. Every contribution is reviewed by our team.
        </p>
      </div>

      {/* Login notice for food/correction tabs */}
      {!isAuthenticated && tab !== "feedback" && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6 border"
          style={{ background: "oklch(0.97 0.03 60)", borderColor: "oklch(0.85 0.08 60)" }}
        >
          <AlertTriangle size={18} style={{ color: "oklch(0.55 0.12 60)", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: "oklch(0.35 0.10 60)" }}>Login required</p>
            <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.08 60)" }}>
              You need to be logged in to submit foods or corrections.{" "}
              <a href={getLoginUrl()} className="underline font-semibold">Sign in</a> to continue.
              Feedback can be sent without an account.
            </p>
          </div>
        </div>
      )}

      {/* Tab selector */}
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
              boxShadow: tab === t.id ? "0 2px 8px oklch(0.32 0.10 162 / 0.25)" : "none",
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>
            {TABS.find(t => t.id === tab)?.label}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "oklch(0.55 0.015 65)" }}>
            {TABS.find(t => t.id === tab)?.desc}
          </p>
        </div>

        {tab === "food" && (
          isAuthenticated
            ? <SubmitFoodForm />
            : <p className="text-sm text-gray-500">Please log in to submit a new food.</p>
        )}
        {tab === "correction" && (
          isAuthenticated
            ? <ReportCorrectionForm prefillFoodId={prefillFoodId} prefillFoodName={prefillFoodName} />
            : <p className="text-sm text-gray-500">Please log in to report a correction.</p>
        )}
        {tab === "feedback" && <FeedbackForm />}
      </div>

      {/* My contributions link */}
      {isAuthenticated && (
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/my-contributions")}
            className="text-sm hover:underline flex items-center gap-1 mx-auto"
            style={{ color: "oklch(0.45 0.08 162)" }}
          >
            View my past contributions <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
