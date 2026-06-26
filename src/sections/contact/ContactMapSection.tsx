import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { MapEmbed } from "@/components/MapEmbed";

export function ContactMapSection() {
  return (
    <Section background="cream" id="find-us">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Find us at Reno–Tahoe (RNO)
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          We are based at 1008 Gentry Way, right on the RNO field. Free visitor
          parking is available near the office.
        </p>

        <div className="mt-8">
          <MapEmbed title="Hornbill Aviation location at 1008 Gentry Way, Reno, NV" />
        </div>

        <p className="mt-6 text-ink-light">
          Need detailed directions, parking instructions, or airport access
          notes?{" "}
          <Link
            href="/contact/"
            className="font-semibold text-navy-900 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Contact us
          </Link>{" "}
          and we will send everything you need before your first visit.
        </p>
      </Container>
    </Section>
  );
}
