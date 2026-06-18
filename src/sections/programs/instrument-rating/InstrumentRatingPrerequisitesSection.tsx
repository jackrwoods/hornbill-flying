import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingPrerequisitesSection() {
  const { prerequisites } = instrumentRatingProgram;

  return (
    <Section background="white" id="prerequisites">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {prerequisites.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{prerequisites.intro}</p>

        <ul className="mt-8 max-w-3xl space-y-3">
          {prerequisites.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-ink"
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
                className="mt-1 flex-shrink-0 text-gold-500"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
