import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collectionCoverMedia } from "@/lib/media-curation";
import type { Collection } from "@/lib/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  const coverImage = collectionCoverMedia[collection.slug] || collection.coverImage;

  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <article className="relative min-h-[410px] overflow-hidden border border-white/10 bg-[#17120e]">
        {coverImage ? (
          <>
            <Image
              src={coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              className="scale-105 object-cover opacity-20 blur-md"
              aria-hidden="true"
            />
            <div className="absolute inset-x-3 top-3 bottom-36 overflow-hidden">
              <Image
                src={coverImage}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                className="object-contain object-center opacity-88 transition duration-700 group-hover:scale-[1.015] group-hover:opacity-100"
              />
            </div>
          </>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-[#050403]/68 to-black/18" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="mb-4 h-px w-20 bg-[#b99858]" />
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">{collection.count} pieces</p>
              <h2 className="display mt-2 text-4xl text-[#fff4df]">{collection.name}</h2>
            </div>
            <ArrowUpRight className="mb-2 text-[#e4c982] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d7cbbb]">{collection.summary}</p>
        </div>
      </article>
    </Link>
  );
}
