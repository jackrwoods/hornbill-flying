import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";

export function FleetCTASection() {
  return (
    <Section background="dark" id="cta">
      <Container>
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-on-dark">
            Ready to fly?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-on-dark">
            Book a discovery flight or start a membership today. Questions? Call
            us and we will walk you through the rates.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
            >
              Book a discovery flight
            </CTALink>
            <Link
              href="/membership/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-accent px-5 py-3 text-sm font-semibold text-on-dark-accent transition-colors hover:bg-accent hover:text-heading focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              data-analytics="membership_signup_started"
            >
              Start a membership
            </Link>
            <PhoneLink className="text-on-dark hover:text-on-dark-accent-hover" showIcon />
          </div>

          <p className="mt-6 text-sm text-on-dark-soft">
            Interested in a full certificate?{" "}
            <Link
              href="/programs/private-pilot/"
              className="font-semibold text-on-dark-accent-hover hover:text-on-dark-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              See Private Pilot training
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
