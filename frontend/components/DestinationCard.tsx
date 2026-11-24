import Link from "next/link";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { Destination, mediaUrl } from "@/lib/api";

export default function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <LoadingImage
        src={mediaUrl(d.hero_image)}
        alt={`${d.name}, ${d.country}`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

      {/* Viewfinder frame that tightens in on hover */}
      <div className="pointer-events-none absolute inset-4 rounded-2xl border border-white/0 transition-all duration-500 group-hover:inset-3 group-hover:border-white/25" />

      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
        {d.country}
      </div>

      <span className="absolute right-4 top-4 rounded-full bg-[var(--color-gold)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-primary-dark)] shadow-md">
        {d.tour_count} Safaris
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="font-[var(--font-script)] text-xl leading-none text-[var(--color-gold)]">{d.tagline}</span>
        <h3 className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-white">{d.name}</h3>
        <div className="flex translate-y-2 items-center gap-1.5 text-xs text-white/0 transition-all duration-500 group-hover:mt-2 group-hover:translate-y-0 group-hover:text-white/80">
          <Icon name="sun" className="h-3.5 w-3.5" /> Best time to visit: {d.best_time}
        </div>
      </div>
    </Link>
  );
}
