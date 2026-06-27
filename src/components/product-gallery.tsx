"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const active = images[activeIndex] || "";

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (images.length ? (index - 1 + images.length) % images.length : 0));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (images.length ? (index + 1) % images.length : 0));
  }, [images.length]);

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

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, isPreviewOpen]);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={() => active && setIsPreviewOpen(true)}
        className="group relative aspect-[4/5] overflow-hidden bg-[#17120e] text-left"
        aria-label="Open image previewer"
      >
        {active ? (
          <Image src={active} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
        ) : null}
        <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center border border-[#e4c982]/45 bg-black/58 text-[#fff4df] opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={18} />
        </span>
      </button>
      <div className="grid grid-cols-5 gap-3 md:grid-cols-7">
        {images.slice(0, 14).map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden border transition ${
              active === image ? "border-[#e4c982]" : "border-white/10 hover:border-[#b99858]"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={image} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      {isPreviewOpen ? (
        <div className="fixed inset-0 z-50 grid bg-black/94 p-4 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true" aria-label="Image previewer">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black/62 text-[#fff4df] transition hover:border-[#e4c982]"
            aria-label="Close image previewer"
          >
            <X size={20} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/62 text-[#fff4df] transition hover:border-[#e4c982]"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/62 text-[#fff4df] transition hover:border-[#e4c982]"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : null}

          <div className="grid min-h-0 grid-rows-[1fr_auto] gap-4">
            <div className="relative min-h-0">
              {active ? (
                <Image
                  src={active}
                  alt={`${title} image ${activeIndex + 1}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              ) : null}
            </div>
            <div className="mx-auto flex max-w-full items-center gap-2 overflow-x-auto border border-white/10 bg-black/46 p-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden border transition md:h-20 md:w-20 ${
                    activeIndex === index ? "border-[#e4c982]" : "border-white/15 hover:border-[#b99858]"
                  }`}
                  aria-label={`Preview image ${index + 1}`}
                >
                  <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
