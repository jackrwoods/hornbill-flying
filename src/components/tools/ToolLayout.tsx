import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { SchemaInjector } from "@/components/SchemaInjector";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { siteFacts } from "@/content/siteFacts";
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
  /** IBM Plex Mono eyebrow label above the hero title. */
  eyebrow?: string;
  /** Launch photography placeholder label for the hero. */
  placeholderLabel?: string;
  /** Sunset gradient variant for the hero backdrop. */
  sunsetVariant?: "default" | "vertical" | "soft" | "dawn" | "home";
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
  eyebrow = "Tools",
  placeholderLabel = "Cockpit panel, golden hour — photography coming",
  sunsetVariant = "home",
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
        eyebrow={eyebrow}
        placeholderLabel={placeholderLabel}
        sunsetVariant={sunsetVariant}
      />

      <Section background="default">
        <Container className="max-w-4xl">
          <Reveal variant="glide">{children}</Reveal>
        </Container>
      </Section>

      {related && related.length > 0 && (
        <Section background="card">
          <Container className="max-w-4xl">
            <Reveal variant="glide">
              <p className="panel-label-lg text-accent mb-4">Related</p>
              <h2 className="font-heading text-2xl text-heading">Related pages</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="card-cinematic block p-4 font-semibold text-heading hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    >
                      <span className="beak-flash">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>
      )}

      {faqs && faqs.length > 0 && (
        <Section background="card" id="faq">
          <Container className="max-w-4xl">
            <Reveal variant="glide">
              <p className="panel-label-lg text-accent mb-4">Questions</p>
              <h2 className="font-heading text-2xl text-heading">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <FAQAccordion faqs={faqs} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {showCta && (
        <Section background="immersive-night" id="cta" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-20" aria-hidden="true" />
          <Container className="relative z-10 max-w-3xl text-center">
            <Reveal variant="stagger" className="flex flex-col items-center">
              <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
              <p className="font-display text-3xl md:text-4xl leading-snug text-on-immersive text-balance">
                Ready to fly? Your first lesson is a discovery flight.
              </p>
              <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
                {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <CTALink variant="secondary" className="px-8 py-4 text-base">
                  Book a discovery flight — {siteFacts.discoveryPrice}
                </CTALink>
                <PhoneLink className="text-on-immersive hover:text-immersive-accent-hover" showIcon />
              </div>
            </Reveal>
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