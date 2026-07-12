import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIPracticalTestSection() {
  return (
    <Section background="default" id="practical-test-areas">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Practical test areas</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiiProgram.practicalTestAreas.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">
            {cfiiProgram.practicalTestAreas.intro}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cfiiProgram.practicalTestAreas.items.map((item) => (
            <Reveal
              key={item.title}
              variant="glide"
              className="card-cinematic p-5 flex flex-col"
            >
              <h3 className="font-heading text-lg font-extrabold text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted text-pretty">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted text-pretty">
          {cfiiProgram.practicalTestAreas.disclaimer}
        </p>
      </Container>
    </Section>
  );
}