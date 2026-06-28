import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { SchemaInjector } from "@/components/SchemaInjector";
import { TrustStrip } from "@/components/TrustStrip";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { homeFAQ } from "@/content/faq";
import { HeroSection } from "@/sections/home/HeroSection";
import { DifferentiatorsSection } from "@/sections/home/DifferentiatorsSection";
import { ProgramsGridSection } from "@/sections/home/ProgramsGridSection";
import { DiscoveryFlightSection } from "@/sections/home/DiscoveryFlightSection";
import { InstructorPreviewSection } from "@/sections/home/InstructorPreviewSection";
import { PricingSnapshotSection } from "@/sections/home/PricingSnapshotSection";
import { SocialProofSection } from "@/sections/home/SocialProofSection";
import { FAQSection } from "@/sections/home/FAQSection";
import { BlogTeaserSection } from "@/sections/home/BlogTeaserSection";

const PAGE_TITLE = "Part 61 Flight School in Reno, NV";
const PAGE_DESCRIPTION =
  "Book a discovery flight at Hornbill Aviation. Part 61 training in a PA28 fleet at RNO. Choose your instructor and fly real cross-country routes.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/home/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/home/"),
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
    buildBreadcrumbList([{ name: "Home", url: buildCanonical("/home/") }]),
    buildFAQPage(homeFAQ)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="home-schema" />
      <HeroSection />
      <TrustStrip />
      <DifferentiatorsSection />
      <ProgramsGridSection />
      <DiscoveryFlightSection />
      <InstructorPreviewSection />
      <PricingSnapshotSection />
      <SocialProofSection />
      <FAQSection />
      <BlogTeaserSection />
    </>
  );
}
