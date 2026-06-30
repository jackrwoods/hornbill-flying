import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import type { Instructor } from "@/types";

interface InstructorSpecialtiesSectionProps {
  instructor: Instructor;
}

export function InstructorSpecialtiesSection({
  instructor,
}: InstructorSpecialtiesSectionProps) {
  return (
    <Section background="card" id="specialties">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Specialties
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {instructor.specialties.map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-heading"
            >
              {specialty}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
