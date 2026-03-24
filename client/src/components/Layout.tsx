// FoodDB Layout — Tropical Bauhaus: deep jade sidebar, ivory main content
// Sidebar nav for desktop, bottom nav for mobile
// Restaurants moved to admin section; Credits, Help, API Docs added

import { Link, useLocation } from "wouter";
import {
  Search, Camera, ClipboardPaste, Database, Leaf, UploadCloud,
  Activity, CalendarDays, Calculator, User, HelpCircle, BookOpen,
  Code2, ShieldCheck, ChevronDown, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  { href: "/admin",                label: "Dashboard",  icon: ShieldCheck,   desc: "Admin overview" },
  { href: "/admin/restaurants",    label: "Restaurants",icon: Search,        desc: "Approval queue" },
];

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
        className={cn(
          "w-full flex items-center justify-between px-3 py-1.5 text-left",
          collapsible && "cursor-pointer hover:opacity-80"
        )}
      >
        <span className="text-[9px] font-bold uppercase tracking-widest"
          style={{ color: "oklch(0.50 0.06 162)", fontFamily: "Nunito Sans, sans-serif" }}>
          {label}
        </span>
        {collapsible && (
          open
            ? <ChevronDown size={11} style={{ color: "oklch(0.50 0.06 162)" }} />
            : <ChevronRight size={11} style={{ color: "oklch(0.50 0.06 162)" }} />
        )}
      </button>
      {open && items.map(({ href, label: itemLabel, icon: Icon, desc }) => {
        const active = location === href || (href !== "/" && location.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 group",
              active ? "text-sm font-semibold" : "text-sm font-medium"
            )}
            style={{
              background: active ? "oklch(0.78 0.16 75)" : "transparent",
              color: active ? "oklch(0.18 0.015 65)" : "oklch(0.80 0.04 162)",
            }}
          >
            <Icon size={15} className="shrink-0" />
            <div>
              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "0.78rem", fontWeight: 600 }}>{itemLabel}</div>
              <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>{desc}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Mobile bottom nav shows only the most important items
  const MOBILE_NAV = [...MAIN_NAV.slice(0, 4), ...PERSONAL_NAV.slice(0, 2)];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Sidebar (desktop) ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 min-h-screen"
        style={{ background: "oklch(0.22 0.09 162)" }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "oklch(0.28 0.09 162)" }}>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.78 0.16 75)" }}
            >
              <Leaf size={16} style={{ color: "oklch(0.18 0.015 65)" }} />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}>
                FoodDB
              </div>
              <div className="text-xs leading-tight" style={{ color: "oklch(0.65 0.06 162)" }}>
                Cultural Explorer
              </div>
            </div>
          </Link>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-2">
          <NavSection label="Database" items={MAIN_NAV} location={location} />
          <div className="border-t my-1" style={{ borderColor: "oklch(0.28 0.09 162)" }} />
          <NavSection label="Personal" items={PERSONAL_NAV} location={location} />
          <div className="border-t my-1" style={{ borderColor: "oklch(0.28 0.09 162)" }} />
          <NavSection label="Info" items={INFO_NAV} location={location} collapsible />
          <div className="border-t my-1" style={{ borderColor: "oklch(0.28 0.09 162)" }} />
          <NavSection label="Admin" items={ADMIN_NAV} location={location} collapsible />
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t text-xs" style={{ borderColor: "oklch(0.28 0.09 162)", color: "oklch(0.50 0.05 162)" }}>
          <div>2,557 foods · 41 nutrients</div>
          <div>HPB SG FoodID · MY MOH</div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 border-b"
          style={{ background: "oklch(0.22 0.09 162)", borderColor: "oklch(0.28 0.09 162)" }}
        >
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.78 0.16 75)" }}
            >
              <Leaf size={14} style={{ color: "oklch(0.18 0.015 65)" }} />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.98 0.005 90)" }}>
              FoodDB
            </span>
          </Link>
          <span className="text-xs ml-auto" style={{ color: "oklch(0.65 0.06 162)" }}>The Transnational Plate</span>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* ── Bottom nav (mobile) ───────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex border-t z-50"
        style={{ background: "oklch(0.22 0.09 162)", borderColor: "oklch(0.28 0.09 162)" }}
      >
        {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href !== "/" && location.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors"
              style={{ color: active ? "oklch(0.78 0.16 75)" : "oklch(0.60 0.05 162)" }}
            >
              <Icon size={18} />
              <span style={{ fontSize: "0.6rem", fontFamily: "Sora, sans-serif", fontWeight: 600 }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
