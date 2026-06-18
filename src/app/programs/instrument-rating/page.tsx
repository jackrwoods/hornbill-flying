import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { buildTitle, buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";
import { InstrumentRatingHeroSection } from "@/sections/programs/instrument-rating/InstrumentRatingHeroSection";
import { InstrumentRatingQuickAnswerSection } from "@/sections/programs/instrument-rating/InstrumentRatingQuickAnswerSection";
import { InstrumentRatingBenefitsSection } from "@/sections/programs/instrument-rating/InstrumentRatingBenefitsSection";
import { InstrumentRatingPrerequisitesSection } from "@/sections/programs/instrument-rating/InstrumentRatingPrerequisitesSection";
import { InstrumentRatingExperienceSection } from "@/sections/programs/instrument-rating/InstrumentRatingExperienceSection";
import { InstrumentRatingTrainingStructureSection } from "@/sections/programs/instrument-rating/InstrumentRatingTrainingStructureSection";
import { InstrumentRatingFleetSection } from "@/sections/programs/instrument-rating/InstrumentRatingFleetSection";
import { InstrumentRatingCostSection } from "@/sections/programs/instrument-rating/InstrumentRatingCostSection";
import { InstrumentRatingWhyHornbillSection } from "@/sections/programs/instrument-rating/InstrumentRatingWhyHornbillSection";
import { InstrumentRatingDiscoveryFlightSection } from "@/sections/programs/instrument-rating/InstrumentRatingDiscoveryFlightSection";
import { InstrumentRatingRelatedPathwaysSection } from "@/sections/programs/instrument-rating/InstrumentRatingRelatedPathwaysSection";
import { InstrumentRatingFAQSection } from "@/sections/programs/instrument-rating/InstrumentRatingFAQSection";
import { InstrumentRatingBottomCTASection } from "@/sections/programs/instrument-rating/InstrumentRatingBottomCTASection";

const PAGE_URL = "/programs/instrument-rating/";
const OG_IMAGE = "/images/programs/instrument-rating-og.webp";

export const metadata: Metadata = {
  title: buildTitle(instrumentRatingProgram.metaTitle),
  description: instrumentRatingProgram.metaDescription,
  alternates: {
    canonical: buildCanonical(PAGE_URL),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical(PAGE_URL),
    title: buildTitle(instrumentRatingProgram.metaTitle),
    description: instrumentRatingProgram.metaDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 628,
        alt: "Hornbill Flight Center Instrument Rating training in a WAAS-equipped PA28 at Reno–Tahoe (RNO)",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle(instrumentRatingProgram.metaTitle),
    description: instrumentRatingProgram.metaDescription,
    images: [OG_IMAGE],
  }),
};

export default function InstrumentRatingProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: instrumentRatingProgram.title,
      description: instrumentRatingProgram.quickAnswer,
      url: PAGE_URL,
      serviceName: "Instrument Rating Flight Training",
      courseName: "Instrument Rating Training",
      credentialAwarded: "FAA Instrument Rating — Airplane",
      timeToComplete: "6–10 weeks full-time; 3–6 months part-time",
      prerequisites: instrumentRatingProgram.prerequisites.items,
      teaches: "Instrument flight rules, GPS/WAAS approaches, partial-panel flying, IFR cross-country planning",
      educationalLevel: "intermediate",
      courseMode: "in-person",
      faqs: instrumentRatingProgram.faq,
      serviceType: "Instrument Rating Flight Training",
      hasOfferCatalog: [
        { name: "Fleet and rates", url: "/fleet/" },
        { name: "Membership", url: "/membership/" },
        { name: "Discovery flight", url: "/discovery-flight/" },
      ],
      courseCode: "IR-ASE",
      isPartOf: "/programs/",
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="instrument-rating-schema" />
      <InstrumentRatingHeroSection />

      <div className="border-b border-navy-800/10 bg-cream-50 py-4">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/programs/" },
              { label: instrumentRatingProgram.title },
            ]}
          />
        </Container>
      </div>

      <InstrumentRatingQuickAnswerSection />
      <InstrumentRatingBenefitsSection />
      <InstrumentRatingPrerequisitesSection />
      <InstrumentRatingExperienceSection />
      <InstrumentRatingTrainingStructureSection />
      <InstrumentRatingFleetSection />
      <InstrumentRatingCostSection />
      <InstrumentRatingWhyHornbillSection />
      <InstrumentRatingDiscoveryFlightSection />
      <InstrumentRatingRelatedPathwaysSection />
      <InstrumentRatingFAQSection />
      <InstrumentRatingBottomCTASection />
    </>
  );
}
