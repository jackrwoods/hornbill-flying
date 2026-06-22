import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { pricing } from "@/content/pricing";
import type { JsonLdThing } from "@/lib/schema";

const BASE = siteConfig.baseUrl;

export interface MembershipSchemaInput {
  url: string;
  title?: string;
  description?: string;
  priceValidUntil?: string;
}

/**
 * Builds the Service + Offer JSON-LD graph used on the membership page.
 * The Service describes the PA28 rental membership product; the Offer
 * carries the $49/month price and availability.
 */
export function buildMembershipService(
  input: MembershipSchemaInput
): JsonLdThing {
  const title = input.title || "PA28 Aircraft Rental Membership";
  const description =
    input.description ||
    `Pay $${pricing.membershipMonthly}/month for a discounted PA28 wet rate of $${pricing.memberWetRate}/hr at Reno-Tahoe International Airport (RNO).`;

  const offer: JsonLdThing = {
    "@type": "Offer",
    name: "Monthly Membership",
    price: String(pricing.membershipMonthly),
    priceCurrency: pricing.currency,
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: title,
      description,
      provider: {
        "@id": absoluteUrl("/#organization", BASE),
      },
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
    },
  };

  if (input.priceValidUntil) {
    offer.priceValidUntil = input.priceValidUntil;
  }

  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.url, BASE)}#service`,
    name: title,
    description,
    provider: [
      { "@id": absoluteUrl("/#organization", BASE) },
      { "@id": absoluteUrl("/#localbusiness", BASE) },
    ],
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
    offers: [offer],
  };
}
