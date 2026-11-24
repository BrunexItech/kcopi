"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// No-ops entirely until NEXT_PUBLIC_GA_ID is set — activates the moment a
// real GA4 measurement ID is provided, with no code changes needed. Also
// waits for cookie consent, re-checking on the "consent" custom event
// CookieConsent dispatches the instant the visitor accepts.
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    try {
      setConsented(localStorage.getItem(CONSENT_KEY) === "accepted");
    } catch {
      // ignore
    }
    const onConsent = () => setConsented(true);
    window.addEventListener("cookie-consent-accepted", onConsent);
    return () => window.removeEventListener("cookie-consent-accepted", onConsent);
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
