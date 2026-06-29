import { NextResponse } from "next/server";
import { staffSessionCookie } from "@/lib/staff-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(staffSessionCookie, "", { path: "/", maxAge: 0 });
  return response;
}
