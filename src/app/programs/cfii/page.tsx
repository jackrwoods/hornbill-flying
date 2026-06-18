import { SchemaInjector } from "@/components/SchemaInjector";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { cfiiProgram } from "@/content/programs/cfii";
import { CFIIHeroSection } from "@/sections/programs/cfii/CFIIHeroSection";
import { CFIIQuickAnswerSection } from "@/sections/programs/cfii/CFIIQuickAnswerSection";
import { CFIIBenefitsSection } from "@/sections/programs/cfii/CFIIBenefitsSection";
import { CFIIPrerequisitesSection } from "@/sections/programs/cfii/CFIIPrerequisitesSection";
import { CFIITrainingEmphasisSection } from "@/sections/programs/cfii/CFIITrainingEmphasisSection";
import { CFIIPracticalTestSection } from "@/sections/programs/cfii/CFIIPracticalTestSection";
import { CFIITimelineSection } from "@/sections/programs/cfii/CFIITimelineSection";
import { CFIICostSection } from "@/sections/programs/cfii/CFIICostSection";
import { CFIIWhyHornbillSection } from "@/sections/programs/cfii/CFIIWhyHornbillSection";
import { CFIIRelatedPathwaysSection } from "@/sections/programs/cfii/CFIIRelatedPathwaysSection";
import { CFIIFAQSection } from "@/sections/programs/cfii/CFIIFAQSection";
import { CFIIBottomCTASection } from "@/sections/programs/cfii/CFIIBottomCTASection";

export default function CFIIProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: cfiiProgram.title,
      description: cfiiProgram.quickAnswer,
      url: "/programs/cfii/",
      serviceName:
        "CFII Training — Certified Flight Instructor Instrument — Hornbill Flight Center",
      courseName: "Certified Flight Instructor Instrument (CFII) course",
      credentialAwarded:
        "Certified Flight Instructor Instrument (CFII) Certificate (FAA Part 61)",
      timeToComplete: "3–10 weeks depending on schedule",
      prerequisites: cfiiProgram.prerequisites.items,
      teaches: "Instrument flight instruction",
      faqs: cfiiProgram.faq,
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="cfii-schema" />
      <CFIIHeroSection />
      <CFIIQuickAnswerSection />
      <CFIIBenefitsSection />
      <CFIIPrerequisitesSection />
      <CFIITrainingEmphasisSection />
      <CFIIPracticalTestSection />
      <CFIITimelineSection />
      <CFIICostSection />
      <CFIIWhyHornbillSection />
      <CFIIRelatedPathwaysSection />
      <CFIIFAQSection />
      <CFIIBottomCTASection />
    </>
  );
}
