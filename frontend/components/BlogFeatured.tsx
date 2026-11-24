"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { BlogPost, mediaUrl } from "@/lib/api";

const CATEGORY_LABEL: Record<string, string> = {
  planning: "Trip Planning",
  guide: "Travel Guide",
};

function readTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogFeatured({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid overflow-hidden rounded-[2rem] bg-[var(--color-primary-dark)] text-white shadow-2xl lg:grid-cols-2"
    >
      <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <LoadingImage
            src={mediaUrl(post.cover_image)}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-gold)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary-dark)] shadow-md">
          <Icon name="star-filled" className="h-3 w-3" /> Latest Story
        </span>
      </div>

      <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12 lg:p-14">
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
          <span className="rounded-full bg-white/10 px-3 py-1 font-semibold uppercase tracking-wide">
            {CATEGORY_LABEL[post.category] ?? post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" /> {readTime(post.body)} min read
          </span>
          <span>{formatDate(post.created_at)}</span>
        </div>

        <h2 className="font-[var(--font-display)] text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[var(--color-gold)]">
            {post.title}
          </Link>
        </h2>

        <p className="max-w-lg text-white/80">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary-dark)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-gold)]"
        >
          Read the Full Story <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
