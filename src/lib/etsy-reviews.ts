import "server-only";
import { fallbackTestimonials, type Testimonial } from "@/data/testimonials";

type EtsyReview = { listing_id: number; rating: number; review: string; created_timestamp?: number; create_timestamp?: number; image_url_fullxfull?: string };

async function reviewsForShop(shopId: string, shop: string, key: string): Promise<Testimonial[]> {
  const response = await fetch(`https://openapi.etsy.com/v3/application/shops/${shopId}/reviews?limit=100`, {
    headers: { "x-api-key": key },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`Etsy reviews request failed: ${response.status}`);
  const payload = await response.json() as { results?: EtsyReview[] };
  return (payload.results || []).filter((review) => review.review?.trim()).map((review, index) => ({
    id: `${shopId}-${review.listing_id}-${review.created_timestamp || review.create_timestamp || index}`,
    name: "Verified Etsy buyer",
    shop,
    date: new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" }).format(new Date((review.created_timestamp || review.create_timestamp || 0) * 1000)),
    rating: review.rating,
    quote: review.review,
    image: review.image_url_fullxfull,
    live: true,
  }));
}

export async function getTestimonials(): Promise<{ reviews: Testimonial[]; live: boolean }> {
  const key = process.env.ETSY_API_KEY;
  const shops = [
    [process.env.ETSY_MAGNATE_SHOP_ID, "MagnateArtisan"],
    [process.env.ETSY_STUDIO_SHOP_ID, "MagnateArtisanStudio"],
  ] as const;
  if (!key || shops.every(([id]) => !id)) return { reviews: fallbackTestimonials, live: false };
  try {
    const requests = shops.flatMap(([id, name]) => id ? [reviewsForShop(id, name, key)] : []);
    const reviews = (await Promise.all(requests)).flat().sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    return reviews.length ? { reviews, live: true } : { reviews: fallbackTestimonials, live: false };
  } catch {
    return { reviews: fallbackTestimonials, live: false };
  }
}
