import Image from "next/image";
import { CalendarDays, MessageCircle, Palette, Ruler, Scissors, Timer, Upload } from "lucide-react";
import { BespokeInquiryForm } from "@/components/bespoke-inquiry-form";
import { MeasurementGuides } from "@/components/measurement-guides";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { originalSiteMedia } from "@/lib/media-curation";

const steps = [
  { icon: Upload, title: "Share the reference", copy: "Choose a catalog piece, paste a product link, or describe the custom direction you want." },
  { icon: CalendarDays, title: "Set the occasion", copy: "Send the event type, city, delivery country, and date so timing is clear from the first message." },
  { icon: Ruler, title: "Confirm measurements", copy: "Use the measurement guide, send existing sizes, or ask for help before final sizing is confirmed." },
  { icon: Palette, title: "Shape the craft", copy: "Discuss fabric, embroidery motifs, rhinestone level, color, lining, and finishing." },
  { icon: Timer, title: "Approve the timeline", copy: "The order continues through direct consultation rather than a generic checkout." },
];

export default function BespokePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-32">
        <StitchOverlay className="opacity-45" />
        <section className="atelier-shell relative py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              title="Custom order, human conversation."
              copy="Magnate Artisan pieces deserve context: occasion, measurements, embroidery direction, fabric behavior, delivery timing, and the exact way the garment should enter the room."
            />
            <div className="luxury-panel p-7">
              <p className="display text-4xl text-[#fff4df]">What to send</p>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-[#b7aa99]">
                <span>Selected product or collection</span>
                <span>Full measurements or measurement guide photos</span>
                <span>Event date and required delivery location</span>
                <span>Color, fabric, embroidery, rhinestone, and reference image notes</span>
                <span>Preferred fit, lining, button, cape, trouser, skirt, or jacket adjustments</span>
              </div>
              <a href="#contact" className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-[#731e31]">
                <MessageCircle size={17} />
                Build Inquiry Brief
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step) => (
              <article key={step.title} className="luxury-panel p-6">
                <step.icon className="text-[#e4c982]" size={28} />
                <h2 className="display mt-6 text-4xl text-[#f6efe3]">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#b7aa99]">{step.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative min-h-72 overflow-hidden border border-[#b99858]/25 bg-[#17120e]">
                <Image src={originalSiteMedia.ipadDesign} alt="Bespoke embroidery concept artwork" fill sizes="40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
                  Reference artwork and embroidery direction
                </p>
              </div>
              <div className="relative min-h-72 overflow-hidden border border-[#b99858]/25 bg-[#17120e]">
                <Image src={originalSiteMedia.fittingRoom} alt="Tailoring fitting room reference" fill sizes="40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
                  Fit, proportion, and finishing discussion
                </p>
              </div>
            </div>
            <BespokeInquiryForm />
          </div>

          <div id="measurements" className="mt-20 scroll-mt-28">
            <SectionHeading
              title="Measurement guidance."
              copy="Use these fitting guides to prepare useful sizing notes before sending a custom inquiry. If the customer is unsure, they can still send the inquiry first and ask for guidance."
            />
            <div className="mt-10">
              <div className="mb-10 grid gap-4 md:grid-cols-2">
                <div className="border-l border-[#e4c982] bg-[#17120e]/70 p-7"><p className="eyebrow">Menswear</p><h3 className="display mt-3 text-4xl text-[#fff4df]">Measure side by side.</h3><p className="mt-3 leading-7 text-[#b7aa99]">Keep each illustration open beside you and record the body—not a favourite garment—unless the guide says otherwise.</p></div>
                <div className="border-l border-[#e4c982] bg-[#17120e]/70 p-7"><p className="eyebrow">Womenswear</p><h3 className="display mt-3 text-4xl text-[#fff4df]">Shape with confidence.</h3><p className="mt-3 leading-7 text-[#b7aa99]">Use a flexible tape, a natural stance and a second person where possible. The atelier can review anything uncertain.</p></div>
              </div>
              <MeasurementGuides />
            </div>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Scissors className="text-[#e4c982]" size={34} />
              <h2 className="display mt-6 text-5xl text-[#fff4df] md:text-7xl">Craft begins with the occasion.</h2>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-[#b99858]/25 bg-[#17120e]">
                <Image src={originalSiteMedia.cuttingTable} alt="Fabric cutting and atelier table" fill sizes="40vw" className="object-cover" />
              </div>
            </div>
            <div className="grid gap-5">
              {[
                "The first decision is not the fabric. It is the entrance: ceremony, lighting, movement, photography, and cultural reference.",
                "From there, embroidery density, silhouette, rhinestone work, lining, buttons, cape length, trouser shape, and finishing are shaped around the client.",
                "Every inquiry stays direct because made-to-order garments need context that a cart cannot capture."
              ].map((copy) => (
                <p key={copy} className="border-l border-[#b99858]/45 pl-6 leading-8 text-[#b7aa99]">
                  {copy}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
