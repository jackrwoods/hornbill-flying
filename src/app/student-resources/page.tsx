import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { studentFaqs } from "@/content/student-resources";

import { HeroSection } from "@/sections/student-resources/HeroSection";
import { WeatherSection } from "@/sections/student-resources/WeatherSection";
import { MedicalSection } from "@/sections/student-resources/MedicalSection";
import { SyllabiAndPohSection } from "@/sections/student-resources/SyllabiAndPohSection";
import { FlightPlanningSection } from "@/sections/student-resources/FlightPlanningSection";
import { FaaResourcesSection } from "@/sections/student-resources/FaaResourcesSection";
import { QuickLinksSection } from "@/sections/student-resources/QuickLinksSection";
import { StudentResourcesFAQ } from "@/sections/student-resources/StudentResourcesFAQ";

const PAGE_URL = "/student-resources/";
const OG_IMAGE = "/images/student-resources/hero.webp";
const PAGE_TITLE = "Student Resources for Pilots in Reno, NV";
const PAGE_DESCRIPTION =
  "Weather, METAR/TAF for RNO, FAA medical certificate guidance, training syllabi, POH downloads, flight-planning tools, and Part 61 resources for Hornbill students.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical(PAGE_URL),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical(PAGE_URL),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 800,
        alt: "Student resources for pilots at Hornbill Aviation in Reno, NV",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  }),
  robots: {
    index: true,
    follow: true,
  },
};

const BASE = siteConfig.baseUrl;

export default function StudentResourcesPage() {
  const webPage = buildWebPage(
    buildTitle(PAGE_TITLE),
    PAGE_URL,
    absoluteUrl("/student-resources/#webpage", BASE)
  );
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: absoluteUrl("/", BASE) },
    { name: "Student Resources", url: absoluteUrl(PAGE_URL, BASE) },
  ]);
  const faqSchema = buildFAQPage(studentFaqs);

  const schema = buildSchemaGraph(webPage, breadcrumb, faqSchema);

  return (
    <>
      <SchemaInjector schema={schema} id="student-resources-schema" />
      <HeroSection />
      <WeatherSection />
      <MedicalSection />
      <SyllabiAndPohSection />
      <FlightPlanningSection />
      <FaaResourcesSection />
      <QuickLinksSection />
      <StudentResourcesFAQ />
    </>
  );
}
