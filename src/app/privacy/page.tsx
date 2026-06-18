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
import { privacyContent } from "@/content/legal/privacy";

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION =
  "Read how Hornbill Flight Center collects, uses, and protects your information when you book flights or browse our site.";
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
      />
      <Section background="cream">
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
              <Link href={contactRoute.href}>Contact page</Link>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
