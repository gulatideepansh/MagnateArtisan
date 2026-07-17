import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { faqs } from "@/data/faq";

export const metadata: Metadata = { title: "FAQ | Magnate Artisan", description: "Answers about bespoke measurements, design proofing, fabrics, pricing, timelines, shipping, and care." };

export default function FaqPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([, name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return <><SiteHeader /><main className="relative overflow-hidden pt-32"><StitchOverlay className="opacity-40" />
    <section className="atelier-shell relative py-16 md:py-24">
      <Reveal><p className="eyebrow">Atelier answers</p><h1 className="display mt-5 max-w-4xl text-6xl leading-[.9] text-[#fff4df] md:text-8xl">Every detail, before the first stitch.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#b7aa99]">Measurements, proofing, timelines, delivery and everything between inspiration and arrival.</p></Reveal>
      <Reveal className="mt-14" delay={0.1}><FaqList /></Reveal>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main><SiteFooter /></>;
}
