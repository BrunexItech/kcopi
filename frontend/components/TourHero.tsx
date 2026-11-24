import Link from "next/link";
import { mediaUrl, Tour } from "@/lib/api";
import { formatDuration } from "@/lib/format";
import Icon from "@/components/Icon";
import PriceTag from "@/components/PriceTag";
import LoadingImage from "@/components/LoadingImage";
import BackLink from "@/components/BackLink";

const CATEGORY_LABEL: Record<string, string> = {
  wildlife: "Wildlife Safari",
  family: "Family Safari",
  honeymoon: "Honeymoon Safari",
};

// A single, full-viewport "boarding pass" hero: the entire trip summary is
// visible the moment the page loads, no scrolling required, replacing both
// the generic PageHero and the separate stat strip that used to sit below
// it. The dashed divider and stub-style layout are deliberate nods to an
// actual travel ticket, reinforced with the Kcopi Global mark front and
// centre, so it reads as a branded document rather than another web card.
export default function TourHero({ tour }: { tour: Tour }) {
  const stats = [
    ["clock", formatDuration(tour.days, tour.nights)],
    ["map-pin", tour.destination_name],
    ["users", tour.group_size],
    ["compass", tour.style],
  ] as const;

  const highlights = tour.itinerary.slice(0, 4).map((d) => d.title);
  const extra = tour.itinerary.length - highlights.length;
  const category = CATEGORY_LABEL[tour.category] ?? "Signature Safari";

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-primary-dark)] text-white">
      <LoadingImage
        src={mediaUrl(tour.hero_image)}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-40 blur-md"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[var(--color-primary-dark)]" />

      <div className="container-page relative z-10 flex items-center justify-between gap-4 pt-24 sm:pt-28">
        <BackLink href="/tours" label="Back to Tours & Packages" />
        <div className="hidden items-center gap-2 text-sm text-white/70 sm:flex">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-white">
            Tours &amp; Packages
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-2xl">
          <div className="grid md:grid-cols-[1fr_1.35fr]">
            <div className="relative hidden min-h-[360px] md:block">
              <LoadingImage src={mediaUrl(tour.hero_image)} alt={tour.title} fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-5 w-auto" />
                <span className="text-xs font-semibold tracking-wide text-white">Kcopi Global</span>
              </div>
            </div>

            <div className="relative flex flex-col justify-between gap-6 p-6 sm:p-8">
              {/* Perforated ticket-stub divider, desktop only */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 hidden w-px md:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, var(--color-line) 0, var(--color-line) 8px, transparent 8px, transparent 16px)",
                }}
              />

              <div>
                <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
                  <div className="flex items-center gap-2">
                    <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-6 w-auto" />
                    <span className="text-sm font-semibold text-[var(--color-primary-dark)]">Kcopi Global</span>
                  </div>
                  <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-primary-dark)]">
                    {category}
                  </span>
                </div>

                <span className="eyebrow hidden md:inline-flex">{category}</span>
                <h1 className="mt-1 font-[var(--font-display)] text-2xl leading-tight sm:text-3xl">{tour.title}</h1>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{tour.destination_name}</p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                  {stats.map(([icon, value]) => (
                    <span key={value} className="flex items-center gap-1.5 text-sm text-[var(--color-ink)]">
                      <Icon name={icon} className="h-4 w-4 flex-shrink-0 text-[var(--color-accent-dark)]" />
                      {value}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {highlights.map((h) => (
                    <span key={h} className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-xs text-[var(--color-ink)]">
                      {h}
                    </span>
                  ))}
                  {extra > 0 && (
                    <span className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-dark)]">
                      +{extra} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[var(--color-line)] pt-5">
                <div>
                  <span className="block text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">From</span>
                  <div className="flex items-baseline gap-1.5">
                    <b className="font-[var(--font-display)] text-2xl text-[var(--color-primary-dark)]">
                      <PriceTag usdAmount={tour.price_usd} />
                    </b>
                    <span className="text-sm text-[var(--color-ink-soft)]">/ person</span>
                  </div>
                </div>
                <Link href={`/contact?tour=${encodeURIComponent(tour.title)}`} className="btn btn-primary">
                  Enquire &amp; Get a Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
