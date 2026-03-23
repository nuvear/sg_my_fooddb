// FoodDB — NutrientTable component
// Tropical Bauhaus: Space Mono numerics, color-coded severity pills, category section bars

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NUTRIENTS, NUTRIENT_CATEGORIES, NUTRIENT_MAP,
  formatNutrientValue, getNutrientSeverity, getDVPercent,
  type NutrientData, type NutrientCategory,
} from "@/lib/nutrients";

interface NutrientTableProps {
  per100g: NutrientData;
  perServing?: NutrientData | null;
  servingLabel?: string;
  weightG?: number;
  customWeight?: number;
}

const CATEGORY_ORDER: NutrientCategory[] = ["energy", "macros", "fats", "carbs", "minerals", "vitamins", "other"];

export default function NutrientTable({ per100g, perServing, servingLabel, weightG, customWeight }: NutrientTableProps) {
  const [collapsed, setCollapsed] = useState<Set<NutrientCategory>>(new Set());

  const toggleCategory = (cat: NutrientCategory) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // Group nutrients by category
  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    nutrients: NUTRIENTS.filter(n => n.category === cat),
  })).filter(g => g.nutrients.length > 0);

  const showServing = !!perServing;
  const customLabel = customWeight ? `${customWeight}g` : null;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: "oklch(0.22 0.09 162)" }}>
            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider w-[45%]"
              style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.80 0.04 162)" }}>
              Nutrient
            </th>
            <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider"
              style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.80 0.04 162)" }}>
              Per 100g
            </th>
            {showServing && (
              <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.80 0.04 162)" }}>
                {servingLabel ?? (weightG ? `Per ${weightG}g` : "Per Serving")}
              </th>
            )}
            {customLabel && (
              <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.78 0.16 75)" }}>
                {customLabel}
              </th>
            )}
            <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider"
              style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.80 0.04 162)" }}>
              % DV
            </th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(({ cat, nutrients }) => {
            const catInfo = NUTRIENT_CATEGORIES[cat];
            const isCollapsed = collapsed.has(cat);

            return [
              // Category header row
              <tr
                key={`cat-${cat}`}
                className="cursor-pointer select-none"
                onClick={() => toggleCategory(cat)}
                style={{ background: "oklch(0.94 0.015 162)" }}
              >
                <td colSpan={showServing ? (customLabel ? 5 : 4) : (customLabel ? 4 : 3)}
                  className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    {isCollapsed
                      ? <ChevronRight size={14} style={{ color: "oklch(0.32 0.10 162)" }} />
                      : <ChevronDown size={14} style={{ color: "oklch(0.32 0.10 162)" }} />
                    }
                    <span className="font-bold text-xs uppercase tracking-widest"
                      style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.32 0.10 162)" }}>
                      {catInfo.label}
                    </span>
                  </div>
                </td>
              </tr>,

              // Nutrient rows
              ...(!isCollapsed ? nutrients.map((ndef, i) => {
                const val100 = per100g[ndef.key];
                const valServing = perServing?.[ndef.key];
                const severity = getNutrientSeverity(ndef, val100 as number | null);
                const dvPct = getDVPercent(ndef, val100 as number | null);
                const isEven = i % 2 === 0;

                return (
                  <tr
                    key={ndef.key}
                    style={{ background: isEven ? "oklch(1 0 0)" : "oklch(0.98 0.003 90)" }}
                    className="hover:bg-[oklch(0.95_0.01_162)] transition-colors"
                  >
                    {/* Label */}
                    <td className="px-4 py-2.5 font-medium" style={{ color: "oklch(0.28 0.015 65)" }}>
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.82rem" }}>
                          {ndef.label}
                        </span>
                        {severity === "high" && (
                          <span className="pill-badge pill-red text-[10px] px-1.5 py-0">HIGH</span>
                        )}
                        {severity === "warn" && (
                          <span className="pill-badge pill-amber text-[10px] px-1.5 py-0">MOD</span>
                        )}
                      </div>
                    </td>

                    {/* Per 100g */}
                    <td className="text-right px-4 py-2.5">
                      <NutrientCell value={val100 as number | null} unit={ndef.unit} severity={severity} />
                    </td>

                    {/* Per serving */}
                    {showServing && (
                      <td className="text-right px-4 py-2.5">
                        <NutrientCell value={valServing as number | null} unit={ndef.unit} />
                      </td>
                    )}

                    {/* Custom weight */}
                    {customLabel && (
                      <td className="text-right px-4 py-2.5">
                        <NutrientCell
                          value={val100 !== null && val100 !== undefined && customWeight
                            ? parseFloat(((val100 as number) * customWeight / 100).toFixed(2))
                            : null}
                          unit={ndef.unit}
                          highlight
                        />
                      </td>
                    )}

                    {/* % DV */}
                    <td className="text-right px-4 py-2.5">
                      {dvPct !== null ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden"
                            style={{ background: "oklch(0.90 0.01 90)" }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(dvPct, 100)}%`,
                                background: dvPct > 100
                                  ? "oklch(0.65 0.18 25)"
                                  : dvPct > 50
                                    ? "oklch(0.78 0.16 75)"
                                    : "oklch(0.48 0.10 162)",
                              }}
                            />
                          </div>
                          <span className="nutrient-value text-xs w-10 text-right"
                            style={{ color: "oklch(0.45 0.08 162)" }}>
                            {dvPct}%
                          </span>
                        </div>
                      ) : (
                        <span className="nutrient-dash text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              }) : []),
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}

function NutrientCell({
  value, unit, severity, highlight
}: {
  value: number | null | undefined;
  unit: string;
  severity?: "normal" | "warn" | "high";
  highlight?: boolean;
}) {
  if (value === null || value === undefined) {
    return <span className="nutrient-dash text-xs">—</span>;
  }

  const color = highlight
    ? "oklch(0.32 0.10 162)"
    : severity === "high"
      ? "oklch(0.55 0.18 25)"
      : severity === "warn"
        ? "oklch(0.55 0.14 65)"
        : "oklch(0.28 0.015 65)";

  return (
    <span className="nutrient-value text-xs" style={{ color }}>
      {formatNutrientValue(value, unit)}
    </span>
  );
}
