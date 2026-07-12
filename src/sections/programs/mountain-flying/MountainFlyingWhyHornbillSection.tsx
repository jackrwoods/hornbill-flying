import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingWhyHornbillSection() {
  const { whyHornbill } = mountainFlyingProgram;

  return (
    <Section background="card" id="why-hornbill">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Why Hornbill</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {whyHornbill.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {whyHornbill.items.map((item) => (
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
          {whyHornbill.links.map((link) => (
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