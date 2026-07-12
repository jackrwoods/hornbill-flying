import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotInstructorsSection() {
  const { instructors } = privatePilotProgram;

  return (
    <Section background="default" id="instructors">
      <Container>
        <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
          <p className="panel-label-lg text-accent mb-4">Instructors</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {instructors.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed text-pretty">
            {instructors.description}
          </p>
          <div className="mt-6">
            <Link
              href={instructors.href}
              className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              Meet our instructors
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}