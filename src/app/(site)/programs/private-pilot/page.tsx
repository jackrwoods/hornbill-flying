import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { privatePilotProgram } from "@/content/programs/private-pilot";
import { PrivatePilotHeroSection } from "@/sections/programs/private-pilot/PrivatePilotHeroSection";
import { PrivatePilotQuickAnswerSection } from "@/sections/programs/private-pilot/PrivatePilotQuickAnswerSection";
import { PrivatePilotOutcomesSection } from "@/sections/programs/private-pilot/PrivatePilotOutcomesSection";
import { PrivatePilotRequirementsSection } from "@/sections/programs/private-pilot/PrivatePilotRequirementsSection";
import { PrivatePilotTimelineSection } from "@/sections/programs/private-pilot/PrivatePilotTimelineSection";
import { PrivatePilotCostSection } from "@/sections/programs/private-pilot/PrivatePilotCostSection";
import { PrivatePilotFleetSection } from "@/sections/programs/private-pilot/PrivatePilotFleetSection";
import { PrivatePilotInstructorsSection } from "@/sections/programs/private-pilot/PrivatePilotInstructorsSection";
import { PrivatePilotFAQSection } from "@/sections/programs/private-pilot/PrivatePilotFAQSection";
import { PrivatePilotRelatedProgramsSection } from "@/sections/programs/private-pilot/PrivatePilotRelatedProgramsSection";
import { PrivatePilotBottomCTASection } from "@/sections/programs/private-pilot/PrivatePilotBottomCTASection";

const PAGE_URL = "/programs/private-pilot/";
const OG_IMAGE = "/images/programs/private-pilot-og.webp";

export const metadata: Metadata = {
  title: buildTitle(privatePilotProgram.metaTitle),
  description: privatePilotProgram.metaDescription,
  alternates: {
    canonical: buildCanonical(PAGE_URL),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical(PAGE_URL),
    title: buildTitle(privatePilotProgram.metaTitle),
    description: privatePilotProgram.metaDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1844,
        height: 1229,
        alt: "Hornbill Aviation Private Pilot training in a PA28 at Reno–Tahoe (RNO)",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle(privatePilotProgram.metaTitle),
    description: privatePilotProgram.metaDescription,
    images: [OG_IMAGE],
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivatePilotProgramPage() {
  const [breadcrumb, service, course, faqSchema] = buildProgramSchemas({
    title: privatePilotProgram.title,
    description: privatePilotProgram.quickAnswer,
    url: PAGE_URL,
    serviceName: "Private Pilot License Training",
    courseName: "Private Pilot License Training",
    credentialAwarded:
      "Private Pilot Certificate — Airplane Single-Engine Land (ASEL)",
    timeToComplete: "P3M to P1Y depending on schedule",
    prerequisites: [
      "Minimum 17 years old",
      "English proficient",
      "Valid 3rd-class medical certificate or BasicMed",
      "Completed FAA knowledge test prior to checkride",
    ],
    teaches: [
      "Visual flight rules",
      "Single-engine aircraft operation",
      "Cross-country navigation",
      "FAA private pilot practical test standards",
    ],
    educationalLevel: "beginner",
    courseMode: "in-person",
    faqs: privatePilotProgram.faq,
    serviceType: "Private Pilot License Training",
    hasOfferCatalog: [
      { name: "Discovery flight", url: "/discovery-flight/" },
      { name: "Fleet and rates", url: "/fleet/" },
      { name: "Membership", url: "/membership/" },
    ],
    courseCode: "PPL",
    isPartOf: "/programs/",
  });

  service.audience = {
    "@type": "Audience",
    audienceType: "Prospective pilots",
  };

  course.availableAtOrFrom = {
    "@type": "Place",
    name: "Reno–Tahoe International Airport",
    alternateName: "RNO",
    address: {
      "@id": absoluteUrl("/#address", siteConfig.baseUrl),
    },
  };

  const schema = buildSchemaGraph(breadcrumb, service, course, faqSchema);

  return (
    <>
      <SchemaInjector schema={schema} id="private-pilot-schema" />
      <PrivatePilotHeroSection />

      <div className="border-b border-navy-800/10 bg-sand-50 py-4">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/programs/" },
              { label: privatePilotProgram.title },
            ]}
          />
        </Container>
      </div>

      <PrivatePilotQuickAnswerSection />
      <PrivatePilotOutcomesSection />
      <PrivatePilotRequirementsSection />
      <PrivatePilotTimelineSection />
      <PrivatePilotCostSection />
      <PrivatePilotFleetSection />
      <PrivatePilotInstructorsSection />
      <PrivatePilotFAQSection />
      <PrivatePilotRelatedProgramsSection />
      <PrivatePilotBottomCTASection />
    </>
  );
}
