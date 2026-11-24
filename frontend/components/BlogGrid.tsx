"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/api";

const CATEGORY_LABEL: Record<string, string> = {
  planning: "Trip Planning",
  guide: "Travel Guide",
};

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const seen = Array.from(new Set(posts.map((p) => p.category)));
    return ["all", ...seen];
  }, [posts]);

  const [active, setActive] = useState("all");
  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);

  if (posts.length === 0) return null;

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              style={{ color: active === cat ? "white" : "var(--color-ink-soft)" }}
            >
              {active === cat && (
                <motion.span
                  layoutId="blog-pill"
                  className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat === "all" ? "All Articles" : CATEGORY_LABEL[cat] ?? cat}</span>
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-[var(--color-ink-soft)]">No articles in this category yet.</p>
      )}
    </div>
  );
}
