import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kcopi Global to plan your tailor-made East Africa safari. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/static/img/contact-hero.jpg"
        crumb="Contact"
        title="Let's Plan Your Safari"
        description="Share a few details and a destination expert will reply within 24 hours with availability and a tailored quote. No payment is required to enquire."
        compact
      />

      <section className="py-24">
        <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Suspense fallback={<div className="rounded-2xl bg-[var(--color-surface)] p-10 shadow-md">Loading form…</div>}>
            <ContactForm />
          </Suspense>

          <aside className="rounded-2xl bg-[var(--color-surface)] p-7 shadow-sm">
            <h3 className="text-xl">Other Ways to Reach Us</h3>
            <div className="mt-6 space-y-5">
              {(
                [
                  ["phone", "Call / WhatsApp", "+254 712 261 111", "tel:+254712261111"],
                  ["mail", "Email", "kcopi.info@gmail.com", "mailto:kcopi.info@gmail.com"],
                  ["map-pin", "Office", "P.O Box 363, Narok, Kenya", null],
                  ["clock", "Response Time", "Within 24 hours, 7 days a week", null],
                ] as const
              ).map(([icon, title, value, href]) => (
                <div key={title} className="flex gap-4">
                  <span className="grid h-[52px] w-[52px] flex-shrink-0 place-items-center rounded-lg bg-[var(--color-bg-alt)] text-[var(--color-accent)]">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold">{title}</h4>
                    {href ? (
                      <a href={href} className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[var(--color-ink-soft)]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
