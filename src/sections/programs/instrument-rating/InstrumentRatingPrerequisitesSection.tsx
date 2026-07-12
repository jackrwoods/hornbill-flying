import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingPrerequisitesSection() {
  const { prerequisites } = instrumentRatingProgram;

  return (
    <Section background="card" id="prerequisites">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Prerequisites</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {prerequisites.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{prerequisites.intro}</p>
        </Reveal>

        <ul className="mt-8 max-w-3xl space-y-3">
          {prerequisites.items.map((item) => (
            <Reveal key={item} variant="glide" as="li" className="flex items-start gap-3 text-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 flex-shrink-0 text-accent"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}