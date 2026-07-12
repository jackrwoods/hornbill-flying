import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingFleetSection() {
  const { fleet } = instrumentRatingProgram;

  return (
    <Section background="card" id="fleet">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Fleet</p>
            <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
              {fleet.title}
            </h2>
            <p className="mt-4 text-muted text-pretty">{fleet.intro}</p>

            <div className="mt-8 space-y-4">
              {fleet.aircraft.map((aircraft) => (
                <Reveal key={aircraft.tail} variant="glide" className="card-cinematic p-5">
                  <div className="flex items-center gap-3">
                    <span className="nums rounded bg-dark px-2 py-1 font-mono text-sm font-semibold text-on-dark">
                      {aircraft.tail}
                    </span>
                    <span className="text-sm text-muted">{aircraft.engine}</span>
                  </div>
                  <p className="mt-2 font-body font-semibold text-heading">
                    {aircraft.avionics}
                  </p>
                  <p className="mt-1 text-sm text-muted">{aircraft.notes}</p>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">{fleet.note}</p>

            <div className="mt-4 flex flex-wrap gap-4">
              {fleet.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal variant="horizon" className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <SunsetPlaceholder
              variant="vertical"
              label="Dual Garmin G5 IFR panel — photography coming"
              className="h-full w-full"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}