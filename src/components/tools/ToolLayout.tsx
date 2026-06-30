import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { SchemaInjector } from "@/components/SchemaInjector";
import { FAQAccordion } from "@/components/FAQAccordion";
import { buildBreadcrumbList, buildFAQPage, buildSchemaGraph } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import type { FAQItem } from "@/types";
import type { ReactNode } from "react";

interface RelatedLink {
  href: string;
  label: string;
}

interface ToolLayoutProps {
  title: string;
  subtitle?: string;
  pageHref: string;
  children: ReactNode;
  faqs?: FAQItem[];
  related?: RelatedLink[];
  showCta?: boolean;
}

const BASE = siteConfig.baseUrl;

export function ToolLayout({
  title,
  subtitle,
  pageHref,
  children,
  faqs,
  related,
  showCta = true,
}: ToolLayoutProps) {
  const schemas = [buildBreadcrumbList(buildCrumbs(title, pageHref))];
  if (faqs && faqs.length > 0) {
    schemas.push(buildFAQPage(faqs));
  }

  return (
    <>
      <SchemaInjector schema={buildSchemaGraph(...schemas)} id="tool-schema" />
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools/" },
          { label: title },
        ]}
      />

      <Section background="sand">
        <Container className="max-w-4xl">{children}</Container>
      </Section>

      {related && related.length > 0 && (
        <Section background="white">
          <Container className="max-w-4xl">
            <h2 className="font-heading text-2xl text-navy-900">Related pages</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg border border-navy-800/10 bg-sand-50 p-4 font-semibold text-navy-900 hover:border-gold-500 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {faqs && faqs.length > 0 && (
        <Section background="white" id="faq">
          <Container className="max-w-4xl">
            <h2 className="font-heading text-2xl text-navy-900">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion faqs={faqs} />
            </div>
          </Container>
        </Section>
      )}

      {showCta && (
        <Section background="navy" id="cta">
          <Container className="max-w-4xl text-center">
            <h2 className="font-heading text-3xl text-white">Ready to fly?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sand-50/90">
              Book a discovery flight at Hornbill Aviation and see how Part 61 training in a PA28 fleet fits your schedule.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTALink variant="secondary">Book a discovery flight</CTALink>
              <PhoneLink className="text-white hover:text-gold-400" showIcon />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

function buildCrumbs(label: string, pageHref: string) {
  return [
    { name: "Home", url: absoluteUrl("/", BASE) },
    { name: "Tools", url: absoluteUrl("/tools/", BASE) },
    { name: label, url: absoluteUrl(pageHref, BASE) },
  ];
}
