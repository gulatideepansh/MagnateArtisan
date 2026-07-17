import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/etsy-reviews";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(await getTestimonials(), { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
