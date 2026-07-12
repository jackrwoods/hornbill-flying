import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingSafetySection() {
  const { safety } = mountainFlyingProgram;

  return (
    <Section background="immersive" id="safety" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-immersive-accent mb-4">Safety</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-immersive text-balance">
              {safety.title}
            </h2>
            <p className="mt-4 text-on-immersive-muted leading-relaxed text-pretty">
              {safety.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {safety.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="beak-flash text-sm font-semibold text-immersive-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
            <h3 className="font-heading text-xl font-extrabold text-heading">
              Mountain flying non-negotiables
            </h3>
            <ul className="mt-4 space-y-3">
              {safety.nonNegotiables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-alert"
                    aria-hidden="true"
                  />
                  <span className="text-muted text-pretty">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted text-pretty">{safety.note}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}