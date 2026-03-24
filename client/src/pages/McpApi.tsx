// ============================================================
// FoodDB — MCP / API Integration Page
// Documents public REST endpoints and tRPC procedures
// for third-party application integration
// ============================================================

import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Code2, Copy, Check, ChevronDown, ChevronRight,
  Globe, Key, Zap, Database, Search, BookOpen, Terminal
} from "lucide-react";

// ── Copy button ───────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded transition-all"
      style={{ background: copied ? "#EDE9FB" : "oklch(0.25 0.015 65)", color: copied ? "#6D5BD0" : "white" }}>
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ── Code block ────────────────────────────────────────────────
function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "oklch(0.25 0.015 65)" }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "#0A1F44" }}>
        <span className="text-[10px] font-semibold" style={{ color: "oklch(0.65 0.015 65)" }}>{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="px-4 py-3 text-[11px] leading-relaxed overflow-x-auto" style={{ background: "oklch(0.15 0.015 65)", color: "oklch(0.88 0.015 65)", fontFamily: "monospace" }}>
        {code}
      </pre>
    </div>
  );
}

// ── Endpoint card ─────────────────────────────────────────────
function EndpointCard({ method, path, description, params, example, response }: {
  method: "GET" | "POST"; path: string; description: string;
  params?: Array<{ name: string; type: string; required: boolean; desc: string }>;
  example: string; response: string;
}) {
  const [open, setOpen] = useState(false);
  const methodColor = method === "GET" ? { bg: "#dcfce7", text: "#166534" } : { bg: "#dbeafe", text: "#1e40af" };
  return (
    <div className="rounded-xl border mb-3 overflow-hidden" style={{ borderColor: "#DDE3EE" }}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        style={{ background: open ? "oklch(0.97 0.03 162)" : "white" }}>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: methodColor.bg, color: methodColor.text }}>
          {method}
        </span>
        <code className="text-xs font-mono font-semibold flex-1" style={{ color: "oklch(0.22 0.015 65)" }}>{path}</code>
        <span className="text-xs hidden md:block" style={{ color: "#8B9AB0", fontFamily: "Inter, sans-serif" }}>{description}</span>
        {open ? <ChevronDown size={14} style={{ color: "oklch(0.50 0.015 65)" }} /> : <ChevronRight size={14} style={{ color: "oklch(0.50 0.015 65)" }} />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 space-y-3" style={{ background: "white", borderTop: "1px solid oklch(0.93 0.004 162)" }}>
          <p className="text-xs" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>{description}</p>
          {params && params.length > 0 && (
            <div>
              <p className="text-[10px] font-bold mb-2 uppercase tracking-wide" style={{ color: "#2F3A4A" }}>Parameters</p>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid #DDE3EE" }}>
                    <th className="text-left pb-1 pr-3 text-[10px] font-semibold" style={{ color: "oklch(0.50 0.015 65)" }}>Name</th>
                    <th className="text-left pb-1 pr-3 text-[10px] font-semibold" style={{ color: "oklch(0.50 0.015 65)" }}>Type</th>
                    <th className="text-left pb-1 pr-3 text-[10px] font-semibold" style={{ color: "oklch(0.50 0.015 65)" }}>Required</th>
                    <th className="text-left pb-1 text-[10px] font-semibold" style={{ color: "oklch(0.50 0.015 65)" }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {params.map(p => (
                    <tr key={p.name} style={{ borderBottom: "1px solid oklch(0.95 0.003 162)" }}>
                      <td className="py-1 pr-3 font-mono" style={{ color: "#6D5BD0" }}>{p.name}</td>
                      <td className="py-1 pr-3" style={{ color: "oklch(0.50 0.015 65)" }}>{p.type}</td>
                      <td className="py-1 pr-3">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{ background: p.required ? "#fee2e2" : "#f1f5f9", color: p.required ? "#991b1b" : "#475569" }}>
                          {p.required ? "required" : "optional"}
                        </span>
                      </td>
                      <td className="py-1" style={{ color: "oklch(0.50 0.015 65)" }}>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold mb-2 uppercase tracking-wide" style={{ color: "#2F3A4A" }}>Example Request</p>
            <CodeBlock code={example} lang="curl" />
          </div>
          <div>
            <p className="text-[10px] font-bold mb-2 uppercase tracking-wide" style={{ color: "#2F3A4A" }}>Example Response</p>
            <CodeBlock code={response} lang="json" />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-6">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "#EDE9FB" }}>
        <span style={{ color: "#6D5BD0" }}>{icon}</span>
      </div>
      <div>
        <h2 className="font-bold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>{title}</h2>
        <p className="text-xs" style={{ color: "#8B9AB0", fontFamily: "Inter, sans-serif" }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function McpApi() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://your-fooddb-domain.manus.space";

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FC" }}>
      {/* ── Header ── */}
      <div className="border-b px-6 md:px-10 py-5" style={{ borderColor: "#DDE3EE", background: "white" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-xs font-semibold mb-3 hover:opacity-70 transition-opacity"
              style={{ color: "#4A5568" }}>
              <ArrowLeft size={13} /> Back to Explore
            </button>
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
                API & MCP Integration
              </h1>
              <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
                Integrate FoodDB nutritional data into your applications via REST API or Model Context Protocol (MCP).
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: "#EDE9FB", color: "#6D5BD0" }}>
                v2.0 · Public Beta
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-6">

        {/* ── Overview cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: <Database size={18} />, title: "2,500+ Foods", desc: "Singapore & Malaysia nutritional database with 41 nutrient fields per food item" },
            { icon: <Zap size={18} />, title: "Real-time Search", desc: "Fuzzy search, nutrition filters, and cultural dimension queries via a single endpoint" },
            { icon: <Globe size={18} />, title: "MCP Compatible", desc: "Full Model Context Protocol support for LLM agents and AI assistant integrations" },
          ].map(item => (
            <div key={item.title} className="rounded-xl border p-4" style={{ borderColor: "#DDE3EE", background: "white" }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "#6D5BD0" }}>{item.icon}</span>
                <span className="font-bold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.22 0.015 65)" }}>{item.title}</span>
              </div>
              <p className="text-xs" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Base URL ── */}
        <div className="rounded-xl border p-4 mb-6" style={{ borderColor: "#DDE3EE", background: "white" }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe size={14} style={{ color: "#6D5BD0" }} />
            <span className="text-xs font-bold" style={{ color: "oklch(0.22 0.015 65)" }}>Base URL</span>
          </div>
          <CodeBlock code={`${baseUrl}/api`} lang="url" />
          <p className="text-xs mt-2" style={{ color: "#8B9AB0", fontFamily: "Inter, sans-serif" }}>
            All endpoints are prefixed with <code className="font-mono text-[11px]">/api</code>. CORS is enabled for all origins.
            Rate limit: 100 requests/minute per IP for public endpoints.
          </p>
        </div>

        {/* ── Authentication ── */}
        <SectionHeader icon={<Key size={16} />} title="Authentication" subtitle="Public endpoints require no auth. User-specific endpoints require a session token." />
        <div className="rounded-xl border p-4 mb-6" style={{ borderColor: "#DDE3EE", background: "white" }}>
          <div className="space-y-3 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-lg p-3" style={{ background: "oklch(0.97 0.03 140)" }}>
                <p className="font-bold mb-1" style={{ color: "oklch(0.30 0.12 140)" }}>Public Endpoints (no auth)</p>
                <ul className="space-y-0.5 list-disc list-inside" style={{ color: "oklch(0.40 0.10 140)" }}>
                  <li>Food search and lookup</li>
                  <li>Restaurant listings</li>
                  <li>Nutritional data queries</li>
                  <li>MCP tool discovery</li>
                </ul>
              </div>
              <div className="rounded-lg p-3" style={{ background: "oklch(0.97 0.04 60)" }}>
                <p className="font-bold mb-1" style={{ color: "oklch(0.40 0.14 60)" }}>Protected Endpoints (session cookie)</p>
                <ul className="space-y-0.5 list-disc list-inside" style={{ color: "oklch(0.50 0.12 60)" }}>
                  <li>User profile management</li>
                  <li>Meal log CRUD</li>
                  <li>AI suggestions</li>
                  <li>Calendar data</li>
                </ul>
              </div>
            </div>
            <CodeBlock code={`# Authenticate via Manus OAuth
GET ${baseUrl}/api/oauth/login?returnPath=/

# Session cookie is set automatically after OAuth callback
# Include credentials in all subsequent requests:
curl -b cookies.txt ${baseUrl}/api/trpc/profile.get`} lang="bash" />
          </div>
        </div>

        {/* ── Food Search API ── */}
        <SectionHeader icon={<Search size={16} />} title="Food Search & Lookup" subtitle="Query the 2,500+ food database with natural language, nutrition filters, and cultural dimensions." />

        <EndpointCard
          method="GET"
          path="/api/foods/search"
          description="Search foods by name, nutrition filters, or cultural dimensions. Supports natural language queries."
          params={[
            { name: "q", type: "string", required: true, desc: "Search query (name, nutrition filter, or natural language)" },
            { name: "page", type: "number", required: false, desc: "Page number for pagination (default: 1)" },
            { name: "limit", type: "number", required: false, desc: "Results per page (default: 20, max: 100)" },
            { name: "ethnic", type: "string", required: false, desc: "Filter by ethnic tradition: chinese, malay, indian, peranakan, western" },
            { name: "region", type: "string", required: false, desc: "Filter by region: singapore, penang, kl, johor, sarawak" },
          ]}
          example={`curl "${baseUrl}/api/foods/search?q=low+sodium+chicken&page=1&limit=5"`}
          response={`{
  "items": [
    {
      "crId": "SG-0042",
      "name": "Steamed Chicken Rice",
      "l1Category": "Rice Dishes",
      "energy": 487,
      "protein": 28.4,
      "fat": 12.1,
      "carbohydrate": 58.2,
      "sodium": 420,
      "potassium": 312,
      "calcium": 28,
      "sugar": 1.2,
      "dietaryFibre": 1.8,
      "gi": { "value": 54, "level": "low" },
      "cultural": {
        "ethnic": "chinese",
        "occasions": ["lunch", "dinner"],
        "regions": ["singapore", "malaysia"]
      },
      "matchedFilters": ["sodium"]
    }
  ],
  "total": 142,
  "page": 1,
  "parsedQuery": {
    "type": "nutrition",
    "filters": [{ "nutrient": "sodium", "operator": "max", "value": 600 }],
    "categoryHints": ["chicken"]
  }
}`}
        />

        <EndpointCard
          method="GET"
          path="/api/foods/:crId"
          description="Get full nutritional profile for a specific food item by its FoodDB ID."
          params={[
            { name: "crId", type: "string", required: true, desc: "FoodDB food identifier (e.g. SG-0042)" },
          ]}
          example={`curl "${baseUrl}/api/foods/SG-0042"`}
          response={`{
  "crId": "SG-0042",
  "name": "Steamed Chicken Rice",
  "description": "Poached chicken served on fragrant rice...",
  "l1Category": "Rice Dishes",
  "l2Category": "Hawker",
  "servingSize": "1 plate (350g)",
  "energy": 487,
  "protein": 28.4,
  "fat": 12.1,
  "saturatedFat": 3.2,
  "carbohydrate": 58.2,
  "sugar": 1.2,
  "sodium": 420,
  "potassium": 312,
  "calcium": 28,
  "iron": 2.1,
  "dietaryFibre": 1.8,
  "cholesterol": 85,
  "vitaminC": 2.4,
  "gi": { "value": 54, "level": "low" },
  "cultural": {
    "ethnic": "chinese",
    "ethnicAll": ["chinese", "singaporean"],
    "occasions": ["lunch", "dinner"],
    "regions": ["singapore", "malaysia"],
    "story": "A dish brought by Hainanese immigrants..."
  }
}`}
        />

        {/* ── Restaurant API ── */}
        <SectionHeader icon={<Database size={16} />} title="Restaurant & Hawker Data" subtitle="Access approved restaurant and hawker venue data with dish listings." />

        <EndpointCard
          method="GET"
          path="/api/restaurants"
          description="List all approved restaurants and hawker venues with their signature dishes."
          params={[
            { name: "country", type: "string", required: false, desc: "Filter by country: sg, my" },
            { name: "type", type: "string", required: false, desc: "Filter by type: hawker, restaurant, kopitiam, mamak" },
            { name: "michelin", type: "boolean", required: false, desc: "Filter to Michelin-starred/Bib Gourmand only" },
          ]}
          example={`curl "${baseUrl}/api/restaurants?country=sg&michelin=true"`}
          response={`{
  "venues": [
    {
      "id": "tian-tian-chicken-rice",
      "name": "Tian Tian Hainanese Chicken Rice",
      "type": "hawker",
      "country": "sg",
      "location": "Maxwell Food Centre, Stall #01-10",
      "michelinStar": 1,
      "signatureDishes": [
        {
          "name": "Hainanese Chicken Rice",
          "estimatedKcal": 487,
          "estimatedSodium": 420,
          "priceRange": "$3.50–$5.00"
        }
      ],
      "culturalNote": "Featured by Anthony Bourdain..."
    }
  ],
  "total": 17
}`}
        />

        {/* ── MCP Protocol ── */}
        <SectionHeader icon={<Terminal size={16} />} title="Model Context Protocol (MCP)" subtitle="Use FoodDB as a tool in LLM agents, AI assistants, and Claude/GPT integrations." />

        <div className="rounded-xl border p-5 mb-4" style={{ borderColor: "#DDE3EE", background: "white" }}>
          <p className="text-xs mb-4 leading-relaxed" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
            FoodDB exposes an MCP-compatible tool manifest at <code className="font-mono text-[11px]">/api/mcp/manifest</code>.
            This allows AI agents (Claude, GPT-4, Gemini, or any MCP-compatible system) to discover and call FoodDB tools automatically.
          </p>
          <CodeBlock
            code={`# Fetch the MCP tool manifest
curl "${baseUrl}/api/mcp/manifest"

# The manifest describes available tools:
# - fooddb_search: Search foods by name/nutrition/culture
# - fooddb_lookup: Get full nutrition profile by ID
# - fooddb_restaurants: List approved venues
# - fooddb_estimate_meal: Estimate nutrition for a described meal`}
            lang="bash"
          />
        </div>

        <EndpointCard
          method="POST"
          path="/api/mcp/call"
          description="Execute an MCP tool call. Used by LLM agents to query FoodDB programmatically."
          params={[
            { name: "tool", type: "string", required: true, desc: "Tool name: fooddb_search | fooddb_lookup | fooddb_estimate_meal" },
            { name: "arguments", type: "object", required: true, desc: "Tool-specific arguments (see manifest for schema)" },
          ]}
          example={`curl -X POST "${baseUrl}/api/mcp/call" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "fooddb_search",
    "arguments": {
      "query": "low sodium vegetarian Malay breakfast",
      "limit": 5
    }
  }'`}
          response={`{
  "tool": "fooddb_search",
  "result": {
    "items": [...],
    "total": 23,
    "interpretation": "Searching for vegetarian Malay breakfast foods with sodium under 300mg"
  },
  "metadata": {
    "executionMs": 42,
    "source": "FoodDB v2.0",
    "dataLastUpdated": "2026-03-24"
  }
}`}
        />

        <EndpointCard
          method="POST"
          path="/api/mcp/call"
          description="Estimate nutritional content for a described meal (AI-powered, no exact match required)."
          params={[
            { name: "tool", type: "string", required: true, desc: "Must be: fooddb_estimate_meal" },
            { name: "arguments.description", type: "string", required: true, desc: "Natural language meal description" },
            { name: "arguments.servings", type: "number", required: false, desc: "Number of servings (default: 1)" },
          ]}
          example={`curl -X POST "${baseUrl}/api/mcp/call" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "fooddb_estimate_meal",
    "arguments": {
      "description": "A bowl of prawn mee with extra prawns and a soft-boiled egg",
      "servings": 1
    }
  }'`}
          response={`{
  "tool": "fooddb_estimate_meal",
  "result": {
    "estimatedNutrition": {
      "energy": 612,
      "protein": 32.4,
      "fat": 18.2,
      "carbohydrate": 72.1,
      "sodium": 1480,
      "confidence": "medium"
    },
    "matchedFoods": ["Prawn Mee (SG-0187)", "Soft-boiled egg (SG-0891)"],
    "notes": "Sodium estimate is high — broth contributes ~900mg. Consider drinking less soup."
  }
}`}
        />

        {/* ── SDK / Integration examples ── */}
        <SectionHeader icon={<Code2 size={16} />} title="Integration Examples" subtitle="Copy-paste snippets for common integration patterns." />

        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.22 0.015 65)" }}>JavaScript / TypeScript</p>
            <CodeBlock lang="typescript" code={`// Search for foods
const response = await fetch('${baseUrl}/api/foods/search?q=laksa&limit=5');
const { items, total } = await response.json();

// Get full nutrition profile
const food = await fetch('${baseUrl}/api/foods/SG-0042').then(r => r.json());
console.log(\`\${food.name}: \${food.energy} kcal, \${food.sodium}mg sodium\`);`} />
          </div>

          <div>
            <p className="text-xs font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.22 0.015 65)" }}>Python</p>
            <CodeBlock lang="python" code={`import requests

# Search with nutrition filter
resp = requests.get('${baseUrl}/api/foods/search', params={
    'q': 'high protein low sodium',
    'limit': 10
})
foods = resp.json()['items']
for food in foods:
    print(f"{food['name']}: {food['protein']}g protein, {food['sodium']}mg sodium")`} />
          </div>

          <div>
            <p className="text-xs font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.22 0.015 65)" }}>Claude / AI Agent (MCP)</p>
            <CodeBlock lang="json" code={`// Add to your Claude MCP configuration:
{
  "mcpServers": {
    "fooddb": {
      "url": "${baseUrl}/api/mcp",
      "description": "Singapore & Malaysia food nutrition database",
      "tools": ["fooddb_search", "fooddb_lookup", "fooddb_estimate_meal"]
    }
  }
}`} />
          </div>
        </div>

        {/* ── Rate limits & SLA ── */}
        <div className="rounded-xl border p-5 mt-6" style={{ borderColor: "#DDE3EE", background: "white" }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} style={{ color: "#6D5BD0" }} />
            <span className="font-bold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>Rate Limits & Usage Policy</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {[
              { tier: "Public (no auth)", limit: "100 req/min", quota: "10,000 req/day", use: "Prototyping & demos" },
              { tier: "Authenticated", limit: "300 req/min", quota: "100,000 req/day", use: "Production apps" },
              { tier: "MCP Agent", limit: "60 req/min", quota: "50,000 req/day", use: "AI integrations" },
            ].map(tier => (
              <div key={tier.tier} className="rounded-lg p-3" style={{ background: "oklch(0.97 0.02 162)" }}>
                <div className="font-bold mb-1" style={{ color: "oklch(0.30 0.10 162)" }}>{tier.tier}</div>
                <div style={{ color: "#4A5568" }}>Rate: {tier.limit}</div>
                <div style={{ color: "#4A5568" }}>Daily: {tier.quota}</div>
                <div className="text-[10px] mt-1 italic" style={{ color: "#8B9AB0" }}>{tier.use}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "#8B9AB0" }}>
            This API is provided as-is for educational and non-commercial use. For commercial licensing or higher rate limits, please contact the FoodDB team.
            Data accuracy is not guaranteed — always validate nutritional data against primary sources for medical or clinical applications.
          </p>
        </div>

      </div>
    </div>
  );
}
