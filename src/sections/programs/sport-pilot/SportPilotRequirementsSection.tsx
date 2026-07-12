import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotRequirementsSection() {
  const { requirements } = sportPilotProgram;

  return (
    <Section background="card" id="requirements">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Requirements</p>
            <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
              {requirements.title}
            </h2>
            <p className="mt-4 text-muted text-pretty">{requirements.intro}</p>
            <p className="mt-6 rounded-lg bg-callout p-4 text-body">
              {requirements.note}
            </p>
          </Reveal>

          <Reveal variant="glide">
            <ul className="space-y-4">
              {requirements.items.map((item, index) => (
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