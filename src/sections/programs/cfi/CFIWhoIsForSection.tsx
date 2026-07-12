import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhoIsForSection() {
  return (
    <Section background="card" id="who-is-for">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Who it&apos;s for</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {cfiProgram.whoIsFor.title}
            </h2>
            <p className="mt-4 text-muted text-pretty">{cfiProgram.whoIsFor.intro}</p>
            <p className="mt-4 text-muted text-pretty">
              If you are still working toward the required certificates, see our{" "}
              <Link
                href="/programs/commercial-pilot/"
                className="beak-flash font-semibold text-accent"
              >
                Commercial Pilot
              </Link>{" "}
              and{" "}
              <Link
                href="/programs/instrument-rating/"
                className="beak-flash font-semibold text-accent"
              >
                Instrument Rating
              </Link>{" "}
              pages.
            </p>
          </Reveal>
          <Reveal variant="glide">
            <ul className="space-y-4">
              {cfiProgram.whoIsFor.items.map((item, index) => (
                <li
                  key={index}
                  className="card-cinematic p-4 flex items-start gap-3"
                >
                  <span
                    className="nums flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-heading"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}