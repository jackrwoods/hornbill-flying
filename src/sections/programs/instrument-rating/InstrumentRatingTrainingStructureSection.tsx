import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingTrainingStructureSection() {
  const { trainingStructure } = instrumentRatingProgram;

  return (
    <Section background="default" id="training-structure">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Training structure</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {trainingStructure.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{trainingStructure.intro}</p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {trainingStructure.stages.map((stage, index) => (
            <Reveal key={stage.title} variant="glide" className="card-cinematic p-6">
              <span className="nums panel-label text-accent">
                Stage {index + 1}
              </span>
              <h3 className="mt-2 font-heading text-xl text-heading">
                {stage.title.replace(/^Stage \d+ — /, "")}
              </h3>
              <p className="mt-2 text-muted text-pretty">{stage.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal variant="glide" className="card-cinematic p-6">
            <h3 className="font-heading text-xl text-heading">Part-time</h3>
            <p className="mt-2 text-muted">2–3 lessons per week</p>
            <p className="nums mt-1 font-heading text-2xl text-heading">3–6 months</p>
          </Reveal>
          <Reveal variant="glide" className="card-cinematic p-6">
            <h3 className="font-heading text-xl text-heading">Full-time</h3>
            <p className="mt-2 text-muted">4–5 lessons per week</p>
            <p className="nums mt-1 font-heading text-2xl text-heading">6–10 weeks</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-center">
          <Reveal variant="horizon" className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <SunsetPlaceholder
              variant="default"
              label="IFR cross-country en route — photography coming"
              className="h-full w-full"
            />
          </Reveal>
          <Reveal variant="glide" className="card-cinematic p-6">
            <h3 className="font-heading text-xl text-heading">Real IFR cross-country experience</h3>
            <p className="mt-2 text-muted text-pretty">
              Stage 3 is not simulated. You file an IFR flight plan, copy a clearance, and fly a real route from RNO with your CFII. That is the kind of experience that transfers directly to the checkride and to your flying afterward.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}