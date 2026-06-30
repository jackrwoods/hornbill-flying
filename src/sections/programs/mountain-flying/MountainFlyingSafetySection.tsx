import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingSafetySection() {
  const { safety } = mountainFlyingProgram;

  return (
    <Section background="dark" id="safety">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-on-dark">
              {safety.title}
            </h2>
            <p className="mt-4 text-on-dark leading-relaxed">
              {safety.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {safety.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-on-dark-accent-hover hover:text-on-dark-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-t-4 border-accent bg-white p-6 md:p-8">
            <h3 className="font-heading text-xl text-heading">
              Mountain flying non-negotiables
            </h3>
            <ul className="mt-4 space-y-3">
              {safety.nonNegotiables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-alert"
                    aria-hidden="true"
                  />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              {safety.note}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
