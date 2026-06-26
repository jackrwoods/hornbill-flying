import { SchemaInjector } from "@/components/SchemaInjector";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";
import { MountainFlyingHeroSection } from "@/sections/programs/mountain-flying/MountainFlyingHeroSection";
import { MountainFlyingQuickAnswerSection } from "@/sections/programs/mountain-flying/MountainFlyingQuickAnswerSection";
import { MountainFlyingWhatCoversSection } from "@/sections/programs/mountain-flying/MountainFlyingWhatCoversSection";
import { MountainFlyingDensityAltitudeSection } from "@/sections/programs/mountain-flying/MountainFlyingDensityAltitudeSection";
import { MountainFlyingTerrainWeatherSection } from "@/sections/programs/mountain-flying/MountainFlyingTerrainWeatherSection";
import { MountainFlyingSampleRoutesSection } from "@/sections/programs/mountain-flying/MountainFlyingSampleRoutesSection";
import { MountainFlyingPrerequisitesCostSection } from "@/sections/programs/mountain-flying/MountainFlyingPrerequisitesCostSection";
import { MountainFlyingSafetySection } from "@/sections/programs/mountain-flying/MountainFlyingSafetySection";
import { MountainFlyingWhyHornbillSection } from "@/sections/programs/mountain-flying/MountainFlyingWhyHornbillSection";
import { MountainFlyingRelatedPathwaysSection } from "@/sections/programs/mountain-flying/MountainFlyingRelatedPathwaysSection";
import { MountainFlyingFAQSection } from "@/sections/programs/mountain-flying/MountainFlyingFAQSection";
import { MountainFlyingBottomCTASection } from "@/sections/programs/mountain-flying/MountainFlyingBottomCTASection";

export default function MountainFlyingProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: mountainFlyingProgram.title,
      description: mountainFlyingProgram.metaDescription,
      url: "/programs/mountain-flying/",
      serviceName:
        "Mountain Flying Course — Sierra Nevada — Hornbill Aviation",
      courseName: "Mountain Flying and Density-Altitude Course",
      credentialAwarded:
        "Mountain Flying Course Completion — Hornbill Aviation",
      timeToComplete: "1–2 ground sessions plus 2–4 instructional flights",
      prerequisites: mountainFlyingProgram.prerequisitesDurationCost.prerequisites.items,
      teaches: [
        "Mountain flying",
        "Density-altitude operations",
        "High-terrain weather and decision-making",
      ],
      educationalLevel: "advanced",
      courseMode: "in-person",
      faqs: mountainFlyingProgram.faq,
      serviceType: "FlightTraining",
      hasOfferCatalog: [
        { name: "Fleet and rates", url: "/fleet/" },
        { name: "Membership", url: "/membership/" },
        { name: "Discovery flight", url: "/discovery-flight/" },
        { name: "Density altitude calculator", url: "/tools/density-altitude/" },
      ],
      isPartOf: "/programs/",
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="mountain-flying-schema" />
      <MountainFlyingHeroSection />
      <MountainFlyingQuickAnswerSection />
      <MountainFlyingWhatCoversSection />
      <MountainFlyingDensityAltitudeSection />
      <MountainFlyingTerrainWeatherSection />
      <MountainFlyingSampleRoutesSection />
      <MountainFlyingPrerequisitesCostSection />
      <MountainFlyingSafetySection />
      <MountainFlyingWhyHornbillSection />
      <MountainFlyingRelatedPathwaysSection />
      <MountainFlyingFAQSection />
      <MountainFlyingBottomCTASection />
    </>
  );
}
