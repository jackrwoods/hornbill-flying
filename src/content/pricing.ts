import { siteConfig } from "@/lib/config";

export const currency = "USD" as const;

/**
 * Last-updated timestamp for all published rates.
 * Update this when rates change so every page reflects the same date.
 */
export const lastUpdated = "2026-06-18";

/**
 * Canonical public-facing rates for the whole site.
 * Prefer importing from here so the Membership and Fleet & Pricing pages
 * always stay in sync.
 */
export const pricing = {
  membershipMonthly: siteConfig.pricing.membershipMonthly,
  memberWetRate: siteConfig.pricing.memberWetRate,
  nonMemberWetRate: siteConfig.pricing.nonMemberWetRate,
  discoveryFlight: siteConfig.pricing.discoveryFlight,
  currency,
  lastUpdated,
};

export const membershipRates = {
  monthly: pricing.membershipMonthly,
  memberRate: pricing.memberWetRate,
  nonMemberRate: pricing.nonMemberWetRate,
  savingsPerHour: pricing.nonMemberWetRate - pricing.memberWetRate,
  breakEvenHours: Number(
    (pricing.membershipMonthly / (pricing.nonMemberWetRate - pricing.memberWetRate)).toFixed(1)
  ),
};
