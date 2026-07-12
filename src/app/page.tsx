import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { homeFAQ } from "@/content/faq";
import { HomepageTimeline } from "@/sections/home/HomepageTimeline";

const PAGE_TITLE = "Part 61 Flight School in Reno, NV";
const PAGE_DESCRIPTION =
  "Book a discovery flight at Hornbill Aviation. Part 61 training in a PA28 fleet at RNO. Choose your instructor and fly real cross-country routes. Discovery flights from $199.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function HomePage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([{ name: "Home", url: buildCanonical("/") }]),
    buildFAQPage(homeFAQ)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="home-schema" />
      <HomepageTimeline />
    </>
  );
}