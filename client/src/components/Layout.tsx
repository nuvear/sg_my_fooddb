// Innuir FoodDB Layout — Clinical Design System v2.0
// Sidebar: dark navy #1C1C2E · Accent: #6D5BD0 · Background: #F7F9FC
// Logo: Innuir wordmark + pulse icon

import { Link, useLocation } from "wouter";
import {
  Search, Camera, ClipboardPaste, Database, UploadCloud,
  Activity, CalendarDays, Calculator, User, HelpCircle, BookOpen,
  Code2, ShieldCheck, ChevronDown, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const INNUIR_LOGO_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/logo_innuir_ace06d38.png";

// ── Nav structure ─────────────────────────────────────────────
const MAIN_NAV = [
  { href: "/",           label: "Explore",    icon: Search,        desc: "Food culture search" },
  { href: "/analyse",    label: "Analyse",    icon: Camera,        desc: "Photo recognition" },
  { href: "/upload",     label: "Import",     icon: UploadCloud,   desc: "CSV / ZIP upload" },
  { href: "/import",     label: "Paste",      icon: ClipboardPaste,desc: "Paste HPB entry" },
  { href: "/db",         label: "My Foods",   icon: Database,      desc: "Saved records" },
  { href: "/agents",     label: "Agents",     icon: Activity,      desc: "Enrichment pipeline" },
];

const PERSONAL_NAV = [
  { href: "/profile",    label: "My Profile", icon: User,          desc: "Goals & targets" },
  { href: "/calendar",   label: "Food Plan",  icon: CalendarDays,  desc: "Meal calendar" },
  { href: "/calculator", label: "Calculator", icon: Calculator,    desc: "Calorie & sodium" },
];

const INFO_NAV = [
  { href: "/help",       label: "Help Guide", icon: HelpCircle,    desc: "How to read data" },
  { href: "/credits",    label: "Credits",    icon: BookOpen,      desc: "Sources & disclaimer" },
  { href: "/api-docs",   label: "API / MCP",  icon: Code2,         desc: "Integration docs" },
];

const ADMIN_NAV = [
  { href: "/admin",             label: "Dashboard",   icon: ShieldCheck, desc: "Admin overview" },
  { href: "/admin/restaurants", label: "Restaurants", icon: Search,      desc: "Approval queue" },
];

// ── Sidebar colors (Innuir dark navy) ─────────────────────────
const SB = {
  bg:         "#1C1C2E",
  hover:      "#25253C",
  border:     "#2D2D45",
  active:     "#6D5BD0",
  activeFg:   "#FFFFFF",
  text:       "#8B9AB0",
  textBright: "#E8EEF8",
  label:      "#4A5568",
};

// ── Nav section component ─────────────────────────────────────
function NavSection({
  label, items, location, collapsible = false
}: {
  label: string;
  items: typeof MAIN_NAV;
  location: string;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(!collapsible);
  return (
    <div className="mb-1">
      <button
        onClick={() => collapsible && setOpen(v => !v)}
        className={cn("w-full flex items-center justify-between px-3 py-1.5 text-left", collapsible && "cursor-pointer")}
      >
        <span style={{ color: SB.label, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
          {label}
        </span>
        {collapsible && (
          open
            ? <ChevronDown size={11} style={{ color: SB.label }} />
            : <ChevronRight size={11} style={{ color: SB.label }} />
        )}
      </button>
      {open && items.map(({ href, label: itemLabel, icon: Icon, desc }) => {
        const active = location === href || (href !== "/" && location.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 mx-1"
            style={{
              background: active ? SB.active : "transparent",
              color: active ? SB.activeFg : SB.text,
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = SB.hover; (e.currentTarget as HTMLElement).style.color = SB.textBright; }}
            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = SB.text; } }}
          >
            <Icon size={15} className="shrink-0" />
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: active ? SB.activeFg : SB.textBright }}>{itemLabel}</div>
              <div style={{ fontSize: "0.63rem", color: active ? "rgba(255,255,255,0.65)" : SB.text }}>{desc}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const MOBILE_NAV = [...MAIN_NAV.slice(0, 4), ...PERSONAL_NAV.slice(0, 2)];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Sidebar (desktop) ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 min-h-screen"
        style={{ background: SB.bg }}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: SB.border }}>
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={INNUIR_LOGO_CDN}
              alt="Innuir"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="mt-1.5 text-xs" style={{ color: SB.text, fontFamily: "Inter, sans-serif" }}>
            FoodDB · SG &amp; MY
          </div>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 py-3 px-1 overflow-y-auto space-y-1">
          <NavSection label="Database" items={MAIN_NAV} location={location} />
          <div className="mx-3 my-1 border-t" style={{ borderColor: SB.border }} />
          <NavSection label="Personal" items={PERSONAL_NAV} location={location} />
          <div className="mx-3 my-1 border-t" style={{ borderColor: SB.border }} />
          <NavSection label="Info" items={INFO_NAV} location={location} collapsible />
          <div className="mx-3 my-1 border-t" style={{ borderColor: SB.border }} />
          <NavSection label="Admin" items={ADMIN_NAV} location={location} collapsible />
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t" style={{ borderColor: SB.border }}>
          <div style={{ color: SB.label, fontSize: "0.65rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            <div>2,557 foods · 41 nutrients</div>
            <div>HPB SG FoodID · MY MOH</div>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0" style={{ background: "#F7F9FC" }}>
        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 border-b"
          style={{ background: SB.bg, borderColor: SB.border }}
        >
          <Link href="/" className="flex items-center gap-2">
            <img
              src={INNUIR_LOGO_CDN}
              alt="Innuir"
              className="h-7 w-auto object-contain"
            />
          </Link>
          <span className="text-xs ml-auto" style={{ color: SB.text, fontFamily: "Inter, sans-serif" }}>
            Your life, understood.
          </span>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* ── Bottom nav (mobile) ───────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex border-t z-50"
        style={{ background: SB.bg, borderColor: SB.border }}
      >
        {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href !== "/" && location.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors"
              style={{ color: active ? "#A899F0" : SB.text }}
            >
              <Icon size={18} />
              <span style={{ fontSize: "0.58rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
