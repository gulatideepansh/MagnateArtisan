export type CollectionStackSlug =
  | "rococo"
  | "mariachi"
  | "matador"
  | "country-western"
  | "womens-couture"
  | "wedding-festive"
  | "bespoke-custom";

function images(slug: CollectionStackSlug, order: number[]) {
  return order.map((index) => `/collection-stack/${slug}/image-${String(index).padStart(2, "0")}.webp`);
}

export const collectionStackImages: Record<CollectionStackSlug, string[]> = {
  rococo: images("rococo", [3, 2, 7, 5, 6, 4, 1, 8]),
  mariachi: images("mariachi", [1, 4, 5, 2, 3, 7, 8, 6]),
  matador: images("matador", [2, 3, 4, 5, 6, 8, 1, 7]),
  "country-western": images("country-western", [1, 2, 7, 8, 3, 4, 5, 6]),
  "womens-couture": images("womens-couture", [1, 6, 7, 8, 4, 5, 2, 3]),
  "wedding-festive": images("wedding-festive", [1, 2, 7, 3, 6, 4, 5, 8]),
  "bespoke-custom": images("bespoke-custom", [3, 4, 5, 6, 7, 8, 1, 2]),
};

export function getCollectionStackImages(slug: string) {
  return collectionStackImages[slug as CollectionStackSlug] || [];
}
