import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";

export function AiPreviewStrip({ product }: { product: Product }) {
  const previews = product.tryOnOutputs.filter(Boolean);
  if (!previews.length) return null;

  return (
    <section className="mt-10 border border-[#e4c982]/20 bg-black/18 p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#e4c982]">
            <Sparkles size={14} />
            AI editorial previews
          </p>
          <p className="mt-2 text-sm leading-6 text-[#b7aa99]">
            Generated stock-model references for proportion and styling. Real catalog photography remains the tailoring source of truth.
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-[#d7cbbb]">{previews.length} generated</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {previews.map((preview, index) => (
          <div key={preview} className="relative aspect-[3/4] overflow-hidden bg-[#17120e]">
            <Image
              src={preview}
              alt={`${product.title} AI editorial preview ${index + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 24vw"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 bg-black/68 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#e4c982]">
              AI Preview {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
