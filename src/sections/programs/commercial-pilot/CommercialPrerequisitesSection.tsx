import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialPrerequisitesSection() {
  const { prerequisites } = commercialPilotProgram;

  return (
    <Section background="card" id="prerequisites">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {prerequisites.title}
            </h2>
            <p className="mt-4 text-muted">{prerequisites.intro}</p>
            <p className="mt-4 text-muted">
              If you are still working toward Private Pilot, start with our{" "}
              <Link
                href="/programs/private-pilot/"
                className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Private Pilot
              </Link>{" "}
              program. The{" "}
              <Link
                href="/programs/instrument-rating/"
                className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Instrument Rating
              </Link>{" "}
              is the next recommended step before Commercial Pilot.
            </p>
          </div>
          <ul className="space-y-4">
            {prerequisites.items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-bg p-4 shadow-sm"
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-heading"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
