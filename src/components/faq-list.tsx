"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqs } from "@/data/faq";

export function FaqList() {
  const [query, setQuery] = useState("");
  const visible = faqs.filter((item) => item.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div>
    <label className="mb-8 flex items-center gap-3 border-b border-[#b99858]/45 px-1 py-4">
      <Search size={18} className="text-[#e4c982]" />
      <span className="sr-only">Search frequently asked questions</span>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search measurements, proofing, delivery..." className="w-full bg-transparent text-base text-[#fff4df] outline-none placeholder:text-[#776d62]" />
    </label>
    <div className="grid gap-3">
      {visible.map(([category, question, answer]) => <details key={question} className="faq-item group border border-[#b99858]/20 bg-[#17120e]/70">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 md:p-7">
          <span><span className="mb-2 block text-[10px] uppercase tracking-[.24em] text-[#b99858]">{category}</span><span className="display text-2xl text-[#fff4df] md:text-3xl">{question}</span></span>
          <ChevronDown className="shrink-0 text-[#e4c982] transition group-open:rotate-180" />
        </summary>
        <p className="max-w-3xl px-5 pb-6 leading-8 text-[#b7aa99] md:px-7">{answer}</p>
      </details>)}
      {!visible.length && <p className="py-10 text-center text-[#b7aa99]">No matching questions. Start a bespoke inquiry and ask us directly.</p>}
    </div>
  </div>;
}
