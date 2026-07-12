import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIITimelineSection() {
  return (
    <Section background="card" id="timeline">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Timeline</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiiProgram.timeline.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">
            {cfiiProgram.timeline.intro}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cfiiProgram.timeline.options.map((option) => (
            <Reveal
              key={option.label}
              variant="glide"
              className="card-cinematic p-6"
            >
              <p className="panel-label text-muted">{option.label}</p>
              <p className="nums mt-2 font-heading text-3xl font-extrabold text-heading">
                {option.duration}
              </p>
              <p className="mt-1 text-sm text-muted">{option.schedule}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}