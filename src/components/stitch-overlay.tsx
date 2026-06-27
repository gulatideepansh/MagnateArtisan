export function StitchOverlay({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      viewBox="0 0 1200 800"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="thread-path"
        d="M-40 654 C 142 512, 168 182, 362 226 C 524 263, 464 522, 648 498 C 814 476, 788 198, 974 156 C 1110 126, 1178 250, 1260 158"
        stroke="url(#threadGold)"
        strokeWidth="1.2"
      />
      <path
        className="thread-path-delay"
        d="M56 120 C 218 242, 252 388, 418 370 C 590 352, 610 148, 764 194 C 888 231, 914 392, 1060 372"
        stroke="rgba(246,239,227,0.18)"
        strokeWidth="0.9"
      />
      <path
        d="M108 678 C 220 606, 284 690, 396 614 C 486 552, 550 566, 608 616"
        stroke="rgba(185,152,88,0.16)"
        strokeWidth="1"
      />
      <defs>
        <linearGradient id="threadGold" x1="0" x2="1200" y1="0" y2="0">
          <stop stopColor="rgba(185,152,88,0)" />
          <stop offset="0.5" stopColor="rgba(228,201,130,0.52)" />
          <stop offset="1" stopColor="rgba(185,152,88,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
