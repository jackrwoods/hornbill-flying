import { siteConfig } from "./config";
import { absoluteUrl } from "./utils";
import { programs } from "@/content/programs";
import type { FAQItem, Instructor } from "@/types";

const BASE = siteConfig.baseUrl;

export interface JsonLdThing {
  "@type": string;
  "@id"?: string;
  name?: string;
  url?: string;
  [key: string]: unknown;
}

function postalAddressId(): string {
  return absoluteUrl("/#address", BASE);
}

export function buildPostalAddress() {
  return {
    "@type": "PostalAddress",
    "@id": postalAddressId(),
    streetAddress: siteConfig.nap.streetAddress,
    addressLocality: siteConfig.nap.addressLocality,
    addressRegion: siteConfig.nap.addressRegion,
    postalCode: siteConfig.nap.postalCode,
    addressCountry: siteConfig.nap.addressCountry,
  };
}

export function buildOrganization(): JsonLdThing {
  const sameAs = Object.values(siteConfig.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0
  );

  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization", BASE),
    name: siteConfig.brandName,
    url: absoluteUrl("/", BASE),
    logo: absoluteUrl("/logo.jpeg", BASE),
    sameAs,
  };
}

export function buildLocalBusiness(): JsonLdThing {
  return {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#localbusiness", BASE),
    name: siteConfig.brandName,
    image: absoluteUrl("/images/hero/hero-image.BhmeJT7E_Z1oh9we.webp", BASE),
    address: {
      "@id": postalAddressId(),
    },
    telephone: siteConfig.nap.telephone,
    email: siteConfig.nap.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.nap.geo.latitude,
      longitude: siteConfig.nap.geo.longitude,
    },
    priceRange: siteConfig.priceRange,
    openingHoursSpecification: siteConfig.officeHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    url: absoluteUrl("/", BASE),
  };
}

/**
 * Builds a schema.org ContactPoint for customer service.
 */
export function buildContactPoint(): JsonLdThing {
  return {
    "@type": "ContactPoint",
    "@id": absoluteUrl("/#contactpoint", BASE),
    contactType: "customer service",
    telephone: siteConfig.nap.telephone,
    email: siteConfig.nap.email,
    availableLanguage: "English",
    areaServed: {
      "@type": "City",
      name: siteConfig.nap.addressLocality,
      containedInPlace: {
        "@type": "State",
        name:
          siteConfig.nap.addressRegion === "NV"
            ? "Nevada"
            : siteConfig.nap.addressRegion,
      },
    },
    hoursAvailable: siteConfig.officeHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

/**
 * Builds the enhanced LocalBusiness entity used on the contact page.
 * Reuses the same @id as the root-layout LocalBusiness so crawlers merge
 * the descriptions rather than treating them as separate entities.
 */
export function buildContactPageLocalBusiness(): JsonLdThing {
  return {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#localbusiness", BASE),
    name: siteConfig.brandName,
    url: absoluteUrl("/", BASE),
    image: absoluteUrl("/images/hero/hero-image.BhmeJT7E_Z1oh9we.webp", BASE),
    telephone: siteConfig.nap.telephone,
    email: siteConfig.nap.email,
    address: {
      "@id": postalAddressId(),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.nap.geo.latitude,
      longitude: siteConfig.nap.geo.longitude,
    },
    priceRange: siteConfig.priceRange,
    openingHoursSpecification: siteConfig.officeHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      "@id": absoluteUrl("/#contactpoint", BASE),
    },
    makesOffer: [
      buildService(
        "Discovery flight",
        "A 45–60 minute introductory flight around the Reno area. Sit in the left seat and handle the controls with a certificated flight instructor.",
        "/discovery-flight/"
      ),
    ],
  };
}

export function buildEducationalOrganization(): JsonLdThing {
  return {
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#educationalorganization", BASE),
    name: siteConfig.brandName,
    address: {
      "@id": postalAddressId(),
    },
    hasCredential: [
      "Sport Pilot training",
      "Private Pilot training",
      "Instrument Rating training",
      "Commercial Pilot training",
      "Certified Flight Instructor training",
      "Certified Flight Instructor Instrument training",
    ],
    url: absoluteUrl("/", BASE),
  };
}

export function buildWebSite(): JsonLdThing {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website", BASE),
    url: absoluteUrl("/", BASE),
    name: siteConfig.brandName,
    publisher: {
      "@id": absoluteUrl("/#organization", BASE),
    },
  };
}

export function buildWebPage(
  name: string,
  url: string,
  id?: string
): JsonLdThing {
  return {
    "@type": "WebPage",
    "@id": id || absoluteUrl(`${url}#webpage`, BASE),
    name,
    url: absoluteUrl(url, BASE),
    isPartOf: {
      "@id": absoluteUrl("/#website", BASE),
    },
    about: {
      "@id": absoluteUrl("/#localbusiness", BASE),
    },
  };
}

export function buildBreadcrumbList(
  items: { name: string; url: string }[]
): JsonLdThing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function instructorDetailUrl(slug: string): string {
  return absoluteUrl(`/instructors/${slug}/`, BASE);
}

/**
 * Builds a BreadcrumbList for an individual instructor page.
 */
export function buildInstructorBreadcrumbList(
  instructor: Instructor
): JsonLdThing {
  return buildBreadcrumbList([
    { name: "Home", url: absoluteUrl("/", BASE) },
    { name: "Instructors", url: absoluteUrl("/instructors/", BASE) },
    { name: instructor.name, url: instructorDetailUrl(instructor.slug) },
  ]);
}

function buildKnowsAbout(instructor: Instructor): string[] {
  const topics = new Set<string>(instructor.specialties);

  for (const programSlug of instructor.teachesPrograms) {
    const program = programs.find((p) => p.slug === programSlug);
    if (program) {
      topics.add(program.title);
    }
  }

  topics.add("PA28 instruction");
  topics.add("Part 61 flight training");

  return Array.from(topics);
}

/**
 * Builds a schema.org Person entity for an instructor.
 * Only emits certificate data when the instructor has explicitly consented.
 */
export function buildPerson(instructor: Instructor): JsonLdThing {
  const person: JsonLdThing = {
    "@type": "Person",
    "@id": `${instructorDetailUrl(instructor.slug)}#person`,
    name: instructor.name,
    jobTitle: instructor.title,
    worksFor: {
      "@id": absoluteUrl("/#organization", BASE),
    },
    url: instructorDetailUrl(instructor.slug),
    image: absoluteUrl(instructor.photo || "/logo.jpeg", BASE),
    description: instructor.metaDescription,
    knowsAbout: buildKnowsAbout(instructor),
    areaServed: {
      "@type": "City",
      name: siteConfig.nap.addressLocality,
      containedInPlace: {
        "@type": "State",
        name: siteConfig.nap.addressRegion === "NV" ? "Nevada" : siteConfig.nap.addressRegion,
      },
    },
  };

  if (instructor.publishCertificate && instructor.certificateNumber) {
    person.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certified Flight Instructor",
      recognizedBy: {
        "@type": "Organization",
        name: "Federal Aviation Administration",
        alternateName: "FAA",
      },
      identifier: instructor.certificateNumber,
    };
  }

  return person;
}

/**
 * Backwards-compatible alias for the instructor detail pages (TICKET-014).
 */
export const buildPersonSchema = buildPerson;

/**
 * Builds an ItemList of Person entities for the instructors index page.
 */
export function buildItemList(persons: Instructor[]): JsonLdThing {
  return {
    "@type": "ItemList",
    itemListElement: persons.map((person, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${instructorDetailUrl(person.slug)}#person`,
      },
    })),
  };
}

export function buildFAQPage(faqs: FAQItem[]): JsonLdThing {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildService(
  name: string,
  description: string,
  url: string,
  offers?: { price: string; priceCurrency: string; availability: string }[],
  serviceType?: string,
  areaServed?: string
): JsonLdThing {
  const thing: JsonLdThing = {
    "@type": "Service",
    name,
    description,
    provider: {
      "@id": absoluteUrl("/#organization", BASE),
    },
    url: absoluteUrl(url, BASE),
    offers:
      offers?.map((offer) => ({
        "@type": "Offer",
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: offer.availability,
      })) || undefined,
  };

  if (serviceType) {
    thing.serviceType = serviceType;
  }
  if (areaServed) {
    thing.areaServed = {
      "@type": "City",
      name: areaServed,
      containedInPlace: {
        "@type": "State",
        name: siteConfig.nap.addressRegion === "NV" ? "Nevada" : siteConfig.nap.addressRegion,
      },
    };
  }

  return thing;
}

export interface BuildCourseOptions {
  timeToComplete?: string;
  coursePrerequisites?: string[];
  occupationalCredentialAwarded?: string;
  teaches?: string | string[];
  educationalLevel?: string;
  courseMode?: string;
}

export interface ServiceOffer {
  price: string;
  priceCurrency: string;
  availability?: string;
  unitCode?: string;
  name?: string;
  url?: string;
  description?: string;
  itemOffered?: string;
}

export function buildServiceOffer(offer: ServiceOffer): JsonLdThing {
  const thing: JsonLdThing = {
    "@type": "Offer",
    price: offer.price,
    priceCurrency: offer.priceCurrency,
  };
  if (offer.availability) {
    thing.availability = offer.availability;
  }
  if (offer.unitCode) {
    thing.unitCode = offer.unitCode;
  }
  if (offer.name) {
    thing.name = offer.name;
  }
  if (offer.url) {
    thing.url = absoluteUrl(offer.url, BASE);
  }
  if (offer.description) {
    thing.description = offer.description;
  }
  if (offer.itemOffered) {
    thing.itemOffered = offer.itemOffered;
  }
  return thing;
}

export function buildAggregateOffer(
  lowPrice: string,
  highPrice: string,
  priceCurrency: string,
  offers?: ServiceOffer[]
): JsonLdThing {
  const thing: JsonLdThing = {
    "@type": "AggregateOffer",
    lowPrice,
    highPrice,
    priceCurrency,
  };
  if (offers && offers.length > 0) {
    thing.offers = offers.map(buildServiceOffer);
  }
  return thing;
}

export function buildAirportAreaServed(
  code: string,
  name: string,
  city: string
): JsonLdThing {
  return {
    "@type": "Airport",
    name,
    alternateName: code,
    containedInPlace: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: siteConfig.nap.addressRegion === "NV" ? "Nevada" : siteConfig.nap.addressRegion,
      },
    },
  };
}

export function buildFleetRentalService(): JsonLdThing {
  const fleetUrl = absoluteUrl("/fleet/", BASE);
  const offers: ServiceOffer[] = [
    {
      name: "Member PA28 wet rate",
      description: "Wet hourly rate for PA28 rental with active membership.",
      price: "159.00",
      priceCurrency: "USD",
      unitCode: "HUR",
      availability: "https://schema.org/InStock",
      url: "/fleet/",
      itemOffered: "PA28 Cherokee aircraft rental",
    },
    {
      name: "Non-member PA28 wet rate",
      description: "Wet hourly rate for PA28 rental without membership.",
      price: "180.00",
      priceCurrency: "USD",
      unitCode: "HUR",
      availability: "https://schema.org/InStock",
      url: "/fleet/",
      itemOffered: "PA28 Cherokee aircraft rental",
    },
    {
      name: "Monthly membership",
      description: "Monthly membership that lowers the PA28 wet rate.",
      price: "59.00",
      priceCurrency: "USD",
      unitCode: "MON",
      availability: "https://schema.org/InStock",
      url: "/membership/",
      itemOffered: "Hornbill Aviation membership",
    },
    {
      name: "Discovery flight",
      description: "Introductory discovery flight in a PA28 at RNO.",
      price: "199.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "/discovery-flight/",
      itemOffered: "Discovery flight",
    },
  ];

  return {
    "@type": "Service",
    "@id": `${fleetUrl}#service`,
    name: "PA28 Aircraft Rental & Flight Training",
    description:
      "Transparent wet-rate PA28 aircraft rental and Part 61 flight training at Reno–Tahoe International Airport (RNO).",
    provider: [
      { "@id": absoluteUrl("/#organization", BASE) },
      { "@id": absoluteUrl("/#localbusiness", BASE) },
    ],
    areaServed: buildAirportAreaServed(
      "RNO",
      "Reno–Tahoe International Airport",
      "Reno"
    ),
    serviceType: ["Flight Training", "Aircraft Rental"],
    url: fleetUrl,
    offers: offers.map(buildServiceOffer),
  };
}

export function buildCourse(
  name: string,
  description: string,
  url: string,
  educationalCredentialAwarded: string,
  options?: BuildCourseOptions
): JsonLdThing {
  const thing: JsonLdThing = {
    "@type": "Course",
    name,
    description,
    provider: {
      "@id": absoluteUrl("/#organization", BASE),
    },
    url: absoluteUrl(url, BASE),
    educationalCredentialAwarded,
    timeToComplete: options?.timeToComplete,
    coursePrerequisites: options?.coursePrerequisites,
  };

  if (options?.occupationalCredentialAwarded) {
    thing.occupationalCredentialAwarded = options.occupationalCredentialAwarded;
  }
  if (options?.teaches) {
    thing.teaches = options.teaches;
  }
  if (options?.educationalLevel) {
    thing.educationalLevel = options.educationalLevel;
  }
  if (options?.courseMode) {
    thing.courseMode = options.courseMode;
  }

  return thing;
}

export function buildArticle(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string,
  authorName?: string,
  authorUrl?: string,
  imageUrl?: string
): JsonLdThing {
  const author = authorName
    ? {
        "@type": "Person",
        name: authorName,
        url: authorUrl ? absoluteUrl(authorUrl, BASE) : undefined,
      }
    : undefined;

  return {
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(url, BASE),
    datePublished,
    dateModified: dateModified || datePublished,
    author,
    image: imageUrl ? absoluteUrl(imageUrl, BASE) : undefined,
    publisher: {
      "@id": absoluteUrl("/#organization", BASE),
    },
  };
}

export function buildAggregateRating(
  ratingValue: number,
  reviewCount: number
): JsonLdThing {
  return {
    "@type": "AggregateRating",
    ratingValue: String(ratingValue),
    reviewCount: String(reviewCount),
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Builds a generic schema.org Offer for pricing on service or event pages.
 */
export function buildOffer(offer: ServiceOffer): JsonLdThing {
  return buildServiceOffer(offer);
}

/**
 * Builds an Event entity for the discovery flight bookable service.
 */
export function buildEvent(): JsonLdThing {
  const eventId = absoluteUrl("/book/#discovery-flight", BASE);
  return {
    "@type": "Event",
    "@id": eventId,
    name: "Discovery Flight at Hornbill Aviation",
    description:
      "45–60 minute introductory flight in a PA28 at Reno–Tahoe (RNO).",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@id": absoluteUrl("/#localbusiness", BASE),
    },
    offers: [
      buildOffer({
        name: "Discovery flight",
        description:
          "Introductory discovery flight in a PA28 at Reno–Tahoe (RNO).",
        price: "199.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "/book/?flow=discovery",
        itemOffered: "Discovery flight",
      }),
    ],
    url: absoluteUrl("/book/?flow=discovery", BASE),
    organizer: {
      "@id": absoluteUrl("/#organization", BASE),
    },
  };
}

interface BuildOrderInput {
  orderNumber: string;
  price: string;
  priceCurrency: string;
  url?: string;
}

/**
 * Builds an Order entity for a completed booking confirmation.
 */
export function buildOrder(order: BuildOrderInput): JsonLdThing {
  return {
    "@type": "Order",
    "@id": order.url
      ? absoluteUrl(order.url, BASE)
      : absoluteUrl(`/book/#order-${order.orderNumber}`, BASE),
    orderNumber: order.orderNumber,
    acceptedOffer: buildOffer({
      price: order.price,
      priceCurrency: order.priceCurrency,
    }),
    seller: {
      "@id": absoluteUrl("/#organization", BASE),
    },
  };
}

/**
 * Wraps one or more JSON-LD objects in a single graph for injection into a
 * page. Callers should render the result with SchemaInjector.
 */
export function buildSchemaGraph(
  ...things: (JsonLdThing | JsonLdThing[] | undefined | null)[]
): { "@context": string; "@graph": JsonLdThing[] } {
  const graph: JsonLdThing[] = [];
  for (const thing of things) {
    if (!thing) continue;
    if (Array.isArray(thing)) {
      graph.push(...thing.filter(Boolean));
    } else {
      graph.push(thing);
    }
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
