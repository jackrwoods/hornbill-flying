import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingFleetSection() {
  const { fleet } = instrumentRatingProgram;

  return (
    <Section background="white" id="fleet">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {fleet.title}
            </h2>
            <p className="mt-4 text-ink-light">{fleet.intro}</p>

            <div className="mt-8 space-y-4">
              {fleet.aircraft.map((aircraft) => (
                <div
                  key={aircraft.tail}
                  className="rounded-xl border-l-4 border-gold-500 bg-cream-50 p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-navy-900 px-2 py-1 font-mono text-sm font-semibold text-white">
                      {aircraft.tail}
                    </span>
                    <span className="text-sm text-ink-light">{aircraft.engine}</span>
                  </div>
                  <p className="mt-2 font-body font-semibold text-navy-900">
                    {aircraft.avionics}
                  </p>
                  <p className="mt-1 text-sm text-ink-light">{aircraft.notes}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-ink-light">{fleet.note}</p>

            <div className="mt-4 flex flex-wrap gap-4">
              {fleet.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/programs/instrument-rating-hero.webp"
              alt="Dual Garmin G5 instrument panel in a Hornbill Aviation PA28 IFR trainer at RNO"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
