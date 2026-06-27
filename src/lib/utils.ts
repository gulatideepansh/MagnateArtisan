import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortTitle(title: string, max = 82) {
  if (title.length <= max) return title;
  return `${title.slice(0, max).trim()}...`;
}

export function absoluteProductUrl(slug: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://magnateartisan.com";
  return `${base.replace(/\/$/, "")}/products/${slug}`;
}
