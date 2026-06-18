import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingWhyHornbillSection() {
  const { whyHornbill } = instrumentRatingProgram;

  return (
    <Section background="navy" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-white">
          {whyHornbill.title}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white/5 p-6"
            >
              <h3 className="font-heading text-xl text-gold-400">{item.title}</h3>
              <p className="mt-2 text-cream-50/90">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
