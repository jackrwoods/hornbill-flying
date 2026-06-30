import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialWhyHornbillSection() {
  const { whyHornbill } = commercialPilotProgram;

  return (
    <Section background="dark" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-on-dark">
          {whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {whyHornbill.items.map((item) => (
            <div key={item.title} className="rounded-xl bg-dark-muted p-6">
              <h3 className="font-heading text-xl text-on-dark-accent">{item.title}</h3>
              <p className="mt-2 text-on-dark">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-on-dark-soft">
          See every aircraft and current rates on our{" "}
          <Link
            href="/fleet/"
            className="font-semibold text-on-dark-accent-hover hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Fleet &amp; Pricing page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
