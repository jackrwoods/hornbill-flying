import type { Metadata } from "next";
import Link from "next/link";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { siteFacts } from "@/content/siteFacts";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildSchemaGraph,
  buildWebPage,
} from "@/lib/schema";
import { routeMap } from "@/lib/routes";
import { privacyContent } from "@/content/legal/privacy";

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION =
  "Read how Hornbill Aviation collects, uses, and protects your information when you book flights or browse our site.";
const privacyRoute = routeMap.find((r) => r.slug === "privacy")!;
const pagePath = privacyRoute.href;
const canonical = buildCanonical(pagePath);

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical,
  },
  openGraph: buildOpenGraph({
    url: canonical,
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

const contactRoute = routeMap.find((r) => r.slug === "contact")!;

export default function PrivacyPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: canonical },
    ]),
    buildWebPage(PAGE_TITLE, pagePath)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="privacy-schema" />
      <PageHeader
        title={PAGE_TITLE}
        subtitle={`Effective date: ${privacyContent.effectiveDate}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
        eyebrow="Legal · Privacy"
        placeholderLabel="Office desk, morning — photography coming"
        sunsetVariant="soft"
      />
      <Section background="default">
        <Container>
          <Prose>
            {privacyContent.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p>
              Questions? Reach us through our{" "}
              <Link href={contactRoute.href} className="beak-flash">Contact page</Link>.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Closing CTA band */}
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
