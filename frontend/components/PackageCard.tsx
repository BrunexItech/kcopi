"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { Tour, mediaUrl } from "@/lib/api";
import { useCurrency } from "@/lib/currency";
import { formatDuration } from "@/lib/format";

// A sticky stack of cards, matching exclusive360's effect: every card pins at
// the SAME top offset, so later cards slide over and fully cover earlier ones
// as you scroll — the overlap only works because the anchor point is shared,
// not staggered per card. Unlike exclusive360's version, "View Details" is
// real navigation to the tour's own page (/tours/[slug]) rather than an
// inline expand — so clicking it actually takes you to a distinct page
// instead of unfolding more of the same listing page.
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

export default function PackageCard({ t, index }: { t: Tour; index: number }) {
  const badge = CATEGORY_BADGE[t.category] ?? "Signature Safari";
  const accent = CATEGORY_COLOR[t.category] ?? "var(--color-primary-dark)";
  const { format } = useCurrency();

  return (
    // This must stay the sticky element's own node, with no wrapping div
    // around it: `position: sticky` is constrained by its immediate
    // containing block, and an extra wrapper per card (even a plain,
    // non-animated one) shrinks that containing block down to one card's
    // height, killing the stacking-cards scroll effect entirely. Animating
    // this element directly (opacity only — never transform) keeps the
    // enter/exit transition from TourFilter's AnimatePresence without
    // touching the DOM structure sticky depends on.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="sticky top-[90px] z-10 mb-0 sm:top-24 md:top-28"
      style={{ marginTop: index === 0 ? 0 : `${Math.min(index * 15, 40)}px` }}
    >
      <Link
        href={`/tours/${t.slug}`}
        className="group block overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-md transition-all duration-500 hover:shadow-xl"
      >
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-accent)]" />
        <div className="flex flex-col lg:flex-row">
          <div className="relative min-h-[220px] overflow-hidden lg:min-h-[320px] lg:w-2/5">
            <LoadingImage
              src={mediaUrl(t.hero_image)}
              alt={t.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-4 rounded-xl border border-white/0 transition-all duration-500 group-hover:inset-3 group-hover:border-white/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/95 via-[var(--color-primary-dark)]/40 to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="font-[var(--font-display)] text-2xl font-light tracking-wide text-white drop-shadow-lg sm:text-3xl">
                {t.title}
              </div>
              <div className="mt-1 max-w-xs text-sm font-light text-white/90 drop-shadow-lg">{t.destination_name}</div>
              <span
                className="mt-3 inline-block rounded-full px-4 py-1 text-[10px] font-semibold tracking-wider text-white sm:text-xs"
                style={{ backgroundColor: accent }}
              >
                {badge}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between bg-[var(--color-surface)] p-5 sm:p-6 lg:p-8">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-[120px] flex-1">
                  <h3 className="font-[var(--font-display)] text-xl font-light tracking-wide text-[var(--color-ink)] sm:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-light text-[var(--color-ink-soft)]">
                    {formatDuration(t.days, t.nights)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-[var(--color-ink)] sm:text-3xl">{format(t.price_usd)}</div>
                  <div className="text-xs font-light text-[var(--color-ink-soft)]">per person</div>
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-[var(--color-ink-soft)]">{t.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--color-ink-soft)]">
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-2.5 py-1">
                  <Icon name="clock" className="h-3.5 w-3.5" /> {formatDuration(t.days, t.nights)}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-2.5 py-1">
                  <Icon name="users" className="h-3.5 w-3.5" /> {t.group_size}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-2.5 py-1">
                  <Icon name="tent" className="h-3.5 w-3.5" /> {t.style}
                </span>
              </div>
            </div>

            <span className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-bg-alt)] py-2 text-center text-sm font-medium text-[var(--color-ink)] transition group-hover:bg-[var(--color-gold)]/30">
              View Full Details <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
