import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export function InstructorBottomNavSection() {
  return (
    <Section background="navy" id="next-steps">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl text-white">
              Meet the rest of the team
            </h2>
            <p className="mt-1 text-cream-50/80">
              Compare CFIs and find the one whose schedule fits you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/instructors/"
              className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            >
              Meet the rest of the team
            </Link>
            <Link
              href="/discovery-flight/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-cream-50/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            >
              Book a discovery flight
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
