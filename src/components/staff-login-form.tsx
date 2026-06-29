"use client";

import Image from "next/image";
import { LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

const staffLogoPath = "/site-media/images/Magnate_Artisians_Logo_Black_430x_cad215cc-035c-4730-9d6d-aef01ef840af_ff89df955d.png";

export function StaffLoginForm({ demoEmail }: { demoEmail: string }) {
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/staff/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("That staff login did not match.");
      return;
    }

    window.location.href = "/staff";
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-panel mx-auto grid w-full max-w-4xl overflow-hidden md:grid-cols-[0.88fr_1.12fr]">
      <div className="relative hidden min-h-[560px] border-r border-[#b99858]/16 bg-[#fff4df] p-8 text-[#120d09] md:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(185,152,88,0.28),transparent_28rem)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <Image src={staffLogoPath} alt="Magnate Artisan" width={118} height={118} className="h-24 w-24 object-contain" unoptimized />
            <h2 className="display mt-8 text-5xl leading-none">Atelier control, kept composed.</h2>
            <p className="mt-5 text-sm leading-7 text-[#5d5145]">
              Manage catalogue details, pricing, imagery, categories, and client invoices from one presentation-ready staff workspace.
            </p>
          </div>
          <div className="grid gap-3 text-xs uppercase tracking-[0.18em] text-[#6f5c39]">
            <span className="border-t border-[#b99858]/35 pt-4">Products</span>
            <span>Invoices</span>
            <span>Publishing</span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-7 md:p-9">
        <div>
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-[#b99858]/35 bg-black/35 text-[#e4c982]">
            <LockKeyhole size={22} />
          </div>
        <h1 className="display text-5xl leading-none text-[#fff4df]">Staff login</h1>
        <p className="mt-3 text-sm leading-6 text-[#b7aa99]">
          Local prototype access for managing products, categories, pricing, images, and invoices.
        </p>
      </div>

      <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
        Access Profile
        <span className="relative">
          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f8271]" size={17} />
          <select className="staff-input pl-11">
            <option>Magnate Artisan Staff</option>
          </select>
        </span>
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-12 border border-[#b99858]/25 bg-black/45 px-4 text-base normal-case tracking-normal text-[#fff4df] outline-none transition focus:border-[#e4c982]"
        />
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#e4c982]">
        Password
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="min-h-12 border border-[#b99858]/25 bg-black/45 px-4 text-base normal-case tracking-normal text-[#fff4df] outline-none transition focus:border-[#e4c982]"
          placeholder="Default: atelier-demo"
        />
      </label>

      {error ? <p className="border border-[#7b1d31]/45 bg-[#5b1625]/35 px-4 py-3 text-sm text-[#ffd7df]">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#b99858] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#080604] transition hover:bg-[#e4c982] disabled:cursor-wait disabled:opacity-70"
      >
        <LogIn size={17} />
        {isLoading ? "Opening" : "Enter Dashboard"}
      </button>

      <p className="text-xs leading-5 text-[#8f8271]">
        Prototype default: <span className="text-[#d7cbbb]">{demoEmail}</span> / <span className="text-[#d7cbbb]">atelier-demo</span>. Use env vars before any real deployment.
      </p>
      </div>
    </form>
  );
}
