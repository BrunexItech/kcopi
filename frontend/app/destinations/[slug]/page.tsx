import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api, mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import LoadingImage from "@/components/LoadingImage";
import DestinationCard from "@/components/DestinationCard";
import TourCard from "@/components/TourCard";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import BackLink from "@/components/BackLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const d = await api.getDestination(slug);
    const description = `Plan your trip to ${d.name}, ${d.country}: highlights, best time to visit, and curated safari itineraries.`;
    const image = mediaUrl(d.hero_image);
    return {
      title: d.name,
      description,
      openGraph: { title: d.name, description, images: [{ url: image, width: 1200, height: 800 }] },
      twitter: { card: "summary_large_image", title: d.name, description, images: [image] },
    };
  } catch {
    return { title: "Destination" };
  }
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let destination;
  try {
    destination = await api.getDestination(slug);
  } catch {
    notFound();
  }
  if (!destination) notFound();

  const [allDestinations, allTours] = await Promise.all([api.getDestinations(), api.getTours()]);
  const related = allDestinations.filter((d) => d.slug !== destination.slug).slice(0, 3);
  const matchingTours =
    allTours.filter((t) => t.destination_name.includes(destination.name.split(" ")[0])).slice(0, 3).length > 0
      ? allTours.filter((t) => t.destination_name.includes(destination.name.split(" ")[0])).slice(0, 3)
      : allTours.slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.blurb,
          image: mediaUrl(destination.hero_image),
          touristType: destination.highlights,
          address: { "@type": "PostalAddress", addressCountry: destination.country },
        }}
      />
      <PageHero
        image={destination.hero_image}
        crumb={destination.name}
        title={destination.name}
        description={destination.tagline}
        parent={{ label: "Destinations", href: "/destinations" }}
      />

      <div className="container-page">
        <div className="relative z-10 -mt-16 flex flex-wrap overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm sm:-mt-16">
          {[
            ["Country", destination.country],
            ["Best Time to Visit", destination.best_time],
            ["Safaris Available", `${destination.tour_count}+`],
            ["Typical Trip Length", "3 – 6 Days"],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              className={`min-w-[150px] flex-1 p-6 ${i < arr.length - 1 ? "border-b border-r-0 sm:border-b-0 sm:border-r" : ""} border-[var(--color-line)]`}
            >
              <span className="mb-1.5 block text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">{label}</span>
              <b className="font-[var(--font-display)] text-lg">{value}</b>
            </div>
          ))}
        </div>
        <div className="mt-6 flex">
          <BackLink href="/destinations" label="Back to Destinations" />
        </div>
      </div>

      <section className="py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">About This Destination</span>
            <h2 className="text-4xl">Why Visit {destination.name}</h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">{destination.blurb}</p>
            <ul className="mt-6 space-y-3.5">
              {destination.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-white">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-[var(--color-ink-soft)]">{h}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-7 inline-flex">
              Enquire About {destination.name}
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-md">
            <LoadingImage src={mediaUrl(destination.split_image)} alt={`${destination.name} wildlife`} fill sizes="50vw" className="object-cover" />
            <div className="absolute bottom-4 right-4 rounded-2xl bg-[var(--color-accent)] px-6 py-5 text-white shadow-md sm:bottom-6 sm:right-6">
              <b className="block font-[var(--font-display)] text-3xl">{destination.tour_count}+</b>
              <span className="text-xs uppercase tracking-wide">Curated Itineraries</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="mb-12 max-w-xl">
            <span className="eyebrow">Recommended Safaris</span>
            <h2 className="text-4xl">Tours Featuring {destination.name}</h2>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {matchingTours.map((t) => (
              <TourCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="mb-12 max-w-xl">
            <span className="eyebrow">Keep Exploring</span>
            <h2 className="text-4xl">Other Destinations You May Like</h2>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary-dark)] px-6 py-16 text-center text-white sm:px-16">
            <LoadingImage src={mediaUrl(destination.cta_image)} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative">
              <h2 className="text-4xl text-white">Ready to experience {destination.name}?</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Tell us your travel dates and group size, and our destination experts will build a tailor-made
                itinerary within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Start Planning
                </Link>
                <a href="tel:+254712261111" className="btn btn-light">
                  Call an Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
