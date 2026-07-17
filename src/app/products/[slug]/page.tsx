import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MessageCircle, Palette, Ruler, Scissors, Shirt } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { StitchOverlay } from "@/components/stitch-overlay";
import { getProduct, measurementGuides, products, relatedProducts } from "@/lib/catalog";
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

function editorialTitle(title: string) {
  const words = title
    .replace(/^(men(?:'s|s)?|women(?:'s|s)?|woman(?:'s)?)\s+/i, "")
    .replace(/\b(customi[sz]ed?|handmade|bespoke)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
  return words.length > 7 ? words.slice(0, 7).join(" ") : words.join(" ");
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const tags = occasionTags(product.title, product.collectionName);
  const isDiscounted = hasDiscount(product.discountType, product.discountValue);
  const salePrice = discountedPrice(product.price, product.discountType, product.discountValue);
  const audience = product.modelGender === "female" ? "women" : "men";
  const audienceGuides = measurementGuides.filter((guide) => guide.audience === audience);
  const measurementGuide = audienceGuides.find((guide) => /shoulder|chest|bust/i.test(guide.label)) || audienceGuides[0];
  const inquiryUrl = whatsappUrl(
    product,
    `Please help me customize this ${includedPieces(product.title).toLowerCase()}. I can share measurements, event date, delivery location, color direction, and reference images.`,
  );

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden pt-24">
        <section className="relative border-b border-[#b99858]/15 py-10 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(91,22,37,.24),transparent_28rem),radial-gradient(circle_at_90%_10%,rgba(185,152,88,.09),transparent_30rem)]" />
          <StitchOverlay className="opacity-30" />
          <div className="atelier-shell relative mb-8 flex items-center justify-between border-b border-[#b99858]/15 pb-4"><p className="text-[10px] uppercase tracking-[.24em] text-[#b99858]">Atelier piece / {product.collectionName}</p><p className="font-mono text-[10px] text-[#8f8271]">MA—{product.id.slice(-6).toUpperCase()}</p></div>
          <div className="atelier-shell relative grid gap-10 xl:grid-cols-[1.2fr_.8fr] xl:items-start">
          <Reveal><ProductGallery title={product.title} images={product.images} /></Reveal>

          <Reveal className="xl:sticky xl:top-28 xl:self-start" delay={.1}>
          <div className="relative overflow-hidden border border-[#b99858]/18 bg-[#100c09]/72 p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-9">
            <div className="pointer-events-none absolute -right-3 -top-12 font-mono text-[10rem] leading-none text-[#b99858]/[.035]">01</div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#e4c982]">{product.collectionName}</p>
            <h1 className="display mt-4 max-w-[13ch] text-balance text-4xl leading-[.94] text-[#fff4df] md:text-5xl 2xl:text-6xl">{editorialTitle(product.title)}</h1>
            <p className="mt-5 max-w-xl text-xs leading-6 text-[#8f8271]">{product.title}</p>
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

            <div className="mt-8 grid gap-3 border border-white/10 bg-black/15 p-5 text-sm text-[#d7cbbb]">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Palette, title: "Customizable", copy: "Color, fabric, lining, buttons, embroidery motifs, rhinestone level, and finishing can be discussed." },
                { icon: Shirt, title: "Fit direction", copy: "Send measurements, usual size, fit preference, and whether the piece is for stage, ceremony, or formal wear." },
                { icon: CalendarDays, title: "Deadline first", copy: "Share event date and delivery location early so timing can be confirmed before design details expand." },
                { icon: Scissors, title: "Made to order", copy: "No cart or checkout. This piece starts a direct conversation about the final garment." },
              ].map((item) => (
                <article key={item.title} className="group border border-[#b99858]/20 bg-[#17120e]/40 p-5 transition duration-500 hover:-translate-y-1 hover:border-[#e4c982]/50 hover:bg-[#17120e]/80">
                  <item.icon className="text-[#e4c982]" size={22} />
                  <h2 className="display mt-4 text-3xl text-[#f6efe3]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#b7aa99]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div></Reveal>
          </div>
        </section>

        <section className="relative bg-black/24 py-24 md:py-32">
          <div className="atelier-shell">
            <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Customization Reference</p>
              <h2 className="display mt-4 text-5xl leading-none text-[#fff4df] md:text-7xl">One reference.<br/><em className="text-[#e4c982]">Infinite directions.</em></h2>
            </div>
            <div>
              <p className="mt-5 leading-8 text-[#b7aa99]">
                Use the product photos as the base, then bring references for embroidery density, fabric feel, color direction, lining, button detail, and how formal or theatrical the final silhouette should be.
              </p>
              <ButtonLink href="/bespoke#contact" className="mt-7" tone="wine">
                Send Custom Notes
              </ButtonLink>
            </div></Reveal>
            <div className="mt-14 grid auto-rows-[180px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { src: originalSiteMedia.ipadDesign, label: "Motif planning", span: "sm:row-span-2 lg:col-span-2" },
                { src: originalSiteMedia.calico, label: "Fabric behavior", span: "" },
                { src: originalSiteMedia.tailoringCuffs, label: "Detail finish", span: "sm:row-span-2" },
                { src: originalSiteMedia.fittingRoom, label: "Fit confirmation", span: "lg:col-span-1" },
              ].map((item, index) => (
                <Reveal key={item.src} className={item.span} delay={index*.07}><article className="group relative h-full overflow-hidden border border-[#b99858]/22 bg-[#17120e]">
                  <div className="relative h-full">
                    <Image src={item.src} alt={item.label} fill sizes="25vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition duration-700 group-hover:bg-black/10"/>
                  </div>
                  <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.16em] text-[#e4c982]">0{index+1} / {item.label}</p>
                </article></Reveal>
              ))}
            </div>
          </div>
        </section>

        {measurementGuide ? (
          <section className="relative overflow-hidden border-y border-[#b99858]/15 py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,152,88,.1),transparent_28rem)]"/>
            <div className="atelier-shell relative grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-stretch">
              <Reveal className="group relative min-h-[560px] overflow-hidden border border-[#b99858]/22 bg-[#f0ece3] md:min-h-[720px]">
                <Image src={measurementGuide.src} alt={`${measurementGuide.label} measurement guide for ${audience}`} fill sizes="(max-width:1024px) 92vw, 60vw" className="object-contain p-4 transition duration-700 group-hover:scale-[1.025] md:p-10" unoptimized/>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24"><p className="text-[10px] uppercase tracking-[.22em] text-[#e4c982]">Large-format fitting reference</p><h2 className="display mt-2 text-4xl text-white">{measurementGuide.label}</h2></div>
              </Reveal>
              <Reveal className="relative flex flex-col justify-between overflow-hidden border border-[#b99858]/20 bg-[#100c09]/75 p-7 backdrop-blur-xl md:p-10" delay={.1}>
                <div><p className="eyebrow">Fit is part of the design</p><h2 className="display mt-5 text-5xl leading-[.92] text-[#fff4df] md:text-7xl">Measure once.<br/><em className="text-[#e4c982]">Make it yours.</em></h2><p className="mt-7 text-base leading-8 text-[#b7aa99]">Use this {audience}’s guide beside you while preparing the brief. A flexible tape, natural posture and a second person produce the clearest result.</p></div>
                <div className="mt-10"><div className="grid gap-3 text-sm text-[#d7cbbb]">{["Keep the tape level, never twisted", "Measure the body without adding ease", "Photograph or note anything uncertain", "The atelier reviews measurements before cutting"].map((note,index)=><p key={note} className="flex gap-4 border-t border-[#b99858]/14 pt-3"><span className="font-mono text-[#b99858]">0{index+1}</span>{note}</p>)}</div><ButtonLink href="/bespoke#measurements" className="mt-8" tone="gold"><Ruler size={17}/>Open all measurement guides</ButtonLink></div>
              </Reveal>
            </div>
          </section>
        ) : null}

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
