import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotFleetSection() {
  const { fleet } = privatePilotProgram;

  return (
    <Section background="card" id="fleet">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {fleet.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {fleet.description}
            </p>
            <div className="mt-6">
              <Link
                href={fleet.href}
                className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Meet the fleet
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-bg p-6">
            <h3 className="font-heading text-xl text-heading">
              PA28 fleet highlights
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-muted">
                  Consistent handling across all trainers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-muted">
                  Dual Garmin G5 units in IFR-capable aircraft
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-muted">
                  WAAS GPS for reliable cross-country and approach training
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
