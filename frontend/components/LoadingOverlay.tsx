import { mediaUrl } from "@/lib/api";

// The one thing every route's loading.tsx renders first, on top of its own
// skeleton shapes — so a page transition always reads as "spinner, then
// content," never "gray placeholder, then (eventually) a spinner." Fixed and
// centred regardless of how tall the skeleton underneath is.
export default function LoadingOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center">
      <div className="relative h-14 w-14 drop-shadow-lg">
        <div className="absolute inset-0 rounded-full border-[3px] border-[var(--color-line)] bg-[var(--color-surface)]/70" />
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[var(--color-accent)] border-r-[var(--color-gold)]" />
        <div className="absolute inset-[4px] grid place-items-center overflow-hidden rounded-full bg-[var(--color-surface)] p-2">
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
