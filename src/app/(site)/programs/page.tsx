import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SchemaInjector } from "@/components/SchemaInjector";
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
        eyebrow="Programs"
        placeholderLabel="PA28 fleet on the RNO ramp — photography coming"
      />

      <Section background="default">
        <Container>
          <Reveal variant="glide" className="max-w-3xl">
            <p className="panel-label-lg text-accent mb-4">All programs</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              Train for any of these. All on one fleet. All at your pace.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Reveal
                key={program.slug}
                variant="glide"
                className="card-cinematic p-6 flex flex-col"
              >
                <h3 className="font-heading text-xl font-extrabold text-heading">
                  {program.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted text-pretty">
                  {program.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="nums rounded bg-callout px-2 py-1 text-[11px] text-heading">
                    {program.duration}
                  </span>
                  <span className="nums rounded bg-bg px-2 py-1 text-[11px] text-heading border border-border-subtle">
                    {program.costRange}
                  </span>
                </div>
                <Link
                  href={program.url}
                  className="beak-flash mt-5 inline-flex w-fit text-sm font-semibold text-accent"
                >
                  See program
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="immersive-night" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal
            variant="stagger"
            className="mx-auto max-w-3xl flex flex-col items-center"
          >
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Your first lesson is a discovery flight. You fly. We watch.
            </p>
            <div className="mt-10">
              <Link
                href="/discovery-flight/"
                data-analytics="discovery_flight_booking_started"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-on-accent transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                Book a discovery flight
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}