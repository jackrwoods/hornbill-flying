import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { assetPath } from "@/lib/assets";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brandName,
    short_name: "Hornbill",
    description:
      "Part 61 flight school in Reno, NV. Train in a PA28 fleet and book a discovery flight.",
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#1E212B",
    orientation: "portrait",
    icons: [
      {
        src: assetPath("/images/logos/logo.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
