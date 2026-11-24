"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mediaUrl } from "@/lib/api";
import { onHeroVideoReady } from "@/lib/heroReady";

const STORAGE_KEY = "tt_welcomed";

// Module-scoped, not React state: survives this component being torn down
// and recreated within the same page load (e.g. a dev Fast Refresh remount
// triggered by editing some other file) — so once the splash has actually
// started, nothing can bring it back on this page view, independent of
// whatever React's component tree does.
let hasRunThisPageLoad = false;

export default function WelcomeIntro() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  // `visible` defaults to true on both the server render and the first client
  // render, so the opaque backdrop is there from the very first paint — the
  // real page never flashes on screen before it. A later remount on the same
  // page load starts already-dismissed via `hasRunThisPageLoad`.
  const [visible, setVisible] = useState(() => !hasRunThisPageLoad && !isAdmin);
  const [phase, setPhase] = useState<"idle" | "entered" | "leaving">("idle");

  // Runs synchronously before the browser paints, so a repeat visit within
  // the same tab session skips straight to invisible with no flash at all.
  useLayoutEffect(() => {
    if (hasRunThisPageLoad) {
      setVisible(false);
      return;
    }
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // ignore (private browsing / blocked storage)
    }
    if (alreadySeen) {
      hasRunThisPageLoad = true;
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setPhase("entered"), 30);
    // Both the sessionStorage flag AND hasRunThisPageLoad are set inside this
    // timeout rather than synchronously, so that React Strict Mode's dev-only
    // double-invoke (mount -> cleanup -> mount) doesn't mark the intro "seen"
    // during the throwaway first pass — that pass's timer gets cancelled by
    // cleanup before it fires, so only the real mount's timer ever sets
    // these. Setting hasRunThisPageLoad synchronously here instead would
    // make the throwaway mount mark it immediately, and the real mount's
    // very next layout effect would then see it already true and hide the
    // splash within milliseconds, before it ever actually ran.
    const mark = setTimeout(() => {
      hasRunThisPageLoad = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore (private browsing / blocked storage)
      }
    }, 30);

    // Hand off to the hero video rather than leaving on a blind timer: wait
    // at least MIN_HOLD (so the splash doesn't feel like a flicker), then
    // leave as soon as the hero video reports it's actually playing — or at
    // MAX_WAIT regardless, so a slow connection never strands the visitor
    // on the splash.
    const MIN_HOLD = 2000;
    const MAX_WAIT = 4500;
    let left = false;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    let unsubscribe = () => {};

    const leave = () => {
      if (left) return;
      left = true;
      setPhase("leaving");
      leaveTimer = setTimeout(() => setVisible(false), 750);
    };

    const minHoldTimer = setTimeout(() => {
      unsubscribe = onHeroVideoReady(leave);
    }, MIN_HOLD);
    const maxWaitTimer = setTimeout(leave, MAX_WAIT);

    return () => {
      [t1, mark, minHoldTimer, maxWaitTimer].forEach(clearTimeout);
      if (leaveTimer) clearTimeout(leaveTimer);
      unsubscribe();
    };
  }, [visible]);

  if (!visible) return null;

  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] overflow-hidden transition-all duration-700 ease-in-out ${
        leaving ? "pointer-events-none scale-110 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {/* Static — intentionally not zoomed, so the frame matches the hero
          section's own (static) poster exactly at the moment of handoff
          instead of jumping to a different crop/zoom level when it leaves. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mediaUrl("/static/img/hero-home.jpg")})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-dark)]/90 via-black/80 to-[var(--color-primary-dark)]/95" />

      <div className="relative flex h-full flex-col items-center justify-center gap-6">
        {/* Glow + mark — rendered in their final state from the first frame,
            same as the background photo, instead of fading/scaling in. */}
        <div className="relative grid place-items-center">
          <div className="absolute h-44 w-44 rounded-full bg-[var(--color-gold)]/30 blur-2xl" />
          <img src={mediaUrl("/static/img/logo-icon.png")} alt="Kcopi Global" className="relative h-28 w-auto drop-shadow-[0_0_40px_rgba(217,164,73,0.5)]" />
        </div>

        <div className="text-center">
          <p className="font-[var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Kcopi Global
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.35em] text-[var(--color-gold)] uppercase">
            Your East African Story Begins
          </p>
        </div>

        <div className="relative mt-5 h-[3px] w-56 overflow-hidden rounded-full bg-white/25">
          <div
            className={`absolute inset-y-0 left-1/2 rounded-full bg-[var(--color-gold)] shadow-[0_0_8px_rgba(217,164,73,0.8)] transition-all ease-out ${
              phase === "idle" ? "w-0" : "w-full duration-[1800ms]"
            }`}
            style={{ transform: "translateX(-50%)" }}
          />
          {/* Continuous shimmer so the line never sits still, even before the
              gold fill starts or once it's already full. */}
          <div className="animate-shimmer-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}
