import { CollectionCard } from "@/components/collection-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { collectionList, products } from "@/lib/catalog";

export default function CollectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-32">
        <StitchOverlay className="opacity-45" />
        <section className="atelier-shell relative py-16">
          <SectionHeading
            title="Collections"
            copy={`Browse the full ${products.length}-piece Magnate Artisan catalog by visual world. Every product keeps real imagery first and AI preview as an optional fitting aid.`}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {collectionList.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
