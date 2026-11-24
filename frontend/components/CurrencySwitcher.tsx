"use client";

import { useState } from "react";
import { CURRENCIES, useCurrency } from "@/lib/currency";

export default function CurrencySwitcher({ solid }: { solid?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const active = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
          solid
            ? "border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
            : "border-white/40 text-white hover:border-white"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{active.flag}</span>
        <span>{active.code}</span>
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl bg-[var(--color-surface)] py-1.5 text-sm shadow-lg"
        >
          {CURRENCIES.map((c) => (
            <li key={c.code}>
              <button
                role="option"
                aria-selected={c.code === currency}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-alt)] ${
                  c.code === currency ? "font-semibold text-[var(--color-accent-dark)]" : ""
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
                <span className="text-xs text-[var(--color-ink-soft)]">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
