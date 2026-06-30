import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export function InstructorBottomNavSection() {
  return (
    <Section background="dark" id="next-steps">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl text-on-dark">
              Meet the rest of the team
            </h2>
            <p className="mt-1 text-on-dark-soft">
              Compare CFIs and find the one whose schedule fits you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/instructors/"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Meet the rest of the team
            </Link>
            <Link
              href="/discovery-flight/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-on-dark/30 px-5 py-3 text-sm font-semibold text-on-dark transition-colors hover:bg-on-dark-subtle focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Book a discovery flight
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
