"use client";

import { useEffect, useRef, useState } from "react";

const achievements = [
  { value: 100, suffix: "%", label: "Handcrafted Precision" },
  { value: 1200, suffix: "+", label: "Satisfied Clients" },
  { value: 50, suffix: "+", label: "Fabrics & Customization" },
  { value: 20, suffix: "+", label: "Years of Experience" },
];

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function CountUpNumber({ start, value, suffix }: { start: boolean; value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const hasRunRef = useRef(false);

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
  }, [start, value]);

  return (
    <span aria-label={`${formatCount(value)}${suffix}`}>
      {formatCount(count)}
      {suffix}
    </span>
  );
}

export function AchievementCounts() {
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setStartCounting(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-[#b99858]/16 bg-[#0b0806] py-18">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e4c982]/42 to-transparent" />
      <div className="atelier-shell">
        <div className="mb-9 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#e4c982]">Our Achievements</p>
          <h2 className="display mt-3 text-4xl text-[#fff4df] md:text-5xl">Proof in every fitting.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {achievements.map((item) => (
            <article
              key={item.label}
              className="border border-[#b99858]/24 bg-[#17120e]/78 px-6 py-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
            >
              <p className="font-mono text-5xl font-semibold tracking-normal text-[#fff4df] md:text-6xl">
                <CountUpNumber start={startCounting} value={item.value} suffix={item.suffix} />
              </p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.13em] text-[#d7cbbb]">{item.label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
