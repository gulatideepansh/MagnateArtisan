import { NextRequest, NextResponse } from "next/server";
import { resetStateFromSource } from "@/lib/staff-cms";
import { requestHasStaffSession } from "@/lib/staff-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requestHasStaffSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await resetStateFromSource());
}
