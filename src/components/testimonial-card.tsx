import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ review }: { review: Testimonial }) {
  return <article className="testimonial-card group relative flex h-full min-h-80 flex-col overflow-hidden border border-[#b99858]/20 bg-[#17120e]/72 p-6 md:p-8">
    {review.image && <div className="relative mb-6 aspect-[4/3] overflow-hidden md:mb-0"><Image src={review.image} alt="Customer review photograph" fill sizes="(max-width:768px) 90vw, 40vw" className="object-cover transition duration-700 group-hover:scale-105" unoptimized /></div>}
    <div className="flex h-full flex-col"><div className="flex items-center justify-between"><Quote className="text-[#b99858]" size={30}/><div className="flex text-[#e4c982]" aria-label={`${review.rating} out of 5 stars`}>{Array.from({length:review.rating}).map((_,i)=><Star key={i} size={14} fill="currentColor"/>)}</div></div>
    <blockquote className="display mt-7 text-2xl leading-[1.15] text-[#fff4df] md:text-3xl">“{review.quote}”</blockquote>
    <footer className="mt-auto border-t border-[#b99858]/15 pt-4"><p className="font-medium text-[#fff4df]">{review.name}</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-[#b99858]">{review.shop} · {review.date}</p></footer></div>
  </article>;
}
