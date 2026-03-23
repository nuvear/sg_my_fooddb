// ============================================================
// FoodDB — CSV / ZIP Upload Page
// Tropical Bauhaus: structured upload flow, data-first preview
// Supports: single .csv, multiple .csv, .zip containing .csv files
// ============================================================

import { useState, useRef, useCallback } from "react";
import JSZip from "jszip";
import {
  Upload, FileText, Archive, CheckCircle2, XCircle,
  AlertTriangle, Database, ChevronRight, Loader2, X, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { parseFoodCSV } from "@/lib/csvParser";
import { saveLocalRecord, getLocalRecords } from "@/lib/api";
import { NUTRIENTS, formatNutrientValue } from "@/lib/nutrients";
import type { FoodItem } from "@/lib/nutrients";
import type { ParseResult } from "@/lib/csvParser";

type UploadPhase = "idle" | "reading" | "parsing" | "preview" | "saving" | "done";

interface FileEntry {
  name: string;
  content: string;
}

export default function UploadCSV() {
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [previewFood, setPreviewFood] = useState<FoodItem | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: File[]) => {
    setPhase("reading");
    setProgress(0);
    setResult(null);

    // Collect all CSV text entries
    const entries: FileEntry[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgressLabel(`Reading ${file.name}…`);
      setProgress(Math.round((i / files.length) * 40));

      if (file.name.toLowerCase().endsWith(".zip")) {
        // Extract CSVs from ZIP
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const csvFiles = Object.entries(zip.files).filter(
          ([name, f]) => name.toLowerCase().endsWith(".csv") && !f.dir && !name.includes("__MACOSX")
        );
        for (const [name, zipFile] of csvFiles) {
          const text = await zipFile.async("text");
          entries.push({ name: name.split("/").pop() ?? name, content: text });
        }
      } else if (file.name.toLowerCase().endsWith(".csv")) {
        const text = await file.text();
        entries.push({ name: file.name, content: text });
      }
    }

    if (entries.length === 0) {
      toast.error("No CSV files found in the uploaded files.");
      setPhase("idle");
      return;
    }

    // Parse all CSVs
    setPhase("parsing");
    setProgressLabel(`Parsing ${entries.length} CSV files…`);

    const imported: FoodItem[] = [];
    const failed: string[] = [];
    const skipped: string[] = [];

    // Get existing crIds to detect duplicates
    const existingIds = new Set(getLocalRecords().map(r => r.crId));

    for (let i = 0; i < entries.length; i++) {
      const { name, content } = entries[i];
      setProgress(40 + Math.round((i / entries.length) * 50));
      setProgressLabel(`Parsing ${name}…`);

      const food = parseFoodCSV(content, name);
      if (!food) {
        failed.push(name);
        continue;
      }

      if (existingIds.has(food.crId)) {
        skipped.push(name);
        // Still include in imported — we'll upsert
        imported.push(food);
      } else {
        imported.push(food);
      }
    }

    setProgress(95);
    setResult({ imported, failed, skipped });
    setPhase("preview");
    setProgress(100);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) processFiles(files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) processFiles(files);
    // Reset input so same file can be re-uploaded
    e.target.value = "";
  }, [processFiles]);

  const handleSave = useCallback(async () => {
    if (!result?.imported.length) return;
    setPhase("saving");
    setProgressLabel("Saving to local database…");

    let saved = 0;
    for (const food of result.imported) {
      saveLocalRecord(food);
      saved++;
      if (saved % 10 === 0) {
        setProgress(Math.round((saved / result.imported.length) * 100));
        // Yield to UI
        await new Promise(r => setTimeout(r, 0));
      }
    }

    setPhase("done");
    toast.success(`Saved ${saved} food records to local database!`);
  }, [result]);

  const reset = () => {
    setPhase("idle");
    setProgress(0);
    setProgressLabel("");
    setResult(null);
    setPreviewFood(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-jade-600 flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Upload CSV / ZIP</h1>
            <p className="text-sm text-muted-foreground">Import food data files in HPB SG FoodID format</p>
          </div>
        </div>
      </div>

      {/* Format guide */}
      <div className="mb-6 p-4 rounded-xl border border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground mb-2">Accepted formats</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 mt-0.5 text-jade-600 shrink-0" />
            <div>
              <span className="font-medium text-foreground">.csv</span>
              <br />Single food item per file
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Archive className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
            <div>
              <span className="font-medium text-foreground">.zip</span>
              <br />Multiple CSV files bundled
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Database className="w-4 h-4 mt-0.5 text-jade-600 shrink-0" />
            <div>
              <span className="font-medium text-foreground">HPB format</span>
              <br />41 nutrients, per 100g + per serving
            </div>
          </div>
        </div>
      </div>

      {/* Drop zone */}
      {phase === "idle" && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
            ${isDragOver
              ? "border-jade-500 bg-jade-50 dark:bg-jade-950/20"
              : "border-border hover:border-jade-400 hover:bg-muted/20"
            }`}
          onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.zip"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
              ${isDragOver ? "bg-jade-600" : "bg-muted"}`}>
              <Upload className={`w-8 h-8 ${isDragOver ? "text-white" : "text-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {isDragOver ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse — accepts .csv and .zip files
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2" onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Browse files
            </Button>
          </div>
        </div>
      )}

      {/* Progress */}
      {(phase === "reading" || phase === "parsing" || phase === "saving") && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <Loader2 className="w-10 h-10 text-jade-600 animate-spin mx-auto mb-4" />
          <p className="font-semibold text-foreground mb-1">{progressLabel}</p>
          <Progress value={progress} className="mt-4 h-2" />
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>
      )}

      {/* Preview & Confirm */}
      {(phase === "preview" || phase === "done") && result && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-3xl font-bold font-display text-jade-600">{result.imported.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Foods to import</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-3xl font-bold font-display text-amber-600">{result.skipped.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Will update (duplicate)</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-3xl font-bold font-display text-destructive">{result.failed.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Failed to parse</div>
            </div>
          </div>

          {/* Failed files list */}
          {result.failed.length > 0 && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-destructive">Failed to parse ({result.failed.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.failed.map(f => (
                  <span key={f} className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded font-mono">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Skipped (duplicates) */}
          {result.skipped.length > 0 && (
            <div className="rounded-xl border border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Duplicates — will overwrite existing records ({result.skipped.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skipped.slice(0, 20).map(f => (
                  <span key={f} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded font-mono">{f}</span>
                ))}
                {result.skipped.length > 20 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">+{result.skipped.length - 20} more</span>
                )}
              </div>
            </div>
          )}

          {/* Food list preview */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Preview ({result.imported.length} foods)</span>
              <span className="text-xs text-muted-foreground">Click a row to inspect nutrients</span>
            </div>
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {result.imported.map((food, i) => (
                <div
                  key={food.crId}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setPreviewFood(food)}
                >
                  <div className="w-6 h-6 rounded-full bg-jade-100 dark:bg-jade-900/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-jade-700 dark:text-jade-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{food.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {food.foodGroup}{food.foodSubgroup ? ` · ${food.foodSubgroup}` : ""}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {food.nutrientsPer100g.energy != null ? `${food.nutrientsPer100g.energy} kcal` : "—"}
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          {phase === "preview" && (
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-jade-600 hover:bg-jade-700 text-white font-semibold"
                onClick={handleSave}
                disabled={result.imported.length === 0}
              >
                <Database className="w-4 h-4 mr-2" />
                Save {result.imported.length} foods to My DB
              </Button>
              <Button variant="outline" onClick={reset}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          )}

          {phase === "done" && (
            <div className="rounded-xl border border-jade-300/50 bg-jade-50/50 dark:bg-jade-950/20 p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-jade-600 mx-auto mb-3" />
              <p className="font-bold text-lg text-foreground">Import complete!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {result.imported.length} foods saved to your local database.
              </p>
              <div className="flex gap-3 justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/db"}
                >
                  <Database className="w-4 h-4 mr-2" />
                  View My DB
                </Button>
                <Button
                  className="bg-jade-600 hover:bg-jade-700 text-white"
                  onClick={reset}
                >
                  Upload more
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nutrient preview modal */}
      {previewFood && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewFood(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground">{previewFood.name}</h3>
                <p className="text-xs text-muted-foreground">{previewFood.foodGroup} · {previewFood.defaultServingSize}</p>
              </div>
              <button onClick={() => setPreviewFood(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left pb-2 font-medium">Nutrient</th>
                    <th className="text-right pb-2 font-medium">Per 100g</th>
                    <th className="text-right pb-2 font-medium">Per serving</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {NUTRIENTS.map(n => {
                    const v100 = previewFood.nutrientsPer100g[n.key];
                    const vSrv = previewFood.nutrientsPerServing?.[n.key];
                    if (v100 === null && vSrv === null) return null;
                    return (
                      <tr key={n.key} className="hover:bg-muted/20">
                        <td className="py-1.5 text-foreground">{n.label}</td>
                        <td className="py-1.5 text-right font-mono text-muted-foreground">
                          {formatNutrientValue(v100 ?? null, n.unit)}
                        </td>
                        <td className="py-1.5 text-right font-mono text-muted-foreground">
                          {formatNutrientValue(vSrv ?? null, n.unit)}
                        </td>
                      </tr>
                    );
                  }).filter(Boolean)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
