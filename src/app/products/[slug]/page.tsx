import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MessageCircle, Palette, Ruler, Scissors, Shirt } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProduct, products, relatedProducts } from "@/lib/catalog";
import { originalSiteMedia } from "@/lib/media-curation";
import { discountedPrice, formatMoney, hasDiscount } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

function occasionTags(title: string, collectionName: string) {
  const source = `${title} ${collectionName}`.toLowerCase();
  const tags = new Set<string>();

  if (source.includes("wedding") || source.includes("groom")) tags.add("Wedding");
  if (source.includes("party") || source.includes("cocktail") || source.includes("reception")) tags.add("Reception");
  if (source.includes("stage") || source.includes("theatre") || source.includes("performance")) tags.add("Stage");
  if (source.includes("carnival") || source.includes("cosplay") || source.includes("rococo")) tags.add("Carnival");
  if (source.includes("mariachi") || source.includes("charro")) tags.add("Ceremony");
  if (source.includes("western") || source.includes("cowboy") || source.includes("rodeo")) tags.add("Western");
  if (source.includes("matador") || source.includes("bullfighter")) tags.add("Matador");

  return Array.from(tags).slice(0, 4);
}

function includedPieces(title: string) {
  const source = title.toLowerCase();
  if (source.includes("4-piece") || source.includes("4pc")) return "4-piece set";
  if (source.includes("3-piece") || source.includes("3pc")) return "3-piece set";
  if (source.includes("2-piece") || source.includes("2pc")) return "2-piece set";
  if (source.includes("cape") || source.includes("cloak")) return "Cape or statement layer";
  if (source.includes("jacket") || source.includes("blazer")) return "Jacket or blazer";
  if (source.includes("dress")) return "Dress or dress set";
  return "Made-to-order piece";
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const tags = occasionTags(product.title, product.collectionName);
  const isDiscounted = hasDiscount(product.discountType, product.discountValue);
  const salePrice = discountedPrice(product.price, product.discountType, product.discountValue);
  const inquiryUrl = whatsappUrl(
    product,
    `Please help me customize this ${includedPieces(product.title).toLowerCase()}. I can share measurements, event date, delivery location, color direction, and reference images.`,
  );

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="atelier-shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery title={product.title} images={product.images} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.22em] text-[#e4c982]">{product.collectionName}</p>
            <h1 className="display mt-4 text-5xl leading-none text-[#fff4df] md:text-7xl">{product.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-lg text-[#d7cbbb]">
              <span>Starting from</span>
              {isDiscounted ? (
                <>
                  <span className="text-2xl text-[#e4c982]">{formatMoney(salePrice)}</span>
                  <span className="line-through opacity-65">{formatMoney(product.price)}</span>
                </>
              ) : (
                <span>{formatMoney(product.price)}</span>
              )}
              {product.saleLabel || isDiscounted ? (
                <span className="bg-[#5b1625] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fff4df]">
                  {product.saleLabel || "Private Sale"}
                </span>
              ) : null}
            </div>

            <div className="gold-line my-8 w-full" />

            <div className="grid gap-4 text-sm leading-7 text-[#b7aa99]">
              {product.description ? <p>{product.description}</p> : null}
              <p>
                This page keeps the real catalog photography as the source of truth. Use it as a starting point for a made-to-order commission, color change, embroidery adjustment, or full custom brief.
              </p>
              <p>
                For bespoke orders, share your measurements, event date, preferred color palette, embroidery direction, and any reference images through WhatsApp.
              </p>
            </div>

            {tags.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="border border-[#b99858]/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#e4c982]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/bespoke#contact">
                <Ruler size={17} />
                Build Brief
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
                <span className="text-[#b7aa99]">Catalog images</span>
                <span>{product.imageCount}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">Included format</span>
                <span>{includedPieces(product.title)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">Typical timeline</span>
                <span>4-8 weeks</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#b7aa99]">Order method</span>
                <span>WhatsApp consultation</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {[
                { icon: Palette, title: "Customizable", copy: "Color, fabric, lining, buttons, embroidery motifs, rhinestone level, and finishing can be discussed." },
                { icon: Shirt, title: "Fit direction", copy: "Send measurements, usual size, fit preference, and whether the piece is for stage, ceremony, or formal wear." },
                { icon: CalendarDays, title: "Deadline first", copy: "Share event date and delivery location early so timing can be confirmed before design details expand." },
                { icon: Scissors, title: "Made to order", copy: "No cart or checkout. This piece starts a direct conversation about the final garment." },
              ].map((item) => (
                <article key={item.title} className="border border-[#b99858]/20 p-5">
                  <item.icon className="text-[#e4c982]" size={22} />
                  <h2 className="display mt-4 text-3xl text-[#f6efe3]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#b7aa99]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/24 py-20">
          <div className="atelier-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Customization Reference</p>
              <h2 className="display mt-4 text-5xl text-[#fff4df] md:text-6xl">Shape the final piece around the occasion.</h2>
              <p className="mt-5 leading-8 text-[#b7aa99]">
                Use the product photos as the base, then bring references for embroidery density, fabric feel, color direction, lining, button detail, and how formal or theatrical the final silhouette should be.
              </p>
              <ButtonLink href="/bespoke#contact" className="mt-7" tone="wine">
                Send Custom Notes
              </ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { src: originalSiteMedia.ipadDesign, label: "Motif planning" },
                { src: originalSiteMedia.calico, label: "Fabric behavior" },
                { src: originalSiteMedia.tailoringCuffs, label: "Detail finish" },
              ].map((item) => (
                <article key={item.src} className="overflow-hidden border border-[#b99858]/22 bg-[#17120e]">
                  <div className="relative aspect-[3/4]">
                    <Image src={item.src} alt={item.label} fill sizes="25vw" className="object-cover" />
                  </div>
                  <p className="p-4 text-xs uppercase tracking-[0.16em] text-[#e4c982]">{item.label}</p>
                </article>
              ))}
            </div>
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
