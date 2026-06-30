import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIWhyHornbillSection() {
  return (
    <Section background="dark" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-on-dark">
          {cfiiProgram.whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cfiiProgram.whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-dark-muted p-6"
            >
              <h3 className="font-heading text-xl text-on-dark-accent">{item.title}</h3>
              <p className="mt-2 text-on-dark">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
