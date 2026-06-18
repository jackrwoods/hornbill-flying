import { SchemaInjector } from "@/components/SchemaInjector";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";
import { CommercialHeroSection } from "@/sections/programs/commercial-pilot/CommercialHeroSection";
import { CommercialQuickAnswerSection } from "@/sections/programs/commercial-pilot/CommercialQuickAnswerSection";
import { CommercialBenefitsSection } from "@/sections/programs/commercial-pilot/CommercialBenefitsSection";
import { CommercialPrerequisitesSection } from "@/sections/programs/commercial-pilot/CommercialPrerequisitesSection";
import { CommercialExperienceSection } from "@/sections/programs/commercial-pilot/CommercialExperienceSection";
import { CommercialTimelineSection } from "@/sections/programs/commercial-pilot/CommercialTimelineSection";
import { CommercialCostSection } from "@/sections/programs/commercial-pilot/CommercialCostSection";
import { CommercialWhyHornbillSection } from "@/sections/programs/commercial-pilot/CommercialWhyHornbillSection";
import { CommercialCareerPathwaySection } from "@/sections/programs/commercial-pilot/CommercialCareerPathwaySection";
import { CommercialFAQSection } from "@/sections/programs/commercial-pilot/CommercialFAQSection";
import { CommercialBottomCTASection } from "@/sections/programs/commercial-pilot/CommercialBottomCTASection";

export default function CommercialPilotProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: commercialPilotProgram.title,
      description: commercialPilotProgram.metaDescription,
      url: "/programs/commercial-pilot/",
      serviceName:
        "Commercial Pilot License (CPL) Training — Hornbill Flight Center",
      courseName: "Commercial Pilot License course",
      credentialAwarded: "Commercial Pilot Certificate (FAA Part 61)",
      timeToComplete: "3–5 months full-time; 6–9 months part-time",
      prerequisites: commercialPilotProgram.prerequisites.items,
      teaches: "Commercial piloting",
      educationalLevel: "advanced",
      courseMode: "in-person",
      faqs: commercialPilotProgram.faq,
      serviceType: "FlightTraining",
      hasOfferCatalog: [
        { name: "Fleet and rates", url: "/fleet/" },
        { name: "Membership", url: "/membership/" },
        { name: "Discovery flight", url: "/discovery-flight/" },
      ],
      courseCode: "CPL-ASE",
      isPartOf: "/programs/",
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="commercial-pilot-schema" />
      <CommercialHeroSection />
      <CommercialQuickAnswerSection />
      <CommercialBenefitsSection />
      <CommercialPrerequisitesSection />
      <CommercialExperienceSection />
      <CommercialTimelineSection />
      <CommercialCostSection />
      <CommercialWhyHornbillSection />
      <CommercialCareerPathwaySection />
      <CommercialFAQSection />
      <CommercialBottomCTASection />
    </>
  );
}
