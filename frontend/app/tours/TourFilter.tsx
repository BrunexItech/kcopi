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
      <motion.div layout className="space-y-4 sm:space-y-6 md:space-y-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <motion.div
              key={t.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <PackageCard t={t} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
