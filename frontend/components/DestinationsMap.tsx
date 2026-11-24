"use client";

import Link from "next/link";
import { useState } from "react";
import { Destination } from "@/lib/api";

// Illustrated trail map rather than a literal GIS-accurate one — positions
// are sensible relative placements (Mara west, Nakuru north-central,
// Amboseli south near the Tanzania border, Tsavo south-east, Diani the
// far south-east coast, Serengeti south-west into Tanzania), matching the
// site's hand-crafted editorial aesthetic rather than dropping in a mismatched
// literal Google-Maps-style widget.
const POSITIONS: Record<string, { x: number; y: number }> = {
  "masai-mara": { x: 16, y: 52 },
  serengeti: { x: 13, y: 80 },
  "lake-nakuru": { x: 42, y: 32 },
  amboseli: { x: 50, y: 68 },
  tsavo: { x: 64, y: 64 },
  "diani-beach": { x: 84, y: 86 },
};

// A sensible overland travel order, used only to draw the connecting trail.
const TRAIL_ORDER = ["masai-mara", "serengeti", "lake-nakuru", "amboseli", "tsavo", "diani-beach"];

export default function DestinationsMap({ destinations }: { destinations: Destination[] }) {
  const [active, setActive] = useState<string | null>(null);

  const points = TRAIL_ORDER.map((slug) => POSITIONS[slug]).filter(Boolean);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative mx-auto h-64 w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)] shadow-md">
      {/* Subtle topographic texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={pathD} fill="none" stroke="rgba(217,164,73,0.55)" strokeWidth="0.4" strokeDasharray="1.4 1.4" />
      </svg>

      {destinations.map((d) => {
        const pos = POSITIONS[d.slug];
        if (!pos) return null;
        const isActive = active === d.slug;
        return (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            onMouseEnter={() => setActive(d.slug)}
            onMouseLeave={() => setActive(null)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <span
              className={`absolute inset-0 -m-2 rounded-full bg-[var(--color-gold)]/40 blur-md transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className="relative grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-[var(--color-gold)] shadow-md transition-transform group-hover:scale-125 sm:h-5 sm:w-5" />
            <span
              className={`absolute left-1/2 top-full z-10 mt-2 w-max max-w-[160px] -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-center text-xs font-semibold text-[var(--color-ink)] shadow-lg transition-all ${
                isActive ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
              }`}
            >
              {d.name}
              <span className="block font-normal text-[var(--color-ink-soft)]">{d.tour_count} safaris</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
