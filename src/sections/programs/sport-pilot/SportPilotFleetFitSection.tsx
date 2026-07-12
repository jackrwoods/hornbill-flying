import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotFleetFitSection() {
  const { fleetFit } = sportPilotProgram;

  return (
    <Section background="callout" id="fleet-fit">
      <Container>
        <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
          <p className="panel-label-lg text-accent mb-4">Fleet fit</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {fleetFit.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed text-pretty">
            {fleetFit.description}
          </p>
          <div className="mt-6">
            <Link
              href={fleetFit.href}
              className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              See the fleet and rates
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}