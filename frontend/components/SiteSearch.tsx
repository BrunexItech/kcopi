"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { api, Destination, mediaUrl, Tour } from "@/lib/api";
import { useCurrency } from "@/lib/currency";
import Icon from "@/components/Icon";
import LoadingImage from "@/components/LoadingImage";
import Skeleton from "@/components/Skeleton";

const QUICK_TERMS = ["Maasai Mara", "Family Safari", "Honeymoon", "Great Migration", "Diani Beach"];

type Result =
  | { kind: "destination"; key: string; href: string; title: string; subtitle: string; image: string }
  | { kind: "tour"; key: string; href: string; title: string; subtitle: string; image: string; price: number };

function highlight(text: string, query: string) {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-[var(--color-gold)]/35 text-inherit">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export default function SiteSearch({ solid }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { format } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    if (!open || loaded) return;
    Promise.all([api.getDestinations(), api.getTours()])
      .then(([d, t]) => {
        setDestinations(d);
        setTours(t);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [open, loaded]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  const q = query.trim().toLowerCase();

  const matchedDestinations = useMemo(() => {
    if (!q) return [];
    return destinations.filter(
      (d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)
    );
  }, [destinations, q]);

  const matchedTours = useMemo(() => {
    if (!q) return [];
    return tours.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.destination_name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.style.toLowerCase().includes(q)
    );
  }, [tours, q]);

  const results: Result[] = useMemo(
    () => [
      ...matchedDestinations.map((d) => ({
        kind: "destination" as const,
        key: d.slug,
        href: `/destinations/${d.slug}`,
        title: d.name,
        subtitle: d.country,
        image: d.hero_image,
      })),
      ...matchedTours.map((t) => ({
        kind: "tour" as const,
        key: t.slug,
        href: `/tours/${t.slug}`,
        title: t.title,
        subtitle: `${t.days} Days · ${t.destination_name}`,
        image: t.hero_image,
        price: t.price_usd,
      })),
    ],
    [matchedDestinations, matchedTours]
  );

  const noResults = q.length > 0 && loaded && results.length === 0;

  useEffect(() => setActiveIndex(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const target = results[activeIndex];
        if (target) {
          e.preventDefault();
          router.push(target.href);
          close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, router]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        aria-label="Search"
        onClick={() => setOpen(true)}
        className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
          solid ? "text-[var(--color-ink)] hover:text-[var(--color-accent)]" : "text-white hover:text-white/70"
        }`}
      >
        <Icon name="search" className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[var(--color-primary-dark)]/55 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-16 w-full max-w-2xl overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-2xl ring-1 ring-black/5 sm:mt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-[3px] w-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-gold)] to-[var(--color-accent)]" />

              <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-5 py-4">
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--color-bg-alt)] text-[var(--color-accent-dark)]">
                  <Icon name="search" className="h-4 w-4" />
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, safaris, styles..."
                  className="w-full bg-transparent text-base outline-none placeholder:text-[var(--color-ink-soft)]"
                />
                <kbd className="hidden flex-shrink-0 rounded-md border border-[var(--color-line)] px-1.5 py-1 text-[10px] font-semibold text-[var(--color-ink-soft)] sm:block">
                  ESC
                </kbd>
                <button aria-label="Close search" onClick={close} className="flex-shrink-0 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] sm:hidden">
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>

              <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-3">
                {!q && (
                  <div className="px-3 py-6">
                    <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_TERMS.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {q && !loaded && (
                  <div className="space-y-2 p-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                        <Skeleton className="h-12 w-12 flex-shrink-0 !rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {noResults && (
                  <p className="px-3 py-10 text-center text-sm text-[var(--color-ink-soft)]">
                    No matches for &ldquo;{query}&rdquo;. Try a destination or safari style.
                  </p>
                )}

                {matchedDestinations.length > 0 && (
                  <div className="mb-2">
                    <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                      Destinations
                    </span>
                    {matchedDestinations.map((d, i) => {
                      const idx = results.findIndex((r) => r.kind === "destination" && r.key === d.slug);
                      return (
                        <Link
                          key={d.slug}
                          href={`/destinations/${d.slug}`}
                          onClick={close}
                          data-idx={idx}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                            activeIndex === idx ? "bg-[var(--color-bg-alt)]" : ""
                          }`}
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                            <LoadingImage src={mediaUrl(d.hero_image)} alt="" fill sizes="48px" className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <b className="block text-sm font-semibold">{highlight(d.name, query)}</b>
                            <span className="text-xs text-[var(--color-ink-soft)]">{d.country}</span>
                          </div>
                          <Icon name="arrow-right" className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-ink-soft)]" />
                        </Link>
                      );
                    })}
                  </div>
                )}

                {matchedTours.length > 0 && (
                  <div>
                    <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                      Tours &amp; Packages
                    </span>
                    {matchedTours.map((t) => {
                      const idx = results.findIndex((r) => r.kind === "tour" && r.key === t.slug);
                      return (
                        <Link
                          key={t.slug}
                          href={`/tours/${t.slug}`}
                          onClick={close}
                          data-idx={idx}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                            activeIndex === idx ? "bg-[var(--color-bg-alt)]" : ""
                          }`}
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                            <LoadingImage src={mediaUrl(t.hero_image)} alt="" fill sizes="48px" className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <b className="block text-sm font-semibold">{highlight(t.title, query)}</b>
                            <span className="text-xs text-[var(--color-ink-soft)]">{t.days} Days &middot; {t.destination_name}</span>
                          </div>
                          <span className="flex-shrink-0 text-sm font-semibold text-[var(--color-primary-dark)]">
                            {format(t.price_usd)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="hidden items-center gap-4 border-t border-[var(--color-line)] bg-[var(--color-bg-alt)]/60 px-5 py-2.5 text-xs text-[var(--color-ink-soft)] sm:flex">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-1.5 py-0.5">&uarr;</kbd>
                  <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-1.5 py-0.5">&darr;</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-1.5 py-0.5">&crarr;</kbd>
                  to select
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-1.5 py-0.5">ESC</kbd>
                  to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
