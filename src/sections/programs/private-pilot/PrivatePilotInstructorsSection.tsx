import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotInstructorsSection() {
  const { instructors } = privatePilotProgram;

  return (
    <Section background="sand" id="instructors">
      <Container>
        <div className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
            {instructors.title}
          </h2>
          <p className="mt-4 max-w-3xl text-ink-light leading-relaxed">
            {instructors.description}
          </p>
          <div className="mt-6">
            <Link
              href={instructors.href}
              className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              Meet our instructors
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
