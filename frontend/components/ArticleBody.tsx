"use client";

import { motion } from "framer-motion";

export default function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 text-[1.05rem] leading-relaxed text-[var(--color-ink)]">
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={
            i === 0
              ? "first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-display)] first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[var(--color-accent)]"
              : undefined
          }
        >
          {p}
        </motion.p>
      ))}
    </article>
  );
}
