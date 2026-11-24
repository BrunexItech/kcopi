"use client";

import { useMemo, useState } from "react";
import { FAQS } from "@/lib/faqs";

export default function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(([question, answer]) => (question + answer).toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
        className="mb-8 w-full rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4"
      />
      <div>
        {filtered.map(([question, answer], i) => {
          const open = openIndex === i;
          return (
            <div key={question} className="border-b border-[var(--color-line)]">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-[var(--font-display)] text-lg"
              >
                <span>{question}</span>
                <span
                  className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-[var(--color-line)] transition-transform ${
                    open ? "rotate-45 border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open && <p className="max-w-2xl pb-6 text-[var(--color-ink-soft)]">{answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
