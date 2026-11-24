import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BackLink from "@/components/BackLink";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

const SECTIONS: [string, string][] = [
  [
    "Bookings & Deposits",
    "A non-refundable deposit of 30% is required to confirm any booking, with the balance due 60 days before departure. Bookings made within 60 days of travel require full payment at the time of booking.",
  ],
  [
    "Cancellations",
    "Cancellations made more than 60 days before departure forfeit the deposit only. Cancellations within 60 days are subject to a sliding scale of fees as outlined in your booking confirmation. We strongly recommend travel insurance.",
  ],
  [
    "Itinerary Changes",
    "While we make every effort to deliver itineraries as planned, wildlife sightings, weather, and park authority decisions can require last-minute changes. Kcopi Global is not liable for changes outside our reasonable control.",
  ],
  [
    "Liability",
    "Kcopi Global acts as an agent for accommodation and transport providers and is not liable for their acts or omissions beyond what is required by Kenyan law.",
  ],
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        image="/static/img/legal-hero.jpg"
        crumb="Terms & Conditions"
        title="Terms & Conditions"
        description="Please read these terms carefully before booking a safari with Kcopi Global."
        compact
      />
      <section className="py-24">
        <div className="container-page max-w-3xl">
          <div className="mb-10 flex">
            <BackLink href="/" label="Back to Home" />
          </div>
          <div className="space-y-8">
            {SECTIONS.map(([h, p]) => (
              <div key={h}>
                <h3 className="text-xl">{h}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
