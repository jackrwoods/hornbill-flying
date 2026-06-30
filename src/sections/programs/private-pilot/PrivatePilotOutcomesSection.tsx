import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotOutcomesSection() {
  const { outcomes } = privatePilotProgram;

  return (
    <Section background="sand" id="outcomes">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {outcomes.title}
        </h2>
        <ul className="mt-8 space-y-4">
          {outcomes.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-sm"
            >
              <span
                className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                aria-hidden="true"
              />
              <span className="text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
