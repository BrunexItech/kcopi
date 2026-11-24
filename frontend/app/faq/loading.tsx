"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import Skeleton from "@/components/Skeleton";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingFaq() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <div className="animate-pulse">
      <HeroSkeleton compact />
      <section className="py-24">
        <div className="container-page max-w-3xl space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </section>
    </div>
  );
}
