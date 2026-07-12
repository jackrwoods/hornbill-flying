import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
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
import { siteFacts } from "@/content/siteFacts";
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
  "Weather, METAR/TAF for RNO, FAA medical certificate guidance, training syllabi, POH downloads, flight-planning tools, and Part 61 resources for Hornbill Aviation students.";

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

      {/* Closing CTA band — mirrors the homepage Discovery CTA */}
      <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Your first lesson is a discovery flight. You fly. We watch.
            </p>
            <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
              {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
            </p>
            <div className="mt-10">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
                className="px-8 py-4 text-base"
              >
                Book a discovery flight — {siteFacts.discoveryPrice}
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
