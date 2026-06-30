import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotWhyHornbillSection() {
  const { whyHornbill } = sportPilotProgram;

  return (
    <Section background="card" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-accent bg-bg p-6"
            >
              <h3 className="font-heading text-xl text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-muted">
          Meet every instructor and compare rates on our{" "}
          <Link
            href="/fleet/"
            className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Fleet &amp; Pricing page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
