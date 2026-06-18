import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

const PAGE_TITLE = "Commercial Pilot License Training in Reno, NV";
const PAGE_DESCRIPTION =
  "Earn your Commercial Pilot certificate at RNO. Part 61 CPL training in a consistent PA28 fleet with real cross-country experience. Book a consultation.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/programs/commercial-pilot/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/programs/commercial-pilot/"),
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
