"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { isIntroDismissed, subscribeIntroDismissed } from "@/lib/introSignal";

function Paragraph({ text, dropCap }: { text: string; dropCap: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (isIntroDismissed()) {
      setIntroDone(true);
      return;
    }
    return subscribeIntroDismissed(() => setIntroDone(true));
  }, []);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView && introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={
        dropCap
          ? "first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-display)] first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[var(--color-accent)]"
          : undefined
      }
    >
      {text}
    </motion.p>
  );
}

export default function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 text-[1.05rem] leading-relaxed text-[var(--color-ink)]">
      {paragraphs.map((p, i) => (
        <Paragraph key={i} text={p} dropCap={i === 0} />
      ))}
    </article>
  );
}
