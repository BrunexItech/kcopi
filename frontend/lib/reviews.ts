// Single source of truth for guest reviews shown across the site (homepage,
// tour detail pages). Realistic placeholder content, structured so it can be
// swapped for a live feed (e.g. Google Places API) later with no component
// changes — each entry already carries a `source` the way a real API would.
export interface Review {
  quote: string;
  name: string;
  place: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "TripAdvisor" | "Kcopi Global";
  date: string; // human-readable, e.g. "October 2026"
  signatureFont: string;
  tourSlug?: string; // ties a review to a specific tour, for the detail-page view
}

export const REVIEWS: Review[] = [
  {
    quote:
      "The Mara river crossing we witnessed on day two will stay with us forever. Our guide James seemed to read the land like a book.",
    name: "Laura B.",
    place: "United Kingdom",
    initials: "LB",
    rating: 5,
    source: "TripAdvisor",
    date: "September 2026",
    signatureFont: "var(--font-signature)",
    tourSlug: "masai-mara-classic-safari",
  },
  {
    quote:
      "Seamless from the first WhatsApp message to the airport drop-off. Everything was exactly as promised, no surprises.",
    name: "David & Priya M.",
    place: "Singapore",
    initials: "DP",
    rating: 5,
    source: "Google",
    date: "August 2026",
    signatureFont: "var(--font-signature-alt)",
  },
  {
    quote:
      "Our kids still talk about the hot air balloon safari. Kcopi Global paced the whole trip perfectly for a family with young children.",
    name: "The Osei Family",
    place: "USA",
    initials: "OF",
    rating: 5,
    source: "Google",
    date: "July 2026",
    signatureFont: "var(--font-handwritten)",
  },
  {
    quote:
      "Our guide spotted a leopard in a tree from what felt like a mile away. Three game drives, three different cats. Worth every shilling.",
    name: "Marco T.",
    place: "Italy",
    initials: "MT",
    rating: 5,
    source: "TripAdvisor",
    date: "July 2026",
    signatureFont: "var(--font-signature)",
    tourSlug: "great-migration-serengeti",
  },
  {
    quote:
      "Honest communication throughout. When our original camp was overbooked, they moved us to an equal or better option without being asked twice.",
    name: "Chloe R.",
    place: "Australia",
    initials: "CR",
    rating: 4,
    source: "Google",
    date: "June 2026",
    signatureFont: "var(--font-signature-alt)",
  },
  {
    quote:
      "Diani Beach after five days in the bush was the perfect close to the trip. Our planner built the whole thing around our honeymoon, down to the sunset dinner.",
    name: "Aisha & Tomás",
    place: "Spain",
    initials: "AT",
    rating: 5,
    source: "Kcopi Global",
    date: "May 2026",
    signatureFont: "var(--font-handwritten)",
    tourSlug: "honeymoon-safari-escape",
  },
  {
    quote:
      "We've used operators in three African countries over the years, and this was the most organised, with the only upfront pricing we've seen.",
    name: "Helmut S.",
    place: "Germany",
    initials: "HS",
    rating: 5,
    source: "TripAdvisor",
    date: "April 2026",
    signatureFont: "var(--font-signature)",
  },
  {
    quote:
      "The packing list and visa guide they sent ahead of time removed every bit of pre-trip anxiety. Then the safari itself exceeded what we'd pictured.",
    name: "The Fernandez Family",
    place: "Mexico",
    initials: "FF",
    rating: 5,
    source: "Google",
    date: "March 2026",
    signatureFont: "var(--font-handwritten)",
  },
];

export function reviewsForTour(tourSlug: string, limit = 3): Review[] {
  const specific = REVIEWS.filter((r) => r.tourSlug === tourSlug);
  const rest = REVIEWS.filter((r) => r.tourSlug !== tourSlug);
  return [...specific, ...rest].slice(0, limit);
}
