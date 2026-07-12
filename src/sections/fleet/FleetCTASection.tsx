import Link from "next/link";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";

export function FleetCTASection() {
  return (
    <section
      id="cta"
      className="bg-immersive-bg-night text-on-immersive relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-immersive text-balance">
            Ready to fly?
          </h2>
          <p className="mt-4 text-on-immersive-muted text-pretty max-w-2xl">
            Book a discovery flight or start a membership today. Questions? Call
            us and we will walk you through the rates.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
            >
              Book a discovery flight
            </CTALink>
            <Link
              href="/membership/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-on-immersive/40 px-5 py-3 text-sm font-semibold text-on-immersive transition-colors hover:bg-on-dark-subtle focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              data-analytics="membership_signup_started"
            >
              Start a membership
            </Link>
            <PhoneLink
              className="text-on-immersive hover:text-immersive-accent-hover"
              showIcon
            />
          </div>

          <p className="mt-8 text-sm text-on-immersive-muted">
            Interested in a full certificate?{" "}
            <Link
              href="/programs/private-pilot/"
              className="beak-flash font-semibold text-immersive-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              See Private Pilot training
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}