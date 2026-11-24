import Link from "next/link";
import type { ReactNode } from "react";
import LoadingImage from "@/components/LoadingImage";
import { mediaUrl } from "@/lib/api";

export default function PageHero({
  image,
  crumb,
  title,
  description,
  compact = false,
  parent,
}: {
  image: string;
  crumb: string;
  title: ReactNode;
  description?: string;
  compact?: boolean;
  parent?: { label: string; href: string };
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[var(--color-primary-dark)] text-white ${compact ? "py-20 sm:py-28" : "py-28 sm:py-40"}`}
    >
      <LoadingImage src={mediaUrl(image)} alt="" fill sizes="100vw" priority className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container-page relative">
        <div className="mb-4 flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          {parent && (
            <>
              <Link href={parent.href} className="hover:text-white">
                {parent.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{crumb}</span>
        </div>
        <h1 className="max-w-2xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-white/85">{description}</p>}
      </div>
    </section>
  );
}
