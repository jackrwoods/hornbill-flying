import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIBenefitsSection() {
  return (
    <Section background="white" id="what-cfii-gives-you">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cfiiProgram.benefits.title}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cfiiProgram.benefits.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-gold-500 bg-sand-50 p-6"
            >
              <h3 className="font-heading text-xl text-navy-900">{item.title}</h3>
              <p className="mt-2 text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-ink-light">
          The CFII rating builds on your{" "}
          <Link
            href="/programs/certified-flight-instructor/"
            className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            CFI certificate
          </Link>{" "}
          and deepens the instrument knowledge you gained during your{" "}
          <Link
            href="/programs/instrument-rating/"
            className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Instrument Rating
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
