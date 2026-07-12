import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIBenefitsSection() {
  return (
    <Section background="card" id="what-cfii-gives-you">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Benefits</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiiProgram.benefits.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cfiiProgram.benefits.items.map((item) => (
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
        <Reveal variant="glide" className="mt-8 text-muted">
          The CFII rating builds on your{" "}
          <Link
            href="/programs/certified-flight-instructor/"
            className="beak-flash font-semibold text-accent"
          >
            CFI certificate
          </Link>{" "}
          and deepens the instrument knowledge you gained during your{" "}
          <Link
            href="/programs/instrument-rating/"
            className="beak-flash font-semibold text-accent"
          >
            Instrument Rating
          </Link>
          .
        </Reveal>
      </Container>
    </Section>
  );
}