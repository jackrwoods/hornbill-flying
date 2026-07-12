import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotWhyHornbillSection() {
  const { whyHornbill } = sportPilotProgram;

  return (
    <Section background="card" id="why-hornbill">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Why Hornbill</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {whyHornbill.title}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {whyHornbill.items.map((item) => (
            <Reveal key={item.title} variant="glide" className="card-cinematic p-6">
              <h3 className="font-heading text-xl text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-muted">
          Meet every instructor and compare rates on our{" "}
          <Link
            href="/fleet/"
            className="beak-flash font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Fleet &amp; Pricing page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}