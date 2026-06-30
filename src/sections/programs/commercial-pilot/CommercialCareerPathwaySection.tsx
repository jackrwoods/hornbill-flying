import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialCareerPathwaySection() {
  const { careerPathway } = commercialPilotProgram;

  return (
    <Section background="card" id="career-pathway">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {careerPathway.title}
            </h2>
            <p className="mt-4 text-muted">{careerPathway.intro}</p>
            <div className="mt-8 space-y-6">
              {careerPathway.steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-heading"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-heading">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {careerPathway.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-xl bg-white shadow-sm">
            <Image
              src="/images/programs/commercial-pilot-cross-country.webp"
              alt="Hornbill Aviation PA28 flying cross-country near the Sierra Nevada with a student building flight time toward a Commercial Pilot certificate"
              width={870}
              height={653}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 870px"
            />
            <figcaption className="px-5 py-3 text-sm text-muted">
              Cross-country rentals let you build real flight time in the same
              PA28s you train in.
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
