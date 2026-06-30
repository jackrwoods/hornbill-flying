import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { assetPath } from "@/lib/assets";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brandName,
    short_name: "Hornbill",
    description:
      "Part 61 flight school in Reno, NV. Train in a consistent PA28 fleet and book a discovery flight.",
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#FFF8EC",
    theme_color: "#004E7C",
    orientation: "portrait",
    icons: [
      {
        src: assetPath("/logo.svg"),
        sizes: "any",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
