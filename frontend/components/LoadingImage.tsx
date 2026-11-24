"use client";

import Image, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

// Drop-in replacement for next/image's `fill` usage: shows a spinner over the
// image's area until it has actually finished loading, instead of letting a
// blank/partially-painted image show through. Every usage in this codebase
// renders inside a `relative` wrapper, so the spinner can simply overlay it.
export default function LoadingImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  // A callback ref fires synchronously during React's commit, the earliest
  // possible moment the <img> node exists — closer to real-time than any
  // useEffect, which only runs after commit and can lose the race against a
  // fast/cached image that finishes loading in that gap. Checking `.complete`
  // right here, and attaching a *native* load listener directly (bypassing
  // React's onLoad prop entirely) as a second, independent path, makes this
  // robust regardless of how fast the image resolves.
  const setImgRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) return;
    if (node.complete) {
      setLoaded(true);
      return;
    }
    node.addEventListener("load", () => setLoaded(true), { once: true });
  }, []);

  return (
    <>
      {!loaded && (
        // z-20 so this sits above any dark overlay a caller layers on top of
        // the image (e.g. PageHero's permanent `bg-black/55`) — otherwise the
        // overlay renders over the spinner and the two combine into a flat
        // grey/murky patch instead of a visible loading indicator. No fixed
        // background here either, so it reads correctly on both light card
        // surfaces and dark hero/CTA sections.
        <div className="absolute inset-0 z-20 grid place-items-center">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-full border-[3px] border-white/25" />
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[var(--color-gold)]" />
          </div>
        </div>
      )}
      <Image
        {...props}
        ref={setImgRef}
        className={`${className ?? ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
