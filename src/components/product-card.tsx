import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { shortTitle } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const previewImage = product.tryOnOutputs[0] || product.primaryImage;

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`${product.title} AI preview`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 88vw, 28vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
          ) : null}
          {product.primaryImage && previewImage !== product.primaryImage ? (
            <div className="absolute right-3 top-3 h-20 w-16 overflow-hidden border border-[#e4c982]/50 bg-[#17120e] shadow-2xl">
              <Image src={product.primaryImage} alt="" fill sizes="64px" className="object-cover" />
            </div>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
            <span>{product.collectionName}</span>
            <span className="inline-flex items-center gap-1 text-[#f6efe3]">
              <Sparkles size={13} />
              AI Preview
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="display text-2xl leading-7 text-[#f6efe3]">{shortTitle(product.title, 76)}</h3>
          <p className="text-sm text-[#b7aa99]">Starting from {product.price}</p>
        </div>
      </Link>
    </article>
  );
}
