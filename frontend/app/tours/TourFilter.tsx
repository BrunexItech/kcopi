"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
            className={`relative rounded-full px-4.5 py-2.5 text-sm font-semibold transition-colors ${
              active === c.key ? "text-white" : "text-[var(--color-ink)]"
            }`}
          >
            {active === c.key && (
              <motion.span
                layoutId="tour-filter-pill"
                className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{c.label}</span>
          </button>
        ))}
      </div>
      {/* PackageCard renders its own `position: sticky` root directly as a
          motion.div (for the enter/exit fade) — no wrapper div here, since
          sticky's containing block is this element's immediate parent, and
          any extra nesting per card breaks the stacking-cards scroll effect. */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <PackageCard key={t.slug} t={t} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
