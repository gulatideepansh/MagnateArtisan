import { NextResponse } from "next/server";

export const runtime = "nodejs";

const garmentTypes = new Set(["upper_body", "lower_body", "dresses"]);

export async function POST(request: Request) {
  try {
    const leffaUrl = process.env.LEFFA_API_URL;
    if (!leffaUrl) {
      return NextResponse.json(
        {
          error:
            "LEFFA_API_URL is not configured. Start the local Leffa service first, then set LEFFA_API_URL to its /try-on endpoint.",
        },
        { status: 503 },
      );
    }

    const input = await request.formData();
    const personImage = input.get("personImage");
    const productSlug = String(input.get("productSlug") || "");
    const garmentImage = String(input.get("garmentImage") || "");
    const garmentType = String(input.get("garmentType") || "");

    if (!(personImage instanceof File)) {
      return NextResponse.json({ error: "Missing uploaded person image." }, { status: 400 });
    }

    if (!garmentImage.startsWith("/")) {
      return NextResponse.json({ error: "Missing selected garment image." }, { status: 400 });
    }

    if (!garmentTypes.has(garmentType)) {
      return NextResponse.json({ error: "Unknown garment type selected for try-on." }, { status: 400 });
    }

    const garmentResponse = await fetch(new URL(garmentImage, request.url));
    if (!garmentResponse.ok) {
      return NextResponse.json({ error: "Could not load selected garment image." }, { status: 400 });
    }

    const garmentBuffer = await garmentResponse.arrayBuffer();
    const outgoing = new FormData();
    outgoing.append("personImage", personImage);
    outgoing.append("garmentImage", new Blob([garmentBuffer]), garmentImage.split("/").pop() || "garment.jpg");
    outgoing.append("garmentType", garmentType);
    outgoing.append("stylePreset", String(input.get("stylePreset") || "luxury_editorial"));
    outgoing.append("seed", String(input.get("seed") || "42"));
    outgoing.append("productSlug", productSlug);

    const response = await fetch(leffaUrl, {
      method: "POST",
      body: outgoing,
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) {
      const errorText = contentType.includes("application/json")
        ? JSON.stringify(await response.json())
        : await response.text();
      return NextResponse.json({ error: `Leffa service failed: ${errorText}` }, { status: response.status });
    }

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json({
        imageUrl: data.imageUrl || data.output || data.result,
        status: data.status || "done",
      });
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const base64 = imageBuffer.toString("base64");
    return NextResponse.json({
      imageUrl: `data:${contentType || "image/png"};base64,${base64}`,
      status: "done",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown Leffa connection error";
    return NextResponse.json(
      {
        error: `Could not reach the local Leffa service. Check that LEFFA_API_URL is correct and that Leffa is running. Details: ${detail}`,
      },
      { status: 503 },
    );
  }
}
