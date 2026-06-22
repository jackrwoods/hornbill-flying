import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
  buildFleetRentalService,
  buildAggregateOffer,
} from "@/lib/schema";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { fleetPage, fleetFAQs, membershipRates } from "@/content/fleet";
import { FleetPageHeader } from "@/sections/fleet/FleetPageHeader";
import { MembershipComparisonSection } from "@/sections/fleet/MembershipComparisonSection";
import { AircraftCardsSection } from "@/sections/fleet/AircraftCardsSection";
import { InstructorRateSection } from "@/sections/fleet/InstructorRateSection";
import { DiscoveryFlightPriceSection } from "@/sections/fleet/DiscoveryFlightPriceSection";
import { FinancingOptionsSection } from "@/sections/fleet/FinancingOptionsSection";
import { CancellationPolicySection } from "@/sections/fleet/CancellationPolicySection";
import { FleetFAQSection } from "@/sections/fleet/FleetFAQSection";
import { FleetCTASection } from "@/sections/fleet/FleetCTASection";

const PAGE_URL = "/fleet/";
const CANONICAL = buildCanonical(PAGE_URL);
const OG_IMAGE = "/images/fleet/fleet-hero.webp";

export const metadata: Metadata = {
  title: buildTitle(fleetPage.metaTitle),
  description: fleetPage.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: buildOpenGraph({
    url: CANONICAL,
    title: buildTitle(fleetPage.metaTitle),
    description: fleetPage.metaDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1600,
        height: 900,
        alt: "Hornbill Flight Center PA28 fleet at Reno-Tahoe International Airport (RNO)",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle(fleetPage.metaTitle),
    description: fleetPage.metaDescription,
    images: [OG_IMAGE],
  }),
};

const pageSchema = buildSchemaGraph(
  buildBreadcrumbList([
    { name: "Home", url: buildCanonical("/") },
    { name: "Fleet & Pricing", url: CANONICAL },
  ]),
  buildFleetRentalService(),
  buildAggregateOffer(
    String(membershipRates.memberRate),
    String(membershipRates.nonMemberRate),
    "USD",
    [
      {
        name: "Member PA28 wet rate",
        price: "159.00",
        priceCurrency: "USD",
        unitCode: "HUR",
        availability: "https://schema.org/InStock",
        url: "/fleet/",
      },
      {
        name: "Non-member PA28 wet rate",
        price: "180.00",
        priceCurrency: "USD",
        unitCode: "HUR",
        availability: "https://schema.org/InStock",
        url: "/fleet/",
      },
    ]
  ),
  buildFAQPage(fleetFAQs)
);

export default function FleetPage() {
  return (
    <>
      <SchemaInjector schema={pageSchema} id="fleet-schema" />
      <FleetPageHeader />
      <MembershipComparisonSection />
      <AircraftCardsSection />
      <InstructorRateSection />
      <DiscoveryFlightPriceSection />
      <FinancingOptionsSection />
      <CancellationPolicySection />
      <FleetFAQSection />
      <FleetCTASection />
    </>
  );
}
