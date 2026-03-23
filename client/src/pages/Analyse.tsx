// FoodDB Analyse — AI food photo recognition
// Upload a photo → AI identifies the food → show nutritional data

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Loader2, Search, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { toast } from "sonner";

import { searchFoods, getFoodDetail } from "@/lib/api";
import { scaleNutrients, NUTRIENTS, formatNutrientValue } from "@/lib/nutrients";
import NutrientTable from "@/components/NutrientTable";
import type { FoodItem, FoodSearchResult } from "@/lib/nutrients";

const UPLOAD_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/fooddb-upload-bg-fuY8QxrA2SpixGsLj2Mzta.webp";

type Step = "upload" | "identifying" | "confirm" | "results";

export default function Analyse() {
  const [step, setStep] = useState<Step>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");
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
              content: `You are a Singapore and Malaysia food recognition expert. 
When shown a food image, identify the dish and respond with ONLY a JSON object in this exact format:
{"foodName": "Nasi Lemak", "confidence": "high", "description": "Rice cooked in coconut milk served with sambal, anchovies, peanuts and egg", "searchTerms": ["Nasi Lemak", "coconut rice", "nasi lemak with chicken"]}
- foodName: the most likely Singapore/Malaysia food name
- confidence: "high", "medium", or "low"
- description: brief description
- searchTerms: 2-3 search terms to find it in the SG FoodID database`
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: base64, detail: "low" }
                },
                {
                  type: "text",
                  text: "What Singapore or Malaysia food is this? Respond with only the JSON."
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

      const parsed = JSON.parse(jsonMatch[0]);
      setAiResult(parsed.foodName ?? "Unknown food");

      // Search for the food in SG FoodID
      const searchTerm = parsed.searchTerms?.[0] ?? parsed.foodName;
      const { items } = await searchFoods(searchTerm, 1);
      setAiCandidates(items.slice(0, 6));
      setStep("confirm");
    } catch (e: any) {
      console.error("AI identification error:", e);
      // Fallback: show search interface
      setAiResult("Could not identify automatically");
      setAiCandidates([]);
      setStep("confirm");
      setError("AI identification failed. Please search manually below.");
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
    setAiResult("");
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
      <div className="jade-block px-4 md:px-8 py-5">
        <h1 className="text-xl font-extrabold mb-1" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}>
          Analyse Food Photo
        </h1>
        <p className="text-sm opacity-75" style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Nunito Sans, sans-serif" }}>
          Upload a photo of your food — AI will identify it and show nutritional data
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
              <Camera size={40} className="mx-auto mb-3" style={{ color: "oklch(0.48 0.10 162)" }} />
              <p className="font-bold text-base mb-1" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
                Drop a food photo here
              </p>
              <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.015 65)" }}>
                or click to browse — JPG, PNG, WEBP
              </p>
              <Button
                size="sm"
                className="gap-1.5 font-semibold"
                style={{ background: "oklch(0.32 0.10 162)", color: "oklch(0.98 0.005 90)", fontFamily: "Sora, sans-serif" }}
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

            <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "oklch(0.94 0.015 162)", color: "oklch(0.40 0.08 162)", fontFamily: "Nunito Sans, sans-serif" }}>
              <strong>Tip:</strong> Works best with clear, well-lit photos of single dishes. AI identifies Singapore & Malaysia foods and matches them to the HPB SG FoodID database.
            </div>
          </div>
        )}

        {/* Step: Identifying */}
        {step === "identifying" && (
          <div className="text-center py-12">
            {imageUrl && (
              <img src={imageUrl} alt="Food" className="w-48 h-48 object-cover rounded-xl mx-auto mb-6 shadow-lg" />
            )}
            <Loader2 size={32} className="animate-spin mx-auto mb-3" style={{ color: "oklch(0.32 0.10 162)" }} />
            <p className="font-bold text-base" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
              Identifying food...
            </p>
            <p className="text-sm mt-1" style={{ color: "oklch(0.52 0.015 65)" }}>
              AI is analysing your photo
            </p>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div>
            <div className="flex items-start gap-4 mb-5">
              {imageUrl && (
                <img src={imageUrl} alt="Food" className="w-24 h-24 object-cover rounded-lg shadow shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="pill-badge pill-green text-xs">AI Result</span>
                </div>
                <p className="font-bold text-lg" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
                  {aiResult}
                </p>
                {error && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "oklch(0.45 0.18 25)" }}>
                    <AlertCircle size={12} /> {error}
                  </div>
                )}
              </div>
              <button onClick={reset} className="text-xs" style={{ color: "oklch(0.52 0.015 65)" }}>
                <X size={16} />
              </button>
            </div>

            {/* Candidates */}
            {aiCandidates.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.52 0.015 65)" }}>
                  Select the matching food:
                </p>
                <div className="space-y-2">
                  {aiCandidates.map(item => (
                    <button
                      key={item.crId}
                      onClick={() => selectCandidate(item)}
                      className="w-full text-left p-3 rounded-lg border-2 transition-all hover:border-[oklch(0.32_0.10_162)] flex items-center justify-between gap-2"
                      style={{ borderColor: "oklch(0.88 0.008 90)", background: "oklch(1 0 0)" }}
                    >
                      <div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "oklch(0.52 0.015 65)" }}>
                            {item.description}
                          </div>
                        )}
                      </div>
                      <ChevronRight size={14} style={{ color: "oklch(0.65 0.07 162)", flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual search fallback */}
            <div className="border-t pt-4" style={{ borderColor: "oklch(0.88 0.008 90)" }}>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.52 0.015 65)" }}>
                Or search manually:
              </p>
              <div className="flex gap-2">
                <Input
                  value={manualSearch}
                  onChange={e => setManualSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && doManualSearch()}
                  placeholder="Search SG FoodID database..."
                  className="flex-1 h-9 text-sm"
                />
                <Button
                  size="sm"
                  onClick={doManualSearch}
                  disabled={searchLoading}
                  style={{ background: "oklch(0.32 0.10 162)", color: "oklch(0.98 0.005 90)" }}
                >
                  {searchLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                </Button>
              </div>
              {manualResults.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {manualResults.map(item => (
                    <button
                      key={item.crId}
                      onClick={() => selectCandidate(item)}
                      className="w-full text-left p-2.5 rounded-lg border transition-all hover:border-[oklch(0.32_0.10_162)] flex items-center justify-between gap-2"
                      style={{ borderColor: "oklch(0.88 0.008 90)", background: "oklch(0.99 0 0)" }}
                    >
                      <div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
                          {item.name}
                        </div>
                        <div className="text-xs" style={{ color: "oklch(0.52 0.015 65)" }}>
                          {item.l1Category} › {item.l2Category}
                        </div>
                      </div>
                      <ChevronRight size={13} style={{ color: "oklch(0.65 0.07 162)" }} />
                    </button>
                  ))}
                </div>
              )}
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
                <h2 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
                  {selectedFood.name}
                </h2>
                {selectedFood.description && (
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.52 0.015 65)" }}>
                    {selectedFood.description}
                  </p>
                )}
                <Link href={`/food/${selectedFood.crId}`}>
                  <span className="text-xs underline mt-1 inline-block" style={{ color: "oklch(0.32 0.10 162)" }}>
                    View full details →
                  </span>
                </Link>
              </div>
              <button onClick={reset} className="text-xs shrink-0" style={{ color: "oklch(0.52 0.015 65)" }}>
                <X size={16} />
              </button>
            </div>

            {/* Quantity input */}
            <div
              className="flex items-center gap-3 p-3 rounded-lg mb-4 border"
              style={{ background: "oklch(0.96 0.01 162)", borderColor: "oklch(0.88 0.008 90)" }}
            >
              <span className="text-sm font-semibold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
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
              <span className="text-sm" style={{ color: "oklch(0.52 0.015 65)" }}>grams</span>
              {selectedFood.defaultServingSize && (
                <button
                  onClick={() => setQuantity(String(selectedFood.defaultWeight_g ?? 100))}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: "oklch(0.90 0.06 162)", color: "oklch(0.28 0.10 162)", fontFamily: "Nunito Sans, sans-serif" }}
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
                    <div className="nutrient-value text-xl font-bold" style={{ color: "oklch(0.22 0.09 162)" }}>
                      {val !== null && val !== undefined ? Math.round(val) : "—"}
                    </div>
                    <div className="text-[10px]" style={{ color: "oklch(0.52 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full nutrient table */}
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: "oklch(0.88 0.008 90)" }}>
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
