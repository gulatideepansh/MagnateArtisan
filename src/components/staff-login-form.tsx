"use client";

import { LockKeyhole, LogIn } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="luxury-panel mx-auto grid w-full max-w-md gap-5 p-7">
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
    </form>
  );
}
