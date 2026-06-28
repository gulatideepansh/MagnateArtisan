"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

type InquiryState = {
  name: string;
  occasion: string;
  eventDate: string;
  location: string;
  reference: string;
  measurements: string;
  colors: string;
  notes: string;
};

const initialState: InquiryState = {
  name: "",
  occasion: "",
  eventDate: "",
  location: "",
  reference: "",
  measurements: "",
  colors: "",
  notes: "",
};

function line(label: string, value: string) {
  return value.trim() ? `${label}: ${value.trim()}` : "";
}

export function BespokeInquiryForm() {
  const [state, setState] = useState(initialState);

  const url = useMemo(() => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61400000000";
    const message = [
      "Hello Magnate Artisan,",
      "",
      "I would like to begin a bespoke order.",
      line("Name", state.name),
      line("Occasion", state.occasion),
      line("Event date", state.eventDate),
      line("City / country", state.location),
      line("Product or reference", state.reference),
      line("Measurements status", state.measurements),
      line("Preferred colors / fabric", state.colors),
      line("Customization notes", state.notes),
      "",
      "Please help me confirm sizing, design options, timeline, and next steps.",
    ].filter(Boolean);

    return `https://wa.me/${number}?text=${encodeURIComponent(message.join("\n"))}`;
  }, [state]);

  function update(field: keyof InquiryState, value: string) {
    setState((current) => ({ ...current, [field]: value }));
  }

  const inputClass =
    "w-full border border-white/10 bg-black/35 px-4 py-3 text-sm text-[#f6efe3] outline-none transition placeholder:text-[#776d62] focus:border-[#e4c982]";
  const labelClass = "text-xs uppercase tracking-[0.18em] text-[#e4c982]";

  return (
    <div id="contact" className="luxury-panel p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-4xl text-[#fff4df]">Build a quick inquiry brief</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b7aa99]">
            Fill what you know. The message opens in WhatsApp so the consultation starts with the useful details already organized.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Name</span>
          <input className={inputClass} value={state.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Occasion</span>
          <input className={inputClass} value={state.occasion} onChange={(event) => update("occasion", event.target.value)} placeholder="Wedding, gala, stage, ceremony..." />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Event date</span>
          <input className={inputClass} value={state.eventDate} onChange={(event) => update("eventDate", event.target.value)} placeholder="Date or month needed" />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>City / country</span>
          <input className={inputClass} value={state.location} onChange={(event) => update("location", event.target.value)} placeholder="Delivery location" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Product or reference</span>
          <input className={inputClass} value={state.reference} onChange={(event) => update("reference", event.target.value)} placeholder="Paste a product link, product name, or describe the idea" />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Measurements status</span>
          <select className={inputClass} value={state.measurements} onChange={(event) => update("measurements", event.target.value)}>
            <option value="">Select one</option>
            <option value="I have full measurements ready">I have full measurements ready</option>
            <option value="I need measurement guidance">I need measurement guidance</option>
            <option value="I only know my usual size">I only know my usual size</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Colors / fabric</span>
          <input className={inputClass} value={state.colors} onChange={(event) => update("colors", event.target.value)} placeholder="Black velvet, ivory satin, gold embroidery..." />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className={labelClass}>Customization notes</span>
          <textarea className={`${inputClass} min-h-28 resize-y`} value={state.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Embroidery motifs, rhinestone level, lining, fit preference, inspiration links..." />
        </label>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-[#731e31]"
      >
        <MessageCircle size={17} />
        Send Brief on WhatsApp
      </a>
    </div>
  );
}
