import type { Metadata } from "next";
import { mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about booking a Kcopi Global safari: best time to visit, visas, pricing, and more.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <PageHero
        image="/static/img/faq-hero.jpg"
        crumb="FAQs"
        title="Frequently Asked Questions"
        description="Everything you need to know before booking your East African safari."
        compact
      />

      <section className="py-24">
        <div className="container-page max-w-3xl">
          <FaqAccordion />
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary-dark)] px-6 py-16 text-center text-white sm:px-16">
            <LoadingImage src={mediaUrl("/static/img/faq-cta.jpg")} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative">
              <h2 className="text-4xl text-white">Still have questions?</h2>
              <p className="mt-4 text-white/85">Our team is happy to talk through anything not covered here.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a href="/contact" className="btn btn-primary">
                  Ask Us Directly
                </a>
                <a href="tel:+254712261111" className="btn btn-light">
                  <Icon name="phone" className="h-4 w-4" /> Call an Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
