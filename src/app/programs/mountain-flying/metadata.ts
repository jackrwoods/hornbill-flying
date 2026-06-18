import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

const PAGE_TITLE = "Mountain Flying Course in Reno, NV | Sierra Nevada Training";
const PAGE_DESCRIPTION =
  "Learn mountain flying and density altitude at RNO. Part 61 Sierra Nevada course in a PA28 fleet. Book a discovery flight or consultation today.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/programs/mountain-flying/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/programs/mountain-flying/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  robots: {
    index: true,
    follow: true,
  },
};
