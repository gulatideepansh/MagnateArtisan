"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Star } from "lucide-react";
import { useRef } from "react";
import type { Testimonial } from "@/data/testimonials";

const laneCount = 4;
const cardsPerLane = 24;

export function ReviewWall({ reviews }: { reviews: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return <section ref={sectionRef} className="relative overflow-hidden border-y border-[#b99858]/15 bg-[radial-gradient(circle_at_20%_20%,rgba(123,29,49,.12),transparent_30rem),linear-gradient(180deg,#080604,#0d0907_50%,#080604)] py-20">
    <div className="atelier-shell mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div><p className="eyebrow">The public proof</p><h2 className="display mt-4 max-w-3xl text-5xl leading-none text-[#fff4df] md:text-7xl">A hundred windows into the experience.</h2></div>
      <p className="max-w-md text-sm leading-7 text-[#b7aa99]">The wall moves gently on its own, then follows your scroll. Live Etsy reviews replace the curated set automatically when API access is configured.</p>
    </div>
    <div className="grid gap-4" aria-label="Animated customer review wall">
      {Array.from({ length: laneCount }).map((_, lane) => <ReviewLane key={lane} lane={lane} reviews={reviews} progress={scrollYProgress} reduce={Boolean(reduce)} />)}
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070604] to-transparent md:w-56"/><div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070604] to-transparent md:w-56"/>
  </section>;
}

function ReviewLane({ lane, reviews, progress, reduce }: { lane: number; reviews: Testimonial[]; progress: ReturnType<typeof useScroll>["scrollYProgress"]; reduce: boolean }) {
  const direction = lane % 2 === 0 ? 1 : -1;
  const scrollX = useTransform(progress, [0, 1], [`${-7 * direction}vw`, `${7 * direction}vw`]);
  const base = Array.from({ length: cardsPerLane / 2 }, (_, index) => reviews[(index + lane * 2) % reviews.length]);
  const cards = [...base, ...base];
  return <motion.div className="w-max will-change-transform" style={reduce ? undefined : { x: scrollX }} data-review-lane={lane}>
    <motion.div
      className="flex w-max gap-4 pl-4 will-change-transform"
      animate={reduce ? undefined : { x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={reduce ? undefined : { duration: 46 + lane * 7, ease: "linear", repeat: Infinity }}
      data-review-track={lane}
    >
      {cards.map((review, index) => <article key={`${lane}-${index}-${review.id}`} className="min-h-[190px] w-[280px] flex-none border border-[#b99858]/20 bg-[#17120e]/80 p-5 shadow-[inset_0_1px_rgba(255,255,255,.025),0_18px_50px_rgba(0,0,0,.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#e4c982]/55 hover:bg-[#1f1812] sm:w-[320px]" data-review-card aria-hidden={index >= base.length}>
        <div className="flex items-center justify-between"><div className="flex text-[#e4c982]">{Array.from({ length: review.rating }).map((__, star) => <Star key={star} size={11} fill="currentColor"/>)}</div><span className="text-[9px] uppercase tracking-[.18em] text-[#8f8271]">Etsy</span></div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#d7cbbb]">“{review.quote}”</p>
        <p className="mt-5 border-t border-[#b99858]/12 pt-3 text-[10px] uppercase tracking-[.16em] text-[#b99858]">{review.name} · {review.shop}</p>
      </article>)}
    </motion.div>
  </motion.div>;
}
