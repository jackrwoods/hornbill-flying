import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingDensityAltitudeSection() {
  const { densityAltitude } = mountainFlyingProgram;

  return (
    <Section background="card" id="density-altitude-at-rno">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Density altitude</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {densityAltitude.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed text-pretty">
              {densityAltitude.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={densityAltitude.toolLink.href}
                className="beak-flash text-sm font-semibold text-accent"
              >
                {densityAltitude.toolLink.label}
              </Link>
              <Link
                href={densityAltitude.blogLink.href}
                className="beak-flash text-sm font-semibold text-accent"
              >
                {densityAltitude.blogLink.label}
              </Link>
            </div>
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
            <h3 className="font-heading text-xl font-extrabold text-heading">
              What drives density altitude
            </h3>
            <dl className="mt-6 space-y-4">
              {densityAltitude.points.map((point) => (
                <div key={point.label}>
                  <dt className="font-body font-semibold text-body">
                    {point.label}
                  </dt>
                  <dd className="mt-1 text-muted text-pretty">{point.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}