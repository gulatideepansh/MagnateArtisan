import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/35 py-12 text-sm text-[#b7aa99]">
      <div className="atelier-shell grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl text-[#f6efe3]">Magnate Artisan</p>
          <p className="mt-3 max-w-md leading-7">
            Bespoke embroidered occasionwear with AI-assisted previews and human-led custom ordering.
          </p>
        </div>
        <div className="grid gap-3">
          <Link href="/collections">Collections</Link>
          <Link href="/try-on">AI Try-On</Link>
          <Link href="/bespoke">Bespoke Inquiry</Link>
        </div>
        <div className="grid gap-3">
          <span>No cart. No checkout.</span>
          <span>WhatsApp-first ordering.</span>
          <span>AI previews are visual guides only.</span>
        </div>
      </div>
    </footer>
  );
}
