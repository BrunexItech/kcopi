import Link from "next/link";
import type { Metadata } from "next";
import { api, mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Kcopi Global, a Kenyan-owned safari operator guiding East Africa since 2008.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "2008", title: "Three Guides, One Land Cruiser", description: "Kcopi Global starts in Narok with a single vehicle and a promise: every trip planned like it's for family." },
  { year: "2012", title: "Crossing Into Tanzania", description: "We open Serengeti and the Great Migration circuit, pairing Kenyan and Tanzanian guides on every cross-border trip." },
  { year: "2016", title: "A Desk on the Coast", description: "A dedicated Diani Beach team launches, bringing honeymoon and family beach extensions into every itinerary." },
  { year: "2020", title: "Community Conservancy Partnership", description: "A fixed share of every booking starts funding community-run conservancies bordering the Mara and Amboseli." },
  { year: "2026", title: "Still Kenyan-Owned", description: "Now a full operator with a dedicated guide for every region we cover, still led by the same founder." },
];

const FOUNDER_LETTER = {
  name: "Stephanie",
  title: "Founder",
  message:
    "I grew up falling asleep to a sound people now fly thousands of miles and pay a great deal of money to hear: the long, rolling call of a lion somewhere past our fence, answered a few seconds later by another, further off, and then a silence so complete you could hear your own heartbeat. My grandmother used to say the lions were having a conversation and it was rude to interrupt, so we'd lie still in the dark and just listen.\n\nMornings smelled like woodsmoke and wet grass. I knew the sound a thousand wildebeest hooves make on dry earth before I knew my times tables, and I could tell you whether rain was an hour away or a day away just from how the light shifted over the escarpment. My father woke me before sunrise more times than I can count and taught me to sit so still that a herd of elephants would pass close enough to hear them breathe, close enough to smell the dust on their skin.\n\nIt took leaving, two years studying abroad, for me to understand that none of this had been ordinary. I'd describe an evening at home: the sky turning the colour of a ripe mango, dust rising gold off a herd on the move, the particular hush that falls over the plain right before something enormous happens, and people listened like I was describing another planet. To them it was poetry. To me it had simply been a Tuesday.\n\nThat's the moment I understood what I actually wanted to build. Not a company that drives people past animals and calls it a safari, but one that hands a stranger the exact feeling I grew up with: the goosebumps, the hush, the sense of being very small and very lucky at once. Every itinerary we design is built around giving a guest at least one moment like that, the kind you don't photograph so much as simply stand inside.\n\nWe started in 2008 with one Land Cruiser and three guides my father trained with his own hands, people who grew up reading the land the same way I did. That's still who takes you out today, not because it photographs well, but because it's the only way to actually hand someone what was given to me for free as a child.\n\nI still go out on drives whenever I can, not for work, just to sit in the quiet and remember why any of this started. If you travel with us, that's the gift I want you to carry home: not a checklist of animals ticked off a list, but a handful of moments so vivid you'll still feel them on an ordinary afternoon, years from now, the same way I still feel mine.",
  signature: "Stephanie",
  signatureFont: "var(--font-signature)",
};

export default async function AboutPage() {
  let galleryPreview: Awaited<ReturnType<typeof api.getGallery>> = [];
  try {
    galleryPreview = (await api.getGallery()).slice(0, 6);
  } catch {
    galleryPreview = [];
  }

  return (
    <>
      <PageHero
        image="/static/img/about-hero.jpg"
        crumb="About"
        title="Born in Kenya. Built for the Trail."
        description="Kcopi Global started with three guides and one Land Cruiser in 2008. Today we're a full Kenyan-owned safari operator, still led by the same obsession with getting every detail right."
      />

      <section className="py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="text-4xl">Local roots. International standards.</h2>
            <p className="story-paragraph mt-4 text-[var(--color-ink-soft)]">
              We&apos;re a Narok-based, Kenyan-owned tour operator. Every guide on our team grew up near the parks
              we drive through, which means you get insight no guidebook can offer, paired with the reliability
              and communication international travellers expect.
            </p>
            <p className="story-paragraph mt-4 text-[var(--color-ink-soft)]">
              We keep our group sizes small, our vehicles well-maintained, and our planning transparent: no hidden
              fees, no generic templates, no itinerary we wouldn&apos;t send our own family on.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-md">
            <LoadingImage src={mediaUrl("/static/img/about-story-guide.jpg")} alt="Safari guide in the field" fill sizes="50vw" className="object-cover" />
            <div className="absolute bottom-4 right-4 rounded-2xl bg-[var(--color-accent)] px-6 py-5 text-white shadow-md sm:bottom-6 sm:right-6">
              <b className="block font-[var(--font-display)] text-3xl">2008</b>
              <span className="text-xs uppercase tracking-wide">Founded in Narok</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-bg-alt)] py-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, var(--color-line) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="container-page relative">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <span className="eyebrow mx-auto">Our Journey</span>
            <h2 className="text-4xl">The Kcopi Global Timeline</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-line)] via-[var(--color-accent)]/40 to-[var(--color-line)]" />
            {TIMELINE.map((event, index) => (
              <div key={event.year} className={`relative mb-10 flex items-start last:mb-0 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <span className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-bg-alt)] bg-[var(--color-accent)] shadow" />
                <div className={`w-[calc(50%-24px)] ${index % 2 === 0 ? "pr-6 text-right" : "pl-6 text-left"}`}>
                  <div className="rounded-xl bg-[var(--color-surface)] p-5 shadow-sm">
                    <span className="block font-[var(--font-display)] text-xl text-[var(--color-accent-dark)]">{event.year}</span>
                    <h3 className="font-[var(--font-display)] text-lg tracking-wide">{event.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="eyebrow mx-auto">What We Stand For</span>
            <h2 className="text-4xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
            {(
              [
                ["price-tag", "Honest Pricing", "Transparent quotes with no hidden add-ons."],
                ["globe", "Conservation First", "A share of every booking supports community conservancies."],
                ["users", "Community-Led", "100% Kenyan-owned and locally staffed."],
                ["star", "Small Groups", "Vehicles capped at 7 guests for a better view and a lighter footprint."],
              ] as const
            ).map(([icon, title, desc]) => (
              <div key={title} className="flex flex-col items-start gap-3">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-lg bg-[var(--color-bg)] text-[var(--color-accent)]">
                  <Icon name={icon} className="h-6 w-6" />
                </span>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-[var(--color-ink-soft)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryPreview.length > 0 && (
        <section className="bg-[var(--color-bg-alt)] py-24">
          <div className="container-page">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="eyebrow mx-auto">Life On the Trail</span>
              <h2 className="text-4xl">A Glimpse of the Journey</h2>
              <p className="mt-3 text-[var(--color-ink-soft)]">
                Real moments from real trips: wildlife, landscapes, and the people who make it unforgettable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {galleryPreview.map((img, i) => (
                <div
                  key={img.id}
                  className={`relative overflow-hidden rounded-2xl shadow-sm ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
                  }`}
                >
                  <LoadingImage
                    src={mediaUrl(img.image_path)}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/gallery" className="btn btn-outline">
                View Full Gallery <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-page">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <span className="eyebrow mx-auto">From Our Founder</span>
            <h2 className="text-4xl">Words From the Heart</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">One story. A lifetime of dedication to East Africa.</p>
          </div>
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] font-[var(--font-display)] text-xl font-semibold text-white shadow-md">
                {FOUNDER_LETTER.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-[var(--font-display)] text-xl tracking-wide">{FOUNDER_LETTER.name}</h3>
                <p className="text-xs text-[var(--color-ink-soft)]">{FOUNDER_LETTER.title}</p>
              </div>
            </div>
            <div className="relative mt-6">
              <span className="absolute -left-1 -top-3 font-[var(--font-display)] text-5xl text-[var(--color-accent)]/10">&ldquo;</span>
              <div className="relative space-y-3 pl-5">
                {FOUNDER_LETTER.message.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-handwritten)" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-[var(--color-line)] pt-5">
              <p className="text-2xl text-[var(--color-accent-dark)]" style={{ fontFamily: FOUNDER_LETTER.signatureFont }}>
                {FOUNDER_LETTER.signature}
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">Kcopi Global</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary-dark)] px-6 py-16 text-center text-white sm:px-16">
            <LoadingImage src={mediaUrl("/static/img/about-cta.jpg")} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative">
              <h2 className="text-4xl text-white">Want to plan your safari with us?</h2>
              <p className="mt-4 text-white/85">Reach out and a destination expert will respond within 24 hours.</p>
              <Link href="/contact" className="btn btn-primary mt-7 inline-flex">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
