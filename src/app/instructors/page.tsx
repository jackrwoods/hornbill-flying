import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildPerson,
  buildItemList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { SchemaInjector } from "@/components/SchemaInjector";
import { InstructorsPageHeader } from "@/sections/instructors/InstructorsPageHeader";
import { InstructorGridSection } from "@/sections/instructors/InstructorGridSection";
import { InstructorsFAQSection } from "@/sections/instructors/InstructorsFAQSection";
import { InstructorsCTASection } from "@/sections/instructors/InstructorsCTASection";
import { instructors } from "@/content/instructors";
import { instructorsFAQ } from "@/content/instructors-faq";

const PAGE_TITLE = "Flight Instructors in Reno, NV";
const PAGE_DESCRIPTION =
  "Meet the CFIs at Hornbill Aviation. Part 61 instruction at RNO, choose your instructor, and book a discovery flight.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/instructors/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/instructors/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function InstructorsPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: "Instructors", url: buildCanonical("/instructors/") },
    ]),
    instructors.map((instructor) => buildPerson(instructor)),
    buildItemList(instructors),
    buildFAQPage(instructorsFAQ)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="instructors-schema" />
      <InstructorsPageHeader />
      <InstructorGridSection />
      <InstructorsFAQSection />
      <InstructorsCTASection />
    </>
  );
}
