import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { financingContent } from "@/content/financing";

export function WhatCanBeFinancedSection() {
  const { coveredCosts, links } = financingContent;

  return (
    <Section background="white" id="covered-costs">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {coveredCosts.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{coveredCosts.intro}</p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coveredCosts.items.map((item) => (
            <li
              key={item.label}
              className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-xl text-navy-900">{item.label}</h3>
              <p className="mt-2 text-sm text-ink-light">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm text-ink-light">{coveredCosts.note}</p>

        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href={links.fleet}
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            See current aircraft and instructor rates
          </Link>
          <Link
            href={links.privatePilot}
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            See Private Pilot cost breakdown
          </Link>
        </div>
      </Container>
    </Section>
  );
}
