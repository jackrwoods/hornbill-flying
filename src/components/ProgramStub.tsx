import Link from "next/link";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { buildSchemaGraph } from "@/lib/schema";
import { buildBreadcrumbList, buildCourse, buildService, type JsonLdThing } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import type { Program } from "@/types";

const BASE = siteConfig.baseUrl;

interface ProgramStubProps {
  program: Program;
  description?: string;
  related: {
    title: string;
    description: string;
    href: string;
  }[];
}

export function ProgramStub({ program, description, related }: ProgramStubProps) {
  const pageUrl = program.url;

  const schemas: JsonLdThing[] = [
    buildBreadcrumbList([
      { name: "Home", url: absoluteUrl("/", BASE) },
      { name: "Programs", url: absoluteUrl("/programs/", BASE) },
      { name: program.title, url: absoluteUrl(pageUrl, BASE) },
    ]),
    buildService(
      `${program.title} training — Hornbill Aviation`,
      description || program.shortDescription,
      pageUrl
    ),
    buildCourse(
      program.title,
      description || program.shortDescription,
      pageUrl,
      program.targetCertificate
    ),
  ];

  return (
    <>
      <SchemaInjector schema={buildSchemaGraph(...schemas)} id={`${program.slug}-stub-schema`} />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Container className="relative z-10">
          <div className="py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
                Flight training program
              </p>
              <h1 className="mt-3 font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
                {program.title} training in Reno, NV
              </h1>
              <p className="mt-6 text-lg text-cream-50/90 md:text-xl">
                {description || program.shortDescription}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <CTALink href="/contact/" variant="secondary">
                  Talk to an instructor
                </CTALink>
                <PhoneLink
                  className="text-white hover:text-gold-400"
                  showIcon
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section background="cream" id="overview">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-light">
                Target certificate
              </p>
              <p className="mt-2 font-heading text-xl text-navy-900">
                {program.targetCertificate}
              </p>
            </div>
            <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-light">
                Typical timeline
              </p>
              <p className="mt-2 font-heading text-xl text-navy-900">
                {program.duration}
              </p>
            </div>
            <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-light">
                Starting cost range
              </p>
              <p className="mt-2 font-heading text-xl text-navy-900">
                {program.costRange}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-ink-light">
            The full {program.title} program page is coming soon. In the meantime,
            contact us for a personalized training plan, current rates, and
            availability.
          </p>
        </Container>
      </Section>

      <Section background="white" id="related-pathways">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
            Related pathways
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border-t-4 border-gold-500 bg-cream-50 p-6 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              >
                <h3 className="font-heading text-xl text-navy-900 group-hover:text-gold-500 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink-light">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
