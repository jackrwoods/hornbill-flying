import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotFleetSection() {
  const { fleet } = privatePilotProgram;

  return (
    <Section background="white" id="fleet">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {fleet.title}
            </h2>
            <p className="mt-4 text-ink-light leading-relaxed">
              {fleet.description}
            </p>
            <div className="mt-6">
              <Link
                href={fleet.href}
                className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                Meet the fleet
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-cream-50 p-6">
            <h3 className="font-heading text-xl text-navy-900">
              PA28 fleet highlights
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                <span className="text-ink-light">
                  Consistent handling across all trainers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                <span className="text-ink-light">
                  Dual Garmin G5 units in IFR-capable aircraft
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                <span className="text-ink-light">
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
