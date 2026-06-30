import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIPracticalTestSection() {
  return (
    <Section background="default" id="practical-test-areas">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiiProgram.practicalTestAreas.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          {cfiiProgram.practicalTestAreas.intro}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cfiiProgram.practicalTestAreas.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-l-4 border-border bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-lg text-heading">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          {cfiiProgram.practicalTestAreas.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
