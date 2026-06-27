import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collectionList, getCollection, getProductsByCollection } from "@/lib/catalog";

export function generateStaticParams() {
  return collectionList.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(slug);

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="atelier-shell py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading title={collection.name} copy={collection.summary} />
            <p className="text-sm uppercase tracking-[0.18em] text-[#b7aa99]">{collectionProducts.length} pieces</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {collectionProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 2} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
