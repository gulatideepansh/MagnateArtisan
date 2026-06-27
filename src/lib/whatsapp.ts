import type { Product } from "@/lib/types";
import { absoluteProductUrl } from "@/lib/utils";

const fallbackNumber = "61400000000";

export function whatsappUrl(product?: Product, customNote?: string, tryOnReference?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || fallbackNumber;
  const lines = [
    "Hello Magnate Artisan,",
    "",
    product
      ? `I am interested in: ${product.title}`
      : "I would like to begin a bespoke order.",
    product ? `Product page: ${absoluteProductUrl(product.slug)}` : "",
    product ? `Listed price: ${product.price}` : "",
    tryOnReference ? `AI try-on reference: ${tryOnReference}` : "",
    "",
    customNote || "Please help me with sizing, customization, embroidery options, and delivery timing.",
  ].filter(Boolean);

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
