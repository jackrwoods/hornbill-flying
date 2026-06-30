import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotRelatedProgramsSection() {
  const { relatedPrograms } = privatePilotProgram;

  return (
    <Section background="card" id="related-programs">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {relatedPrograms.title}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPrograms.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border-t-4 border-accent bg-bg p-6 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              <h3 className="font-heading text-xl text-heading group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
