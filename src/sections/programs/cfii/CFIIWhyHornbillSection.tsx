import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIWhyHornbillSection() {
  return (
    <Section background="navy" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-white">
          {cfiiProgram.whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cfiiProgram.whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-navy-800 p-6"
            >
              <h3 className="font-heading text-xl text-gold-500">{item.title}</h3>
              <p className="mt-2 text-sand-50/90">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
