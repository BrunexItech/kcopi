"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import Skeleton from "@/components/Skeleton";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingGallery() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <div className="animate-pulse">
      <HeroSkeleton />
      <section className="py-24">
        <div className="container-page">
          <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className={i % 5 === 0 ? "row-span-2 aspect-[1/2.1]" : "aspect-square"} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
