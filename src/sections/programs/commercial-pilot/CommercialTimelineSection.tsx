import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialTimelineSection() {
  const { timeline } = commercialPilotProgram;

  return (
    <Section background="white" id="timeline">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {timeline.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{timeline.intro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {timeline.options.map((option) => (
            <div key={option.label} className="rounded-xl bg-sand-50 p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
                {option.label}
              </p>
              <p className="mt-2 font-heading text-3xl text-navy-900">
                {option.duration}
              </p>
              <p className="mt-1 text-sm text-ink-light">{option.schedule}</p>
              <p className="mt-4 text-sm text-ink-light">{option.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
