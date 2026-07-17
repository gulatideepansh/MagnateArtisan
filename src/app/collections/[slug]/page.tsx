import { notFound } from "next/navigation";
import { CollectionStackHero } from "@/components/collection-stack-hero";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCollectionStackImages } from "@/lib/collection-stack";
import { collectionList, getCollection, getProductsByCollection } from "@/lib/catalog";

export function generateStaticParams() {
  return collectionList.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(slug);
  const stackImages = getCollectionStackImages(slug);

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-16 md:pt-20">
        <CollectionStackHero collection={collection} piecesCount={collectionProducts.length} stackImages={stackImages} />
        <section className="collection-product-reveal atelier-shell relative z-20 pb-24">
          <h2 className="sr-only">{collection.name} products</h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {collectionProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 4} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
