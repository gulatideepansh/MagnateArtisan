import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StitchOverlay } from "@/components/stitch-overlay";
import { TestimonialCard } from "@/components/testimonial-card";
import { ReviewWall } from "@/components/review-wall";
import { getTestimonials } from "@/lib/etsy-reviews";
import { originalSiteMedia } from "@/lib/media-curation";

export const metadata: Metadata = { title: "Client Stories | Magnate Artisan", description: "Verified Etsy reviews and client stories about Magnate Artisan bespoke design, communication, fit and craftsmanship." };

export default async function TestimonialsPage() {
  const { reviews, live } = await getTestimonials();
  const average = reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  return <><SiteHeader/><main className="overflow-hidden pt-24">
    <section className="relative min-h-[78vh] overflow-hidden py-20"><Image src={originalSiteMedia.atelierRoom} alt="" fill priority sizes="100vw" className="object-cover opacity-25"/><div className="absolute inset-0 bg-gradient-to-r from-[#070604] via-[#070604]/86 to-[#070604]/35"/><StitchOverlay className="opacity-55"/><div className="atelier-shell relative flex min-h-[60vh] items-end"><Reveal><p className="eyebrow">Client stories</p><h1 className="display mt-5 max-w-5xl text-6xl leading-[.86] text-[#fff4df] md:text-9xl">Made personal.<br/><em className="text-[#e4c982]">Remembered publicly.</em></h1><div className="mt-9 flex flex-wrap gap-8 text-sm uppercase tracking-[.16em] text-[#b7aa99]"><span><strong className="mr-2 font-mono text-3xl text-[#fff4df]">{average.toFixed(1)}</strong> average rating</span><span><strong className="mr-2 font-mono text-3xl text-[#fff4df]">{reviews.length}</strong> stories shown</span><span className={live ? "text-emerald-300" : "text-[#e4c982]"}>● {live ? "Synced from Etsy" : "Curated Etsy highlights"}</span></div></Reveal></div></section>
    <ReviewWall reviews={reviews}/>
    <section className="atelier-shell py-24"><div className="mb-12 grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end"><div><p className="eyebrow">Read them slowly</p><h2 className="display mt-4 text-5xl leading-none text-[#fff4df] md:text-7xl">The stories behind the stars.</h2></div><p className="leading-7 text-[#b7aa99]">A quieter edit of the same public feedback—balanced, readable and never stretched beyond the words it contains.</p></div><div className="testimonial-grid grid gap-5 md:grid-cols-2 xl:grid-cols-3">{reviews.map((review,index)=><Reveal key={review.id} delay={(index%3)*.06}><TestimonialCard review={review}/></Reveal>)}</div></section>
    <section className="relative border-y border-[#b99858]/20 py-24 text-center"><StitchOverlay className="opacity-40"/><Reveal className="atelier-shell relative"><p className="eyebrow">Your story starts with a brief</p><h2 className="display mx-auto mt-5 max-w-3xl text-5xl leading-none text-[#fff4df] md:text-7xl">Let the next entrance be yours.</h2><div className="mt-8 flex flex-wrap justify-center gap-4"><a href="/byo" className="atelier-button">Build your own <ArrowUpRight size={17}/></a><a href="https://www.etsy.com/au/shop/MagnateArtisan?section_id=reviews" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-[#b99858]/40 px-5 text-xs uppercase tracking-[.15em] text-[#fff4df]">See Etsy <ArrowUpRight size={17}/></a></div></Reveal></section>
  </main><SiteFooter/></>;
}
