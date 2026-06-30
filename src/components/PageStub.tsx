import Link from "next/link";
import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { buildSchemaGraph } from "@/lib/schema";
import { buildBreadcrumbList, type JsonLdThing } from "@/lib/schema";
import { buildCanonical } from "@/lib/seo";

interface PageStubLink {
  label: string;
  href: string;
  description?: string;
}

interface PageStubProps {
  title: string;
  description: string;
  breadcrumbs: { name: string; url: string }[];
  schema?: JsonLdThing | JsonLdThing[];
  links?: PageStubLink[];
  cta?: {
    label: string;
    href: string;
  };
}

export function PageStub({
  title,
  description,
  breadcrumbs,
  schema,
  links,
  cta,
}: PageStubProps) {
  const schemas: JsonLdThing[] = [
    buildBreadcrumbList(breadcrumbs),
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
  ];

  return (
    <>
      <SchemaInjector schema={buildSchemaGraph(...schemas)} id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-stub-schema`} />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Container className="relative z-10">
          <div className="py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
                Coming soon
              </p>
              <h1 className="mt-3 font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 text-lg text-sand-50/90 md:text-xl">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {cta && (
                  <CTALink href={cta.href} variant="secondary">
                    {cta.label}
                  </CTALink>
                )}
                <PhoneLink
                  className="text-white hover:text-gold-400"
                  showIcon
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {links && links.length > 0 && (
        <Section background="sand" id="related-links">
          <Container>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              Related pages
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border-t-4 border-gold-500 bg-white p-6 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                >
                  <h3 className="font-heading text-xl text-navy-900 group-hover:text-gold-500 transition-colors">
                    {item.label}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-ink-light">{item.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

export function buildStubMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonical(path),
    },
  };
}
