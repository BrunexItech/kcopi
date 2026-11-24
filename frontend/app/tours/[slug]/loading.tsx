"use client";

import { useEffect } from "react";
import Skeleton from "@/components/Skeleton";
import { setPageLoading } from "@/lib/pageLoadingSignal";

// A skeleton shaped like the real tour detail page, rather than a generic
// centered spinner — it appears the instant a package's "View Details" link
// is clicked, in exactly the layout the real content will fill in, so the
// transition feels premium and purposeful instead of a blank flash.
export default function LoadingTourDetail() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <div className="animate-pulse">
      <div className="relative h-[70vh] max-h-[620px] min-h-[420px] w-full bg-[var(--color-primary-dark)]">
        <div className="absolute inset-0 opacity-40">
          <Skeleton className="h-full w-full !rounded-none" />
        </div>
        <div className="container-page relative flex h-full flex-col justify-end pb-16">
          <Skeleton className="mb-4 h-4 w-48 bg-white/10" />
          <Skeleton className="h-12 w-2/3 max-w-lg bg-white/15 sm:h-16" />
          <Skeleton className="mt-4 h-4 w-full max-w-md bg-white/10" />
        </div>
      </div>

      <div className="container-page">
        <div className="mb-6 mt-6">
          <Skeleton className="h-11 w-56 rounded-full" />
        </div>
        <div className="flex flex-wrap overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="min-w-[150px] flex-1 p-6">
              <Skeleton className="mb-2 h-3 w-20" />
              <Skeleton className="h-5 w-28" />
            </div>
          ))}
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
  );
}
