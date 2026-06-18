import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingWhyHornbillSection() {
  const { whyHornbill } = mountainFlyingProgram;

  return (
    <Section background="white" id="why-hornbill">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {whyHornbill.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
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

        <div className="mt-8 flex flex-wrap gap-4">
          {whyHornbill.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
