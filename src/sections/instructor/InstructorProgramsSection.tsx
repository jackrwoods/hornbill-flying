import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Programs</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Programs {instructor.name.split(" ")[0]} teaches
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {taughtPrograms.map((program) => (
            <Reveal
              key={program.slug}
              variant="glide"
              className="card-cinematic p-5 flex flex-col"
            >
              <Link
                href={program.url}
                className="group flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
              >
                <h3 className="font-heading text-xl text-heading group-hover:text-accent">
                  {program.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted text-pretty">
                  {program.shortDescription}
                </p>
                <p className="beak-flash mt-4 inline-flex w-fit text-sm font-semibold text-accent">
                  See {program.title} training →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}