import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIInstructorLeadSection() {
  return (
    <Section background="card" id="instructor-lead">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiProgram.instructorLead.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          {cfiProgram.instructorLead.intro}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cfiProgram.instructorLead.instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="rounded-xl border-t-4 border-accent bg-bg p-6"
            >
              <h3 className="font-heading text-xl text-heading">
                {instructor.name}
              </h3>
              <p className="mt-2 text-muted">{instructor.focus}</p>
              <Link
                href={instructor.href}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Book with {instructor.name.split(" ")[0]}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
