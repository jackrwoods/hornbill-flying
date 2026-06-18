import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brandName,
    short_name: "Hornbill",
    description:
      "Part 61 flight school in Reno, NV. Train in a consistent PA28 fleet and book a discovery flight.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EC",
    theme_color: "#0B1C2C",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
