import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIITimelineSection() {
  return (
    <Section background="card" id="timeline">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiiProgram.timeline.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          {cfiiProgram.timeline.intro}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cfiiProgram.timeline.options.map((option) => (
            <div
              key={option.label}
              className="rounded-xl bg-bg p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                {option.label}
              </p>
              <p className="mt-2 font-heading text-3xl text-heading">
                {option.duration}
              </p>
              <p className="mt-1 text-sm text-muted">{option.schedule}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
