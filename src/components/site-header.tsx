"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/scroll-progress";

const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/bespoke", label: "Bespoke" },
  { href: "/byo", label: "Build Your Own" },
  { href: "/#craftsmanship", label: "Craftsmanship" },
  { href: "/bespoke#measurements", label: "Measurements" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Stories" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <><ScrollProgress/><header className={cn("fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500", scrolled || menuOpen ? "border-[#b99858]/20 bg-[#070604]/94 shadow-[0_14px_45px_rgba(0,0,0,0.42)] backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-black/70 to-transparent")}>
      <div className="atelier-shell flex min-h-16 items-center justify-between gap-3 py-3 md:min-h-20 md:gap-6 md:py-0">
        <Link href="/" onClick={() => setMenuOpen(false)} className="group flex min-w-0 flex-col leading-none">
          <span className="display truncate text-[1.55rem] font-semibold tracking-[0.02em] text-[#f6efe3] sm:text-2xl">
            Magnate Artisan
          </span>
          <span className="mt-1 truncate text-[9px] uppercase tracking-[0.34em] text-[#b99858] sm:text-[10px] sm:tracking-[0.42em]">
            Bespoke Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[.12em] text-[#d7cbbb] lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#e4c982]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/bespoke#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center gap-2 border border-[#b99858]/55 text-sm uppercase tracking-[0.16em] text-[#fff4df] transition hover:border-[#e4c982] hover:bg-[#b99858]/10 sm:w-auto sm:px-4"
            aria-label="Start inquiry"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">Inquire</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center border border-[#b99858]/55 text-[#fff4df] transition hover:border-[#e4c982] hover:bg-[#b99858]/10 lg:hidden",
              menuOpen && "border-[#e4c982] bg-[#b99858]/14 text-[#e4c982]",
            )}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid border-t border-[#b99858]/16 bg-[#070604]/98 transition-[grid-template-rows,opacity] duration-300 lg:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="atelier-shell overflow-hidden" aria-label="Mobile navigation">
          <div className="grid gap-2 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-12 border border-[#b99858]/18 px-4 py-3 text-sm uppercase tracking-[0.16em] text-[#d7cbbb] transition hover:border-[#e4c982] hover:bg-[#b99858]/10 hover:text-[#fff4df]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header></>
  );
}
