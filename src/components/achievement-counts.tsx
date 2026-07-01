"use client";

import { useEffect, useRef, useState } from "react";

type Achievement =
  | { kind: "count" | "fabric"; value: number; suffix: string; label: string }
  | { kind: "typing"; label: string };

const achievements: Achievement[] = [
  { kind: "count", value: 100, suffix: "%", label: "Handcrafted Precision" },
  { kind: "count", value: 1200, suffix: "+", label: "Satisfied Clients" },
  { kind: "fabric", value: 200, suffix: "+", label: "Fabrics" },
  { kind: "typing", label: "Customisation Options" },
  { kind: "count", value: 20, suffix: "+", label: "Years of Experience" },
];

const customisationOptions = [
  "Embroidery",
  "Rhinestones",
  "Cape Details",
  "Lining",
  "Monogram",
  "Buttons",
  "Fringe",
  "Motifs",
  "Colourway",
  "Silhouette",
];

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function CountUpNumber({
  colorize = false,
  start,
  suffix,
  value,
}: {
  colorize?: boolean;
  start: boolean;
  suffix: string;
  value: number;
}) {
  const [count, setCount] = useState(0);
  const hasRunRef = useRef(false);
  const hue = (count * 137) % 360;
  const colorStyle = colorize
    ? {
        color: `hsl(${hue} 82% 74%)`,
        textShadow: `0 0 22px hsl(${hue} 82% 54% / 0.18)`,
      }
    : undefined;

  useEffect(() => {
    if (!start || hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const timeout = window.setTimeout(() => {
        setCount(value);
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    if (colorize) {
      let next = 0;
      const interval = window.setInterval(() => {
        next += 1;
        setCount(next);

        if (next >= value) {
          window.clearInterval(interval);
        }
      }, 8);

      return () => window.clearInterval(interval);
    }

    const duration = 1500;
    const startedAt = performance.now();

    const interval = window.setInterval(() => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress >= 1) {
        window.clearInterval(interval);
      }
    }, 16);

    return () => window.clearInterval(interval);
  }, [colorize, start, value]);

  return (
    <span aria-label={`${formatCount(value)}${suffix}`} style={colorStyle}>
      {formatCount(count)}
      {suffix}
    </span>
  );
}

function EndlessCustomisationType({ start }: { start: boolean }) {
  const [optionIndex, setOptionIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const timeout = window.setTimeout(() => {
        setLetterCount(customisationOptions[0].length);
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    const currentOption = customisationOptions[optionIndex];
    const isComplete = letterCount === currentOption.length;
    const isEmpty = letterCount === 0;
    const delay = isComplete && !isDeleting ? 920 : isEmpty && isDeleting ? 180 : isDeleting ? 46 : 72;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setOptionIndex((index) => (index + 1) % customisationOptions.length);
        return;
      }

      setLetterCount((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, letterCount, optionIndex, start]);

  const text = start ? customisationOptions[optionIndex].slice(0, Math.max(1, letterCount)) : "";

  return (
    <span className="inline-flex min-h-[1.15em] items-center justify-center text-[#fff4df]" aria-label="Endless customisation options">
      <span>{text || "\u00a0"}</span>
      <span className="ml-1 h-[0.9em] w-px animate-pulse bg-[#e4c982]" aria-hidden="true" />
    </span>
  );
}

export function AchievementCounts() {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      const timeout = globalThis.setTimeout(() => setStartCounting(true), 0);
      return () => globalThis.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStartCounting(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-[#b99858]/16 bg-[#0b0806] py-18">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e4c982]/42 to-transparent" />
      <div className="atelier-shell">
        <div className="mb-9 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#e4c982]">Our Achievements</p>
          <h2 className="display mt-3 text-4xl text-[#fff4df] md:text-5xl">Proof in every fitting.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {achievements.map((item) => (
            <article
              key={item.label}
              className="border border-[#b99858]/24 bg-[#17120e]/78 px-6 py-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
            >
              <p className="font-mono text-5xl font-semibold tracking-normal text-[#fff4df] md:text-6xl lg:text-5xl xl:text-6xl">
                {item.kind === "typing" ? (
                  <span className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                    <EndlessCustomisationType start={startCounting} />
                  </span>
                ) : (
                  <CountUpNumber
                    colorize={item.kind === "fabric"}
                    start={startCounting}
                    value={item.value}
                    suffix={item.suffix}
                  />
                )}
              </p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.13em] text-[#d7cbbb]">{item.label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
