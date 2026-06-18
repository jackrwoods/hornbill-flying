import { buildBreadcrumbList, buildCourse, buildFAQPage, buildService, type JsonLdThing } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { FAQItem } from "@/types";

const BASE = siteConfig.baseUrl;

export interface ProgramSchemaInput {
  title: string;
  description: string;
  url: string;
  serviceName: string;
  courseName: string;
  credentialAwarded: string;
  timeToComplete?: string;
  prerequisites?: string[];
  teaches?: string | string[];
  faqs?: FAQItem[];
  serviceType?: string;
  hasOfferCatalog?: { name: string; url: string }[];
  courseCode?: string;
  isPartOf?: string;
  educationalLevel?: string;
  courseMode?: string;
}

/**
 * Builds the Service + Course + FAQPage + BreadcrumbList JSON-LD graph
 * used by individual program pages.
 */
export function buildProgramSchemas(input: ProgramSchemaInput): JsonLdThing[] {
  const service = buildService(
    input.serviceName,
    input.description,
    input.url,
    [
      {
        price: String(siteConfig.pricing.memberWetRate),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
    input.serviceType || "FlightTraining",
    siteConfig.nap.addressLocality
  );

  if (input.hasOfferCatalog && input.hasOfferCatalog.length > 0) {
    service.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${input.title} offers`,
      itemListElement: input.hasOfferCatalog.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          name: offer.name,
          url: absoluteUrl(offer.url, BASE),
        },
      })),
    };
  }

  const course = buildCourse(
    input.courseName,
    input.description,
    input.url,
    input.credentialAwarded,
    {
      timeToComplete: input.timeToComplete,
      coursePrerequisites: input.prerequisites,
      occupationalCredentialAwarded: input.credentialAwarded,
      teaches: input.teaches,
      educationalLevel: input.educationalLevel,
      courseMode: input.courseMode,
    }
  );

  if (input.courseCode) {
    course.courseCode = input.courseCode;
  }

  if (input.isPartOf) {
    course.isPartOf = {
      "@type": "Course",
      url: absoluteUrl(input.isPartOf, BASE),
      name: "Hornbill Flight Center Training Programs",
    };
  }

  const schemas: JsonLdThing[] = [
    buildBreadcrumbList([
      { name: "Home", url: absoluteUrl("/", BASE) },
      { name: "Programs", url: absoluteUrl("/programs/", BASE) },
      { name: input.title, url: absoluteUrl(input.url, BASE) },
    ]),
    service,
    course,
  ];

  if (input.faqs && input.faqs.length > 0) {
    schemas.push(buildFAQPage(input.faqs));
  }

  return schemas;
}
