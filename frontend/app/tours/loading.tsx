"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import Skeleton from "@/components/Skeleton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingTours() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <>
    <LoadingOverlay />
    <div className="animate-pulse">
      <HeroSkeleton />
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container-page">
          <div className="mb-12 flex flex-wrap justify-center gap-3 sm:mb-16">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
          <div className="space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm">
                <div className="flex flex-col lg:flex-row">
                  <Skeleton className="min-h-[220px] w-full !rounded-none lg:w-2/5" />
                  <div className="flex-1 space-y-3 p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="mt-2 h-10 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
