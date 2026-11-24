import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api, mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import BackLink from "@/components/BackLink";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleBody from "@/components/ArticleBody";
import Reveal from "@/components/Reveal";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await api.getBlogPost(slug);
    const image = mediaUrl(post.cover_image);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: { title: post.title, description: post.excerpt, images: [{ url: image, width: 1200, height: 800 }] },
      twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await api.getBlogPost(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  let related: Awaited<ReturnType<typeof api.getBlogPosts>> = [];
  try {
    const all = await api.getBlogPosts();
    related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  } catch {
    related = [];
  }

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: mediaUrl(post.cover_image),
          datePublished: post.created_at,
          dateModified: post.created_at,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <PageHero
        image={post.cover_image}
        crumb={post.title}
        title={post.title}
        description={post.excerpt}
        parent={{ label: "Blog", href: "/blog" }}
      />

      <section className="py-24">
        <div className="container-page">
          <div className="mb-10 flex">
            <BackLink href="/blog" label="Back to the Blog" />
          </div>
          <ArticleBody paragraphs={paragraphs} />

          <Reveal className="mx-auto mt-14 max-w-3xl rounded-2xl bg-[var(--color-bg-alt)] p-7 text-center sm:p-10">
            <h3 className="text-2xl">Ready to plan your own safari?</h3>
            <p className="mt-2 text-[var(--color-ink-soft)]">Tell us your dates and interests, and we&apos;ll build a tailored itinerary.</p>
            <Link href="/contact" className="btn btn-primary mt-5 inline-flex">
              Start Planning <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--color-bg-alt)] py-24">
          <div className="container-page">
            <Reveal className="mb-12 max-w-xl">
              <span className="eyebrow">Keep Reading</span>
              <h2 className="text-4xl">More From the Blog</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
