"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { inquiryUrl, type PreferredContact } from "@/lib/inquiry";

type InquiryState = {
  name: string;
  email: string;
  preferredContact: PreferredContact;
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
  email: "",
  preferredContact: "whatsapp",
  occasion: "",
  eventDate: "",
  location: "",
  reference: "",
  measurements: "",
  colors: "",
  notes: "",
};

export function BespokeInquiryForm() {
  const [state, setState] = useState(initialState);

  const url = useMemo(() => {
    return inquiryUrl(state);
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
          <span className={labelClass}>Email</span>
          <input type="email" className={inputClass} value={state.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" />
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

      <div className="mt-5 grid grid-cols-2 gap-3">
        {(["whatsapp", "email"] as PreferredContact[]).map((method) => (
          <button key={method} type="button" onClick={() => update("preferredContact", method)} className={`inline-flex min-h-12 items-center justify-center gap-2 border uppercase tracking-[.14em] ${state.preferredContact === method ? "border-[#e4c982] bg-[#b99858]/15 text-[#fff4df]" : "border-white/10 text-[#b7aa99]"}`}>
            {method === "whatsapp" ? <MessageCircle size={17}/> : <Mail size={17}/>} {method}
          </button>
        ))}
      </div>

      <a
        href={url}
        target={state.preferredContact === "whatsapp" ? "_blank" : undefined}
        rel="noreferrer"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#5b1625] px-5 text-sm font-medium uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-[#731e31]"
      >
        <MessageCircle size={17} />
        Open {state.preferredContact === "whatsapp" ? "WhatsApp" : "Email"} Brief
      </a>
    </div>
  );
}
