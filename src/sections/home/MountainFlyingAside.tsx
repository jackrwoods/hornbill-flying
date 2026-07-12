import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export function MountainFlyingAside() {
  return (
    <section className="bg-bg text-body py-16 md:py-20 border-y border-border-subtle">
      <Container>
        <Reveal variant="glide" className="max-w-2xl mx-auto text-center">
          <p className="panel-label-lg text-accent mb-3">Also available</p>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-heading text-balance">
            Mountain Flying in the Sierra.
          </h2>
          <p className="mt-4 text-muted text-pretty">
            A 2–3 day density-altitude course for the Sierra and high-desert terrain around RNO. Not part of the certificate track — a skill you add on.
          </p>
          <Link
            href="/programs/mountain-flying/"
            className="beak-flash mt-6 inline-flex w-fit text-sm font-semibold text-accent"
          >
            See Mountain Flying
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}