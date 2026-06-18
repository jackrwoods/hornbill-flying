import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotWhyHornbillSection() {
  const { whyHornbill } = sportPilotProgram;

  return (
    <Section background="white" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {whyHornbill.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-gold-500 bg-cream-50 p-6"
            >
              <h3 className="font-heading text-xl text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-ink-light">
          Meet every instructor and compare rates on our{" "}
          <Link
            href="/fleet/"
            className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Fleet &amp; Pricing page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
