import type { Metadata } from "next";
import Link from "next/link";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { Container } from "@/components/Container";
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
import { termsContent } from "@/content/legal/terms";

const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION =
  "Read the terms of service for Hornbill Aviation, including flight training, aircraft rental, and website use.";
const termsRoute = routeMap.find((r) => r.slug === "terms")!;
const pagePath = termsRoute.href;
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

const cancellationRoute = routeMap.find((r) => r.slug === "cancellation-policy")!;
const contactRoute = routeMap.find((r) => r.slug === "contact")!;

export default function TermsPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: canonical },
    ]),
    buildWebPage(PAGE_TITLE, pagePath)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="terms-schema" />
      <PageHeader
        title={PAGE_TITLE}
        subtitle={`Effective date: ${termsContent.effectiveDate}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
      />
      <Section background="sand">
        <Container>
          <Prose>
            {termsContent.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => {
                  const linkText = "Cancellation, Refund & Weather Policy";
                  if (
                    section.id === "bookings-and-payments" &&
                    paragraph.includes(linkText)
                  ) {
                    const [before, after] = paragraph.split(linkText);
                    return (
                      <p key={index}>
                        {before}
                        <Link href={cancellationRoute.href}>{linkText}</Link>
                        {after}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
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
              Questions about these terms? Contact us through our{" "}
              <Link href={contactRoute.href}>Contact page</Link>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
