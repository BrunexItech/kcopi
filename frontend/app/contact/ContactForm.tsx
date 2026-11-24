"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import Icon from "@/components/Icon";

const DESTINATIONS = [
  "Maasai Mara",
  "Amboseli",
  "Serengeti",
  "Tsavo East & West",
  "Lake Nakuru",
  "Diani Beach",
  "Not sure yet, need advice",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefillTour = searchParams.get("tour") || "";

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await api.createEnquiry({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        destination: String(data.get("destination") || ""),
        dates: String(data.get("dates") || ""),
        guests: data.get("guests") ? Number(data.get("guests")) : undefined,
        message: String(data.get("message") || ""),
      });
      setSent(true);
      form.reset();
    } catch {
      setError("Something went wrong sending your enquiry. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-[var(--color-bg-alt)] p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <Icon name="check-circle" className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl">Thank you! Your message has been received.</h3>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          A Kcopi Global destination expert will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-md sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold" htmlFor="destination">
            Destination of Interest
          </label>
          <select
            id="destination"
            name="destination"
            defaultValue={DESTINATIONS[0]}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3.5"
          >
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <Field label="Preferred Travel Dates" name="dates" placeholder="e.g. 12–20 July 2027" />
        <Field label="Number of Travellers" name="guests" type="number" placeholder="2" />
        <div className="col-span-full flex flex-col gap-2">
          <label className="text-sm font-bold" htmlFor="message">
            Tell us about your trip
          </label>
          <textarea
            id="message"
            name="message"
            defaultValue={prefillTour ? `I'm interested in: ${prefillTour}\n\n` : ""}
            rows={5}
            placeholder="Occasion, budget range, must-see wildlife, anything else that helps us plan..."
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3.5"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className="btn btn-primary mt-5 w-full disabled:opacity-60">
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
      <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        . We never share your details with third parties.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3.5"
      />
    </div>
  );
}
