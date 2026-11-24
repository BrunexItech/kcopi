"use client";

import { useEffect } from "react";
import HeroSkeleton from "@/components/HeroSkeleton";
import CardGridSkeleton from "@/components/CardGridSkeleton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function LoadingBlog() {
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return (
    <>
      <LoadingOverlay />
      <div className="animate-pulse">
        <HeroSkeleton />
        <section className="py-24">
          <div className="container-page">
            <CardGridSkeleton count={6} />
          </div>
        </section>
      </div>
    </>
  );
}
