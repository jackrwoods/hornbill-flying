import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIWhyHornbillSection() {
  return (
    <Section background="immersive" id="why-hornbill" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <Container className="relative z-10">
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-immersive-accent mb-4">Why Hornbill</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-immersive text-balance">
            {cfiiProgram.whyHornbill.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cfiiProgram.whyHornbill.items.map((item) => (
            <Reveal
              key={item.title}
              variant="glide"
              className="card-immersive p-6 flex flex-col"
            >
              <h3 className="font-heading text-xl font-extrabold text-immersive-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-on-immersive-muted text-pretty">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}