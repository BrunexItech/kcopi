"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LoadingImage from "@/components/LoadingImage";
import Icon from "@/components/Icon";
import { GalleryImage, mediaUrl } from "@/lib/api";

const ALBUM_INFO: Record<string, { label: string; description: string }> = {
  wildlife: {
    label: "Wildlife",
    description: "Up-close encounters with East Africa's iconic animals: lions, elephants, and the Great Migration herds.",
  },
  beach: {
    label: "Coast & Beach",
    description: "Sun, sand, and turquoise water along the Kenyan coast, the perfect honeymoon finish to a safari.",
  },
  culture: {
    label: "Culture",
    description: "Moments shared with the Maasai and coastal communities who call this land home.",
  },
  experience: {
    label: "Experiences",
    description: "Hot air balloons, bush breakfasts, and sundowners: the little details that make a safari unforgettable.",
  },
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [album, setAlbum] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const albums = useMemo(() => {
    const order: string[] = [];
    const byCategory = new Map<string, GalleryImage[]>();
    for (const img of images) {
      if (!byCategory.has(img.category)) {
        order.push(img.category);
        byCategory.set(img.category, []);
      }
      byCategory.get(img.category)!.push(img);
    }
    return order.map((category) => ({
      category,
      info: ALBUM_INFO[category] ?? { label: category, description: "" },
      cover: byCategory.get(category)![0],
      count: byCategory.get(category)!.length,
    }));
  }, [images]);

  const visible = album ? images.filter((img) => img.category === album) : images;
  const activeAlbumInfo = album
    ? (albums.find((a) => a.category === album) ?? null)
    : null;

  function openAlbum(category: string | null) {
    setAlbum(category);
    // Let the reveal animation start before scrolling, so the grid is
    // already visible (not jumped-to-blank) when the view settles.
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
  }, [visible.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % visible.length));
  }, [visible.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const active = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <>
      {/* Opening albums — pick a collection before diving into every photo */}
      <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {albums.map(({ category, info, cover, count }) => {
          const isActive = album === category;
          return (
            <button
              key={category}
              onClick={() => openAlbum(isActive ? null : category)}
              className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                isActive ? "ring-2 ring-[var(--color-gold)]" : ""
              }`}
            >
              <LoadingImage
                src={mediaUrl(cover.image_path)}
                alt={info.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {count} {count === 1 ? "Photo" : "Photos"}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-[var(--font-display)] text-xl font-semibold">{info.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/80">{info.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div ref={gridRef} key={album ?? "all"} className="animate-album-reveal scroll-mt-28">
        {activeAlbumInfo && (
          <div className="relative mb-7 overflow-hidden rounded-2xl">
            <div className="relative h-28 w-full sm:h-32">
              <LoadingImage
                src={mediaUrl(activeAlbumInfo.cover.image_path)}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/95 via-[var(--color-primary-dark)]/75 to-[var(--color-primary-dark)]/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-between gap-4 px-6 sm:px-8">
              <div className="text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Album
                </span>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
                  {activeAlbumInfo.info.label}
                </h3>
                <p className="mt-0.5 text-xs text-white/75 sm:text-sm">
                  {visible.length} {visible.length === 1 ? "photo" : "photos"}
                </p>
              </div>
              <button
                onClick={() => openAlbum(null)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-sm"
              >
                <Icon name="x" className="h-3.5 w-3.5" /> Close Album
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`group relative overflow-hidden rounded-2xl ${i % 5 === 0 ? "row-span-2 aspect-[1/2.1]" : "aspect-square"}`}
            >
              <LoadingImage
                src={mediaUrl(img.image_path)}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[var(--color-ink)] shadow-md">
                  <Icon name="search" className="h-4 w-4" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
            onClick={closeLightbox}
          >
            <Icon name="x" className="h-5 w-5" />
          </button>

          {visible.length > 1 && (
            <>
              <button
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
              >
                <Icon name="arrow-left" className="h-5 w-5" />
              </button>
              <button
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
              >
                <Icon name="arrow-right" className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            key={active.id}
            className="animate-lightbox-in relative flex h-[80vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <LoadingImage src={mediaUrl(active.image_path)} alt={active.alt} fill sizes="90vw" className="object-contain" />
            </div>
            {active.alt && (
              <p className="mt-3 max-w-2xl text-center text-sm text-white/80">{active.alt}</p>
            )}
            {visible.length > 1 && (
              <p className="mt-1 text-xs text-white/50">
                {(activeIndex ?? 0) + 1} / {visible.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
