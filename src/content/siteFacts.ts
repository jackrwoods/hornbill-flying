import { siteConfig } from "@/lib/config";

/**
 * Single source of truth for the quick-facts strip, footer NAP, contact page,
 * and LocalBusiness schema. Per v2-resolutions.md, phone is TBD at launch —
 * `phoneTbd` gates whether the strip renders a tel: link or a "Call us" link
 * to the contact page. Update this file (or siteConfig) when the number is assigned.
 */
export const siteFacts = {
  part: "Part 61",
  airport: "KRNO",
  airportLong: "Reno–Tahoe International Airport",
  memberRate: `$${siteConfig.pricing.memberWetRate}/hr`,
  memberRateQualifier: "wet, members",
  discoveryPrice: `$${siteConfig.pricing.discoveryFlight}`,
  discoveryQualifier: "no deposit",
  addressLine1: siteConfig.nap.streetAddress,
  addressLine2: `${siteConfig.nap.addressLocality}, ${siteConfig.nap.addressRegion} ${siteConfig.nap.postalCode}`,
  hours: "Daily 8a–5p",
  phoneTbd: siteConfig.nap.telephoneFormatted === "555-555-1234",
  phone: siteConfig.nap.telephone,
  phoneFormatted: siteConfig.nap.telephoneFormatted,
  email: siteConfig.nap.email,
  discoveryHref: "/discovery-flight/",
  fleetHref: "/fleet/",
  // /location/ is not built yet; address fact links to contact (which has the
  // map + NAP). Repoint to /location/ when that page ships.
  locationHref: "/contact/",
  contactHref: "/contact/",
} as const;

export type SiteFacts = typeof siteFacts;