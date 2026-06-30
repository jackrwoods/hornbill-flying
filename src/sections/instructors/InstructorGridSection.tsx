import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { InstructorCard } from "@/components/InstructorCard";
import { instructors } from "@/content/instructors";

export function InstructorGridSection() {
  return (
    <Section background="sand" id="team">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Meet the team
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">
          Compare CFIs and choose the one whose specialties and availability
          match your goals.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.slug} instructor={instructor} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
