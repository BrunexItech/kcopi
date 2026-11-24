"use client";

import { useEffect } from "react";
import Skeleton from "@/components/Skeleton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingDestinationDetail() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <>
    <LoadingOverlay />
    <div className="animate-pulse">
      <div className="relative h-[70vh] max-h-[620px] min-h-[420px] w-full bg-[var(--color-primary-dark)]">
        <div className="absolute inset-0 opacity-40">
          <Skeleton className="h-full w-full !rounded-none" />
        </div>
        <div className="container-page relative flex h-full flex-col justify-end pb-16">
          <Skeleton className="mb-4 h-4 w-40 bg-white/10" />
          <Skeleton className="h-12 w-1/2 max-w-sm bg-white/15 sm:h-16" />
          <Skeleton className="mt-4 h-4 w-full max-w-xs bg-white/10" />
        </div>
      </div>

      <div className="container-page">
        <div className="relative z-10 -mt-16 flex flex-wrap overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm sm:-mt-16">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="min-w-[150px] flex-1 p-6">
              <Skeleton className="mb-2 h-3 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-11 w-48 rounded-full" />
        </div>
      </div>

      <div className="py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-3 h-9 w-72" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="mt-6 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-3 w-5/6" />
              ))}
            </div>
            <Skeleton className="mt-7 h-12 w-56 rounded-full" />
          </div>
          <Skeleton className="aspect-[4/5] w-full" />
        </div>
      </div>
    </div>
    </>
  );
}
