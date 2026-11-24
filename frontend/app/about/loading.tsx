"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import Skeleton from "@/components/Skeleton";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingAbout() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <div className="animate-pulse">
      <HeroSkeleton />
      <section className="py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-72" />
            <Skeleton className="mt-2 h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="aspect-[4/5] w-full" />
        </div>
      </section>
      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page grid grid-cols-2 gap-7 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-12 w-12 !rounded-lg" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
