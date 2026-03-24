// ============================================================
// FoodDB — Credits & Disclaimer Page
// ============================================================

import { Link } from "wouter";
import { ArrowLeft, ExternalLink, AlertTriangle, BookOpen, Heart, Shield, Database, Globe } from "lucide-react";

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-6 mb-4" style={{ borderColor: "#DDE3EE", background: "white" }}>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "#6D5BD0" }}>{icon}</span>
        <h2 className="text-base font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ── Credit row ────────────────────────────────────────────────
function CreditRow({ name, role, url, note }: { name: string; role: string; url?: string; note?: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b last:border-0" style={{ borderColor: "oklch(0.93 0.004 162)" }}>
      <div>
        <div className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.22 0.015 65)" }}>{name}</div>
        <div className="text-xs" style={{ color: "#8B9AB0", fontFamily: "Inter, sans-serif" }}>{role}</div>
        {note && <div className="text-[10px] mt-0.5 italic" style={{ color: "oklch(0.65 0.015 65)" }}>{note}</div>}
      </div>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium mt-0.5 flex-shrink-0 ml-4 hover:underline"
          style={{ color: "#6D5BD0" }}>
          Visit <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}

export default function Credits() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F9FC" }}>
      {/* ── Header ── */}
      <div className="border-b px-6 md:px-10 py-5" style={{ borderColor: "#DDE3EE", background: "white" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-xs font-semibold mb-3 hover:opacity-70 transition-opacity" style={{ color: "#4A5568" }}>
              <ArrowLeft size={13} /> Back to Explore
            </button>
          </Link>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: "Inter, sans-serif", color: "#0A1F44" }}>
            Credits & Disclaimer
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            Data sources, acknowledgements, and important usage notes for FoodDB.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">

        {/* ── Medical Disclaimer (most prominent) ── */}
        <div className="rounded-xl border-2 p-5 mb-6 flex gap-4" style={{ borderColor: "oklch(0.80 0.12 30)", background: "oklch(0.97 0.04 30)" }}>
          <AlertTriangle size={24} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.18 30)" }} />
          <div>
            <h2 className="font-bold text-sm mb-2" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.35 0.18 30)" }}>
              Important Medical Disclaimer
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.40 0.12 30)", fontFamily: "Inter, sans-serif" }}>
              The nutritional information provided in FoodDB is for <strong>general informational and educational purposes only</strong>. It is not intended as, and should not be construed as, medical advice, diagnosis, or treatment. Nutritional values are estimates derived from published food composition databases and may vary significantly based on preparation method, portion size, ingredient sourcing, and regional variation.
            </p>
            <p className="text-xs leading-relaxed mt-2" style={{ color: "oklch(0.40 0.12 30)", fontFamily: "Inter, sans-serif" }}>
              <strong>Always consult a qualified healthcare professional, registered dietitian, or nutritionist</strong> before making significant changes to your diet, especially if you have a medical condition, food allergy, or are pregnant, breastfeeding, or managing a chronic disease such as diabetes, hypertension, or cardiovascular disease.
            </p>
            <p className="text-xs leading-relaxed mt-2" style={{ color: "oklch(0.40 0.12 30)", fontFamily: "Inter, sans-serif" }}>
              The AI-generated meal suggestions in this application are not a substitute for professional dietary advice and are provided as general guidance only.
            </p>
          </div>
        </div>

        {/* ── Data Sources ── */}
        <Section title="Primary Data Sources" icon={<Database size={18} />}>
          <p className="text-xs mb-4" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            FoodDB's nutritional data is compiled from the following authoritative public sources. All data is used in accordance with their respective open-data licences.
          </p>
          <CreditRow
            name="Health Promotion Board (HPB) Singapore"
            role="Primary nutritional database — 2,500+ Singapore and Malaysia foods with 41 nutrient fields"
            url="https://www.hpb.gov.sg"
            note="Energy, macronutrients, micronutrients, glycaemic index, and cultural food groupings"
          />
          <CreditRow
            name="Singapore Food Composition Database"
            role="Detailed nutrient profiles for local hawker and restaurant dishes"
            url="https://focos.hpb.gov.sg"
            note="Published by HPB under the Singapore Open Data Licence"
          />
          <CreditRow
            name="Malaysia Food Composition Database (MyFCD)"
            role="Nutritional data for Malaysian traditional and contemporary foods"
            url="https://myfcd.moh.gov.my"
            note="Published by the Ministry of Health Malaysia"
          />
          <CreditRow
            name="USDA FoodData Central"
            role="Reference values for nutrients not covered in regional databases"
            url="https://fdc.nal.usda.gov"
            note="Used for cross-validation and gap-filling only"
          />
          <CreditRow
            name="FAO/INFOODS Food Composition Tables"
            role="International reference for South-East Asian foods"
            url="https://www.fao.org/infoods"
          />
        </Section>

        {/* ── Restaurant & Hawker Data ── */}
        <Section title="Restaurant & Hawker Data" icon={<Globe size={18} />}>
          <p className="text-xs mb-4" style={{ color: "oklch(0.50 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            Restaurant and hawker venue information is curated from publicly available sources. Dish nutritional estimates for restaurant items are approximations and may not reflect actual preparation.
          </p>
          <CreditRow
            name="Singapore Tourism Board (STB)"
            role="Hawker centre locations, heritage stall information, and cultural context"
            url="https://www.stb.gov.sg"
          />
          <CreditRow
            name="Michelin Guide Singapore & Malaysia"
            role="Michelin star and Bib Gourmand designations"
            url="https://guide.michelin.com/sg/en"
            note="Michelin designations are trademarks of Michelin. Used for informational reference only."
          />
          <CreditRow
            name="OpenStreetMap Contributors"
            role="Geolocation data for hawker centres and food courts"
            url="https://www.openstreetmap.org"
            note="Data © OpenStreetMap contributors, ODbL licence"
          />
          <CreditRow
            name="Individual Restaurant Websites"
            role="Menu items, operating hours, and venue descriptions"
            note="All restaurant names and trademarks are property of their respective owners. FoodDB is not affiliated with any restaurant or food establishment."
          />
        </Section>

        {/* ── Technology Credits ── */}
        <Section title="Technology & Open Source" icon={<BookOpen size={18} />}>
          <CreditRow name="React 19 + TypeScript" role="Frontend framework" url="https://react.dev" />
          <CreditRow name="Tailwind CSS 4" role="Utility-first CSS framework" url="https://tailwindcss.com" />
          <CreditRow name="tRPC 11" role="End-to-end type-safe API layer" url="https://trpc.io" />
          <CreditRow name="Drizzle ORM" role="Type-safe database ORM for MySQL/TiDB" url="https://orm.drizzle.team" />
          <CreditRow name="Recharts" role="Composable charting library for React" url="https://recharts.org" />
          <CreditRow name="Lucide React" role="Icon library" url="https://lucide.dev" />
          <CreditRow name="Fuse.js" role="Lightweight fuzzy-search library" url="https://fusejs.io" />
          <CreditRow name="Sora & Nunito Sans" role="Typography (Google Fonts)" url="https://fonts.google.com" />
        </Section>

        {/* ── Intellectual Property ── */}
        <Section title="Intellectual Property & Usage" icon={<Shield size={18} />}>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
            <p>
              <strong style={{ color: "oklch(0.25 0.015 65)" }}>Dish Illustrations:</strong> All dish icons and illustrations displayed in FoodDB are original AI-generated artworks created specifically for this application. They are not photographs of actual dishes and are not intended to represent any specific restaurant's food. These illustrations are copyright-free and may be used under the Creative Commons CC0 licence.
            </p>
            <p>
              <strong style={{ color: "oklch(0.25 0.015 65)" }}>Restaurant Names & Trademarks:</strong> All restaurant, hawker stall, and food establishment names mentioned in FoodDB are the property of their respective owners. Their inclusion is for informational and educational purposes only. FoodDB is not affiliated with, endorsed by, or sponsored by any of the establishments listed.
            </p>
            <p>
              <strong style={{ color: "oklch(0.25 0.015 65)" }}>Nutritional Data:</strong> Compiled nutritional data is derived from public domain and open-licence government databases. Individual data points may be reproduced with attribution to the original source.
            </p>
            <p>
              <strong style={{ color: "oklch(0.25 0.015 65)" }}>User Data:</strong> Meal logs, health profiles, and personal data entered by users are stored securely and are not shared with third parties. Users may delete their data at any time from the Profile settings.
            </p>
          </div>
        </Section>

        {/* ── Acknowledgements ── */}
        <Section title="Acknowledgements" icon={<Heart size={18} />}>
          <p className="text-xs leading-relaxed" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
            FoodDB was built with deep respect for the rich culinary heritage of Singapore and Malaysia. We acknowledge the generations of hawkers, home cooks, and food artisans whose knowledge and craft form the living foundation of this database. Special recognition goes to the <strong>Health Promotion Board Singapore</strong> and the <strong>Ministry of Health Malaysia</strong> for their commitment to open nutritional data that makes projects like this possible.
          </p>
          <p className="text-xs leading-relaxed mt-3" style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}>
            We also thank the open-source community whose tools power this application, and the users who contribute feedback to improve the accuracy and usefulness of the database.
          </p>
        </Section>

        {/* ── Version ── */}
        <div className="text-center py-4">
          <p className="text-xs" style={{ color: "oklch(0.65 0.015 65)", fontFamily: "Inter, sans-serif" }}>
            FoodDB v2.0 · Singapore & Malaysia Nutritional Database · Last updated March 2026
          </p>
          <p className="text-xs mt-1" style={{ color: "oklch(0.70 0.015 65)" }}>
            Data accuracy is reviewed periodically. If you spot an error, please{" "}
            <a href="mailto:feedback@fooddb.sg" className="underline" style={{ color: "#6D5BD0" }}>contact us</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
