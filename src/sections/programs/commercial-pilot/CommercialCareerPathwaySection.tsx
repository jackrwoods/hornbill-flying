import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialCareerPathwaySection() {
  const { careerPathway } = commercialPilotProgram;

  return (
    <Section background="card" id="career-pathway">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Career pathway</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {careerPathway.title}
            </h2>
            <p className="mt-4 text-muted text-pretty">{careerPathway.intro}</p>
            <div className="mt-8 space-y-6">
              {careerPathway.steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span
                    className="nums flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-heading"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-heading">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-muted text-pretty">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {careerPathway.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="beak-flash text-sm font-semibold text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal variant="horizon" className="card-cinematic overflow-hidden flex flex-col">
            <SunsetPlaceholder
              variant="vertical"
              label="Cross-country over the Sierra — photography coming"
              className="aspect-[4/3] w-full"
            />
            <figcaption className="px-5 py-3 text-sm text-muted text-pretty">
              Cross-country rentals let you build real flight time in the same
              PA28s you train in.
            </figcaption>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}