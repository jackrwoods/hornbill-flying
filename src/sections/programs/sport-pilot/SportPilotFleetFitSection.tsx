import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotFleetFitSection() {
  const { fleetFit } = sportPilotProgram;

  return (
    <Section background="callout" id="fleet-fit">
      <Container>
        <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            {fleetFit.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">
            {fleetFit.description}
          </p>
          <div className="mt-6">
            <Link
              href={fleetFit.href}
              className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              See the fleet and rates
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
