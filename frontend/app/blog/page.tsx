import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import PageHero from "@/components/PageHero";
import BlogFeatured from "@/components/BlogFeatured";
import BlogGrid from "@/components/BlogGrid";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Safari planning guides, visa advice, packing lists, and migration insights from the Kcopi Global team.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof api.getBlogPosts>> = [];
  try {
    posts = await api.getBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <>
      <PageHero
        image="/static/img/tours-hero.jpg"
        crumb="Blog"
        title={
          <>
            The Safari <span className="font-[var(--font-script)] text-[var(--color-gold)]">Blog</span>
          </>
        }
        description="Honest, practical guides for planning your East African safari, written by the people who run the trips."
      />

      {posts.length === 0 ? (
        <section className="py-24">
          <div className="container-page">
            <p className="text-center text-[var(--color-ink-soft)]">New articles are on the way. Check back soon.</p>
          </div>
        </section>
      ) : (
        <>
          <section className="pt-16 sm:pt-20">
            <div className="container-page">
              <BlogFeatured post={posts[0]} />
            </div>
          </section>

          <section className="py-24">
            <div className="container-page">
              {posts.length > 1 && (
                <Reveal className="mb-10 max-w-xl">
                  <span className="eyebrow">More Stories</span>
                  <h2 className="text-3xl">From the Field &amp; the Road</h2>
                </Reveal>
              )}
              <BlogGrid posts={posts.slice(1)} />
            </div>
          </section>
        </>
      )}

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-accent)]/15 bg-[var(--color-surface)]/80 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="mx-auto max-w-xl text-3xl tracking-wide sm:text-4xl">Have a question we haven&apos;t covered?</h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-ink-soft)]">
              Our planners answer trip-specific questions every day, so ask us anything before you book.
            </p>
            <Link href="/contact" className="btn btn-primary mt-7 inline-flex">
              Ask Our Team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
