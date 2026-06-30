import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotTimelineSection() {
  const { timeline } = privatePilotProgram;

  return (
    <Section background="default" id="timeline">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {timeline.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{timeline.intro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {timeline.options.map((option) => (
            <div
              key={option.label}
              className="rounded-xl bg-white p-6 shadow-sm"
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
        <p className="mt-6 text-sm text-muted">{timeline.note}</p>
      </Container>
    </Section>
  );
}
