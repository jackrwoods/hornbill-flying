import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export function FleetDetailCTASection() {
  return (
    <Section background="default" id="next-steps">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/book/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Book a flight
          </Link>
          <Link
            href="/fleet/"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2"
          >
            Back to fleet
          </Link>
        </div>
      </Container>
    </Section>
  );
}
