import Link from "next/link";
import type { Metadata } from "next";
import { api, mediaUrl } from "@/lib/api";
import PageHero from "@/components/PageHero";
import LoadingImage from "@/components/LoadingImage";
import BackLink from "@/components/BackLink";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos from Kcopi Global safaris across the Maasai Mara, Serengeti, Amboseli and the Kenyan coast.",
};

export default async function GalleryPage() {
  const images = await api.getGallery();

  return (
    <>
      <PageHero
        image="/static/img/gallery-hero.jpg"
        crumb="Gallery"
        title="Moments from the Trail"
        description="A glimpse of what awaits: real wildlife and landscape photography from across the Mara, Serengeti, Amboseli, and the Kenyan coast."
        parent={{ label: "About", href: "/about" }}
      />

      <section className="py-24">
        <div className="container-page">
          <div className="mb-10 flex">
            <BackLink href="/about" label="Back to About" />
          </div>
          <GalleryGrid images={images} />
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary-dark)] px-6 py-16 text-center text-white sm:px-16">
            <LoadingImage src={mediaUrl("/static/img/gallery-cta.jpg")} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative">
              <h2 className="text-4xl text-white">Ready to create your own gallery?</h2>
              <p className="mt-4 text-white/85">Let&apos;s build the safari that gets you these photos.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link href="/tours" className="btn btn-primary">
                  Browse Safaris
                </Link>
                <Link href="/contact" className="btn btn-light">
                  Plan My Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
