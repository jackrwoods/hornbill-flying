import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIITrainingEmphasisSection() {
  return (
    <Section background="card" id="training-emphasis">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Training emphasis</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiiProgram.trainingEmphasis.title}
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {cfiiProgram.trainingEmphasis.items.map((item, index) => (
            <Reveal
              key={index}
              variant="glide"
              as="li"
              className="card-cinematic p-4 flex items-start gap-3"
            >
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
                className="mt-0.5 flex-shrink-0 text-accent"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-body">{item}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}