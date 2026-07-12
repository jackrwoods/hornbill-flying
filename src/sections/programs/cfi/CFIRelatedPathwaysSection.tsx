import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIRelatedPathwaysSection() {
  return (
    <Section background="callout" id="related-pathways">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Related pathways</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiProgram.relatedPathways.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cfiProgram.relatedPathways.items.map((item) => (
            <Reveal key={item.title} variant="glide">
              <Link
                href={item.href}
                className="card-cinematic p-6 block h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                <h3 className="font-heading text-xl font-extrabold text-heading">
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