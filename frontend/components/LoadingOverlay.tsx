"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mediaUrl } from "@/lib/api";

// The entire loading state for every route: a clean, solid-colour screen
// with just the spinner on it — no skeleton shapes behind it. Rendered via
// a portal straight into <body>, not in place: this component mounts
// inside PageTransition's animated wrapper, which applies a `transform`
// while animating, and any transform on an ancestor becomes the containing
// block for a `position: fixed` descendant — pinning this to that
// wrapper's box instead of the real viewport (showing up as "stuck near
// the top instead of centred"). A portal sidesteps that ancestor entirely.
export default function LoadingOverlay() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--color-bg)]">
      <div className="relative h-14 w-14 drop-shadow-lg">
        <div className="absolute inset-0 rounded-full border-[3px] border-[var(--color-line)]" />
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[var(--color-accent)] border-r-[var(--color-gold)]" />
        <div className="absolute inset-[4px] grid place-items-center overflow-hidden rounded-full bg-[var(--color-surface)] p-2">
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>,
    document.body
  );
}
