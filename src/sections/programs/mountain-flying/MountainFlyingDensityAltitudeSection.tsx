import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingDensityAltitudeSection() {
  const { densityAltitude } = mountainFlyingProgram;

  return (
    <Section background="white" id="density-altitude-at-rno">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {densityAltitude.title}
            </h2>
            <p className="mt-4 text-ink-light leading-relaxed">
              {densityAltitude.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={densityAltitude.toolLink.href}
                className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                {densityAltitude.toolLink.label}
              </Link>
              <Link
                href={densityAltitude.blogLink.href}
                className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                {densityAltitude.blogLink.label}
              </Link>
            </div>
          </div>

          <div className="rounded-xl border-t-4 border-gold-500 bg-sand-50 p-6 md:p-8">
            <h3 className="font-heading text-xl text-navy-900">
              What drives density altitude
            </h3>
            <dl className="mt-6 space-y-4">
              {densityAltitude.points.map((point) => (
                <div key={point.label}>
                  <dt className="font-body font-semibold text-ink">
                    {point.label}
                  </dt>
                  <dd className="mt-1 text-ink-light">{point.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
