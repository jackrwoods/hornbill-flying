import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIPracticalTestSection() {
  return (
    <Section background="sand" id="practical-test-areas">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cfiiProgram.practicalTestAreas.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          {cfiiProgram.practicalTestAreas.intro}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cfiiProgram.practicalTestAreas.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-l-4 border-navy-900 bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-lg text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-light">
          {cfiiProgram.practicalTestAreas.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
