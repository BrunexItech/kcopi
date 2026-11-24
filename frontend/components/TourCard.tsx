"use client";

import Link from "next/link";
import { useState } from "react";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { Tour, mediaUrl } from "@/lib/api";
import { useCurrency } from "@/lib/currency";

const CATEGORY_BADGE: Record<string, string> = {
  wildlife: "Wildlife Safari",
  family: "Family Favourite",
  honeymoon: "Romantic Escape",
};

const CATEGORY_COLOR: Record<string, string> = {
  wildlife: "var(--color-primary)",
  family: "var(--color-accent)",
  honeymoon: "var(--color-gold)",
};

// A short looping preview clip per tour, played on hover so the card gives a
// real sense of the place before a visitor even clicks through. Assigned by
// slug (not by matching keywords in the destination name) so every clip maps
// to one specific tour deliberately — no two cards that could plausibly sit
// side by side ever show the same footage. Tours without real matching
// footage simply get no preview clip and fall back to their static photo,
// rather than reusing another tour's clip just to fill the slot.
const PREVIEW_CLIPS: Record<string, string> = {
  "masai-mara-classic-safari": "/static/video/hero-mara.mp4",
  "great-migration-serengeti": "/static/video/hero-lion.mp4",
  "amboseli-kilimanjaro-safari": "/static/video/hero-elephant.mp4",
  "tsavo-nakuru-explorer": "/static/video/hero-giraffe.mp4",
};

export default function TourCard({ t }: { t: Tour }) {
  const badge = CATEGORY_BADGE[t.category] ?? "Signature Safari";
  const accent = CATEGORY_COLOR[t.category] ?? "var(--color-primary-dark)";
  const { format } = useCurrency();
  const [hovering, setHovering] = useState(false);
  const previewClip = PREVIEW_CLIPS[t.slug] ?? null;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <LoadingImage
          src={mediaUrl(t.hero_image)}
          alt={t.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {previewClip && (
          <video
            key={hovering ? previewClip : "idle"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovering ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            autoPlay={hovering}
            preload="none"
          >
            <source src={mediaUrl(previewClip)} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span
          className="absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md"
          style={{ backgroundColor: accent }}
        >
          {badge}
        </span>
        <span className="absolute right-3.5 top-3.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--color-primary-dark)] shadow-md">
          {t.days}-Day Safari
        </span>
      </div>

      {/* Ticket-stub divider */}
      <div className="mx-5 border-t-2 border-dashed border-[var(--color-line)]" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-dark)]">{t.destination_name}</span>
          <h3 className="mt-1 font-[var(--font-display)] text-xl font-semibold tracking-wide">
            <Link href={`/tours/${t.slug}`} className="transition-colors hover:text-[var(--color-accent)]">
              {t.title}
            </Link>
          </h3>
        </div>
        <p className="line-clamp-2 text-sm text-[var(--color-ink-soft)]">{t.summary}</p>

        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-2.5 py-1">
            <Icon name="tent" className="h-3.5 w-3.5" /> {t.style}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-2.5 py-1">
            <Icon name="users" className="h-3.5 w-3.5" /> {t.group_size}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--color-line)] pt-3.5">
          <div>
            <span className="block text-[0.7rem] uppercase text-[var(--color-ink-soft)]">From / per person</span>
            <b className="font-[var(--font-display)] text-2xl text-[var(--color-primary-dark)]">
              {format(t.price_usd)}
            </b>
          </div>
          <Link href={`/tours/${t.slug}`} className="btn btn-primary !px-4 !py-2 !text-xs">
            View Details <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
