import { NextResponse } from "next/server";
import { staffCredentials, staffSessionCookie } from "@/lib/staff-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const credentials = staffCredentials();

  if (email !== credentials.email || password !== credentials.password) {
    return NextResponse.json({ ok: false, error: "Invalid staff login." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(staffSessionCookie, credentials.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
