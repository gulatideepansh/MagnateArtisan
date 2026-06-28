import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircle, Palette, Ruler, Scissors } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CollectionCard } from "@/components/collection-card";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { collectionList, featuredProducts, media, products } from "@/lib/catalog";

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

        <section className="atelier-shell py-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <SectionHeading
              title="Curated for entrance."
              copy="Each category is treated as a visual world: royal costume, charro ceremony, western wedding, matador drama, and bespoke couture."
            />
            <p className="text-right text-sm uppercase tracking-[0.18em] text-[#b7aa99] md:block">
              {products.length} pieces in the catalog
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {collectionList.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </section>

        <section className="bg-black/24 py-24">
          <div className="atelier-shell">
            <SectionHeading
              title="Quick inquiry, serious detail."
              copy="The site is built around a direct custom-order conversation. Pick a piece, send the occasion and measurements, then shape color, fabric, embroidery, and timing with the atelier."
              align="center"
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { icon: MessageCircle, title: "Send", copy: "Choose a catalog piece or custom idea and send it with your occasion, city, and event date." },
                { icon: Ruler, title: "Measure", copy: "Use the measurement guide to prepare sizing notes before the consultation begins." },
                { icon: Palette, title: "Customize", copy: "Discuss color, fabric, embroidery motifs, rhinestone level, lining, and finishing." },
              ].map((item) => (
                <div key={item.title} className="luxury-panel p-7">
                  <item.icon className="text-[#e4c982]" size={30} />
                  <h3 className="display mt-6 text-4xl text-[#f6efe3]">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[#b7aa99]">{item.copy}</p>
                </div>
              ))}
            </div>
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
              {featuredProducts(4).map((product) => (
                <div key={product.slug} className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
                  <Image
                    src={product.primaryImage}
                    alt={product.title}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-black/64 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#e4c982]">
                    Made to order
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0806] py-24">
          <div className="atelier-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
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
