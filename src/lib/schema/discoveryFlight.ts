import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { buildOffer, type JsonLdThing } from "@/lib/schema";
import type { FAQItem } from "@/types";

const BASE = siteConfig.baseUrl;
const DISCOVERY_URL = "/discovery-flight/";

/**
 * Builds a BreadcrumbList for the discovery flight page.
 */
export function buildDiscoveryBreadcrumbList(): JsonLdThing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/", BASE),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Discovery Flight",
        item: absoluteUrl(DISCOVERY_URL, BASE),
      },
    ],
  };
}

/**
 * Builds an Event entity for the standard discovery flight.
 * Reuses the Organization / LocalBusiness builders from the base schema as
 * organizer and location references.
 */
export function buildDiscoveryFlightEvent(): JsonLdThing {
  return {
    "@type": "Event",
    "@id": absoluteUrl("/discovery-flight/#event", BASE),
    name: "Discovery Flight — Hornbill Aviation",
    description:
      "A 45–60 minute introductory flight in a PA28 at Reno–Tahoe (RNO). You sit in the left seat and handle the controls with a certificated flight instructor.",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@id": absoluteUrl("/#localbusiness", BASE),
    },
    organizer: {
      "@id": absoluteUrl("/#organization", BASE),
    },
    offers: [
      buildOffer({
        name: "Standard discovery flight",
        description:
          "45–60 minute introductory discovery flight in a PA28 at Reno–Tahoe (RNO).",
        price: "199.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: DISCOVERY_URL,
        itemOffered: "Discovery flight",
      }),
    ],
    url: absoluteUrl(DISCOVERY_URL, BASE),
    duration: "PT1H",
  };
}

/**
 * Builds an Event entity for the Lake Tahoe scenic discovery flight.
 */
export function buildTahoeScenicEvent(): JsonLdThing {
  return {
    "@type": "Event",
    "@id": absoluteUrl("/discovery-flight/#event-tahoe", BASE),
    name: "Tahoe Scenic Discovery Flight — Hornbill Aviation",
    description:
      "A 75-minute scenic discovery flight over Lake Tahoe and the Sierra in a PA28 with a CFI.",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@id": absoluteUrl("/#localbusiness", BASE),
    },
    organizer: {
      "@id": absoluteUrl("/#organization", BASE),
    },
    offers: [
      buildOffer({
        name: "Tahoe scenic discovery flight",
        description:
          "75-minute scenic discovery flight over Lake Tahoe and the Sierra.",
        price: "299.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: DISCOVERY_URL,
        itemOffered: "Tahoe scenic discovery flight",
      }),
    ],
    url: absoluteUrl(DISCOVERY_URL, BASE),
    duration: "PT75M",
  };
}

/**
 * Builds an FAQPage schema for the discovery flight page accordion.
 */
export function buildDiscoveryFAQPage(faqs: FAQItem[]): JsonLdThing {
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

/**
 * Builds a WebPage entity for the discovery flight landing page.
 */
export function buildDiscoveryFlightWebPage(): JsonLdThing {
  return {
    "@type": "WebPage",
    "@id": absoluteUrl("/discovery-flight/#webpage", BASE),
    name: "Book a Discovery Flight in Reno, NV",
    url: absoluteUrl(DISCOVERY_URL, BASE),
    isPartOf: {
      "@id": absoluteUrl("/#website", BASE),
    },
    about: {
      "@id": absoluteUrl("/#localbusiness", BASE),
    },
  };
}
