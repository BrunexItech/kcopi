"use client";

import { useEffect } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function Loading() {
  // This component exists only while the route's content is loading, so its
  // mount/unmount lifecycle doubles as the "is the page loading" signal.
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return <LoadingOverlay />;
}
