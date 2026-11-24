import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import PageHero from "@/components/PageHero";
import TourFilter from "./TourFilter";

export const metadata: Metadata = {
  title: "Tours & Packages",
  description: "Browse Kcopi Global safari packages across Kenya and Tanzania: wildlife, family, and honeymoon itineraries from 3 to 8 days.",
  alternates: { canonical: "/tours" },
};

export default async function ToursPage() {
  const tours = await api.getTours();

  return (
    <>
      <PageHero
        image="/static/img/tours-hero.jpg"
        crumb="Tours & Packages"
        title={
          <>
            Tours &amp; Safari <span className="font-[var(--font-script)] text-[var(--color-gold)]">Packages</span>
          </>
        }
        description="Hand-built itineraries from 3 to 8 days. Every package is a starting point: dates, pace, and accommodation can all be tailored to you."
      />

      <section className="relative bg-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-x-0 top-0">
          <div className="container-page">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
          </div>
        </div>
        <div className="container-page">
          <div className="mb-12 text-center sm:mb-16">
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-dark)] sm:px-6 sm:text-sm">
              Choose Your Safari
            </span>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-light tracking-wide text-[var(--color-ink)] sm:text-4xl md:text-5xl lg:text-6xl">
              Your <span className="font-[var(--font-script)] text-[var(--color-accent)]">Exclusive</span> Adventure
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="h-0.5 w-16 bg-[var(--color-gold)]" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-light text-[var(--color-ink-soft)] sm:text-base md:text-lg">
              Six unique ways to experience the wild. One unforgettable adventure.
            </p>
          </div>
          <TourFilter tours={tours} />
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-accent)]/15 bg-[var(--color-surface)]/80 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="mx-auto max-w-xl text-3xl tracking-wide sm:text-4xl">
              Not sure which safari is right for you?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-ink-soft)]">
              Combine destinations, change the pace, or add a honeymoon finish, and our planners will rebuild any
              package around your dates and budget.
            </p>
            <Link href="/contact" className="btn btn-primary mt-7 inline-flex">
              Request a Custom Itinerary
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
