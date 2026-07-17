"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { Stack } from "@/components/stack";
import type { Collection } from "@/lib/types";

export function CollectionStackHero({
  collection,
  piecesCount,
  stackImages,
}: {
  collection: Collection;
  piecesCount: number;
  stackImages: string[];
}) {
  const stageRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.48, 0.76], [1, 0.92, 0]);
  const y = useTransform(scrollYProgress, [0, 0.76], [-88, -160]);
  const scale = useTransform(scrollYProgress, [0, 0.76], [1, 0.94]);

  const cards = useMemo(
    () =>
      stackImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`${collection.name} stack image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 84vw, 42vw"
          className="object-contain"
          priority={index < 3}
        />
      )),
    [collection.name, stackImages],
  );

  return (
    <section ref={stageRef} className="relative z-10 min-h-[142svh] sm:min-h-[154svh] lg:min-h-[164svh]">
      <div className="sticky top-16 min-h-[calc(100svh-4rem)] overflow-hidden border-b border-[#b99858]/10 bg-[#050403] md:top-20 md:min-h-[calc(100svh-5rem)]">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(91,22,37,0.34),transparent_34%),linear-gradient(180deg,#050403_0%,#0b0705_54%,#050403_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050403] to-transparent" />
        <motion.div
          className="atelier-shell relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 md:min-h-[calc(100svh-5rem)] md:grid-cols-[0.78fr_1.22fr] md:py-8"
          style={prefersReducedMotion ? { opacity: 1, y: -88, scale: 1 } : { opacity, y, scale }}
        >
          <div className="relative z-10 max-w-xl pt-4 md:pt-0">
            <h1 className="display text-balance text-[4.4rem] leading-[0.9] text-[#f6efe3] sm:text-8xl lg:text-[7.2rem]">
              {collection.name}
            </h1>
            <div className="mt-7 h-px w-full max-w-[21rem] bg-gradient-to-r from-[#b99858] via-[#e4c982] to-transparent" />
            <p className="mt-7 max-w-lg text-base leading-8 text-[#d7cbbb] sm:text-lg">{collection.summary}</p>
            <p className="mt-8 text-sm uppercase tracking-[0.38em] text-[#e4c982]">{piecesCount} pieces</p>
          </div>

          <div className="relative mx-auto aspect-square w-[min(78vw,28rem)] sm:w-[min(64vw,31rem)] md:w-[min(42vw,34rem)] lg:w-[min(44vw,36rem)]">
            <div className="absolute -inset-x-10 bottom-[-10%] h-24 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72),transparent_70%)]" />
            <Stack
              cards={cards}
              randomRotation
              sensitivity={170}
              sendToBackOnClick
              autoplay={!prefersReducedMotion}
              autoplayDelay={4600}
              pauseOnHover
              mobileClickOnly
              ariaLabel={`Show next ${collection.name} stack image`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
