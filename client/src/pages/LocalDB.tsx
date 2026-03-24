// FoodDB LocalDB — manage locally stored food records
// Tropical Bauhaus: data table, export/import, delete records

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Database, Download, Upload, Trash2, Search, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getLocalRecords, deleteLocalRecord, exportLocalDB, importLocalDB } from "@/lib/api";
import { NUTRIENT_MAP, formatNutrientValue } from "@/lib/nutrients";
import type { FoodItem } from "@/lib/nutrients";

export default function LocalDB() {
  const [records, setRecords] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<FoodItem | null>(null);

  const reload = () => setRecords(getLocalRecords());

  useEffect(() => { reload(); }, []);

  const filtered = records.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.foodGroup?.toLowerCase().includes(search.toLowerCase()) ||
    r.crId.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const json = exportLocalDB();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fooddb_local_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${records.length} records`);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const count = importLocalDB(text);
        reload();
        toast.success(`Imported ${count} records`);
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    input.click();
  };

  const handleDelete = (crId: string, name: string) => {
    if (!confirm(`Delete "${name}" from local database?`)) return;
    deleteLocalRecord(crId);
    reload();
    if (selected?.crId === crId) setSelected(null);
    toast.success("Record deleted");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="jade-block px-4 md:px-8 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#F7F9FC" }}>
              My Local Database
            </h1>
            <p className="text-sm opacity-75" style={{ color: "oklch(0.85 0.04 162)", fontFamily: "Inter, sans-serif" }}>
              {records.length} records stored locally · Export as JSON for use with MCP server
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              onClick={handleExport}
              disabled={records.length === 0}
              className="gap-1.5 text-xs font-semibold"
              style={{ background: "#A899F0", color: "#0A1F44", fontFamily: "Inter, sans-serif" }}
            >
              <Download size={12} /> Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleImport}
              className="gap-1.5 text-xs font-semibold border-2"
              style={{ borderColor: "oklch(0.65 0.06 162)", color: "oklch(0.85 0.04 162)", fontFamily: "Inter, sans-serif" }}
            >
              <Upload size={12} /> Import
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: records list */}
        <div className="w-full md:w-80 shrink-0 border-r flex flex-col" style={{ borderColor: "#DDE3EE" }}>
          {/* Search */}
          <div className="p-3 border-b" style={{ borderColor: "#DDE3EE" }}>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#4A5568" }} />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search records..."
                className="pl-8 h-8 text-xs"
              />
            </div>
          </div>

          {/* Records */}
          <div className="flex-1 overflow-y-auto">
            {records.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Database size={28} className="mb-3 opacity-30" style={{ color: "#4A5568" }} />
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                  No records yet
                </p>
                <p className="text-xs mb-3" style={{ color: "oklch(0.65 0.01 90)" }}>
                  Import entries from the HPB website
                </p>
                <Link href="/import">
                  <Button size="sm" className="gap-1.5 text-xs" style={{ background: "#6D5BD0", color: "#F7F9FC" }}>
                    <Plus size={12} /> Add Records
                  </Button>
                </Link>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-xs" style={{ color: "#4A5568" }}>
                No records match "{search}"
              </div>
            ) : (
              filtered.map(record => (
                <button
                  key={record.crId}
                  onClick={() => setSelected(record)}
                  className="w-full text-left px-3 py-2.5 border-b flex items-center justify-between gap-2 transition-colors"
                  style={{
                    borderColor: "oklch(0.92 0.004 90)",
                    background: selected?.crId === record.crId ? "oklch(0.92 0.03 162)" : "transparent",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs truncate" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                      {record.name}
                    </div>
                    <div className="text-[10px] flex items-center gap-1.5 mt-0.5" style={{ color: "#4A5568" }}>
                      <span>{record.foodGroup ?? "—"}</span>
                      {record._source === "paste" && (
                        <span className="pill-badge text-[9px] px-1 py-0" style={{ background: "oklch(0.90 0.06 162)", color: "oklch(0.28 0.10 162)" }}>
                          Pasted
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={12} style={{ color: "oklch(0.65 0.07 162)", flexShrink: 0 }} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: record detail */}
        <div className="flex-1 overflow-auto">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full min-h-64 text-center px-4">
              <Database size={32} className="mb-3 opacity-20" style={{ color: "#4A5568" }} />
              <p className="text-sm" style={{ color: "oklch(0.65 0.01 90)", fontFamily: "Inter, sans-serif" }}>
                Select a record to view details
              </p>
            </div>
          ) : (
            <div className="p-4 md:p-6">
              {/* Record header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {selected.foodGroup && (
                      <span className="pill-badge pill-green text-[10px]">{selected.foodGroup}</span>
                    )}
                    {selected._source && (
                      <span className="pill-badge text-[10px]" style={{ background: "oklch(0.90 0.06 162)", color: "oklch(0.28 0.10 162)" }}>
                        {selected._source === "paste" ? "Pasted" : "API"}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-extrabold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                    {selected.name}
                  </h2>
                  {selected.description && (
                    <p className="text-xs mt-0.5" style={{ color: "#4A5568" }}>
                      {selected.description}
                    </p>
                  )}
                  <p className="text-[10px] mt-1 font-mono" style={{ color: "oklch(0.65 0.01 90)" }}>
                    ID: {selected.crId}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/food/${selected.crId}`}>
                    <Button size="sm" variant="outline" className="text-xs gap-1 border-2"
                      style={{ borderColor: "#6D5BD0", color: "#6D5BD0" }}>
                      View <ChevronRight size={11} />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(selected.crId, selected.name)}
                    className="text-xs gap-1 border-2"
                    style={{ borderColor: "oklch(0.65 0.18 25)", color: "oklch(0.55 0.18 25)" }}
                  >
                    <Trash2 size={11} /> Delete
                  </Button>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 text-xs p-3 rounded-lg"
                style={{ background: "oklch(0.96 0.01 162)", color: "oklch(0.40 0.08 162)", fontFamily: "Inter, sans-serif" }}>
                {selected.defaultServingSize && <div><strong>Serving:</strong> {selected.defaultServingSize}</div>}
                {selected.ediblePortion && <div><strong>Edible:</strong> {selected.ediblePortion}%</div>}
                {selected.sourceOfData && <div><strong>Source:</strong> {selected.sourceOfData}</div>}
                {selected.yearOfData && <div><strong>Year:</strong> {selected.yearOfData}</div>}
                {selected._importedAt && <div><strong>Imported:</strong> {new Date(selected._importedAt).toLocaleDateString()}</div>}
              </div>

              {/* Nutrient values */}
              <div>
                <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                  Nutrients per 100g
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {Object.entries(selected.nutrientsPer100g ?? {}).map(([key, val]) => {
                    const def = NUTRIENT_MAP.get(key);
                    if (!def) return null;
                    return (
                      <div key={key} className="flex justify-between items-center px-2.5 py-1.5 rounded text-xs"
                        style={{ background: "#F7F9FC", border: "1px solid oklch(0.92 0.004 90)" }}>
                        <span style={{ color: "#2F3A4A", fontFamily: "Inter, sans-serif" }}>{def.label}</span>
                        <span className="nutrient-value font-bold" style={{ color: val !== null ? "#1C1C2E" : "oklch(0.65 0.01 90)" }}>
                          {val !== null && val !== undefined ? formatNutrientValue(val as number, def.unit) : "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* JSON export snippet */}
              <div className="mt-4">
                <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5568" }}>
                  JSON Record (for MCP server)
                </p>
                <pre
                  className="text-[10px] p-3 rounded-lg overflow-x-auto"
                  style={{ background: "oklch(0.14 0.06 162)", color: "oklch(0.85 0.04 162)", fontFamily: "Space Mono, monospace" }}
                >
                  {JSON.stringify({ crId: selected.crId, name: selected.name, nutrientsPer100g: selected.nutrientsPer100g }, null, 2).slice(0, 600)}...
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
