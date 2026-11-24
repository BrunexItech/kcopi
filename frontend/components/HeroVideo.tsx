"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/api";
import { markHeroVideoReady } from "@/lib/heroReady";

// Lion plays last in the loop, per request — everything else cycles first.
const CLIPS = [
  { mp4: "/static/video/hero-elephant.mp4" },
  { mp4: "/static/video/hero-giraffe.mp4" },
  { mp4: "/static/video/hero-tourist.mp4" },
  { mp4: "/static/video/hero-waterfall.mp4" },
  { mp4: "/static/video/hero-lion.mp4", webm: "/static/video/hero-lion.webm" },
];

const CLIP_MS = 9000;
const CROSSFADE_MS = 2200;

export default function HeroVideo({ poster }: { poster: string }) {
  const [posterVisible, setPosterVisible] = useState(true);
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a");
  const [clipIndexA, setClipIndexA] = useState(0);
  const [clipIndexB, setClipIndexB] = useState(CLIPS.length > 1 ? 1 : 0);

  const showingIndexRef = useRef(0);
  const layerARef = useRef<HTMLVideoElement | null>(null);
  const layerBRef = useRef<HTMLVideoElement | null>(null);
  const pendingCleanupRef = useRef<() => void>(() => {});

  // Only two <video> elements ever exist: whichever clip is visible, and the
  // one clip queued up behind it. Changing a layer's clip index re-points its
  // <source> and reloads just that element, instead of keeping every clip in
  // the playlist decoding at once (which is what caused the earlier stutter).
  useEffect(() => {
    const v = layerARef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [clipIndexA]);

  useEffect(() => {
    const v = layerBRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [clipIndexB]);

  useEffect(() => {
    if (CLIPS.length < 2) return;

    const id = setInterval(() => {
      pendingCleanupRef.current();

      const nextIndex = (showingIndexRef.current + 1) % CLIPS.length;
      const standbyRef = activeLayer === "a" ? layerBRef : layerARef;

      if (activeLayer === "a") setClipIndexB(nextIndex);
      else setClipIndexA(nextIndex);

      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        setActiveLayer((prev) => (prev === "a" ? "b" : "a"));
        showingIndexRef.current = nextIndex;
      };

      // Wait a tick for the state update above to commit (so the standby
      // video actually has its new source) before watching it for readiness.
      const armTimer = setTimeout(() => {
        const video = standbyRef.current;
        video?.addEventListener("canplay", reveal, { once: true });
        // Safety net in case `canplay` never fires for some reason — the
        // crossfade still happens, just without the readiness guarantee.
        const fallback = setTimeout(reveal, 2000);
        pendingCleanupRef.current = () => {
          video?.removeEventListener("canplay", reveal);
          clearTimeout(fallback);
        };
      }, 0);

      pendingCleanupRef.current = () => clearTimeout(armTimer);
    }, CLIP_MS);

    return () => {
      clearInterval(id);
      pendingCleanupRef.current();
    };
  }, [activeLayer]);

  const clipA = CLIPS[clipIndexA];
  const clipB = CLIPS[clipIndexB];

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Poster shown immediately; faded out fast once the first clip can
          play. This must finish well before the welcome splash's own exit
          fade (700ms) — otherwise this poster (the same image as the splash
          background) is still visible on its own for a moment after the
          splash is gone, which reads as the splash "reappearing". */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out ${
          posterVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${mediaUrl(poster)})` }}
      />

      <video
        ref={layerARef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
        style={{ opacity: activeLayer === "a" ? 1 : 0, transitionDuration: `${CROSSFADE_MS}ms` }}
        muted
        loop
        playsInline
        autoPlay
        onCanPlay={() => {
          setPosterVisible(false);
          markHeroVideoReady();
        }}
      >
        {clipA.webm && <source src={mediaUrl(clipA.webm)} type="video/webm" />}
        <source src={mediaUrl(clipA.mp4)} type="video/mp4" />
      </video>

      <video
        ref={layerBRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
        style={{ opacity: activeLayer === "b" ? 1 : 0, transitionDuration: `${CROSSFADE_MS}ms` }}
        muted
        loop
        playsInline
        autoPlay
      >
        {clipB.webm && <source src={mediaUrl(clipB.webm)} type="video/webm" />}
        <source src={mediaUrl(clipB.mp4)} type="video/mp4" />
      </video>

      {/* Constant, subtle overlay so exposure/contrast differences between
          clips don't read as a hard cut underneath the crossfade. */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
