import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotTimelineSection() {
  const { timeline } = sportPilotProgram;

  return (
    <Section background="default" id="timeline">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Timeline</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {timeline.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{timeline.intro}</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {timeline.options.map((option) => (
            <Reveal key={option.label} variant="glide" className="card-cinematic p-6">
              <p className="panel-label text-muted">{option.label}</p>
              <p className="nums mt-2 font-heading text-3xl text-heading">
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