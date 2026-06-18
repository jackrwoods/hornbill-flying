import { SchemaInjector } from "@/components/SchemaInjector";
import { buildSchemaGraph } from "@/lib/schema";
import { buildProgramSchemas } from "@/lib/schema/program";
import { cfiProgram } from "@/content/programs/cfi";
import { CFIHeroSection } from "@/sections/programs/cfi/CFIHeroSection";
import { CFIQuickAnswerSection } from "@/sections/programs/cfi/CFIQuickAnswerSection";
import { CFIWhoIsForSection } from "@/sections/programs/cfi/CFIWhoIsForSection";
import { CFIWhatYouLearnSection } from "@/sections/programs/cfi/CFIWhatYouLearnSection";
import { CFITimelineSection } from "@/sections/programs/cfi/CFITimelineSection";
import { CFICostSection } from "@/sections/programs/cfi/CFICostSection";
import { CFIWhyHornbillSection } from "@/sections/programs/cfi/CFIWhyHornbillSection";
import { CFIInstructorLeadSection } from "@/sections/programs/cfi/CFIInstructorLeadSection";
import { CFIRelatedPathwaysSection } from "@/sections/programs/cfi/CFIRelatedPathwaysSection";
import { CFIFAQSection } from "@/sections/programs/cfi/CFIFAQSection";
import { CFIBottomCTASection } from "@/sections/programs/cfi/CFIBottomCTASection";

export default function CFIProgramPage() {
  const schema = buildSchemaGraph(
    ...buildProgramSchemas({
      title: cfiProgram.title,
      description: cfiProgram.metaDescription,
      url: "/programs/certified-flight-instructor/",
      serviceName: "Certified Flight Instructor Training — Hornbill Flight Center",
      courseName: "Certified Flight Instructor (CFI) — Airplane Single-Engine",
      credentialAwarded:
        "FAA Certified Flight Instructor Certificate (Airplane Single-Engine)",
      timeToComplete: "4–6 weeks full-time; 2–4 months part-time",
      prerequisites: cfiProgram.whoIsFor.items,
      teaches: [
        "Fundamentals of Instruction",
        "Spin proficiency",
        "Lesson planning",
        "Practical test preparation",
      ],
      educationalLevel: "advanced",
      courseMode: "in-person",
      faqs: cfiProgram.faq,
      serviceType: "Certified Flight Instructor Training",
      hasOfferCatalog: [
        { name: "Fleet and rates", url: "/fleet/" },
        { name: "Membership", url: "/membership/" },
        { name: "CFI consultation", url: "/contact/?subject=CFI%20training" },
      ],
      courseCode: "CFI-ASE",
      isPartOf: "/programs/",
    })
  );

  return (
    <>
      <SchemaInjector schema={schema} id="cfi-schema" />
      <CFIHeroSection />
      <CFIQuickAnswerSection />
      <CFIWhoIsForSection />
      <CFIWhatYouLearnSection />
      <CFITimelineSection />
      <CFICostSection />
      <CFIWhyHornbillSection />
      <CFIInstructorLeadSection />
      <CFIRelatedPathwaysSection />
      <CFIFAQSection />
      <CFIBottomCTASection />
    </>
  );
}
