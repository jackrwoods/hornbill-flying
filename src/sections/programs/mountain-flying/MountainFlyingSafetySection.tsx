import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingSafetySection() {
  const { safety } = mountainFlyingProgram;

  return (
    <Section background="navy" id="safety">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              {safety.title}
            </h2>
            <p className="mt-4 text-sand-50/90 leading-relaxed">
              {safety.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {safety.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gold-400 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 md:p-8">
            <h3 className="font-heading text-xl text-navy-900">
              Mountain flying non-negotiables
            </h3>
            <ul className="mt-4 space-y-3">
              {safety.nonNegotiables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-orange"
                    aria-hidden="true"
                  />
                  <span className="text-ink-light">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-light">
              {safety.note}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
