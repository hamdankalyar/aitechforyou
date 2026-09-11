import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AI Tech",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f4f0e8",
    theme_color: "#121212",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
