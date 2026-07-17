import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircle, Palette, Ruler, Star } from "lucide-react";
import { AchievementCounts } from "@/components/achievement-counts";
import { ButtonLink } from "@/components/button-link";
import { CapabilityRail } from "@/components/capability-rail";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { Reveal } from "@/components/reveal";
import { featuredProducts, media } from "@/lib/catalog";
import { originalSiteMedia, processMedia } from "@/lib/media-curation";
import { fallbackTestimonials } from "@/data/testimonials";

const etsyLogo = "/site-media/images/Etsy_logo_lg_rgb_2a6b6a0294.png";
export default function Home() {
  const heroVideo =
    media.videos.find((video) => video.src.includes("d9d1407a9f6f4585b10a845484cbf2c3")) ||
    media.videos.find((video) => video.src.includes("HD-1080p")) ||
    media.videos[0];
  const heroPoster =
    media.posters.find(
      (poster) => poster.src.includes("d9d1407a9f6f4585b10a845484cbf2c3") && poster.src.includes("1800x"),
    ) ||
    media.posters.find((poster) => poster.src.includes("d9d1407a9f6f4585b10a845484cbf2c3")) ||
    media.posters[0];
  const bespokeVideo =
    media.videos.find((video) => video.src.includes("31120f6ec04149dba517e4adaa14c613")) || media.videos[0];
  const bespokePoster =
    media.posters.find(
      (poster) => poster.src.includes("31120f6ec04149dba517e4adaa14c613") && poster.src.includes("1800x"),
    ) ||
    media.posters.find((poster) => poster.src.includes("31120f6ec04149dba517e4adaa14c613")) ||
    media.posters[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative min-h-screen overflow-hidden pt-28">
          {heroVideo ? (
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
              src={heroVideo.src}
              poster={heroPoster?.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070604] via-[#070604]/72 to-[#070604]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070604] via-transparent to-[#070604]/60" />

          <div className="atelier-shell relative z-10 flex min-h-[calc(100vh-7rem)] items-center pb-16">
            <div className="max-w-3xl">
              <div className="mb-8 h-px w-36 bg-[#b99858]" />
              <h1 className="display text-balance text-6xl leading-[0.9] text-[#fff4df] md:text-8xl">
                Bespoke statementwear, made for entrance.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-9 text-[#d7cbbb]">
                Explore 138 embroidered suits, couture pieces, and ceremonial looks, then send a focused WhatsApp brief for sizing, fabric, embroidery, delivery timing, and customization.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/bespoke#contact">
                  <MessageCircle size={17} />
                  Start Bespoke Inquiry
                </ButtonLink>
                <ButtonLink href="/collections" tone="ghost">
                  View Collections
                  <ArrowRight size={17} />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <CapabilityRail />

        <section className="relative overflow-hidden py-24 md:py-32">
          <StitchOverlay className="opacity-45" />
          <div className="atelier-shell relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">Build your own</p>
              <h2 className="display mt-5 text-balance text-6xl leading-[.9] text-[#fff4df] md:text-8xl">From a passing thought to a piece no one forgets.</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#b7aa99]">Choose the silhouette, palette and level of detail. Upload your references. The studio turns it into a precise conversation—and then a real garment.</p>
              <ButtonLink href="/byo" className="mt-8" tone="gold">Enter the design studio <ArrowRight size={17}/></ButtonLink>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-4" delay={.12}>
              <div className="relative aspect-[3/4] translate-y-10 overflow-hidden border border-[#b99858]/20"><Image src={originalSiteMedia.phoneSketch} alt="Digital fashion concept sketch" fill sizes="30vw" className="object-cover"/><span className="image-caption">Sketch</span></div>
              <div className="relative aspect-[3/4] overflow-hidden border border-[#b99858]/20"><Image src={originalSiteMedia.tailoringCuffs} alt="Finished embroidered tailoring" fill sizes="30vw" className="object-cover"/><span className="image-caption">Reality</span></div>
            </Reveal>
          </div>
        </section>

        <AchievementCounts />

        <section className="relative overflow-hidden bg-[#0b0806] py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b99858]/35 to-transparent" />
          <div className="atelier-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div className="max-w-xl">
              <div className="mb-7 h-px w-32 bg-[#b99858]" />
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#b99858]">Bespoke Atelier</p>
              <h2 className="display text-balance text-5xl leading-none text-[#fff4df] md:text-6xl">
                Handcrafted bespoke suits for every occasion.
              </h2>
              <p className="mt-7 text-base leading-8 text-[#d7cbbb]">
                At Magnate Artisan, every suit begins with your idea. Whether it is for a wedding, business event, formal occasion, celebration, or a completely unique concept, our master tailors transform your inspiration into a perfectly crafted bespoke garment.
              </p>
              <p className="mt-4 text-base leading-8 text-[#b7aa99]">
                From fabric selection and design consultation to precise measurements, pattern creation, fittings, and final delivery, we manage every detail of the journey. The result is a one-of-a-kind suit tailored to your style, personality, and occasion, crafted with exceptional precision and timeless elegance.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/bespoke#contact" tone="gold">
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                </ButtonLink>
                <ButtonLink href="/bespoke#contact" tone="ghost">
                  Book a Meeting
                  <ArrowRight size={17} />
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border border-[#b99858]/22 bg-[#17120e] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
              {bespokeVideo ? (
                <video
                  className="h-full w-full object-cover"
                  src={bespokeVideo.src}
                  poster={bespokePoster?.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                />
              ) : bespokePoster ? (
                <Image src={bespokePoster.src} alt="" fill sizes="(max-width: 1024px) 92vw, 54vw" className="object-cover" />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/36 via-transparent to-black/12" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black/24 py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b99858]/30 to-transparent" />
          <div className="atelier-shell">
            <div className="mx-auto max-w-2xl text-center">
              <div className="gold-line mx-auto mb-6 w-32" />
              <h2 className="display text-balance text-5xl leading-none text-[#fff4df] md:text-6xl">Our Process</h2>
              <p className="mt-5 text-base leading-8 text-[#b7aa99] md:text-lg">
                From first brief to finished arrival, each made-to-order piece follows a clear atelier path.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processMedia.map((step) => (
                <article key={step.title} className="group relative overflow-hidden border border-[#b99858]/24 bg-[#17120e]">
                  <div className="relative aspect-square">
                    <Image
                      src={step.src}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-black/18" />
                    <div className="absolute inset-6 flex items-center justify-center text-center">
                      <h3 className="text-balance text-xl font-semibold uppercase tracking-[0.06em] text-white md:text-2xl">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="gold-line mt-12" />
          </div>
        </section>

        <section className="atelier-shell py-24">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading title="Featured pieces." copy="Large-format product pages keep real photography primary, with clear notes for customization, measurements, and WhatsApp inquiry." />
            <ButtonLink href="/collections" tone="ghost">All Pieces</ButtonLink>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts(8).map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 2} />
            ))}
          </div>
        </section>

        <section id="craftsmanship" className="relative overflow-hidden border-y border-[#b99858]/15 bg-[#090705] py-24 md:py-32">
          <StitchOverlay className="opacity-45" />
          <div className="atelier-shell relative">
            <Reveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="eyebrow">Anatomy of the atelier</p><h2 className="display mt-5 text-6xl leading-[.88] text-[#fff4df] md:text-8xl">Not a product line.<br/><em className="text-[#e4c982]">A chain of decisions.</em></h2></div><p className="max-w-xl text-lg leading-8 text-[#b7aa99]">This space now belongs to the making itself: four precise transformations between your first reference and the final confirmation.</p></Reveal>
            <div className="mt-16 grid gap-px overflow-hidden border border-[#b99858]/18 bg-[#b99858]/18 lg:grid-cols-4">
              {[
                { no:"01", title:"Interpret", copy:"The occasion, movement and references become a clear visual direction.", image:originalSiteMedia.phoneSketch },
                { no:"02", title:"Engineer", copy:"Proportion, pattern and fit turn the sketch into a wearable structure.", image:originalSiteMedia.cuttingTable },
                { no:"03", title:"Embellish", copy:"Thread, stones, braid and motif placement create the signature surface.", image:originalSiteMedia.tailoringCuffs },
                { no:"04", title:"Confirm", copy:"The finished piece is reviewed and dispatched only after client approval.", image:originalSiteMedia.fittingRoom },
              ].map((step,index)=><Reveal key={step.no} className="group bg-[#0c0907]" delay={index*.07}><article><div className="relative aspect-[4/5] overflow-hidden"><Image src={step.image} alt={step.title} fill sizes="(max-width:1024px) 92vw, 25vw" className="object-cover opacity-70 transition duration-1000 group-hover:scale-105 group-hover:opacity-100"/><div className="absolute inset-0 bg-gradient-to-t from-[#0c0907] via-transparent to-transparent"/><span className="absolute left-5 top-5 font-mono text-sm text-[#e4c982]">{step.no}</span></div><div className="min-h-56 p-6"><h3 className="display text-4xl text-[#fff4df]">{step.title}</h3><p className="mt-4 text-sm leading-7 text-[#b7aa99]">{step.copy}</p></div></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0806] py-24">
          <Image
            src={originalSiteMedia.atelierRoom}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070604] via-[#070604]/88 to-[#070604]/58" />
          <div className="atelier-shell relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              title="Information that speeds up the consultation."
              copy="A strong first message reduces back-and-forth. Customers can send the piece, deadline, location, sizing status, and customization direction before the first reply."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: CalendarDays, title: "Occasion and date", copy: "Wedding, stage, gala, ceremony, carnival, rodeo, reception, or private commission." },
                { icon: Ruler, title: "Sizing status", copy: "Full measurements if ready, or a note that measurement guidance is needed." },
                { icon: Palette, title: "Design direction", copy: "Color palette, embroidery motif, rhinestone level, fabric feel, lining, and references." },
                { icon: MessageCircle, title: "WhatsApp handoff", copy: "The bespoke page turns these notes into a structured message for faster quoting." },
              ].map((item) => (
                <article key={item.title} className="border border-[#b99858]/25 p-6">
                  <item.icon className="text-[#e4c982]" size={26} />
                  <h3 className="display mt-5 text-3xl text-[#f6efe3]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#b7aa99]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-[#b99858]/16 bg-[#070604] py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(185,152,88,0.12),transparent_28rem)]" />
          <div className="atelier-shell relative">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <div className="mb-7 h-px w-32 bg-[#b99858]" />
                <div className="mb-7 inline-flex items-center gap-3 border border-[#b99858]/24 bg-[#17120e]/70 px-4 py-3">
                  <span className="relative block h-7 w-[58px]">
                    <Image src={etsyLogo} alt="Etsy" fill sizes="58px" className="object-contain" />
                  </span>
                  <span className="h-6 w-px bg-[#b99858]/24" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Star Seller proof</span>
                </div>
                <h2 className="display text-balance text-5xl leading-none text-[#fff4df] md:text-7xl">
                  Five-star moments, made public on Etsy.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#b7aa99]">
                  Across the public Magnate Artisan Etsy shops, customers consistently highlight communication, custom fit, craftsmanship, timelines, and statement-making results.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: "4.9", label: "MagnateArtisan rating", detail: "62 public reviews" },
                  { value: "5.0", label: "MagnateArtisanStudio rating", detail: "48 public reviews" },
                  { value: "110", label: "Etsy reviews checked", detail: "selected 5-star highlights" },
                ].map((stat) => (
                  <article key={stat.label} className="border border-[#b99858]/22 bg-[#17120e]/64 p-5">
                    <div className="flex gap-1 text-[#e4c982]" aria-label="5 star review">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />
                      ))}
                    </div>
                    <p className="mt-5 font-mono text-4xl text-[#fff4df]">{stat.value}</p>
                    <h3 className="mt-3 text-xs uppercase tracking-[0.18em] text-[#e4c982]">{stat.label}</h3>
                    <p className="mt-2 text-sm text-[#8f8271]">{stat.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fallbackTestimonials.slice(0, 3).map((review) => (
                <article key={`${review.shop}-${review.name}-${review.date}`} className="group border border-[#b99858]/18 bg-[#17120e]/58 p-6 transition hover:border-[#b99858]/42 hover:bg-[#17120e]/82">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1 text-[#e4c982]" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={14} fill="currentColor" strokeWidth={1.4} />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#8f8271]">Etsy review</span>
                  </div>
                  <p className="mt-5 min-h-28 text-sm leading-7 text-[#d7cbbb]">{review.quote}</p>
                  <div className="mt-6 border-t border-[#b99858]/14 pt-4">
                    <p className="text-sm font-medium text-[#fff4df]">{review.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#b99858]">
                      {review.shop} / {review.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border border-[#b99858]/18 bg-black/24 p-5 text-sm leading-7 text-[#b7aa99] md:flex-row md:items-center md:justify-between">
              <p>
                Review highlights are summarized from public Etsy shop reviews for MagnateArtisan and MagnateArtisanStudio.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/testimonials" className="text-xs uppercase tracking-[0.16em] text-[#fff4df] transition hover:text-[#e4c982]">All client stories</a>
                <a href="https://www.etsy.com/au/shop/MagnateArtisan?ref=shop-header-name&section_id=reviews" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.16em] text-[#e4c982] transition hover:text-[#fff4df]">
                  MagnateArtisan
                </a>
                <a href="https://www.etsy.com/au/shop/MagnateArtisanStudio?ref=shop-header-name&section_id=reviews" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.16em] text-[#e4c982] transition hover:text-[#fff4df]">
                  MagnateArtisanStudio
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
