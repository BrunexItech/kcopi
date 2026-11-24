import LoadingImage from "@/components/LoadingImage";
import { MediaAsset, mediaUrl } from "@/lib/api";

export default function PromotionsStrip({ items }: { items: MediaAsset[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-10">
      <div className="container-page">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
            Current Offers
          </span>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[16/9] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-sm sm:w-[340px]"
            >
              <LoadingImage src={mediaUrl(item.image_path)} alt={item.title} fill sizes="340px" className="object-cover" />
              {item.title && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 right-4 font-[var(--font-display)] text-lg text-white">
                    {item.title}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
