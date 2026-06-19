import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProgramCard } from "@/components/ProgramCard";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Section } from "@/components/Section";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { buildBreadcrumbList, buildSchemaGraph, buildWebPage } from "@/lib/schema";
import { programs } from "@/content/programs";

const PAGE_URL = "/programs/";
const PAGE_TITLE = "Flight Training Programs";
const PAGE_DESCRIPTION =
  "Part 61 flight training programs at Reno–Tahoe (RNO). Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, and Mountain Flying.";

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
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function ProgramsIndexPage() {
  const schema = buildSchemaGraph(
    buildWebPage(PAGE_TITLE, PAGE_URL),
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: buildCanonical(PAGE_URL) },
    ])
  );

  return (
    <>
      <SchemaInjector schema={schema} id="programs-index-schema" />
      <PageHeader
        title={PAGE_TITLE}
        subtitle={PAGE_DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
      />

      <Section background="cream">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
