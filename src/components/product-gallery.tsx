"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

export function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const rotateX = useTransform(tiltY, [-.5, .5], [2.2, -2.2]);
  const rotateY = useTransform(tiltX, [-.5, .5], [-2.2, 2.2]);
  const spotlightBackground = useTransform([pointerX, pointerY], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,240,195,.24), transparent 55%)`);
  const active = images[activeIndex] || "";

  const goToPrevious = useCallback(() => setActiveIndex((index) => images.length ? (index - 1 + images.length) % images.length : 0), [images.length]);
  const goToNext = useCallback(() => setActiveIndex((index) => images.length ? (index + 1) % images.length : 0), [images.length]);

  useEffect(() => {
    if (!isPreviewOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", handleKeyDown); };
  }, [goToNext, goToPrevious, isPreviewOpen]);

  function handlePointer(event: MouseEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || reduce) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set(x * 100); pointerY.set(y * 100); tiltX.set(x - .5); tiltY.set(y - .5);
  }

  const tiles = images.slice(1, 5);
  return <div className="product-gallery grid gap-4">
    <motion.div ref={stageRef} onMouseMove={handlePointer} onMouseLeave={() => { tiltX.set(0); tiltY.set(0); }} className="relative" style={reduce ? undefined : { perspective: 1200 }}>
      <motion.div className="grid min-h-[68svh] grid-cols-2 grid-rows-4 gap-3 md:grid-cols-12 md:grid-rows-2" style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <button type="button" onClick={() => active && setIsPreviewOpen(true)} className="group relative col-span-2 row-span-3 overflow-hidden bg-[#17120e] text-left md:col-span-8 md:row-span-2" aria-label="Open image previewer">
          <AnimatePresence mode="popLayout" initial={false}>{active && <motion.div key={active} className="absolute inset-0" initial={reduce ? false : { opacity: 0, scale: 1.035, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .65, ease: [0.22,1,0.36,1] }}><Image src={active} alt={title} fill priority sizes="(max-width:768px) 100vw, 62vw" className="object-cover"/></motion.div>}</AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-black/10"/>
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlightBackground }}/>
          <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.24em] text-[#fff4df]">Image {String(activeIndex+1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span>
          <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center border border-[#e4c982]/45 bg-black/50 text-[#fff4df] backdrop-blur transition group-hover:rotate-6 group-hover:border-[#e4c982]"><Maximize2 size={18}/></span>
        </button>
        {tiles.map((image, index) => <motion.button key={image} type="button" onClick={() => setActiveIndex(index+1)} className={`group relative overflow-hidden border bg-[#17120e] md:col-span-4 ${index < 2 ? "" : "hidden"} ${activeIndex===index+1 ? "border-[#e4c982]" : "border-[#b99858]/15"}`} whileHover={reduce ? undefined : { scale: .985 }} aria-label={`View image ${index+2}`}>
          <Image src={image} alt="" fill sizes="(max-width:768px) 50vw, 30vw" className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/><span className="absolute bottom-3 left-3 font-mono text-[10px] text-[#e4c982]">0{index+2}</span>
        </motion.button>)}
      </motion.div>
    </motion.div>
    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">{images.map((image,index)=><button key={image} type="button" onClick={() => setActiveIndex(index)} className={`relative h-20 w-16 shrink-0 overflow-hidden border transition md:h-24 md:w-20 ${activeIndex===index ? "border-[#e4c982] opacity-100" : "border-white/10 opacity-55 hover:opacity-100"}`} aria-label={`View image ${index+1}`}><Image src={image} alt="" fill sizes="80px" className="object-cover"/></button>)}</div>

    {isPreviewOpen && <motion.div className="fixed inset-0 z-[80] grid bg-black/95 p-4 backdrop-blur-xl md:p-8" role="dialog" aria-modal="true" aria-label="Image previewer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <button type="button" onClick={() => setIsPreviewOpen(false)} className="absolute right-4 top-4 z-20 grid h-12 w-12 place-items-center border border-white/20 bg-black/60 text-white hover:border-[#e4c982]" aria-label="Close image previewer"><X/></button>
      {images.length>1 && <><button type="button" onClick={goToPrevious} className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/20 bg-black/60 text-white hover:border-[#e4c982]" aria-label="Previous image"><ChevronLeft/></button><button type="button" onClick={goToNext} className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/20 bg-black/60 text-white hover:border-[#e4c982]" aria-label="Next image"><ChevronRight/></button></>}
      <div className="relative min-h-0"><AnimatePresence mode="wait"><motion.div key={active} className="absolute inset-0" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}}><Image src={active} alt={`${title} image ${activeIndex+1}`} fill priority sizes="100vw" className="object-contain"/></motion.div></AnimatePresence></div>
    </motion.div>}
  </div>;
}
