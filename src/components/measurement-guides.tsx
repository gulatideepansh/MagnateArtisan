import Image from "next/image";
import { measurementGuides } from "@/lib/catalog";

export function MeasurementGuides() {
  const visibleGuides = measurementGuides.slice(0, 12);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleGuides.map((guide) => (
        <article key={guide.src} className="luxury-panel overflow-hidden">
          <div className="relative aspect-[4/3] bg-[#100d0a]">
            <Image
              src={guide.src}
              alt={`${guide.label} measurement guide`}
              fill
              sizes="(max-width: 768px) 90vw, 32vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#e4c982]">{guide.audience}</p>
            <h3 className="display mt-2 text-3xl text-[#f6efe3]">{guide.label}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
