"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const CONSENT_KEY = "kcopi_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // ignore (private browsing / blocked storage) — just don't show the
      // banner rather than risk it reappearing every load.
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[150] border-t border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="container-page flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--color-ink-soft)]">
          We use cookies to understand how visitors use this site and improve your experience. See our{" "}
          <Link href="/privacy" className="font-semibold text-[var(--color-accent-dark)] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => choose("declined")} className="btn btn-outline !px-4 !py-2 !text-xs">
            Decline
          </button>
          <button onClick={() => choose("accepted")} className="btn btn-primary !px-4 !py-2 !text-xs">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
