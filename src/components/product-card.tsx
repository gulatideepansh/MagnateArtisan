import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { shortTitle } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#17120e]">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage}
              alt={product.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 88vw, 28vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
            <span>{product.collectionName}</span>
            <span className="text-[#f6efe3]">{product.imageCount} images</span>
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
