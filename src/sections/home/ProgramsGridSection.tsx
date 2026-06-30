import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProgramCard } from "@/components/ProgramCard";
import { programs } from "@/content/programs";

export function ProgramsGridSection() {
  return (
    <Section background="card">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-center text-heading">
          Training programs
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-center text-muted">
          From first lesson to professional instructor. Every program is built
          around your pace and goals.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
