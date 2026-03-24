// FoodDB Analyse — AI food photo recognition
// Upload a photo → AI identifies the food → show nutritional data

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Loader2, Search, ChevronRight, AlertCircle, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { toast } from "sonner";

import { searchFoods, getFoodDetail } from "@/lib/api";
import { scaleNutrients, NUTRIENTS, formatNutrientValue } from "@/lib/nutrients";
import NutrientTable from "@/components/NutrientTable";
import type { FoodItem, FoodSearchResult } from "@/lib/nutrients";

const UPLOAD_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-upload-bg-fuY8QxrA2SpixGsLj2Mzta.webp";

type Step = "upload" | "identifying" | "confirm" | "results" | "ai-estimate";

interface AiIdentification {
  foodName: string;
  confidence: "high" | "medium" | "low";
  description: string;
  searchTerms: string[];
  cuisine: string;
  ingredients?: string[];
}

interface AiNutritionEstimate {
  dishName: string;
  servingSize: string;
  estimatedKcal: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  sodium_mg: number;
  fiber_g: number;
  sugar_g: number;
  notes: string;
  disclaimer: string;
}

export default function Analyse() {
  const [step, setStep] = useState<Step>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [aiIdentification, setAiIdentification] = useState<AiIdentification | null>(null);
  const [aiEstimate, setAiEstimate] = useState<AiNutritionEstimate | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [aiCandidates, setAiCandidates] = useState<FoodSearchResult[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<string>("100");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep("identifying");
    identifyFood(file);
  }, []);

  const identifyFood = async (file: File) => {
    setError(null);
    try {
      // Convert image to base64
      const base64 = await fileToBase64(file);

      // Call the built-in Forge API for vision
      const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
      const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL;

      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert food recognition AI with deep knowledge of Asian cuisine — including Singapore, Malaysia, Japan, China, Korea, Thailand, India, Okinawa, and beyond.

When shown a food image, identify the dish and respond with ONLY a valid JSON object:
{"foodName":"Goya Champuru","confidence":"high","description":"Okinawan stir-fry with bitter melon, tofu, egg, and pork belly","cuisine":"Okinawan / Japanese","searchTerms":["bitter melon stir fry","goya champuru","tofu stir fry"],"ingredients":["bitter melon","firm tofu","egg","pork belly","soy sauce"]}

Rules:
- foodName: the correct dish name (any cuisine, not limited to SG/MY)
- confidence: "high" if clearly identifiable, "medium" if likely, "low" if uncertain
- description: 1-2 sentence description including key ingredients and origin
- cuisine: the cuisine/origin (e.g. "Okinawan / Japanese", "Singaporean", "Malaysian Chinese")
- searchTerms: 2-4 terms to search in a nutritional database (use common English names)
- ingredients: list the main visible or typical ingredients of this dish
- ALWAYS return valid JSON even if confidence is low — never return an error or plain text`
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: base64, detail: "high" }
                },
                {
                  type: "text",
                  text: "What dish is this? Identify it and provide the JSON response."
                }
              ]
            }
          ],
          max_tokens: 300,
          temperature: 0.3,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse AI response");

      const parsed: AiIdentification = JSON.parse(jsonMatch[0]);
      setAiIdentification(parsed);

      // Search FoodDB with multiple terms for best match
      const allTerms = [parsed.foodName, ...(parsed.searchTerms ?? [])];
      let bestResults: FoodSearchResult[] = [];
      for (const term of allTerms.slice(0, 3)) {
        const { items } = await searchFoods(term, 1);
        if (items.length > 0) {
          bestResults = items.slice(0, 6);
          break;
        }
      }
      setAiCandidates(bestResults);
      setStep("confirm");
    } catch (e: unknown) {
      console.error("AI identification error:", e);
      setAiIdentification(null);
      setAiCandidates([]);
      setStep("confirm");
      setError("AI identification failed. Please search manually below.");
    }
  };

  const estimateNutrition = async () => {
    if (!aiIdentification) return;
    setEstimating(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
      const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
      const ingredientsList = aiIdentification.ingredients?.join(", ") ?? "unknown";

      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a registered dietitian. Estimate nutritional content of dishes based on typical recipes. Respond with ONLY a valid JSON object, no markdown."
            },
            {
              role: "user",
              content: `Estimate nutritional content per 100g for: "${aiIdentification.foodName}" (${aiIdentification.cuisine}).\nIngredients: ${ingredientsList}.\nDescription: ${aiIdentification.description}\n\nRespond with ONLY this JSON:\n{"dishName":"${aiIdentification.foodName}","servingSize":"200g","estimatedKcal":150,"protein_g":12,"fat_g":8,"carbs_g":6,"sodium_mg":450,"fiber_g":2,"sugar_g":1,"notes":"Brief nutritional note","disclaimer":"AI estimate based on typical recipe. Actual values may vary."}`
            }
          ],
          max_tokens: 400,
          temperature: 0.1,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse nutrition estimate");
      const estimate: AiNutritionEstimate = JSON.parse(jsonMatch[0]);
      setAiEstimate(estimate);
      setStep("ai-estimate");
    } catch (e: unknown) {
      console.error("Nutrition estimation error:", e);
      toast.error("Could not estimate nutrition. Please search manually.");
    } finally {
      setEstimating(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const selectCandidate = async (item: FoodSearchResult) => {
    setError(null);
    const detail = await getFoodDetail(item.crId);
    if (detail) {
      setSelectedFood(detail);
      setQuantity(detail.defaultWeight_g ? String(detail.defaultWeight_g) : "100");
      setStep("results");
    } else {
      toast.error("Could not load food details");
    }
  };

  const [manualSearch, setManualSearch] = useState("");
  const [manualResults, setManualResults] = useState<FoodSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const doManualSearch = async () => {
    if (!manualSearch.trim()) return;
    setSearchLoading(true);
    try {
      const { items } = await searchFoods(manualSearch, 1);
      setManualResults(items.slice(0, 8));
    } catch {
      toast.error("Search failed");
    } finally {
      setSearchLoading(false);
    }
  };

  const reset = () => {
    setStep("upload");
    setImageUrl(null);
    setImageFile(null);
    setAiIdentification(null);
    setAiEstimate(null);
    setAiCandidates([]);
    setSelectedFood(null);
    setQuantity("100");
    setError(null);
    setManualSearch("");
    setManualResults([]);
  };

  const quantityG = parseFloat(quantity) || 100;
  const scaledNutrients = selectedFood
    ? scaleNutrients(selectedFood.nutrientsPer100g, quantityG)
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-4 md:px-8 py-5" style={{ background: "#1C1C2E" }}>
        <h1 className="text-xl font-extrabold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#F7F9FC" }}>
          Analyse Food Photo
        </h1>
        <p className="text-sm" style={{ color: "#A899F0", fontFamily: "Inter, sans-serif" }}>
          AI identifies any dish — SG, MY, Japanese, and beyond
        </p>
      </div>

      <div className="flex-1 px-4 md:px-8 py-6 max-w-3xl mx-auto w-full">

        {/* Step: Upload */}
        {step === "upload" && (
          <div>
            <div
              className={`upload-zone rounded-xl p-10 text-center cursor-pointer ${dragOver ? "drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
            >
              <Camera size={40} className="mx-auto mb-3" style={{ color: "#A899F0" }} />
              <p className="font-bold text-base mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#6D5BD0" }}>
                Drop a food photo here
              </p>
              <p className="text-sm mb-4" style={{ color: "#4A5568" }}>
                or click to browse — JPG, PNG, WEBP
              </p>
              <Button
                size="sm"
                className="gap-1.5 font-semibold"
                style={{ background: "#6D5BD0", color: "#F7F9FC", fontFamily: "Inter, sans-serif" }}
              >
                <Upload size={14} /> Choose Photo
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />

            <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "#EDE9FB", color: "#4A3A9E", fontFamily: "Inter, sans-serif" }}>
              <strong>Tip:</strong> Works best with clear, well-lit photos of single dishes. AI identifies any Asian or world cuisine and matches to the HPB SG FoodID database. For dishes not in the database, an AI nutritional estimate is provided.
            </div>
          </div>
        )}

        {/* Step: Identifying */}
        {step === "identifying" && (
          <div className="text-center py-12">
            {imageUrl && (
              <img src={imageUrl} alt="Food" className="w-48 h-48 object-cover rounded-xl mx-auto mb-6 shadow-lg" />
            )}
            <Loader2 size={32} className="animate-spin mx-auto mb-3" style={{ color: "#6D5BD0" }} />
            <p className="font-bold text-base" style={{ fontFamily: "Inter, sans-serif", color: "#6D5BD0" }}>
              Identifying food...
            </p>
            <p className="text-sm mt-1" style={{ color: "#4A5568" }}>
              AI is analysing your photo
            </p>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4">
            {/* AI identification result */}
            <div className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "#DDE3EE", background: "white" }}>
              {imageUrl && <img src={imageUrl} alt="Food" className="w-20 h-20 object-cover rounded-lg shadow shrink-0" />}
              <div className="flex-1 min-w-0">
                {aiIdentification ? (
                  <>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#EDE9FB", color: "#6D5BD0" }}>AI Result</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                        style={aiIdentification.confidence === "high" ? { background: "#D1FAE5", color: "#065F46", borderColor: "#6EE7B7" } : aiIdentification.confidence === "medium" ? { background: "#FEF3C7", color: "#92400E", borderColor: "#FCD34D" } : { background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }}
                      >
                        {aiIdentification.confidence} confidence
                      </span>
                      {aiIdentification.cuisine && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F1F5F9", color: "#4A5568" }}>
                          {aiIdentification.cuisine}
                        </span>
                      )}
                    </div>
                    <h2 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "Inter, sans-serif", color: "#1C1C2E" }}>
                      {aiIdentification.foodName}
                    </h2>
                    <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "#4A5568" }}>
                      {aiIdentification.description}
                    </p>
                    {aiIdentification.ingredients && aiIdentification.ingredients.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: "#6D5BD0" }}>
                        <span className="font-semibold">Ingredients: </span>
                        {aiIdentification.ingredients.join(", ")}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-1 inline-block" style={{ background: "#EDE9FB", color: "#6D5BD0" }}>AI Result</span>
                    <h2 className="font-extrabold text-lg" style={{ fontFamily: "Inter, sans-serif", color: "#1C1C2E" }}>Could not identify automatically</h2>
                    {error && (
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#991B1B" }}>
                        <AlertCircle size={12} /> {error}
                      </p>
                    )}
                  </>
                )}
              </div>
              <button onClick={reset}><X size={16} style={{ color: "#4A5568" }} /></button>
            </div>

            {/* FoodDB candidates */}
            {aiCandidates.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                  Found in FoodDB — select to view nutrition:
                </p>
                <div className="space-y-1.5">
                  {aiCandidates.map(item => (
                    <button
                      key={item.crId}
                      onClick={() => selectCandidate(item)}
                      className="w-full text-left p-3 rounded-lg border transition-all hover:border-[#6D5BD0] flex items-center justify-between gap-2"
                      style={{ borderColor: "#DDE3EE", background: "white" }}
                    >
                      <div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>{item.name}</div>
                        {item.description && <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "#4A5568" }}>{item.description}</div>}
                      </div>
                      <ChevronRight size={14} style={{ color: "#6D5BD0", flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Nutrition Estimate button — when dish identified but not in FoodDB */}
            {aiIdentification && aiCandidates.length === 0 && (
              <div className="p-4 rounded-xl border" style={{ borderColor: "#A899F0", background: "#F5F3FF" }}>
                <div className="flex items-start gap-3">
                  <Sparkles size={18} style={{ color: "#6D5BD0", flexShrink: 0, marginTop: 2 }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#1C1C2E" }}>
                      "{aiIdentification.foodName}" is not in the SG/MY FoodDB
                    </p>
                    <p className="text-xs mb-3" style={{ color: "#4A5568" }}>
                      This dish ({aiIdentification.cuisine}) is not in the Singapore/Malaysia nutritional database. The AI can estimate its nutritional content based on typical ingredients.
                    </p>
                    <Button size="sm" onClick={estimateNutrition} disabled={estimating} style={{ background: "#6D5BD0", color: "white" }}>
                      {estimating ? <><Loader2 size={13} className="animate-spin mr-1.5" /> Estimating…</> : <><Sparkles size={13} className="mr-1.5" /> Get AI Nutrition Estimate</>}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Manual search fallback */}
            <div className="border-t pt-4" style={{ borderColor: "#DDE3EE" }}>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>Or search manually:</p>
              <div className="flex gap-2">
                <Input value={manualSearch} onChange={e => setManualSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && doManualSearch()} placeholder="Search SG FoodID database..." className="flex-1 h-9 text-sm" />
                <Button size="sm" onClick={doManualSearch} disabled={searchLoading} style={{ background: "#6D5BD0", color: "#F7F9FC" }}>
                  {searchLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                </Button>
              </div>
              {manualResults.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {manualResults.map(item => (
                    <button key={item.crId} onClick={() => selectCandidate(item)} className="w-full text-left p-2.5 rounded-lg border transition-all hover:border-[#6D5BD0] flex items-center justify-between gap-2" style={{ borderColor: "#DDE3EE", background: "white" }}>
                      <div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>{item.name}</div>
                        <div className="text-xs" style={{ color: "#4A5568" }}>{item.l1Category} › {item.l2Category}</div>
                      </div>
                      <ChevronRight size={13} style={{ color: "#6D5BD0" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step: AI Nutrition Estimate */}
        {step === "ai-estimate" && aiEstimate && (
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "#A899F0", background: "#F5F3FF" }}>
              {imageUrl && <img src={imageUrl} alt="Food" className="w-16 h-16 object-cover rounded-lg shadow shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#EDE9FB", color: "#6D5BD0" }}>AI Estimate</span>
                  {aiIdentification?.cuisine && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F1F5F9", color: "#4A5568" }}>{aiIdentification.cuisine}</span>}
                </div>
                <h2 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "Inter, sans-serif", color: "#1C1C2E" }}>{aiEstimate.dishName}</h2>
                <p className="text-xs mt-0.5" style={{ color: "#4A5568" }}>Typical serving: {aiEstimate.servingSize}</p>
              </div>
              <button onClick={reset}><X size={16} style={{ color: "#4A5568" }} /></button>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: "#FEF3C7", border: "1px solid #FCD34D" }}>
              <Info size={14} style={{ color: "#92400E", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs" style={{ color: "#92400E" }}><strong>AI Estimate:</strong> {aiEstimate.disclaimer} Not a substitute for verified nutritional data.</p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "kcal", value: aiEstimate.estimatedKcal },
                { label: "Protein", value: `${aiEstimate.protein_g}g` },
                { label: "Fat", value: `${aiEstimate.fat_g}g` },
                { label: "Carbs", value: `${aiEstimate.carbs_g}g` },
              ].map(({ label, value }) => (
                <div key={label} className="text-center p-2 rounded-lg" style={{ background: "#EDE9FB" }}>
                  <div className="text-xl font-bold" style={{ color: "#1C1C2E", fontFamily: "Inter, sans-serif" }}>{value}</div>
                  <div className="text-[10px]" style={{ color: "#4A5568" }}>{label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#DDE3EE" }}>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: "#F7F9FC", color: "#4A5568" }}>Per 100g — AI Estimate</div>
              {[
                { label: "Energy", value: aiEstimate.estimatedKcal, unit: "kcal" },
                { label: "Protein", value: aiEstimate.protein_g, unit: "g" },
                { label: "Total Fat", value: aiEstimate.fat_g, unit: "g" },
                { label: "Carbohydrates", value: aiEstimate.carbs_g, unit: "g" },
                { label: "Dietary Fibre", value: aiEstimate.fiber_g, unit: "g" },
                { label: "Sugar", value: aiEstimate.sugar_g, unit: "g" },
                { label: "Sodium", value: aiEstimate.sodium_mg, unit: "mg" },
              ].map(({ label, value, unit }, i) => (
                <div key={label} className="flex justify-between items-center px-4 py-2.5 text-sm" style={{ borderTop: i > 0 ? "1px solid #F1F5F9" : undefined }}>
                  <span style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>{label}</span>
                  <span className="font-semibold" style={{ color: "#1C1C2E", fontFamily: "Inter, sans-serif" }}>{value} <span className="text-xs font-normal" style={{ color: "#4A5568" }}>{unit}</span></span>
                </div>
              ))}
            </div>

            {aiEstimate.notes && (
              <div className="p-3 rounded-lg" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                <p className="text-xs" style={{ color: "#065F46" }}><strong>Nutritional notes:</strong> {aiEstimate.notes}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={reset} className="flex-1">Analyse another photo</Button>
              <Button size="sm" onClick={() => setStep("confirm")} className="flex-1" style={{ background: "#6D5BD0", color: "white" }}>Search FoodDB instead</Button>
            </div>
          </div>
        )}

        {/* Step: Results */}
        {step === "results" && selectedFood && (
          <div>
            {/* Food header */}
            <div className="flex items-start gap-4 mb-4">
              {imageUrl && (
                <img src={imageUrl} alt="Food" className="w-20 h-20 object-cover rounded-lg shadow shrink-0" />
              )}
              <div className="flex-1">
                <h2 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                  {selectedFood.name}
                </h2>
                {selectedFood.description && (
                  <p className="text-xs mt-0.5" style={{ color: "#4A5568" }}>
                    {selectedFood.description}
                  </p>
                )}
                <Link href={`/food/${selectedFood.crId}`}>
                  <span className="text-xs underline mt-1 inline-block" style={{ color: "#6D5BD0" }}>
                    View full details →
                  </span>
                </Link>
              </div>
              <button onClick={reset} className="text-xs shrink-0" style={{ color: "#4A5568" }}>
                <X size={16} />
              </button>
            </div>

            {/* Quantity input */}
            <div
              className="flex items-center gap-3 p-3 rounded-lg mb-4 border"
              style={{ background: "oklch(0.96 0.01 162)", borderColor: "#DDE3EE" }}
            >
              <span className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif", color: "#6D5BD0" }}>
                Quantity:
              </span>
              <Input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="w-24 h-8 text-sm text-right font-mono"
                min={1}
                max={2000}
              />
              <span className="text-sm" style={{ color: "#4A5568" }}>grams</span>
              {selectedFood.defaultServingSize && (
                <button
                  onClick={() => setQuantity(String(selectedFood.defaultWeight_g ?? 100))}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: "oklch(0.90 0.06 162)", color: "oklch(0.28 0.10 162)", fontFamily: "Inter, sans-serif" }}
                >
                  Use default ({selectedFood.defaultServingSize})
                </button>
              )}
            </div>

            {/* Quick macro summary */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { key: "energy", label: "kcal" },
                { key: "protein", label: "Protein" },
                { key: "fat", label: "Fat" },
                { key: "carbohydrate", label: "Carbs" },
              ].map(({ key, label }) => {
                const val = scaledNutrients?.[key];
                return (
                  <div key={key} className="text-center p-2 rounded-lg" style={{ background: "oklch(0.94 0.015 162)" }}>
                    <div className="nutrient-value text-xl font-bold" style={{ color: "#1C1C2E" }}>
                      {val !== null && val !== undefined ? Math.round(val) : "—"}
                    </div>
                    <div className="text-[10px]" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full nutrient table */}
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#DDE3EE" }}>
              <NutrientTable
                per100g={selectedFood.nutrientsPer100g}
                customWeight={quantityG}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
