import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { cfiProgram } from "@/content/programs/cfi";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const ogImage = {
  url: absoluteUrl(cfiProgram.hero.image, siteConfig.baseUrl),
  width: 1200,
  height: 800,
  alt: cfiProgram.hero.imageAlt,
};

export const metadata: Metadata = {
  title: buildTitle(cfiProgram.metaTitle),
  description: cfiProgram.metaDescription,
  alternates: {
    canonical: buildCanonical("/programs/certified-flight-instructor/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/programs/certified-flight-instructor/"),
    title: buildTitle(cfiProgram.metaTitle),
    description: cfiProgram.metaDescription,
    images: [ogImage],
  }),
  twitter: buildTwitter({
    title: buildTitle(cfiProgram.metaTitle),
    description: cfiProgram.metaDescription,
    images: [ogImage.url],
  }),
  robots: {
    index: true,
    follow: true,
  },
};
