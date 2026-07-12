import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingRelatedPathwaysSection() {
  const { relatedPathways } = instrumentRatingProgram;

  return (
    <Section background="card" id="related-pathways">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Related pathways</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {relatedPathways.title}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedPathways.items.map((item) => (
            <Reveal key={item.href} variant="glide">
              <Link
                href={item.href}
                className="card-cinematic group block h-full p-6 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                <h3 className="font-heading text-xl text-heading group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted text-pretty">{item.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}