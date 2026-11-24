import Link from "next/link";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { Destination, mediaUrl } from "@/lib/api";
import Reveal from "@/components/Reveal";

// A full editorial spread per destination rather than another card in a
// uniform grid — the grid treatment already lives on the homepage, so
// repeating it here would just be the same component twice. Alternating
// sides, an oversized index numeral, and the (previously unused) blurb +
// highlights fields give each destination room to actually say something,
// closer to a magazine feature than a listing tile.
export default function DestinationFeature({
  d,
  index,
}: {
  d: Destination;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <Reveal
      y={36}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-[var(--font-display)] text-[10rem] font-bold leading-none text-[var(--color-ink)]/[0.04] sm:-top-20 sm:text-[13rem] lg:left-0 lg:-translate-x-0"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl sm:aspect-[5/4]">
          <LoadingImage
            src={mediaUrl(d.split_image || d.hero_image)}
            alt={`${d.name}, ${d.country}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            {d.country}
          </div>
          <div className="absolute -bottom-5 right-5 rounded-2xl bg-[var(--color-surface)] px-5 py-4 text-center shadow-lg sm:right-8">
            <b className="block font-[var(--font-display)] text-2xl text-[var(--color-primary-dark)]">{d.tour_count}</b>
            <span className="text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]">Safaris</span>
          </div>
        </div>
      </div>

      <div>
        <span className="font-[var(--font-script)] text-2xl leading-none text-[var(--color-accent)]">{d.tagline}</span>
        <h2 className="mt-2 font-[var(--font-display)] text-4xl sm:text-5xl">{d.name}</h2>
        <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">{d.blurb}</p>

        {d.highlights?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {d.highlights.map((h) => (
              <span key={h} className="rounded-full bg-[var(--color-bg-alt)] px-3.5 py-1.5 text-sm text-[var(--color-ink)]">
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
          <Icon name="sun" className="h-4 w-4 text-[var(--color-accent-dark)]" />
          Best time to visit: <span className="font-semibold text-[var(--color-ink)]">{d.best_time}</span>
        </div>

        <Link href={`/destinations/${d.slug}`} className="btn btn-primary mt-7 inline-flex">
          Explore {d.name} <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </Reveal>
  );
}
