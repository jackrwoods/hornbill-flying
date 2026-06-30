import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { programs } from "@/content/programs";
import type { Instructor } from "@/types";

interface InstructorProgramsSectionProps {
  instructor: Instructor;
}

export function InstructorProgramsSection({
  instructor,
}: InstructorProgramsSectionProps) {
  const taughtPrograms = instructor.teachesPrograms
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (taughtPrograms.length === 0) return null;

  return (
    <Section background="default" id="programs">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Programs {instructor.name.split(" ")[0]} teaches
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {taughtPrograms.map((program) => (
            <Link
              key={program.slug}
              href={program.url}
              className="group rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              <h3 className="font-heading text-xl text-heading group-hover:text-accent">
                {program.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{program.shortDescription}</p>
              <p className="mt-4 text-sm font-semibold text-accent">
                See {program.title} training →
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
