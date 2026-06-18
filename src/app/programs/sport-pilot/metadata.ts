import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

const PAGE_TITLE = "Sport Pilot Training in Reno, NV";
const PAGE_DESCRIPTION =
  "Earn your Sport Pilot certificate at RNO. Part 61 training in a PA28 fleet, flexible scheduling, and a $199 discovery flight. See requirements, timeline, and cost.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/programs/sport-pilot/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/programs/sport-pilot/"),
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
