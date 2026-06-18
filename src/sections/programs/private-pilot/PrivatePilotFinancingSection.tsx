import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotFinancingSection() {
  const { financing } = privatePilotProgram;

  return (
    <Section background="white" id="financing">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {financing.title}
            </h2>
            <p className="mt-4 text-ink-light leading-relaxed">
              {financing.description}
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              href={financing.href}
              className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            >
              See financing options
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
