"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trustMedia } from "@/lib/media-curation";
import { cn } from "@/lib/utils";

export function CapabilityRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;

    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth * 0.78 : rail.clientWidth * 0.78,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-y border-[#b99858]/15 bg-black/32 py-8">
      <div className="atelier-shell relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070604] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070604] to-transparent" />

        <ScrollButton
          direction="left"
          disabled={!canScrollLeft}
          onClick={() => scrollRail("left")}
        />
        <ScrollButton
          direction="right"
          disabled={!canScrollRight}
          onClick={() => scrollRail("right")}
        />

        <div
          ref={railRef}
          data-capability-rail="true"
          className="overflow-x-auto px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max gap-8">
            {trustMedia.map((item) => (
              <article key={item.title} className="grid w-[300px] shrink-0 grid-cols-[72px_1fr] items-center gap-4">
                <div className="relative aspect-square overflow-hidden border border-dashed border-[#b99858]/28 bg-[#17120e]/72">
                  {item.src ? <Image src={item.src} alt="" fill sizes="72px" className="object-cover" /> : null}
                </div>
                <div>
                  <h2 className="text-sm uppercase tracking-[0.16em] text-[#f6efe3]">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#b7aa99]">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={`Scroll capability rail ${direction}`}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#b99858]/45 bg-[#0b0806]/88 text-[#e4c982] shadow-[0_12px_34px_rgba(0,0,0,0.42)] backdrop-blur transition hover:border-[#e4c982] hover:bg-[#17120e] focus:outline-none focus:ring-2 focus:ring-[#e4c982]/70 active:scale-95",
        direction === "left" ? "left-0" : "right-0",
        disabled && "cursor-default opacity-35 hover:border-[#b99858]/45 hover:bg-[#0b0806]/88 active:scale-100",
      )}
    >
      <Icon size={18} strokeWidth={1.8} />
    </button>
  );
}
