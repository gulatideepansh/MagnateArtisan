import { NextRequest, NextResponse } from "next/server";
import { requestHasStaffSession } from "@/lib/staff-auth";
import { saveUpload } from "@/lib/staff-cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requestHasStaffSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const files = form.getAll("files").filter((item): item is File => item instanceof File);
  const uploaded = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      continue;
    }
    uploaded.push(await saveUpload(file));
  }

  return NextResponse.json({ uploaded });
}
