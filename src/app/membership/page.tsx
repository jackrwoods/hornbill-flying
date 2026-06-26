import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { buildMembershipService } from "@/lib/schema/membership";
import { membershipContent, membershipFAQs } from "@/content/membership";
import { MembershipHeroSection } from "@/sections/membership/MembershipHeroSection";
import { MembershipBreadcrumbSection } from "@/sections/membership/MembershipBreadcrumbSection";
import { MembershipStorySection } from "@/sections/membership/MembershipStorySection";
import { MembershipQuickAnswerSection } from "@/sections/membership/MembershipQuickAnswerSection";
import { MembershipPricingCardSection } from "@/sections/membership/MembershipPricingCardSection";
import { MembershipBenefitsSection } from "@/sections/membership/MembershipBenefitsSection";
import { MembershipSignupCTASection } from "@/sections/membership/MembershipSignupCTASection";
import { MembershipFAQSection } from "@/sections/membership/MembershipFAQSection";

const PAGE_URL = "/membership/";
const OG_IMAGE = "/images/membership/membership-hero.webp";

export const metadata: Metadata = {
  title: buildTitle(membershipContent.meta.title),
  description: membershipContent.meta.description,
  alternates: {
    canonical: buildCanonical(PAGE_URL),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical(PAGE_URL),
    title: buildTitle(membershipContent.meta.title),
    description: membershipContent.meta.description,
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1280,
        alt: "Hornbill Aviation PA28 rental membership at Reno–Tahoe (RNO)",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle(membershipContent.meta.title),
    description: membershipContent.meta.description,
    images: [OG_IMAGE],
  }),
  robots: {
    index: true,
    follow: true,
  },
};

const pageSchema = buildSchemaGraph(
  buildBreadcrumbList([
    { name: "Home", url: buildCanonical("/") },
    { name: "Membership", url: buildCanonical(PAGE_URL) },
  ]),
  buildFAQPage(membershipFAQs),
  buildMembershipService({
    url: PAGE_URL,
    title: membershipContent.meta.title,
    description: membershipContent.quickAnswer.text,
  }),
  {
    "@type": "WebPage",
    "@id": `${buildCanonical(PAGE_URL)}#webpage`,
    name: membershipContent.meta.title,
    description: membershipContent.meta.description,
    url: buildCanonical(PAGE_URL),
  }
);

export default function MembershipPage() {
  return (
    <>
      <SchemaInjector schema={pageSchema} id="membership-schema" />
      <MembershipHeroSection />
      <MembershipBreadcrumbSection />
      <MembershipStorySection />
      <MembershipBenefitsSection />
      <MembershipQuickAnswerSection />
      <MembershipSignupCTASection />
      <MembershipPricingCardSection />
      <MembershipFAQSection />
    </>
  );
}
