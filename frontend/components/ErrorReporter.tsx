"use client";

import { useEffect } from "react";

// Minimal client-error scaffold: no-ops until NEXT_PUBLIC_ERROR_REPORTING_URL
// is set, so this is safe to ship now and wire up to Sentry (or any error
// endpoint) later by just setting one env var — no code changes needed.
const ENDPOINT = process.env.NEXT_PUBLIC_ERROR_REPORTING_URL;

export default function ErrorReporter() {
  useEffect(() => {
    if (!ENDPOINT) return;

    const report = (payload: Record<string, unknown>) => {
      try {
        navigator.sendBeacon?.(ENDPOINT, JSON.stringify(payload));
      } catch {
        // best-effort only
      }
    };

    const onError = (event: ErrorEvent) => {
      report({ type: "error", message: event.message, stack: event.error?.stack, url: location.href });
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      report({ type: "unhandledrejection", reason: String(event.reason), url: location.href });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
