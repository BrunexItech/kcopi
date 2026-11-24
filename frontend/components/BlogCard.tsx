import Link from "next/link";
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

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <LoadingImage
          src={mediaUrl(post.cover_image)}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
          {CATEGORY_LABEL[post.category] ?? post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" /> {readTime(post.body)} min read
          </span>
          <span>{formatDate(post.created_at)}</span>
        </div>
        <h3 className="font-[var(--font-display)] text-xl font-semibold tracking-wide">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[var(--color-accent)]">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--color-ink-soft)]">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--color-accent-dark)] transition-colors hover:text-[var(--color-accent)]"
        >
          Read Article <Icon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
