import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import PageHero from "@/components/PageHero";
import DestinationCard from "@/components/DestinationCard";
import DestinationsMap from "@/components/DestinationsMap";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore East Africa's top safari destinations: Maasai Mara, Amboseli, Serengeti, Tsavo, Lake Nakuru and Diani Beach.",
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

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <span className="eyebrow mx-auto">Plan Your Route</span>
            <h2 className="text-4xl">The Safari Trail</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              Hover a point to see what&apos;s there, and click to explore how these six destinations sit together
              across East Africa.
            </p>
          </div>
          <DestinationsMap destinations={destinations} />
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
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
