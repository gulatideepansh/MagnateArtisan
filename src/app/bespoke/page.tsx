import { MessageCircle, Palette, Ruler, Timer, Upload } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { MeasurementGuides } from "@/components/measurement-guides";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { whatsappUrl } from "@/lib/whatsapp";

const steps = [
  { icon: Upload, title: "Share the reference", copy: "Choose a catalog piece, AI try-on preview, or your own inspiration images." },
  { icon: Ruler, title: "Confirm measurements", copy: "Send body measurements, fit preference, event date, and delivery country." },
  { icon: Palette, title: "Shape the craft", copy: "Discuss fabric, embroidery motifs, rhinestone level, color, lining, and finishing." },
  { icon: Timer, title: "Approve the timeline", copy: "The order continues through direct consultation rather than a generic checkout." },
];

export default function BespokePage() {
  const url = whatsappUrl(undefined, "I want to begin a bespoke Magnate Artisan order. I can share measurements, event date, inspiration images, and customization notes.");

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
                <span>AI try-on preview if generated</span>
              </div>
              <a
                id="contact"
                href={url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-[#731e31]"
              >
                <MessageCircle size={17} />
                Start on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="luxury-panel p-6">
                <step.icon className="text-[#e4c982]" size={28} />
                <h2 className="display mt-6 text-4xl text-[#f6efe3]">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#b7aa99]">{step.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 border border-[#b99858]/25 p-8 text-center">
            <p className="display text-5xl text-[#fff4df]">Want to preview first?</p>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#b7aa99]">
              Use AI try-on before opening the conversation, then attach the generated preview to the WhatsApp inquiry.
            </p>
            <ButtonLink href="/try-on" className="mt-7">
              Try a garment
            </ButtonLink>
          </div>

          <div className="mt-20">
            <SectionHeading
              title="Fitting guide animations."
              copy="The downloaded measurement WebP guides are included here so clients can prepare useful sizing notes before sending a custom inquiry."
            />
            <div className="mt-10">
              <MeasurementGuides />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
