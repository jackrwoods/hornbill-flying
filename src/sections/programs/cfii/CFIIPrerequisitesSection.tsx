import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIPrerequisitesSection() {
  return (
    <Section background="default" id="prerequisites">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Prerequisites</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {cfiiProgram.prerequisites.title}
            </h2>
            <p className="mt-4 text-muted text-pretty">
              {cfiiProgram.prerequisites.intro}
            </p>
          </Reveal>
          <Reveal variant="glide">
            <ul className="space-y-4">
              {cfiiProgram.prerequisites.items.map((item, index) => (
                <li
                  key={index}
                  className="card-cinematic p-4 flex items-start gap-3"
                >
                  <span
                    className="nums flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-heading"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}