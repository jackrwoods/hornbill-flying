import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingWhyHornbillSection() {
  const { whyHornbill } = instrumentRatingProgram;

  return (
    <Section background="dark" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-on-dark">
          {whyHornbill.title}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-on-dark-subtle p-6"
            >
              <h3 className="font-heading text-xl text-on-dark-accent-hover">{item.title}</h3>
              <p className="mt-2 text-on-dark">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
