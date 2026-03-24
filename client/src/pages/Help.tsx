// ============================================================
// FoodDB — Help & Data Interpretation Guide
// Teaches users how to read nutritional data and build
// healthier habits using Singapore & Malaysia food context
// ============================================================

import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, ChevronDown, ChevronRight, Zap, Droplets, Beef,
  Wheat, Heart, Activity, AlertTriangle, Leaf, Scale, BookOpen,
  Search, UtensilsCrossed, TrendingDown, Info
} from "lucide-react";

// ── Accordion item ────────────────────────────────────────────
function Accordion({ title, icon, children, defaultOpen = false }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border mb-3 overflow-hidden" style={{ borderColor: "oklch(0.90 0.006 162)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
        style={{ background: open ? "oklch(0.97 0.03 162)" : "white" }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: "oklch(0.32 0.10 162)" }}>{icon}</span>
          <span className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>{title}</span>
        </div>
        {open ? <ChevronDown size={16} style={{ color: "oklch(0.50 0.015 65)" }} /> : <ChevronRight size={16} style={{ color: "oklch(0.50 0.015 65)" }} />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2" style={{ background: "white", borderTop: "1px solid oklch(0.93 0.004 162)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Nutrient row in table ─────────────────────────────────────
function NutrientRow({ name, unit, low, medium, high, sgContext, color }: {
  name: string; unit: string; low: string; medium: string; high: string; sgContext: string; color: string;
}) {
  return (
    <tr className="border-b" style={{ borderColor: "oklch(0.93 0.004 162)" }}>
      <td className="py-2 pr-3">
        <span className="font-semibold text-xs" style={{ color: "oklch(0.22 0.015 65)", fontFamily: "Sora, sans-serif" }}>{name}</span>
        <span className="text-[10px] ml-1" style={{ color: "oklch(0.60 0.015 65)" }}>({unit})</span>
      </td>
      <td className="py-2 px-2 text-center">
        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#dcfce7", color: "#166534" }}>{low}</span>
      </td>
      <td className="py-2 px-2 text-center">
        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#fef9c3", color: "#854d0e" }}>{medium}</span>
      </td>
      <td className="py-2 pl-2 text-center">
        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#fee2e2", color: "#991b1b" }}>{high}</span>
      </td>
      <td className="py-2 pl-3 text-[10px]" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>{sgContext}</td>
    </tr>
  );
}

// ── Tip card ─────────────────────────────────────────────────
function TipCard({ icon, title, body, color }: { icon: React.ReactNode; title: string; body: string; color: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + "20" }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.20 0.015 65)" }}>{title}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "oklch(0.48 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>{body}</p>
    </div>
  );
}

export default function Help() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.003 90)" }}>
      {/* ── Header ── */}
      <div className="border-b px-6 md:px-10 py-5" style={{ borderColor: "oklch(0.90 0.006 162)", background: "white" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-xs font-semibold mb-3 hover:opacity-70 transition-opacity" style={{ color: "oklch(0.45 0.015 65)" }}>
              <ArrowLeft size={13} /> Back to Explore
            </button>
          </Link>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.015 65)" }}>
            Help & Data Guide
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            Learn how to read nutritional data, interpret insights, and build healthier eating habits using Singapore and Malaysia food context.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">

        {/* ── Quick nav pills ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: "Reading Nutrients", href: "#nutrients" },
            { label: "Calories", href: "#calories" },
            { label: "Sodium & Salt", href: "#sodium" },
            { label: "Glycaemic Index", href: "#gi" },
            { label: "Search Tips", href: "#search" },
            { label: "Hawker Habits", href: "#habits" },
          ].map(item => (
            <a key={item.label} href={item.href}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:border-[oklch(0.32_0.10_162)] hover:text-[oklch(0.32_0.10_162)]"
              style={{ borderColor: "oklch(0.88 0.008 90)", color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              {item.label}
            </a>
          ))}
        </div>

        {/* ── Getting Started ── */}
        <Accordion title="Getting Started with FoodDB" icon={<BookOpen size={16} />} defaultOpen>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            <p>
              FoodDB is a nutritional database of <strong>2,500+ Singapore and Malaysia foods</strong> covering hawker dishes, restaurant meals, packaged foods, and traditional recipes. Each food entry includes up to 41 nutrient fields drawn from government health databases.
            </p>
            <div className="rounded-lg p-3" style={{ background: "oklch(0.96 0.03 162)" }}>
              <p className="font-semibold mb-1" style={{ color: "oklch(0.30 0.10 162)" }}>How to use the search:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Plain name:</strong> "chicken rice", "laksa", "roti canai"</li>
                <li><strong>Nutrition filter:</strong> "low sodium", "high protein", "under 400 calories"</li>
                <li><strong>Cultural search:</strong> "Malay breakfast", "Peranakan dessert", "Indian vegetarian"</li>
                <li><strong>Combined:</strong> "Hokkien low sodium" or "Penang hawker under 500 kcal"</li>
              </ul>
            </div>
          </div>
        </Accordion>

        {/* ── Understanding Nutrients ── */}
        <div id="nutrients">
          <Accordion title="Understanding the Nutrient Panel" icon={<Activity size={16} />}>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              Each food card shows 8 key nutrients. Here's what they mean and what levels to watch for in a typical Singapore/Malaysia diet:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ borderBottom: "2px solid oklch(0.88 0.008 90)" }}>
                    <th className="text-[10px] font-bold pb-2 pr-3" style={{ color: "oklch(0.40 0.015 65)" }}>Nutrient</th>
                    <th className="text-[10px] font-bold pb-2 px-2 text-center" style={{ color: "#166534" }}>Low ✓</th>
                    <th className="text-[10px] font-bold pb-2 px-2 text-center" style={{ color: "#854d0e" }}>Medium</th>
                    <th className="text-[10px] font-bold pb-2 pl-2 text-center" style={{ color: "#991b1b" }}>High ⚠</th>
                    <th className="text-[10px] font-bold pb-2 pl-3" style={{ color: "oklch(0.40 0.015 65)" }}>SG/MY Context</th>
                  </tr>
                </thead>
                <tbody>
                  <NutrientRow name="Calories" unit="kcal" low="<200" medium="200–400" high=">500" sgContext="Hawker meal avg: 500–800 kcal" color="oklch(0.40 0.14 60)" />
                  <NutrientRow name="Sodium" unit="mg" low="<300" medium="300–600" high=">800" sgContext="Laksa: ~1,600 mg; Char Kway Teow: ~1,200 mg" color="oklch(0.40 0.14 30)" />
                  <NutrientRow name="Protein" unit="g" low="<5" medium="5–15" high=">20" sgContext="Good: chicken rice (28g), satay (15g/stick)" color="oklch(0.40 0.14 140)" />
                  <NutrientRow name="Fat" unit="g" low="<5" medium="5–15" high=">20" sgContext="Roti canai: ~14g; Nasi Lemak: ~25g" color="oklch(0.40 0.14 60)" />
                  <NutrientRow name="Sugar" unit="g" low="<5" medium="5–15" high=">20" sgContext="Kaya toast: ~12g; Teh Tarik: ~25g" color="oklch(0.40 0.14 30)" />
                  <NutrientRow name="Fibre" unit="g" low="<2" medium="2–5" high=">8" sgContext="High: rojak (6g), yong tau foo (5g)" color="oklch(0.40 0.14 140)" />
                  <NutrientRow name="Potassium" unit="mg" low="<200" medium="200–400" high=">600" sgContext="Beneficial for blood pressure balance" color="oklch(0.40 0.14 200)" />
                  <NutrientRow name="Calcium" unit="mg" low="<50" medium="50–150" high=">300" sgContext="Tofu dishes, tau kwa, dairy-based desserts" color="oklch(0.40 0.14 240)" />
                </tbody>
              </table>
            </div>
            <p className="text-[10px] mt-3 italic" style={{ color: "oklch(0.60 0.015 65)" }}>
              * "High" does not always mean bad — high protein and high fibre are generally positive. Context matters.
            </p>
          </Accordion>
        </div>

        {/* ── Calories ── */}
        <div id="calories">
          <Accordion title="Calories & Energy Balance" icon={<Zap size={16} />}>
            <div className="space-y-3 text-xs leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              <p>
                <strong style={{ color: "oklch(0.25 0.015 65)" }}>What is a calorie?</strong> A kilocalorie (kcal) is the unit of energy in food. Your body needs a certain number of calories per day to maintain weight — this is your Total Daily Energy Expenditure (TDEE).
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3" style={{ background: "oklch(0.96 0.03 162)" }}>
                  <p className="font-bold mb-1" style={{ color: "oklch(0.30 0.10 162)" }}>Average SG Adult</p>
                  <p>Female: ~1,800–2,000 kcal/day</p>
                  <p>Male: ~2,200–2,500 kcal/day</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: "oklch(0.97 0.04 60)" }}>
                  <p className="font-bold mb-1" style={{ color: "oklch(0.40 0.14 60)" }}>Typical Hawker Day</p>
                  <p>Breakfast: 400–600 kcal</p>
                  <p>Lunch: 600–900 kcal</p>
                  <p>Dinner: 700–1,000 kcal</p>
                </div>
              </div>
              <p>
                <strong style={{ color: "oklch(0.25 0.015 65)" }}>For weight management:</strong> A deficit of 300–500 kcal/day leads to gradual, sustainable weight loss (~0.3–0.5 kg/week). Avoid very low calorie diets (&lt;1,200 kcal) without medical supervision.
              </p>
              <div className="rounded-lg p-3 border" style={{ borderColor: "oklch(0.85 0.08 140)", background: "oklch(0.97 0.03 140)" }}>
                <p className="font-semibold mb-1" style={{ color: "oklch(0.30 0.12 140)" }}>💡 Lower-calorie hawker swaps</p>
                <p>Yong Tau Foo (soup) instead of Laksa · Chicken Rice (steamed) instead of Nasi Lemak · Teh-O instead of Teh Tarik · Wonton Mee (dry, less sauce) instead of Char Kway Teow</p>
              </div>
            </div>
          </Accordion>
        </div>

        {/* ── Sodium ── */}
        <div id="sodium">
          <Accordion title="Sodium & Salt — The Hidden Risk" icon={<Droplets size={16} />}>
            <div className="space-y-3 text-xs leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              <div className="flex gap-3 p-3 rounded-lg border" style={{ borderColor: "oklch(0.80 0.12 30)", background: "oklch(0.97 0.04 30)" }}>
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.18 30)" }} />
                <p style={{ color: "oklch(0.40 0.15 30)" }}>
                  <strong>Singapore and Malaysia have some of the highest sodium intakes in Asia.</strong> The WHO recommends &lt;2,000 mg/day, but the average Singaporean consumes ~3,600 mg/day — nearly double the limit.
                </p>
              </div>
              <p>
                <strong style={{ color: "oklch(0.25 0.015 65)" }}>Why sodium matters:</strong> High sodium intake is the leading dietary risk factor for hypertension (high blood pressure), which affects 1 in 3 Singaporean adults. Hypertension increases risk of stroke, heart attack, and kidney disease.
              </p>
              <p className="font-semibold" style={{ color: "oklch(0.25 0.015 65)" }}>Sodium content of common hawker foods:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Laksa", mg: 1620, level: "high" },
                  { name: "Char Kway Teow", mg: 1240, level: "high" },
                  { name: "Bak Kut Teh", mg: 980, level: "high" },
                  { name: "Chicken Rice", mg: 850, level: "medium" },
                  { name: "Wonton Mee", mg: 720, level: "medium" },
                  { name: "Yong Tau Foo (soup)", mg: 420, level: "low" },
                  { name: "Popiah (fresh)", mg: 380, level: "low" },
                  { name: "Steamed Fish", mg: 180, level: "low" },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between px-3 py-1.5 rounded-lg" style={{
                    background: item.level === "high" ? "#fee2e2" : item.level === "medium" ? "#fef9c3" : "#dcfce7"
                  }}>
                    <span className="text-[11px] font-medium" style={{ color: item.level === "high" ? "#991b1b" : item.level === "medium" ? "#854d0e" : "#166534" }}>
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold" style={{ color: item.level === "high" ? "#991b1b" : item.level === "medium" ? "#854d0e" : "#166534" }}>
                      {item.mg} mg
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg p-3" style={{ background: "oklch(0.96 0.03 162)" }}>
                <p className="font-semibold mb-1" style={{ color: "oklch(0.30 0.10 162)" }}>💡 Reduce sodium at hawker centres:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Ask for <strong>less sauce / less gravy</strong> ("少酱" shǎo jiàng)</li>
                  <li>Choose <strong>soup-based dishes</strong> but drink less of the broth</li>
                  <li>Opt for <strong>steamed over braised</strong> preparations</li>
                  <li>Avoid adding extra soy sauce, chilli sauce, or sambal</li>
                  <li>Drink plain water instead of sugary drinks to help flush sodium</li>
                </ul>
              </div>
            </div>
          </Accordion>
        </div>

        {/* ── Glycaemic Index ── */}
        <div id="gi">
          <Accordion title="Glycaemic Index (GI) — Blood Sugar Impact" icon={<TrendingDown size={16} />}>
            <div className="space-y-3 text-xs leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
              <p>
                The <strong>Glycaemic Index (GI)</strong> measures how quickly a food raises blood glucose levels on a scale of 0–100. This is particularly relevant for Singapore and Malaysia, where diabetes rates are among the highest in Asia (1 in 9 Singaporeans has diabetes).
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg p-3 text-center" style={{ background: "#dcfce7" }}>
                  <div className="font-bold text-lg" style={{ color: "#166534" }}>≤55</div>
                  <div className="text-[10px] font-semibold" style={{ color: "#166534" }}>Low GI</div>
                  <div className="text-[10px] mt-1" style={{ color: "#166534" }}>Slow, steady release. Better for blood sugar control.</div>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ background: "#fef9c3" }}>
                  <div className="font-bold text-lg" style={{ color: "#854d0e" }}>56–69</div>
                  <div className="text-[10px] font-semibold" style={{ color: "#854d0e" }}>Medium GI</div>
                  <div className="text-[10px] mt-1" style={{ color: "#854d0e" }}>Moderate impact. Portion control matters.</div>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ background: "#fee2e2" }}>
                  <div className="font-bold text-lg" style={{ color: "#991b1b" }}>≥70</div>
                  <div className="text-[10px] font-semibold" style={{ color: "#991b1b" }}>High GI</div>
                  <div className="text-[10px] mt-1" style={{ color: "#991b1b" }}>Rapid spike. Limit if managing blood sugar.</div>
                </div>
              </div>
              <p>
                <strong style={{ color: "oklch(0.25 0.015 65)" }}>Local context:</strong> White rice (GI ~72) is a staple but has a high GI. Switching to brown rice (GI ~50), adding vegetables, or eating rice with protein and fat slows absorption and lowers the effective GI of a meal.
              </p>
              <div className="rounded-lg p-3" style={{ background: "oklch(0.96 0.03 162)" }}>
                <p className="font-semibold mb-1" style={{ color: "oklch(0.30 0.10 162)" }}>💡 Lower-GI hawker choices:</p>
                <p>Yong Tau Foo · Popiah · Rojak (without prawn paste) · Thosai · Steamed fish with vegetables · Soup-based noodles with less noodle, more vegetables</p>
              </div>
            </div>
          </Accordion>
        </div>

        {/* ── Macronutrients ── */}
        <Accordion title="Macronutrients: Protein, Carbs & Fat" icon={<Beef size={16} />}>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: "oklch(0.45 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg p-3 border" style={{ borderColor: "oklch(0.85 0.08 140)", background: "oklch(0.97 0.03 140)" }}>
                <div className="font-bold mb-1" style={{ color: "oklch(0.30 0.12 140)" }}>🥩 Protein (4 kcal/g)</div>
                <p>Builds and repairs muscle. Keeps you full longer. Target: 0.8–1.2g per kg of body weight/day. Good local sources: chicken, fish, tofu, tempeh, eggs.</p>
              </div>
              <div className="rounded-lg p-3 border" style={{ borderColor: "oklch(0.85 0.08 60)", background: "oklch(0.97 0.04 60)" }}>
                <div className="font-bold mb-1" style={{ color: "oklch(0.40 0.14 60)" }}>🍚 Carbohydrates (4 kcal/g)</div>
                <p>Primary energy source. Choose complex carbs (brown rice, oats, sweet potato) over refined (white rice, white bread, sugary drinks) for sustained energy.</p>
              </div>
              <div className="rounded-lg p-3 border" style={{ borderColor: "oklch(0.85 0.08 30)", background: "oklch(0.97 0.04 30)" }}>
                <div className="font-bold mb-1" style={{ color: "oklch(0.40 0.14 30)" }}>🥑 Fat (9 kcal/g)</div>
                <p>Essential for hormones and vitamin absorption. Limit saturated fat (coconut milk, palm oil, fried foods). Prefer unsaturated (fish, nuts, avocado).</p>
              </div>
            </div>
            <p>
              <strong style={{ color: "oklch(0.25 0.015 65)" }}>Balanced plate guide (HPB "My Healthy Plate"):</strong> Fill ½ your plate with vegetables and fruit, ¼ with wholegrains, ¼ with protein. This naturally limits calories while ensuring adequate nutrients.
            </p>
          </div>
        </Accordion>

        {/* ── Search Tips ── */}
        <div id="search">
          <Accordion title="Search Tips & Query Examples" icon={<Search size={16} />}>
            <div className="space-y-3 text-xs" style={{ fontFamily: "Nunito Sans, sans-serif" }}>
              <p className="leading-relaxed" style={{ color: "oklch(0.45 0.015 65)" }}>
                FoodDB's search engine understands natural language, nutrition filters, and cultural dimensions simultaneously.
              </p>
              <div className="space-y-2">
                {[
                  { query: "low sodium Malay breakfast", result: "Filters for sodium &lt;300mg AND ethnic=Malay AND occasion=breakfast" },
                  { query: "high protein under 500 calories", result: "Filters for protein ≥15g AND energy ≤500 kcal" },
                  { query: "Penang hawker vegetarian", result: "Region=Penang AND dietary=vegetarian" },
                  { query: "diabetes friendly rice dishes", result: "AI interprets as: low GI AND carbohydrate &lt;50g" },
                  { query: "Nyonya dessert", result: "Ethnic=Peranakan AND category=dessert" },
                  { query: "kopitiam breakfast seniors", result: "Occasion=breakfast AND generation=elderly" },
                ].map(item => (
                  <div key={item.query} className="rounded-lg p-3 border" style={{ borderColor: "oklch(0.88 0.008 90)", background: "white" }}>
                    <div className="font-semibold mb-1" style={{ color: "oklch(0.32 0.10 162)" }}>"{item.query}"</div>
                    <div className="text-[10px]" style={{ color: "oklch(0.55 0.015 65)" }}>→ {item.result}</div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        </div>

        {/* ── Hawker Habits ── */}
        <div id="habits">
          <Accordion title="Building Healthier Hawker Habits" icon={<UtensilsCrossed size={16} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TipCard
                icon={<Scale size={16} />}
                title="Portion Awareness"
                body="A standard hawker plate of chicken rice is 500–700 kcal. Sharing a dish or choosing a smaller portion (半份 bàn fèn) can cut calories by 30–40% without sacrificing the experience."
                color="oklch(0.40 0.14 60)"
              />
              <TipCard
                icon={<Leaf size={16} />}
                title="Add Vegetables First"
                body="Start your hawker meal by ordering a vegetable dish (kailan, kangkong, mixed veg). Eating vegetables first slows glucose absorption and helps you eat less of the higher-calorie main."
                color="oklch(0.40 0.14 140)"
              />
              <TipCard
                icon={<Droplets size={16} />}
                title="Drink Smart"
                body="Teh Tarik and Milo Dinosaur can add 200–350 kcal and 20–35g of sugar per cup. Switch to Teh-O Kosong, plain water, or barley water (unsweetened) to save 1,000+ kcal per week."
                color="oklch(0.40 0.14 200)"
              />
              <TipCard
                icon={<Heart size={16} />}
                title="The Soup Trick"
                body="For noodle soups (laksa, bak chor mee, prawn mee), consume less than half the broth. The soup contains 60–70% of the dish's sodium. Enjoy the flavour without drinking it all."
                color="oklch(0.40 0.14 30)"
              />
              <TipCard
                icon={<Wheat size={16} />}
                title="Upgrade Your Carbs"
                body="Many hawker stalls now offer brown rice, wholemeal bread, or extra vegetables as substitutes. Ask for 'brown rice' (糙米饭) — it has a lower GI and more fibre than white rice."
                color="oklch(0.40 0.14 80)"
              />
              <TipCard
                icon={<Info size={16} />}
                title="Use the Calorie Calculator"
                body="Set your daily calorie and sodium targets in the Calculator page, then use the Food Calendar to log meals and track your intake. The AI suggestion engine will recommend dishes that fit your remaining budget."
                color="oklch(0.32 0.10 162)"
              />
            </div>
          </Accordion>
        </div>

        {/* ── Footer note ── */}
        <div className="text-center py-4 mt-2">
          <p className="text-xs" style={{ color: "oklch(0.65 0.015 65)", fontFamily: "Nunito Sans, sans-serif" }}>
            Need more help? Visit the{" "}
            <Link href="/credits">
              <span className="underline cursor-pointer" style={{ color: "oklch(0.32 0.10 162)" }}>Credits & Disclaimer</span>
            </Link>{" "}
            page for data sources, or use the AI suggestion engine in the Food Calendar for personalised guidance.
          </p>
        </div>

      </div>
    </div>
  );
}
