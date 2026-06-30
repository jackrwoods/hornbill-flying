import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingDensityAltitudeSection() {
  const { densityAltitude } = mountainFlyingProgram;

  return (
    <Section background="card" id="density-altitude-at-rno">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {densityAltitude.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {densityAltitude.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={densityAltitude.toolLink.href}
                className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                {densityAltitude.toolLink.label}
              </Link>
              <Link
                href={densityAltitude.blogLink.href}
                className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                {densityAltitude.blogLink.label}
              </Link>
            </div>
          </div>

          <div className="rounded-xl border-t-4 border-accent bg-bg p-6 md:p-8">
            <h3 className="font-heading text-xl text-heading">
              What drives density altitude
            </h3>
            <dl className="mt-6 space-y-4">
              {densityAltitude.points.map((point) => (
                <div key={point.label}>
                  <dt className="font-body font-semibold text-body">
                    {point.label}
                  </dt>
                  <dd className="mt-1 text-muted">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
