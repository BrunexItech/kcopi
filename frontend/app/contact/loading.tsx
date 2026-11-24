"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import Skeleton from "@/components/Skeleton";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingContact() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <div className="animate-pulse">
      <HeroSkeleton compact />
      <section className="py-24">
        <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 rounded-2xl bg-[var(--color-surface)] p-10 shadow-md">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
          <div className="space-y-5 rounded-2xl bg-[var(--color-surface)] p-7 shadow-sm">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-[52px] w-[52px] flex-shrink-0 !rounded-lg" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
