import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LatestPosts } from "@/components/LatestPosts";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Section } from "@/components/Section";
import { siteFacts } from "@/content/siteFacts";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { buildBreadcrumbList, buildSchemaGraph, buildWebPage } from "@/lib/schema";
import { getBlogTeasers } from "@/lib/blog";

const PAGE_URL = "/blog/";
const PAGE_TITLE = "Flight Training Blog";
const PAGE_DESCRIPTION =
  "Guides, tips, and local knowledge for pilots training at Reno–Tahoe (RNO). Read about costs, medical certificates, mountain flying, and more.";

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

export default async function BlogIndexPage() {
  const posts = await getBlogTeasers();

  const schema = buildSchemaGraph(
    buildWebPage(PAGE_TITLE, PAGE_URL),
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: buildCanonical(PAGE_URL) },
    ])
  );

  return (
    <>
      <SchemaInjector schema={schema} id="blog-index-schema" />
      <PageHeader
        title={PAGE_TITLE}
        subtitle={PAGE_DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
        eyebrow="Field notes"
        placeholderLabel="Cockpit panel, golden hour — photography coming"
      />

      <Section background="default">
        <Container>
          <Reveal variant="glide" className="max-w-3xl">
            <p className="panel-label-lg text-accent mb-4">Latest posts</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {PAGE_DESCRIPTION}
            </h2>
          </Reveal>
          <Reveal variant="glide" className="mt-10">
            <LatestPosts posts={posts} />
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band — mirrors the homepage Discovery CTA */}
      <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Your first lesson is a discovery flight. You fly. We watch.
            </p>
            <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
              {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
            </p>
            <div className="mt-10">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
                className="px-8 py-4 text-base"
              >
                Book a discovery flight — {siteFacts.discoveryPrice}
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}