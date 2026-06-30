import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhyHornbillSection() {
  return (
    <Section background="navy" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-white">
          {cfiProgram.whyHornbill.title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cfiProgram.whyHornbill.items.map((item) => (
            <div key={item.title} className="rounded-xl bg-navy-800 p-6">
              <h3 className="font-heading text-xl text-gold-500">{item.title}</h3>
              <p className="mt-2 text-sand-50/90">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sand-50/80">
          Meet the instructors who mentor CFI candidates on our{" "}
          <Link
            href="/instructors/"
            className="font-semibold text-gold-400 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            instructors page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
