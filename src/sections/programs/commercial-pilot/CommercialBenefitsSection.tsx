import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialBenefitsSection() {
  const { benefits } = commercialPilotProgram;

  return (
    <Section background="default" id="benefits">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Benefits</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {benefits.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{benefits.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.items.map((item) => (
            <Reveal
              key={item.title}
              variant="glide"
              className="card-cinematic p-6 flex flex-col"
            >
              <h3 className="font-heading text-xl font-extrabold text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>
        <Reveal variant="glide" className="mt-8 flex flex-wrap gap-4">
          {benefits.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="beak-flash text-sm font-semibold text-accent"
            >
              {link.label}
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}