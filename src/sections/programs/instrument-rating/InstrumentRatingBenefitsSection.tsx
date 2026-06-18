import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingBenefitsSection() {
  const { benefits } = instrumentRatingProgram;

  return (
    <Section background="cream" id="benefits">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {benefits.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{benefits.intro}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-xl text-navy-900">{item.title}</h3>
              <p className="mt-2 text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {benefits.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
