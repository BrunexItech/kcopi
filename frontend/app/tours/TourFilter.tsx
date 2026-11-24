"use client";

import { useState } from "react";
import { Tour } from "@/lib/api";
import PackageCard from "@/components/PackageCard";

const CATEGORIES = [
  { key: "all", label: "All Safaris" },
  { key: "wildlife", label: "Wildlife" },
  { key: "family", label: "Family" },
  { key: "honeymoon", label: "Honeymoon" },
];

export default function TourFilter({ tours }: { tours: Tour[] }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? tours : tours.filter((t) => t.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-[var(--color-surface)] p-4 shadow-sm">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`rounded-full border px-4.5 py-2.5 text-sm font-semibold transition ${
              active === c.key
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {filtered.map((t, i) => (
          <PackageCard key={t.slug} t={t} index={i} />
        ))}
      </div>
    </div>
  );
}
