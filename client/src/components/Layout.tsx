// FoodDB Layout — Tropical Bauhaus: deep jade sidebar, ivory main content
// Sidebar nav for desktop, bottom nav for mobile

import { Link, useLocation } from "wouter";
import { Search, Camera, ClipboardPaste, Database, Leaf, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",        label: "Explore",  icon: Search,         desc: "Food culture search" },
  { href: "/analyse", label: "Analyse",  icon: Camera,         desc: "Photo recognition" },
  { href: "/upload",  label: "Import",   icon: UploadCloud,    desc: "CSV / ZIP upload" },
  { href: "/import",  label: "Paste",    icon: ClipboardPaste, desc: "Paste HPB entry" },
  { href: "/db",      label: "My Foods", icon: Database,       desc: "Saved records" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Sidebar (desktop) ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 min-h-screen"
        style={{ background: "oklch(0.22 0.09 162)" }}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b" style={{ borderColor: "oklch(0.28 0.09 162)" }}>
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

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, desc }) => {
            const active = location === href || (href !== "/" && location.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 group",
                  active
                    ? "text-sm font-semibold"
                    : "text-sm font-medium"
                )}
                style={{
                  background: active ? "oklch(0.78 0.16 75)" : "transparent",
                  color: active ? "oklch(0.18 0.015 65)" : "oklch(0.80 0.04 162)",
                }}
              >
                <Icon size={16} className="shrink-0" />
                <div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: "0.68rem", opacity: 0.7 }}>{desc}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t text-xs" style={{ borderColor: "oklch(0.28 0.09 162)", color: "oklch(0.50 0.05 162)" }}>
          <div>2,557 foods · 41 nutrients</div>
          <div>Data: HPB SG FoodID · MY MOH</div>
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
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
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
