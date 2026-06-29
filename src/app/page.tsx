import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircle, Palette, Ruler, Scissors } from "lucide-react";
import { AchievementCounts } from "@/components/achievement-counts";
import { ButtonLink } from "@/components/button-link";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { featuredProducts, measurementGuides, media } from "@/lib/catalog";
import { craftsmanshipMedia, originalSiteMedia, processMedia, trustMedia } from "@/lib/media-curation";

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
  const measurementPreview = measurementGuides.slice(0, 4);
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

        <section className="border-y border-[#b99858]/15 bg-black/32 py-8">
          <div className="atelier-shell grid gap-4 md:grid-cols-4">
            {trustMedia.map((item) => (
              <article key={item.title} className="grid grid-cols-[72px_1fr] items-center gap-4">
                <div className="relative aspect-square overflow-hidden border border-[#b99858]/25 bg-[#17120e]">
                  <Image src={item.src} alt="" fill sizes="72px" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-sm uppercase tracking-[0.16em] text-[#f6efe3]">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#b7aa99]">{item.copy}</p>
                </div>
              </article>
            ))}
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

            <div className="relative aspect-[4/3] overflow-hidden border border-[#b99858]/22 bg-[#17120e] shadow-[0_24px_80px_rgba(0,0,0,0.34)] lg:aspect-[16/10]">
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

        <section id="craftsmanship" className="relative overflow-hidden py-24">
          <StitchOverlay className="opacity-50" />
          <div className="atelier-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="luxury-panel p-8">
              <Scissors className="text-[#e4c982]" size={34} />
              <h2 className="display mt-6 text-5xl text-[#fff4df] md:text-7xl">Made for the moment, then made to measure.</h2>
              <p className="mt-6 leading-8 text-[#b7aa99]">
                The site avoids checkout because these garments are not impulse purchases. Each inquiry should carry occasion, measurements, delivery date, customization notes, color direction, and reference imagery.
              </p>
              <ButtonLink href="/bespoke" className="mt-8" tone="wine">Start Bespoke Inquiry</ButtonLink>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {craftsmanshipMedia.map((item) => (
                <div key={item.src} className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-black/64 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#e4c982]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="atelier-shell py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading
              title="Prepare measurements without slowing the inquiry."
              copy="Clients can send the first brief even if sizing is not ready. These original fitting animations help them collect cleaner notes before the final confirmation."
            />
            <ButtonLink href="/bespoke#measurements" tone="ghost" className="justify-self-start lg:justify-self-end">
              Prepare Measurements
              <ArrowRight size={17} />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {measurementPreview.map((guide) => (
              <article key={guide.src} className="overflow-hidden border border-[#b99858]/22 bg-[#17120e]">
                <div className="relative aspect-[4/3]">
                  <Image src={guide.src} alt={`${guide.label} measurement guide`} fill sizes="25vw" className="object-cover" unoptimized />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#e4c982]">{guide.audience}</p>
                  <h3 className="display mt-2 text-3xl text-[#f6efe3]">{guide.label}</h3>
                </div>
              </article>
            ))}
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
      </main>
      <SiteFooter />
    </>
  );
}
