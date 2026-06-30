import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotInstructorsSection() {
  const { instructors } = privatePilotProgram;

  return (
    <Section background="default" id="instructors">
      <Container>
        <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            {instructors.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">
            {instructors.description}
          </p>
          <div className="mt-6">
            <Link
              href={instructors.href}
              className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              Meet our instructors
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
