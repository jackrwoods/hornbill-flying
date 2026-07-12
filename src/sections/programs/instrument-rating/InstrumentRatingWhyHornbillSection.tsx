import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingWhyHornbillSection() {
  const { whyHornbill } = instrumentRatingProgram;

  return (
    <Section background="card" id="why-hornbill">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Why Hornbill</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {whyHornbill.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyHornbill.items.map((item) => (
            <Reveal key={item.title} variant="glide" className="card-cinematic p-6">
              <h3 className="font-heading text-xl text-heading">{item.title}</h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}