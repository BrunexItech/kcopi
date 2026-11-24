import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/destinations",
    "/tours",
    "/about",
    "/gallery",
    "/faq",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let destinationPages: MetadataRoute.Sitemap = [];
  let tourPages: MetadataRoute.Sitemap = [];

  try {
    const [destinations, tours] = await Promise.all([api.getDestinations(), api.getTours()]);
    destinationPages = destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    tourPages = tours.map((t) => ({
      url: `${SITE_URL}/tours/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch {
    // Backend unreachable at build time — ship the static pages, nothing worse.
  }

  return [...staticPages, ...destinationPages, ...tourPages];
}
