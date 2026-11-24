"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

const SLIDES: Slide[] = [
  {
    title: "Safaris",
    subtitle: "You'll Never Forget",
    description:
      "Tailor-made adventures across Kenya and East Africa's most iconic wilderness, crafted by local experts who know the land.",
    ctaText: "Explore Safaris",
    ctaLink: "/tours",
  },
  {
    title: "Iconic",
    subtitle: "East African Destinations",
    description:
      "From the Mara's river crossings to Amboseli's elephant herds: six unforgettable landscapes, one trip.",
    ctaText: "View Destinations",
    ctaLink: "/destinations",
  },
  {
    title: "Tailor-Made",
    subtitle: "Not Off-the-Shelf",
    description:
      "Every itinerary is built from scratch by a destination expert: a named guide, transparent pricing, and a plan that fits your pace.",
    ctaText: "Plan My Trip",
    ctaLink: "/contact",
  },
  {
    title: "Family &",
    subtitle: "Honeymoon Safaris",
    description:
      "From hot air balloon rides to private sundowners, perfectly paced trips for families and couples alike.",
    ctaText: "View Tour Packages",
    ctaLink: "/tours",
  },
];

const ROTATE_MS = 8000;

export default function HeroSlides() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, ROTATE_MS);
  };

  const slide = SLIDES[current];

  return (
    <div className="container-page relative flex w-full flex-col items-center text-center">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)] sm:text-sm">
        Authentic East African Safaris
      </span>

      <div className="relative mt-5 min-h-[230px] w-full max-w-3xl sm:min-h-[260px] lg:min-h-[280px]">
        {SLIDES.map((s, index) => (
          <div
            key={s.title + s.subtitle}
            className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ease-in-out ${
              index === current
                ? "z-10 translate-x-0 opacity-100"
                : index < current
                  ? "z-0 -translate-x-8 opacity-0"
                  : "z-0 translate-x-8 opacity-0"
            }`}
            aria-hidden={index !== current}
          >
            <h1 className="font-light leading-tight text-white">
              <span className="block font-[var(--font-script)] text-5xl font-normal text-[var(--color-gold)] sm:text-6xl lg:text-7xl">
                {s.title}
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl">{s.subtitle}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base font-light tracking-wide text-white/80 sm:text-lg">
              {s.description}
            </p>
            <div className="mt-7">
              <Link href={s.ctaLink} className="btn btn-primary">
                {s.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {SLIDES.map((s, index) => (
          <button
            key={s.title + s.subtitle}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-[var(--color-gold)]" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Show slide ${index + 1}: ${s.title} ${s.subtitle}`}
          />
        ))}
      </div>

      <div className="absolute bottom-[-72px] left-1/2 hidden -translate-x-1/2 animate-bounce sm:block">
        <div className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-white/30">
          <div className="mt-1 h-2 w-1 animate-pulse rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
