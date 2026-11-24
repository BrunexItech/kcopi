import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api, mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PriceTag from "@/components/PriceTag";
import Reviews from "@/components/Reviews";
import BackLink from "@/components/BackLink";
import { formatDuration } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const t = await api.getTour(slug);
    const description = `${t.title}: ${t.days} days / ${t.nights} nights from $${t.price_usd}. Full itinerary, inclusions, and enquiry form.`;
    const image = mediaUrl(t.hero_image);
    return {
      title: t.title,
      description,
      openGraph: { title: t.title, description, images: [{ url: image, width: 1200, height: 800 }] },
      twitter: { card: "summary_large_image", title: t.title, description, images: [image] },
    };
  } catch {
    return { title: "Tour" };
  }
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let tour;
  try {
    tour = await api.getTour(slug);
  } catch {
    notFound();
  }
  if (!tour) notFound();

  const [allTours, gallery] = await Promise.all([
    api.getTours(),
    api.getGallery().catch(() => []),
  ]);
  const related = allTours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  // Deterministic, per-tour offset into the gallery so every tour's itinerary
  // cycles through a different starting point in the same photo set — two
  // tours sitting side by side in a listing never show the same day-by-day
  // images in the same order.
  const tourIndex = Math.max(0, allTours.findIndex((t) => t.slug === tour.slug));
  const dayImage = (dayIndex: number) =>
    gallery.length > 0 ? gallery[(tourIndex * 3 + dayIndex) % gallery.length] : null;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.title,
          description: tour.summary,
          image: mediaUrl(tour.hero_image),
          touristType: tour.category,
          offers: {
            "@type": "Offer",
            price: tour.price_usd,
            priceCurrency: "USD",
          },
          itinerary: tour.itinerary.map((day) => ({
            "@type": "TouristAttraction",
            name: day.title,
            description: day.desc,
          })),
        }}
      />
      <PageHero
        image={tour.hero_image}
        crumb={tour.title}
        title={tour.title}
        description={tour.summary}
        parent={{ label: "Tours & Packages", href: "/tours" }}
      />

      <div className="container-page">
        <div className="mb-6 mt-6 flex">
          <BackLink href="/tours" label="Back to Tours & Packages" />
        </div>
        <div className="relative z-10 flex flex-wrap overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm">
          {[
            ["Duration", formatDuration(tour.days, tour.nights)],
            ["Destination", tour.destination_name],
            ["Group Size", tour.group_size],
            ["Style", tour.style],
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
      </div>

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <span className="eyebrow mx-auto">Day-by-Day Itinerary</span>
            <h2 className="text-4xl">The Journey, Day by Day</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              A real sense of what each day on this safari actually looks like.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {tour.itinerary.map((day, i) => {
              const img = dayImage(i);
              const reversed = i % 2 === 1;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:gap-14 ${
                    reversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg lg:w-[46%]">
                    {img ? (
                      <LoadingImage
                        src={mediaUrl(img.image_path)}
                        alt={img.alt || day.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[var(--color-bg-alt)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/95 font-[var(--font-display)] text-lg font-bold text-[var(--color-primary-dark)] shadow-md">
                      {i + 1}
                    </span>
                  </div>

                  <div className="w-full lg:w-[54%]">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-dark)]">
                      {day.label}
                    </span>
                    <h3 className="mt-2 font-[var(--font-display)] text-2xl sm:text-3xl">{day.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">{day.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Included</span>
            <h2 className="text-4xl">What&apos;s Included</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {(
                [
                  ["car", "Transport", "4x4 safari vehicle with pop-up roof and dedicated driver-guide"],
                  ["tent", "Accommodation", `${tour.nights} nights as per itinerary, full board`],
                  ["utensils", "Meals", "All meals included while on safari"],
                  ["ticket", "Park Fees", "All conservancy and national park entry fees"],
                ] as const
              ).map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-sm"
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="flex items-center gap-1.5 font-semibold">
                      {title}
                      <Icon name="check-circle" className="h-4 w-4 text-[var(--color-primary)]" />
                    </h4>
                    <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="sticky top-28 rounded-2xl bg-[var(--color-surface)] p-7 shadow-md">
            <div className="flex items-baseline gap-2">
              <b className="font-[var(--font-display)] text-3xl text-[var(--color-primary-dark)]">
                <PriceTag usdAmount={tour.price_usd} />
              </b>
              <span className="text-[var(--color-ink-soft)]">/ person</span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Based on double/twin occupancy, shared vehicle</p>
            <hr className="my-5 border-[var(--color-line)]" />
            {[
              ["Duration", `${tour.days} Days`],
              ["Group size", tour.group_size],
              ["Destination", tour.destination_name],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 text-sm">
                <span>{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
            <Link href={`/contact?tour=${encodeURIComponent(tour.title)}`} className="btn btn-primary mt-5 w-full">
              Enquire &amp; Get a Custom Quote
            </Link>
            <a href="tel:+254712261111" className="btn btn-outline mt-3 w-full">
              <Icon name="phone" className="h-4 w-4" /> Call an Expert
            </a>
            <p className="mt-4 text-xs text-[var(--color-ink-soft)]">
              No payment required to enquire. Our team responds within 24 hours with availability and a tailored
              quote.
            </p>
          </aside>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="mb-12 max-w-xl">
            <span className="eyebrow">Guest Stories</span>
            <h2 className="text-4xl">Travellers on This Safari</h2>
          </div>
          <Reviews tourSlug={tour.slug} limit={3} />
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="mb-12 max-w-xl">
            <span className="eyebrow">You May Also Like</span>
            <h2 className="text-4xl">Similar Safaris</h2>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
