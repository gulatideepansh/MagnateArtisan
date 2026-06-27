import catalog from "@/data/catalog.json";
import collections from "@/data/collections.json";
import siteMedia from "@/data/site-media.json";
import type { Collection, MeasurementGuide, Product, SiteMedia } from "@/lib/types";

export const products = catalog as Product[];
export const collectionList = collections as Collection[];
export const media = siteMedia as SiteMedia;

function guideLabel(src: string) {
  const file = src.split("/").pop() || "";
  return file
    .replace(/^Measure-Yourself-Guide-/, "")
    .replace(/^Womens-/, "Women's ")
    .replace(/__.*$/, "")
    .replace(/_.*$/, "")
    .replace(/-/g, " ")
    .replace(/\br\b/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const measurementGuides = media.images
  .filter((item) => /Measure-Yourself-Guide|Womens-/i.test(item.src))
  .map((item): MeasurementGuide => ({
    label: guideLabel(item.src),
    src: item.src,
    audience: /Womens-/i.test(item.src) ? "women" : "men",
  }));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collectionList.find((collection) => collection.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((product) => product.collection === slug);
}

export function featuredProducts(limit = 8) {
  return products
    .filter((product) => product.primaryImage)
    .slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.collection === product.collection && candidate.slug !== product.slug)
    .slice(0, limit);
}

export function findProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;
  return products.filter((product) => {
    const text = `${product.title} ${product.collectionName} ${product.price}`.toLowerCase();
    return text.includes(needle);
  });
}
