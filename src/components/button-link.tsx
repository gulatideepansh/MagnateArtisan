import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  tone?: "gold" | "ghost" | "wine";
};

export function ButtonLink({ className, tone = "gold", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.16em] transition",
        tone === "gold" && "bg-[#b99858] text-[#080604] hover:bg-[#e4c982]",
        tone === "ghost" && "border border-[#b99858]/45 text-[#fff4df] hover:border-[#e4c982] hover:bg-white/5",
        tone === "wine" && "bg-[#5b1625] text-[#fff4df] hover:bg-[#731e31]",
        className,
      )}
      {...props}
    />
  );
}
