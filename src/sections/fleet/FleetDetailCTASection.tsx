import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export function FleetDetailCTASection() {
  return (
    <Section background="sand" id="next-steps">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/book/"
            className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          >
            Book a flight
          </Link>
          <Link
            href="/fleet/"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
          >
            Back to fleet
          </Link>
        </div>
      </Container>
    </Section>
  );
}
