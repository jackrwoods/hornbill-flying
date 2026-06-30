import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingTrainingStructureSection() {
  const { trainingStructure } = instrumentRatingProgram;

  return (
    <Section background="default" id="training-structure">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {trainingStructure.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{trainingStructure.intro}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {trainingStructure.stages.map((stage, index) => (
            <div
              key={stage.title}
              className="rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm"
            >
              <span className="font-mono text-sm font-semibold text-accent">
                Stage {index + 1}
              </span>
              <h3 className="mt-2 font-heading text-xl text-heading">
                {stage.title.replace(/^Stage \d+ — /, "")}
              </h3>
              <p className="mt-2 text-muted">{stage.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl text-heading">Part-time</h3>
            <p className="mt-2 text-muted">2–3 lessons per week</p>
            <p className="mt-1 font-heading text-2xl text-heading">3–6 months</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl text-heading">Full-time</h3>
            <p className="mt-2 text-muted">4–5 lessons per week</p>
            <p className="mt-1 font-heading text-2xl text-heading">6–10 weeks</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/programs/instrument-cross-country.webp"
              alt="Hornbill Aviation PA28 on an IFR cross-country training route from Reno–Tahoe (RNO)"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl text-heading">Real IFR cross-country experience</h3>
            <p className="mt-2 text-muted">
              Stage 3 is not simulated. You file an IFR flight plan, copy a clearance, and fly a real route from RNO with your CFII. That is the kind of experience that transfers directly to the checkride and to your flying afterward.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
