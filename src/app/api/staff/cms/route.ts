import { NextRequest, NextResponse } from "next/server";
import { readState, writeState } from "@/lib/staff-cms";
import { requestHasStaffSession } from "@/lib/staff-auth";
import type { StaffCmsState } from "@/lib/staff-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!requestHasStaffSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await readState());
}

export async function PUT(request: NextRequest) {
  if (!requestHasStaffSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const state = (await request.json()) as StaffCmsState;
  return NextResponse.json(await writeState(state));
}
