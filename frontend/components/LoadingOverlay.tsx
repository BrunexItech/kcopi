import { mediaUrl } from "@/lib/api";

// The entire loading state for every route: a clean, solid-colour screen
// with just the spinner on it — no skeleton shapes or shimmer blocks behind
// it that could read as "a gray, broken-looking page trying to open."
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--color-bg)]">
      <div className="relative h-14 w-14 drop-shadow-lg">
        <div className="absolute inset-0 rounded-full border-[3px] border-[var(--color-line)]" />
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[var(--color-accent)] border-r-[var(--color-gold)]" />
        <div className="absolute inset-[4px] grid place-items-center overflow-hidden rounded-full bg-[var(--color-surface)] p-2">
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
