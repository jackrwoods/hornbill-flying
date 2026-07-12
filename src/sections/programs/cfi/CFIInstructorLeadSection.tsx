import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIInstructorLeadSection() {
  return (
    <Section background="card" id="instructor-lead">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Instructor lead</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiProgram.instructorLead.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">
            {cfiProgram.instructorLead.intro}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cfiProgram.instructorLead.instructors.map((instructor) => (
            <Reveal
              key={instructor.name}
              variant="glide"
              className="card-cinematic p-6 flex flex-col"
            >
              <h3 className="font-heading text-xl font-extrabold text-heading">
                {instructor.name}
              </h3>
              <p className="mt-2 text-muted text-pretty">{instructor.focus}</p>
              <Link
                href={instructor.href}
                className="beak-flash mt-4 inline-block w-fit text-sm font-semibold text-accent"
              >
                Book with {instructor.name.split(" ")[0]}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}