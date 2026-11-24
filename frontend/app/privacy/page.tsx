import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

const SECTIONS: [string, string][] = [
  [
    "Information We Collect",
    "We collect the information you provide through our enquiry and booking forms, including your name, contact details, and trip preferences.",
  ],
  [
    "How We Use It",
    "Your information is used solely to respond to enquiries, process bookings, and send trip-related communication. We do not sell or share your data with third parties for marketing purposes.",
  ],
  [
    "Data Security",
    "We use industry-standard safeguards to protect your information and retain it only as long as necessary to fulfil the purposes outlined in this policy.",
  ],
  [
    "Your Rights",
    "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@kcopiglobal.co.ke.",
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        image="/static/img/legal-hero.jpg"
        crumb="Privacy Policy"
        title="Privacy Policy"
        description="How Kcopi Global collects, uses, and protects your personal information."
        compact
      />
      <section className="py-24">
        <div className="container-page max-w-3xl space-y-8">
          {SECTIONS.map(([h, p]) => (
            <div key={h}>
              <h3 className="text-xl">{h}</h3>
              <p className="mt-2 text-[var(--color-ink-soft)]">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
