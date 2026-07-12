import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingBenefitsSection() {
  const { benefits } = instrumentRatingProgram;

  return (
    <Section background="default" id="benefits">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Benefits</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {benefits.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{benefits.intro}</p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.items.map((item) => (
            <Reveal key={item.title} variant="glide" className="card-cinematic p-6">
              <h3 className="font-heading text-xl text-heading">{item.title}</h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {benefits.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}