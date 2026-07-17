"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, MessageCircle, Upload } from "lucide-react";
import { inquiryUrl, type InquiryDetails, type PreferredContact } from "@/lib/inquiry";

const steps = ["Silhouette", "Palette", "Detail", "Fit & timing", "Your brief"];
const choices = {
  Silhouette: ["Statement suit", "Jacket / blazer", "Cape", "Dress / skirt set", "Historical costume", "Something new"],
  Palette: ["Black & gold", "Ivory & pearl", "Jewel tones", "Pastel", "Monochrome", "Custom palette"],
  Detail: ["Refined embroidery", "Full couture embroidery", "Rhinestones", "Fringe", "Metallic braid", "Hand-painted motif"],
} as const;

const empty: InquiryDetails = { name: "", email: "", preferredContact: "whatsapp", occasion: "", eventDate: "", location: "", reference: "", measurements: "", colors: "", notes: "" };

export function ByoStudio() {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState(empty);
  const [files, setFiles] = useState<string[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const current = steps[step];
  const set = (field: keyof InquiryDetails, value: string) => setDetails((state) => ({ ...state, [field]: value }));
  const finalDetails = useMemo(() => ({ ...details, reference: [details.reference, files.length ? `Reference files: ${files.join(", ")}` : ""].filter(Boolean).join(" | "), colors: [details.colors, selections.Palette].filter(Boolean).join(" / "), notes: [selections.Silhouette && `Silhouette: ${selections.Silhouette}`, selections.Detail && `Detail: ${selections.Detail}`, details.notes].filter(Boolean).join(". ") }), [details, files, selections]);
  const url = inquiryUrl(finalDetails, "I would like to build my own Magnate Artisan commission.");

  return <div className="luxury-panel overflow-hidden">
    <div className="grid grid-cols-5 border-b border-[#b99858]/20">{steps.map((label, index) => <button key={label} onClick={() => setStep(index)} className={`min-h-2 transition ${index <= step ? "bg-[#b99858]" : "bg-white/5"}`} aria-label={`Go to ${label}`} />)}</div>
    <div className="p-6 md:p-10">
      <p className="text-xs uppercase tracking-[.24em] text-[#b99858]">Step {step + 1} / {steps.length}</p>
      <h2 className="display mt-3 text-4xl text-[#fff4df] md:text-6xl">{current}</h2>
      {current in choices && <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{choices[current as keyof typeof choices].map((choice) => <button key={choice} onClick={() => setSelections((value) => ({ ...value, [current]: choice }))} className={`min-h-20 border p-4 text-left text-sm uppercase tracking-[.12em] transition ${selections[current] === choice ? "border-[#e4c982] bg-[#b99858]/15 text-[#fff4df]" : "border-[#b99858]/20 text-[#b7aa99] hover:border-[#b99858]/60"}`}>{choice}</button>)}</div>}
      {current === "Fit & timing" && <div className="mt-8 grid gap-4 md:grid-cols-2">{[["occasion","Occasion"],["eventDate","Event date"],["location","City / country"],["measurements","Measurements status"]].map(([field,label]) => <label key={field} className="grid gap-2"><span className="form-label">{label}</span><input className="atelier-input" value={details[field as keyof InquiryDetails]} onChange={(e) => set(field as keyof InquiryDetails, e.target.value)} /></label>)}<label className="group col-span-full flex min-h-28 cursor-pointer items-center justify-center gap-3 border border-dashed border-[#b99858]/35 text-[#b7aa99] hover:border-[#e4c982]"><Upload size={18} /> Add reference images<input type="file" multiple accept="image/*" className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files || []).map((file) => file.name))} /></label>{files.length > 0 && <p className="col-span-full text-sm text-[#e4c982]">Selected: {files.join(", ")}. Attach the actual files after your message opens.</p>}</div>}
      {current === "Your brief" && <div className="mt-8 grid gap-4 md:grid-cols-2"><label className="grid gap-2"><span className="form-label">Name</span><input className="atelier-input" value={details.name} onChange={(e) => set("name", e.target.value)} /></label><label className="grid gap-2"><span className="form-label">Email</span><input type="email" className="atelier-input" value={details.email} onChange={(e) => set("email", e.target.value)} /></label><label className="grid gap-2 md:col-span-2"><span className="form-label">Inspiration link or product</span><input className="atelier-input" value={details.reference} onChange={(e) => set("reference", e.target.value)} /></label><label className="grid gap-2 md:col-span-2"><span className="form-label">Anything else</span><textarea className="atelier-input min-h-28" value={details.notes} onChange={(e) => set("notes", e.target.value)} /></label><div className="flex gap-3 md:col-span-2">{(["whatsapp","email"] as PreferredContact[]).map((method) => <button key={method} onClick={() => setDetails((s) => ({...s, preferredContact: method}))} className={`flex flex-1 items-center justify-center gap-2 border p-4 uppercase tracking-[.14em] ${details.preferredContact === method ? "border-[#e4c982] bg-[#b99858]/15" : "border-[#b99858]/20"}`}>{method === "whatsapp" ? <MessageCircle size={17}/> : <Mail size={17}/>} {method}</button>)}</div></div>}
      <div className="mt-10 flex items-center justify-between gap-4"><button disabled={step === 0} onClick={() => setStep((n) => n - 1)} className="inline-flex min-h-12 items-center gap-2 px-3 text-sm uppercase tracking-[.14em] text-[#b7aa99] disabled:opacity-20"><ArrowLeft size={17}/>Back</button>{step < steps.length - 1 ? <button onClick={() => setStep((n) => n + 1)} className="atelier-button">Continue <ArrowRight size={17}/></button> : <a className="atelier-button" href={url} target={details.preferredContact === "whatsapp" ? "_blank" : undefined} rel="noreferrer">Open {details.preferredContact === "whatsapp" ? "WhatsApp" : "email"}<ArrowRight size={17}/></a>}</div>
    </div>
  </div>;
}
