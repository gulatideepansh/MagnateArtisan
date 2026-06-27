import { notFound } from "next/navigation";
import { MessageCircle, Sparkles } from "lucide-react";
import { AiPreviewStrip } from "@/components/ai-preview-strip";
import { ButtonLink } from "@/components/button-link";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProduct, products, relatedProducts } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const inquiryUrl = whatsappUrl(product);

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="atelier-shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery title={product.title} images={product.images} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.22em] text-[#e4c982]">{product.collectionName}</p>
            <h1 className="display mt-4 text-5xl leading-none text-[#fff4df] md:text-7xl">{product.title}</h1>
            <p className="mt-6 text-lg text-[#d7cbbb]">Starting from {product.price}</p>

            <div className="gold-line my-8 w-full" />

            <div className="grid gap-4 text-sm leading-7 text-[#b7aa99]">
              <p>
                This page keeps the real catalog photography as the source of truth. AI previews are optional fitting references for proportion, styling, and conversation.
              </p>
              <p>
                For bespoke orders, share your measurements, event date, preferred color palette, embroidery direction, and any reference images through WhatsApp.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink href={`/try-on?product=${product.slug}`}>
                <Sparkles size={17} />
                Try This Piece
              </ButtonLink>
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-[#731e31]"
              >
                <MessageCircle size={17} />
                Start Inquiry
              </a>
            </div>

            <div className="mt-8 grid gap-3 border border-white/10 p-5 text-sm text-[#d7cbbb]">
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">AI garment type</span>
                <span>{product.garmentType.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">Catalog images</span>
                <span>{product.imageCount}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">AI previews</span>
                <span>{product.tryOnOutputs.length}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">Order method</span>
                <span>WhatsApp consultation</span>
              </div>
            </div>
            <AiPreviewStrip product={product} />
          </div>
        </section>

        {related.length ? (
          <section className="atelier-shell py-20">
            <h2 className="display text-5xl text-[#f6efe3]">Related pieces</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
