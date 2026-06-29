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

export function moneyValue(price: string | number) {
  const numeric = typeof price === "number" ? price : Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatMoney(price: string | number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(moneyValue(price));
}

export function discountedPrice(
  price: string | number,
  discountType?: "none" | "percent" | "amount",
  discountValue = 0,
) {
  const base = moneyValue(price);
  if (!discountType || discountType === "none" || discountValue <= 0) return base;
  if (discountType === "percent") return Math.max(0, base - base * (discountValue / 100));
  return Math.max(0, base - discountValue);
}

export function hasDiscount(discountType?: "none" | "percent" | "amount", discountValue = 0) {
  return Boolean(discountType && discountType !== "none" && discountValue > 0);
}
