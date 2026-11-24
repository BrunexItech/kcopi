import { mediaUrl } from "@/lib/api";

export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 bg-[var(--color-bg)]">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-bg-alt)]" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[var(--color-accent)] border-r-[var(--color-gold)]" />
        <div className="absolute inset-[5px] grid place-items-center overflow-hidden rounded-full bg-[var(--color-bg)] p-1.5">
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
      {label && (
        <p className="animate-pulse text-sm font-semibold tracking-wide text-[var(--color-ink-soft)]">{label}</p>
      )}
    </div>
  );
}
