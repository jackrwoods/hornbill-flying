import { SchemaInjector } from "@/components/SchemaInjector";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { sportPilotProgram } from "@/content/programs/sport-pilot";
import { SportPilotHeroSection } from "@/sections/programs/sport-pilot/SportPilotHeroSection";
import { SportPilotQuickAnswerSection } from "@/sections/programs/sport-pilot/SportPilotQuickAnswerSection";
import { SportPilotWhatIsSection } from "@/sections/programs/sport-pilot/SportPilotWhatIsSection";
import { SportPilotRequirementsSection } from "@/sections/programs/sport-pilot/SportPilotRequirementsSection";
import { SportPilotTimelineSection } from "@/sections/programs/sport-pilot/SportPilotTimelineSection";
import { SportPilotCostSection } from "@/sections/programs/sport-pilot/SportPilotCostSection";
import { SportPilotFleetFitSection } from "@/sections/programs/sport-pilot/SportPilotFleetFitSection";
import { SportPilotUpgradeSection } from "@/sections/programs/sport-pilot/SportPilotUpgradeSection";
import { SportPilotDiscoveryFlightSection } from "@/sections/programs/sport-pilot/SportPilotDiscoveryFlightSection";
import { SportPilotWhyHornbillSection } from "@/sections/programs/sport-pilot/SportPilotWhyHornbillSection";
import { SportPilotFAQSection } from "@/sections/programs/sport-pilot/SportPilotFAQSection";
import { SportPilotRelatedPathwaysSection } from "@/sections/programs/sport-pilot/SportPilotRelatedPathwaysSection";
import { SportPilotBottomCTASection } from "@/sections/programs/sport-pilot/SportPilotBottomCTASection";

export default function SportPilotProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: sportPilotProgram.title,
      description: sportPilotProgram.metaDescription,
      url: "/programs/sport-pilot/",
      serviceName: "Sport Pilot Training — Hornbill Flight Center",
      courseName: "Sport Pilot Certificate course",
      credentialAwarded: "FAA Sport Pilot Certificate",
      timeToComplete: "4–6 weeks full-time; 3–6 months part-time",
      prerequisites: sportPilotProgram.requirements.items,
      teaches: "Sport Pilot certificate preparation",
      educationalLevel: "beginner",
      courseMode: "in-person",
      faqs: sportPilotProgram.faq,
      serviceType: "FlightTraining",
      hasOfferCatalog: [
        { name: "Fleet and rates", url: "/fleet/" },
        { name: "Membership", url: "/membership/" },
        { name: "Discovery flight", url: "/discovery-flight/" },
      ],
      courseCode: "SPL",
      isPartOf: "/programs/",
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="sport-pilot-schema" />
      <SportPilotHeroSection />
      <SportPilotQuickAnswerSection />
      <SportPilotWhatIsSection />
      <SportPilotRequirementsSection />
      <SportPilotTimelineSection />
      <SportPilotCostSection />
      <SportPilotFleetFitSection />
      <SportPilotUpgradeSection />
      <SportPilotDiscoveryFlightSection />
      <SportPilotWhyHornbillSection />
      <SportPilotFAQSection />
      <SportPilotRelatedPathwaysSection />
      <SportPilotBottomCTASection />
    </>
  );
}
