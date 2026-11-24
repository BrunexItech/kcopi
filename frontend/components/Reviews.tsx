import Icon from "@/components/Icon";
import { Review, REVIEWS, reviewsForTour } from "@/lib/reviews";

const SOURCE_COLOR: Record<Review["source"], string> = {
  Google: "#4285F4",
  TripAdvisor: "#34E0A1",
  "Kcopi Global": "var(--color-accent)",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-[var(--color-gold)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name={i < rating ? "star-filled" : "star"} className="h-4 w-4" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="font-[var(--font-script)] text-5xl leading-none text-[var(--color-gold)]">&ldquo;</div>
        <span
          className="flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: SOURCE_COLOR[review.source] }}
        >
          {review.source}
        </span>
      </div>
      <div className="mb-2 mt-1">
        <Stars rating={review.rating} />
      </div>
      <p className="flex-1 font-[var(--font-display)] text-lg leading-relaxed text-[var(--color-ink-soft)] italic">
        {review.quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
          {review.initials}
        </span>
        <div>
          <b
            className="block text-2xl leading-none text-[var(--color-accent-dark)]"
            style={{ fontFamily: review.signatureFont }}
          >
            {review.name}
          </b>
          <span className="text-xs text-[var(--color-ink-soft)]">
            {review.place} &middot; {review.date}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({
  tourSlug,
  limit = 3,
  showSummary = false,
}: {
  tourSlug?: string;
  limit?: number;
  showSummary?: boolean;
}) {
  const reviews = tourSlug ? reviewsForTour(tourSlug, limit) : REVIEWS.slice(0, limit);

  return (
    <div>
      {showSummary && (
        <p className="mx-auto mb-12 max-w-xl text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
          As shared by travellers on Google, TripAdvisor, and directly with our team
        </p>
      )}
      <div className={`grid grid-cols-1 gap-7 ${limit >= 3 ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}>
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </div>
  );
}
