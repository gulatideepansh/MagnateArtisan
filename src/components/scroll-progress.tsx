"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: .25 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#7b1d31] via-[#e4c982] to-[#fff4df]" style={{ scaleX }} />;
}
