import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { MapEmbed } from "@/components/MapEmbed";

export function ContactMapSection() {
  return (
    <Section background="default" id="find-us">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Find us</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading text-balance">
            Find us at Reno–Tahoe (RNO)
          </h2>
          <p className="mt-4 text-muted text-pretty">
            We are based at 1880 Gentry Way, right on the RNO field. Free visitor
            parking is available near the office.
          </p>
        </Reveal>

        <Reveal variant="horizon" className="mt-8">
          <MapEmbed title="Hornbill Aviation location at 1880 Gentry Way, Reno, NV" />
        </Reveal>

        <p className="mt-6 text-muted">
          Need detailed directions, parking instructions, or airport access
          notes?{" "}
          <Link
            href="/contact/"
            className="beak-flash font-semibold text-heading"
          >
            Contact us
          </Link>{" "}
          and we will send everything you need before your first visit.
        </p>
      </Container>
    </Section>
  );
}