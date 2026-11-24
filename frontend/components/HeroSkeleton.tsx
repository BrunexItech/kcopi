import Skeleton from "@/components/Skeleton";

// Mirrors PageHero's own two size variants exactly, so the skeleton occupies
// the same space the real hero will — no layout jump once content arrives.
export default function HeroSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative w-full bg-[var(--color-primary-dark)] ${
        compact ? "h-[45vh] max-h-[380px] min-h-[300px]" : "h-[70vh] max-h-[620px] min-h-[420px]"
      }`}
    >
      <div className="absolute inset-0 opacity-40">
        <Skeleton className="h-full w-full !rounded-none" />
      </div>
      {/* The shimmer above reads as a flat gray panel on its own — this spin
          keeps continuous, visible motion from the very first frame of a
          page transition, carrying through until LoadingImage's own spinner
          takes over once the real hero image starts loading. */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[var(--color-gold)]" />
        </div>
      </div>
      <div className="container-page relative flex h-full flex-col justify-end pb-16">
        <Skeleton className="mb-4 h-4 w-40 bg-white/10" />
        <Skeleton className="h-12 w-1/2 max-w-md bg-white/15 sm:h-14" />
        {!compact && <Skeleton className="mt-4 h-4 w-full max-w-sm bg-white/10" />}
      </div>
    </div>
  );
}
