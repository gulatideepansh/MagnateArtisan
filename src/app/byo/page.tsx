import Image from "next/image";
import type { Metadata } from "next";
import { ByoStudio } from "@/components/byo-studio";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { originalSiteMedia } from "@/lib/media-curation";

export const metadata: Metadata = { title: "Build Your Own | Magnate Artisan", description: "Turn your references, colours and occasion into a structured bespoke commission." };

export default function ByoPage() { return <><SiteHeader/><main className="overflow-hidden pt-32"><section className="relative min-h-[72vh] py-16"><StitchOverlay className="opacity-50"/><div className="atelier-shell relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><Reveal><p className="eyebrow">Build your own</p><h1 className="display mt-5 text-6xl leading-[.88] text-[#fff4df] md:text-8xl">Your idea.<br/><em className="text-[#e4c982]">Our hands.</em></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#b7aa99]">Shape a silhouette, palette and finish. We turn the choices into a precise atelier conversation.</p></Reveal><Reveal className="relative aspect-[4/5] overflow-hidden border border-[#b99858]/25" delay={.12}><Image src={originalSiteMedia.stylingSession} alt="Fashion styling consultation" fill priority sizes="(max-width:1024px) 92vw, 55vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/></Reveal></div></section><section className="atelier-shell py-20"><ByoStudio/></section><section className="atelier-shell grid gap-5 pb-24 md:grid-cols-2"><Reveal className="relative aspect-[4/3] overflow-hidden"><Image src={originalSiteMedia.phoneSketch} alt="Digital fashion sketch" fill sizes="50vw" className="object-cover"/><span className="image-caption">01 / Sketch the possibility</span></Reveal><Reveal className="relative aspect-[4/3] overflow-hidden" delay={.12}><Image src={originalSiteMedia.tailoringCuffs} alt="Finished embroidered garment details" fill sizes="50vw" className="object-cover"/><span className="image-caption">02 / Craft the reality</span></Reveal></section></main><SiteFooter/></>; }
