"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Download, Loader2, MessageCircle, Sparkles, Upload } from "lucide-react";
import { products } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { whatsappUrl } from "@/lib/whatsapp";

function defaultProduct(initialSlug?: string): Product {
  return products.find((product) => product.slug === initialSlug) || products[0];
}

export function TryOnClient({ initialProductSlug }: { initialProductSlug?: string }) {
  const [selectedSlug, setSelectedSlug] = useState(defaultProduct(initialProductSlug).slug);
  const [personPreview, setPersonPreview] = useState("");
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedProduct = useMemo(() => defaultProduct(selectedSlug), [selectedSlug]);

  function onPersonChange(file?: File) {
    if (!file) return;
    setPersonFile(file);
    setResult("");
    setStatus("idle");
    setPersonPreview(URL.createObjectURL(file));
  }

  async function generate() {
    if (!personFile) {
      setStatus("error");
      setMessage("Upload a clear front-facing photo first.");
      return;
    }

    setStatus("generating");
    setMessage("Sending the garment and your photo to the local Leffa service.");

    const form = new FormData();
    form.append("personImage", personFile);
    form.append("productSlug", selectedProduct.slug);
    form.append("garmentImage", selectedProduct.aiGarmentImage);
    form.append("garmentType", selectedProduct.garmentType);
    form.append("stylePreset", "luxury_editorial");

    try {
      const response = await fetch("/api/try-on", { method: "POST", body: form });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { error: await response.text() };
      if (!response.ok) throw new Error(data.error || "Try-on generation failed.");
      setResult(data.imageUrl);
      setStatus("done");
      setMessage("AI preview generated. Use it as a visual reference for the bespoke inquiry.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Try-on generation failed.");
    }
  }

  const inquiryUrl = whatsappUrl(
    selectedProduct,
    "Please help me customize this look. I can attach my AI try-on preview in WhatsApp.",
    result || "Customer will attach generated/downloaded preview",
  );

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="luxury-panel min-w-0 p-5">
        <label className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Select garment</label>
        <select
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
          className="mt-3 w-full min-w-0 truncate border border-white/10 bg-black/45 px-4 py-3 text-[#f6efe3] outline-none focus:border-[#e4c982]"
        >
          {products.map((product) => (
            <option key={product.slug} value={product.slug} className="bg-[#080604]">
              {product.title}
            </option>
          ))}
        </select>

        <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#17120e]">
            {selectedProduct.primaryImage ? (
              <Image src={selectedProduct.primaryImage} alt={selectedProduct.title} fill sizes="45vw" className="object-cover" />
            ) : null}
          </div>
          <label className="relative flex aspect-[4/5] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-[#b99858]/45 bg-black/30 p-6 text-center transition hover:border-[#e4c982]">
            {personPreview ? (
              <Image src={personPreview} alt="Uploaded person preview" fill sizes="45vw" className="object-cover" unoptimized />
            ) : (
              <>
                <Upload className="mb-4 text-[#e4c982]" />
                <span className="text-sm uppercase tracking-[0.16em] text-[#fff4df]">Upload your photo</span>
                <span className="mt-3 text-sm leading-6 text-[#b7aa99]">Use a clear full or half-body image for best results.</span>
              </>
            )}
            <input type="file" accept="image/*" className="sr-only" onChange={(event) => onPersonChange(event.target.files?.[0])} />
          </label>
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={status === "generating"}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#b99858] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#080604] transition hover:bg-[#e4c982] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "generating" ? <Loader2 className="animate-spin" size={17} /> : <Sparkles size={17} />}
          Generate AI Try-On
        </button>
        {message ? <p className="mt-4 text-sm leading-6 text-[#d7cbbb]">{message}</p> : null}
      </div>

      <div className="luxury-panel relative min-w-0 overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-x-6 top-6 h-px bg-[#e4c982]/40 scan-line" />
        <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#100d0a]">
          {result ? (
            <Image src={result} alt="Generated AI try-on result" fill sizes="50vw" className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <Sparkles className="mb-5 text-[#e4c982]" size={38} />
              <p className="display text-4xl text-[#f6efe3]">Your virtual fitting appears here</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#b7aa99]">
                Leffa runs as a separate local GPU service. When it is online, this panel returns the generated preview.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {result ? (
            <a
              href={result}
              download
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border border-[#b99858]/45 px-5 text-sm uppercase tracking-[0.16em] text-[#fff4df] hover:border-[#e4c982]"
            >
              <Download size={17} />
              Download
            </a>
          ) : null}
          <a
            href={inquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm uppercase tracking-[0.16em] text-[#fff4df] hover:bg-[#731e31]"
          >
            <MessageCircle size={17} />
            Send Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}
