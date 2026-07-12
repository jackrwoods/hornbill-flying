import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function InstructorBottomNavSection() {
  return (
    <Section
      background="immersive-night"
      id="next-steps"
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25"
        aria-hidden="true"
      />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal
          variant="stagger"
          className="mx-auto max-w-3xl flex flex-col items-center"
        >
          <p className="panel-label-lg text-immersive-accent mb-6">Next steps</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
            Meet the rest of the team
          </p>
          <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
            Compare CFIs and find the one whose schedule fits you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/instructors/"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
            >
              Meet the rest of the team
            </Link>
            <Link
              href="/discovery-flight/"
              data-analytics="discovery_flight_booking_started"
              className="inline-flex items-center justify-center rounded-lg border-2 border-on-immersive/40 px-5 py-3 text-sm font-semibold text-on-immersive transition-colors hover:bg-on-dark-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
            >
              Book a discovery flight
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}