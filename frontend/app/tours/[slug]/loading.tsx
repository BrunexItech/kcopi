"use client";

import { useEffect } from "react";
import Skeleton from "@/components/Skeleton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

// Mirrors TourHero's single-viewport "boarding pass" shape (not the old
// PageHero + stat-strip layout it replaced) so there's no layout jump when
// the real content swaps in.
export default function LoadingTourDetail() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <>
      <LoadingOverlay />
      <div className="animate-pulse">
        <div className="relative flex min-h-[100svh] flex-col bg-[var(--color-primary-dark)]">
          <div className="container-page flex items-center justify-between gap-4 pt-24 sm:pt-28">
            <Skeleton className="h-11 w-56 rounded-full bg-white/10" />
            <Skeleton className="hidden h-4 w-40 bg-white/10 sm:block" />
          </div>
          <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
            <div className="w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-[var(--color-surface)] shadow-2xl">
              <div className="grid md:grid-cols-[1fr_1.35fr]">
                <Skeleton className="hidden min-h-[360px] w-full !rounded-none md:block" />
                <div className="space-y-5 p-6 sm:p-8">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-64" />
                  <Skeleton className="h-3 w-32" />
                  <div className="flex flex-wrap gap-4 pt-2">
                    {[0, 1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-20" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[0, 1, 2].map((i) => (
                      <Skeleton key={i} className="h-7 w-28 rounded-full" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[var(--color-line)] pt-5">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-11 w-44 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-24">
          <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
            <div>
              <Skeleton className="h-3 w-32" />
              <Skeleton className="mt-3 h-9 w-56" />
              <div className="mt-8 space-y-8">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-5">
                    <Skeleton className="h-10 w-10 flex-shrink-0 !rounded-full" />
                    <div className="flex-1 space-y-2 pt-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[var(--color-surface)] p-7 shadow-md">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="mt-3 h-3 w-40" />
              <div className="my-5 border-t border-[var(--color-line)]" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-between py-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
              <Skeleton className="mt-5 h-12 w-full rounded-full" />
              <Skeleton className="mt-3 h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
