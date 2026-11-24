"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mediaUrl } from "@/lib/api";
import Icon from "@/components/Icon";
import { subscribePageLoading } from "@/lib/pageLoadingSignal";
import { api } from "@/lib/api";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await api.subscribeNewsletter(email.trim());
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
        <Icon name="check-circle" className="h-4 w-4" /> You&apos;re subscribed. Watch your inbox for safari tips.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-[var(--color-gold)]"
      />
      <button type="submit" disabled={status === "loading"} className="btn btn-primary !px-6 !py-3 whitespace-nowrap">
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-red-300 sm:self-center">Something went wrong. Please try again.</p>}
    </form>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [pageLoading, setPageLoadingState] = useState(false);

  useEffect(() => subscribePageLoading(setPageLoadingState), []);

  if (pathname?.startsWith("/admin")) return null;
  if (pageLoading) return null;

  return (
    <footer className="bg-[var(--color-primary-dark)] pt-20 text-white/75">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-white/5 p-8 sm:flex-row sm:items-center">
          <div>
            <h5 className="font-[var(--font-display)] text-xl text-white">Get safari tips &amp; seasonal offers</h5>
            <p className="mt-1 text-sm text-white/65">One email a month. No spam, unsubscribe anytime.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2.5 font-[var(--font-display)] text-xl font-medium text-white">
              <img src={mediaUrl("/static/img/logo-icon.png")} alt="Kcopi Global" className="h-10 w-auto" />
              Kcopi Global
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Kenya-based safari specialists crafting tailor-made journeys across East Africa, from the Maasai Mara
              and Serengeti to Amboseli and beyond.
            </p>
          </div>

          <div>
            <h5 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white">Destinations</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/destinations/masai-mara" className="transition-colors hover:text-white">Maasai Mara</Link></li>
              <li><Link href="/destinations/amboseli" className="transition-colors hover:text-white">Amboseli</Link></li>
              <li><Link href="/destinations/serengeti" className="transition-colors hover:text-white">Serengeti</Link></li>
              <li><Link href="/destinations/tsavo" className="transition-colors hover:text-white">Tsavo East &amp; West</Link></li>
              <li><Link href="/destinations/lake-nakuru" className="transition-colors hover:text-white">Lake Nakuru</Link></li>
              <li><Link href="/destinations/diani-beach" className="transition-colors hover:text-white">Diani Beach</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white">Company</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="transition-colors hover:text-white">About Us</Link></li>
              <li><Link href="/tours" className="transition-colors hover:text-white">Tours &amp; Packages</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-white">Blog</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">FAQs</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white">Reach Us</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+254712261111" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Icon name="phone" className="h-4 w-4 text-[var(--color-gold)]" /> +254 712 261 111
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254712261111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-[var(--color-gold)]" /> WhatsApp: 0712 261 111
                </a>
              </li>
              <li>
                <a href="mailto:hello@kcopiglobal.co.ke" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Icon name="mail" className="h-4 w-4 text-[var(--color-gold)]" /> hello@kcopiglobal.co.ke
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="map-pin" className="h-4 w-4 text-[var(--color-gold)]" /> P.O Box 363, Narok, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row">
          <span>© 2026 Kcopi Global. All rights reserved. Narok, Kenya · Licensed Tour Operator</span>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
