import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const staffSessionCookie = "magnate_staff_session";

export function staffCredentials() {
  return {
    email: process.env.STAFF_LOGIN_EMAIL || "staff@magnate.local",
    password: process.env.STAFF_LOGIN_PASSWORD || "atelier-demo",
    token: process.env.STAFF_SESSION_SECRET || "local-prototype-session",
  };
}

export async function hasStaffSession() {
  const cookieStore = await cookies();
  return cookieStore.get(staffSessionCookie)?.value === staffCredentials().token;
}

export function requestHasStaffSession(request: NextRequest) {
  return request.cookies.get(staffSessionCookie)?.value === staffCredentials().token;
}
