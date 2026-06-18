import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotRequirementsSection() {
  const { requirements } = sportPilotProgram;

  return (
    <Section background="white" id="requirements">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {requirements.title}
            </h2>
            <p className="mt-4 text-ink-light">{requirements.intro}</p>
            <p className="mt-6 rounded-lg bg-sky-100 p-4 text-ink">
              {requirements.note}
            </p>
          </div>
          <ul className="space-y-4">
            {requirements.items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-cream-50 p-4 shadow-sm"
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-semibold text-navy-900"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
