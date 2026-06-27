import { TryOnClient } from "@/components/try-on-client";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";

export default async function TryOnPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-32">
        <StitchOverlay className="opacity-35" />
        <section className="atelier-shell relative py-16">
          <SectionHeading
            title="AI virtual fitting."
            copy="Upload a clear photo, select a Magnate Artisan garment, and send the preview into a bespoke WhatsApp consultation. The AI result is a visual guide, not the final tailoring specification."
          />
          <div className="mt-12">
            <TryOnClient initialProductSlug={product} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
