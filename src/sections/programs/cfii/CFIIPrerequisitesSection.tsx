import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIPrerequisitesSection() {
  return (
    <Section background="sand" id="prerequisites">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {cfiiProgram.prerequisites.title}
            </h2>
            <p className="mt-4 text-ink-light">{cfiiProgram.prerequisites.intro}</p>
          </div>
          <ul className="space-y-4">
            {cfiiProgram.prerequisites.items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
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
