import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildFleetBreadcrumbList,
  buildAircraftProduct,
  buildSimulatorProduct,
  buildSchemaGraph,
  buildWebPage,
} from "@/lib/schema";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { FleetMemberDetailSection } from "@/sections/fleet/FleetMemberDetailSection";
import { FleetDetailCTASection } from "@/sections/fleet/FleetDetailCTASection";
import {
  getPublishedFleet,
  getFleetMemberBySlug,
  membershipRates,
} from "@/content/fleet";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { isAircraft } from "@/types";

interface FleetDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPublishedFleet().map((member) => ({ slug: member.slug }));
}

export async function generateMetadata(
  { params }: FleetDetailPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const member = getFleetMemberBySlug(slug);

  if (!member || !member.published) {
    return {
      title: "Aircraft not found",
    };
  }

  const canonical = buildCanonical(`/fleet/${member.slug}/`);
  const ogImage = {
    url: absoluteUrl(member.photo, siteConfig.baseUrl),
    width: 1200,
    height: 630,
    alt: member.photoAlt,
  };

  return {
    title: buildTitle(member.metaTitle),
    description: member.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: buildOpenGraph({
      url: canonical,
      title: buildTitle(member.metaTitle),
      description: member.metaDescription,
      images: [ogImage],
    }),
    twitter: buildTwitter({
      title: buildTitle(member.metaTitle),
      description: member.metaDescription,
    }),
  };
}

export default async function FleetDetailPage({
  params,
}: FleetDetailPageProps) {
  const { slug } = await params;
  const member = getFleetMemberBySlug(slug);

  if (!member || !member.published) {
    notFound();
  }

  const schemas = [
    buildWebPage(member.metaTitle, `/fleet/${member.slug}/`),
    buildFleetBreadcrumbList(member),
    isAircraft(member)
      ? buildAircraftProduct(member, membershipRates)
      : buildSimulatorProduct(member),
  ];

  return (
    <>
      <SchemaInjector
        schema={buildSchemaGraph(...schemas)}
        id="fleet-detail-schema"
      />
      <PageHeader
        title={isAircraft(member) ? member.tail : member.name}
        subtitle={
          isAircraft(member)
            ? "PA28 Cherokee"
            : member.tagline
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fleet & Pricing", href: "/fleet/" },
          { label: isAircraft(member) ? member.tail : member.name },
        ]}
      />
      <FleetMemberDetailSection member={member} />
      <FleetDetailCTASection />
    </>
  );
}
