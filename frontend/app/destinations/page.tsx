import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import PageHero from "@/components/PageHero";
import DestinationFeature from "@/components/DestinationFeature";
import DestinationsMap from "@/components/DestinationsMap";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore East Africa's top safari destinations: Maasai Mara, Amboseli, Serengeti, Tsavo, Lake Nakuru and Diani Beach.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  const destinations = await api.getDestinations();

  return (
    <>
      <PageHero
        image="/static/img/destinations-hero.jpg"
        crumb="Destinations"
        title="Destinations Across East Africa"
        description="Six iconic landscapes, endless ways to combine them. Pick a destination to see highlights, best time to visit, and matching safaris."
      />

      <section className="py-10 sm:py-12">
        <div className="container-page">
          <div className="mx-auto mb-5 max-w-md text-center">
            <span className="eyebrow mx-auto">Plan Your Route</span>
            <h2 className="text-xl sm:text-2xl">The Safari Trail</h2>
          </div>
          <DestinationsMap destinations={destinations} />
        </div>
      </section>

      <section className="overflow-hidden py-24">
        <div className="container-page space-y-28 sm:space-y-32">
          {destinations.map((d, i) => (
            <DestinationFeature key={d.slug} d={d} index={i} />
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-page text-center">
          <span className="eyebrow mx-auto">Not Sure Where to Start?</span>
          <h2 className="mx-auto max-w-xl text-4xl">Let an Expert Match a Destination to You</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-ink-soft)]">
            Tell us what you love, whether it&apos;s big cats, beaches, birding, or a honeymoon escape, and
            we&apos;ll recommend the right combination.
          </p>
          <Link href="/contact" className="btn btn-primary mt-7 inline-flex">
            Get a Personal Recommendation
          </Link>
        </div>
      </section>
    </>
  );
}
