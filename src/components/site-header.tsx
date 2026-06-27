import Link from "next/link";
import { Sparkles } from "lucide-react";

const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/bespoke", label: "Bespoke" },
  { href: "/try-on", label: "AI Try-On" },
  { href: "/#craftsmanship", label: "Craftsmanship" },
  { href: "/bespoke#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#070604]/78 backdrop-blur-xl">
      <div className="atelier-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="display text-2xl font-semibold tracking-[0.04em] text-[#f6efe3]">
            Magnate Artisan
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.42em] text-[#b99858]">
            Bespoke Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#d7cbbb] md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#e4c982]">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/try-on"
          className="inline-flex h-11 w-11 items-center justify-center gap-2 border border-[#b99858]/55 text-sm uppercase tracking-[0.16em] text-[#fff4df] transition hover:border-[#e4c982] hover:bg-[#b99858]/10 sm:w-auto sm:px-4"
        >
          <Sparkles size={16} />
          <span className="hidden sm:inline">Try On</span>
        </Link>
      </div>
    </header>
  );
}
