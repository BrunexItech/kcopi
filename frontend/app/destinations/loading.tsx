"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import CardGridSkeleton from "@/components/CardGridSkeleton";
import Skeleton from "@/components/Skeleton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingDestinations() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <>
      <LoadingOverlay />
      <div className="animate-pulse">
        <HeroSkeleton />
        <section className="py-16">
          <div className="container-page">
            <Skeleton className="mx-auto h-64 w-full rounded-3xl" />
          </div>
        </section>
        <section className="pb-24">
          <div className="container-page">
            <CardGridSkeleton count={6} />
          </div>
        </section>
      </div>
    </>
  );
}
