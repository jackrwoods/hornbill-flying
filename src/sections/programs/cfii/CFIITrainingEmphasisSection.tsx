import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIITrainingEmphasisSection() {
  return (
    <Section background="white" id="training-emphasis">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cfiiProgram.trainingEmphasis.title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cfiiProgram.trainingEmphasis.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-lg bg-sky-100 p-4"
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
                className="mt-0.5 flex-shrink-0 text-gold-500"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
