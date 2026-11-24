"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { isIntroDismissed, subscribeIntroDismissed } from "@/lib/introSignal";

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (isIntroDismissed()) {
      setIntroDone(true);
      return;
    }
    return subscribeIntroDismissed(() => setIntroDone(true));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView && introDone ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
