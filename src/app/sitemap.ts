import type { MetadataRoute } from "next";
import {
  getPublishedRoutes,
  getInstructorRoutes,
  getFleetRoutes,
} from "@/lib/routes";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { getPublishedInstructors } from "@/content/instructors";
import { getPublishedFleet } from "@/content/fleet";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString();
  const routes = [
    ...getPublishedRoutes(),
    ...getInstructorRoutes(getPublishedInstructors()),
    ...getFleetRoutes(getPublishedFleet()),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route.href, siteConfig.baseUrl),
    lastModified: lastmod,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
