"use client";

import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { setPageLoading } from "@/lib/pageLoadingSignal";

export default function Loading() {
  // This component exists only while the route's content is loading, so its
  // mount/unmount lifecycle doubles as the "is the page loading" signal.
  useEffect(() => {
    setPageLoading(true);
    return () => setPageLoading(false);
  }, []);

  return <Spinner label="Loading your safari..." />;
}
