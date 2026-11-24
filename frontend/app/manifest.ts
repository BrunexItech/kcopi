import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Kcopi Global",
    description: "Tailor-made Kenya and East Africa safaris across the Maasai Mara, Serengeti, Amboseli and Diani Beach.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#1d301f",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
