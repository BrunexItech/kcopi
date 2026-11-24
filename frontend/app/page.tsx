import Link from "next/link";
import { api, mediaUrl } from "@/lib/api";
import DestinationCard from "@/components/DestinationCard";
import TourCard from "@/components/TourCard";
import HeroVideo from "@/components/HeroVideo";
import HeroSlides from "@/components/HeroSlides";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import Reviews from "@/components/Reviews";
import PromotionsStrip from "@/components/PromotionsStrip";
import Reveal from "@/components/Reveal";

export default async function HomePage() {
  const [destinations, tours, promotions] = await Promise.all([
    api.getDestinations(),
    api.getTours(),
    api.getPromotions().catch(() => []),
  ]);
  const activePromotions = promotions.filter((p) => p.category === "promotion" || p.category === "poster");

  return (
    <>
      <section className="relative flex h-[100svh] max-h-[820px] min-h-[560px] items-center overflow-hidden text-white">
        <HeroVideo poster="/static/img/hero-home.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/85" />
        <HeroSlides />
      </section>

      <PromotionsStrip items={activePromotions} />

      <div className="bg-[var(--color-primary-dark)] py-5 text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-7">
          {[
            "Licensed by the Kenya Tourism Board",
            "100% Kenyan-Owned & Operated",
            "Financially Protected Bookings",
            "24/7 In-Trip WhatsApp Support",
          ].map((item, i) => (
            <Reveal key={item} delay={i * 0.08} y={10} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
              <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" />
              {item}
            </Reveal>
          ))}
        </div>
      </div>

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="eyebrow mx-auto">Where to Go</span>
            <h2 className="text-4xl">Iconic East African Destinations</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              From the Mara&apos;s river crossings to Amboseli&apos;s elephant herds, six landscapes make up one
              unforgettable region.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 3) * 0.08}>
                <DestinationCard d={d} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/destinations" className="btn btn-outline">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-10 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal y={28} className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-md sm:aspect-[16/11] lg:aspect-[4/5]">
            <LoadingImage src={mediaUrl("/static/img/home-guide-jeep-2.jpg")} alt="Safari guide with guests" fill sizes="50vw" className="object-cover" />
            <div className="absolute bottom-4 right-4 rounded-2xl bg-[var(--color-accent)] px-6 py-5 text-white shadow-md sm:bottom-6 sm:right-6">
              <b className="block font-[var(--font-display)] text-3xl">18 yrs</b>
              <span className="text-xs uppercase tracking-wide">On the Ground in Kenya</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} y={28}>
            <span className="eyebrow">The Kcopi Global Difference</span>
            <h2 className="text-4xl">We don&apos;t sell safaris. We design them around you.</h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">
              Every itinerary is built from scratch by a destination expert who has driven these roads themselves,
              not assembled from a brochure. You get a named guide, transparent pricing, and a plan that fits your
              pace, budget, and curiosity.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">
              {(
                [
                  ["compass", "Local Expert Guides", "Kenyan-born, professionally certified driver-guides"],
                  ["shield", "Financially Protected", "Your booking and payments are fully safeguarded"],
                  ["chat", "24/7 Concierge", "WhatsApp support throughout your entire trip"],
                  ["pencil", "Fully Tailor-Made", "Every itinerary adjusted to your pace and budget"],
                ] as const
              ).map(([icon, title, desc]) => (
                <div key={title} className="flex gap-3 sm:gap-4">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-[var(--color-bg)] text-[var(--color-accent)] sm:h-[52px] sm:w-[52px]">
                    <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold sm:text-base">{title}</h4>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)] sm:text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="eyebrow mx-auto">Popular Right Now</span>
            <h2 className="text-4xl">Featured Safari Packages</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              A hand-picked starting point: every trip below can be customised to your dates and group.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {tours.slice(0, 3).map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.1}>
                <TourCard t={t} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/tours" className="btn btn-outline">
              View All Tours &amp; Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <Reveal className="mx-auto mb-12 max-w-xl text-center">
            <span className="eyebrow mx-auto">Guest Stories</span>
            <h2 className="text-4xl">
              What Our <span className="font-[var(--font-script)] text-[var(--color-accent)]">Travellers</span> Say
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Reviews limit={6} showSummary />
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary-dark)] px-6 py-16 text-center text-white sm:px-16 sm:py-24">
            <LoadingImage src={mediaUrl("/static/img/home-cta-sunset.jpg")} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl text-white sm:text-5xl">
                Your East African story starts with one message.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Tell us where, when, and with whom, and we&apos;ll have a tailor-made itinerary and quote in your
                inbox within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Start Planning My Safari
                </Link>
                <a href="tel:+254712261111" className="btn btn-light">
                  <Icon name="phone" className="h-4 w-4" /> Talk to an Expert Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
