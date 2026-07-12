import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotOutcomesSection() {
  const { outcomes } = privatePilotProgram;

  return (
    <Section background="default" id="outcomes">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Outcomes</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {outcomes.title}
          </h2>
        </Reveal>
        <ul className="mt-8 space-y-4">
          {outcomes.items.map((item, index) => (
            <Reveal key={index} variant="glide" className="card-cinematic p-5 flex items-start gap-3">
              <span
                className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="text-body">{item}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}