import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { cfiiProgram } from "@/content/programs/cfii";

export const metadata: Metadata = {
  title: buildTitle(cfiiProgram.metaTitle),
  description: cfiiProgram.metaDescription,
  alternates: {
    canonical: buildCanonical("/programs/cfii/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/programs/cfii/"),
    title: buildTitle(cfiiProgram.metaTitle),
    description: cfiiProgram.metaDescription,
  }),
  twitter: buildTwitter({
    title: buildTitle(cfiiProgram.metaTitle),
    description: cfiiProgram.metaDescription,
  }),
  robots: {
    index: true,
    follow: true,
  },
};
