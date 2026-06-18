import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhoIsForSection() {
  return (
    <Section background="white" id="who-is-for">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {cfiProgram.whoIsFor.title}
            </h2>
            <p className="mt-4 text-ink-light">{cfiProgram.whoIsFor.intro}</p>
            <p className="mt-4 text-ink-light">
              If you are still working toward the required certificates, see our{" "}
              <Link
                href="/programs/commercial-pilot/"
                className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                Commercial Pilot
              </Link>{" "}
              and{" "}
              <Link
                href="/programs/instrument-rating/"
                className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                Instrument Rating
              </Link>{" "}
              pages.
            </p>
          </div>
          <ul className="space-y-4">
            {cfiProgram.whoIsFor.items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-cream-50 p-4 shadow-sm"
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-semibold text-navy-900"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
