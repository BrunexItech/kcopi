import Link from "next/link";
import { mediaUrl, Tour } from "@/lib/api";
import { formatDuration } from "@/lib/format";
import Icon from "@/components/Icon";
import PriceTag from "@/components/PriceTag";

const INCLUDED = [
  ["car", "Transport"],
  ["tent", "Accommodation"],
  ["utensils", "Meals"],
  ["ticket", "Park Fees"],
] as const;

export default function TripOverviewCard({ tour }: { tour: Tour }) {
  const stats = [
    ["clock", "Duration", formatDuration(tour.days, tour.nights)],
    ["map-pin", "Destination", tour.destination_name],
    ["users", "Group Size", tour.group_size],
    ["compass", "Style", tour.style],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,var(--color-primary-dark)_65%)] pb-20 pt-10 sm:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]/60 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-2.5">
              <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-7 w-auto" />
              <span className="font-[var(--font-display)] text-sm font-semibold tracking-wide text-[var(--color-primary-dark)]">
                Kcopi Global
              </span>
            </div>
            <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-primary-dark)]">
              {tour.category}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <span className="eyebrow">Trip Overview</span>
            <h2 className="mt-1 font-[var(--font-display)] text-2xl sm:text-3xl">{tour.title}</h2>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{tour.destination_name}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(([icon, label, value]) => (
                <div key={label} className="rounded-xl border border-[var(--color-line)] p-4">
                  <Icon name={icon} className="h-4 w-4 text-[var(--color-accent-dark)]" />
                  <span className="mt-2 block text-[11px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                    {label}
                  </span>
                  <b className="block text-sm leading-snug">{value}</b>
                </div>
              ))}
            </div>

            <div className="my-7 border-t border-dashed border-[var(--color-line)]" />

            <span className="eyebrow">What You&apos;ll Experience</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {tour.itinerary.map((day, i) => (
                <span
                  key={i}
                  className="rounded-full bg-[var(--color-bg-alt)] px-3.5 py-1.5 text-sm text-[var(--color-ink)]"
                >
                  {day.title}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
              {INCLUDED.map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon name={icon} className="h-4 w-4" />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[var(--color-bg-alt)] p-5">
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
    </section>
  );
}
