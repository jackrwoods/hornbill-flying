import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";

export function FleetCTASection() {
  return (
    <Section background="navy" id="cta">
      <Container>
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            Ready to fly?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sand-50/90">
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
              className="inline-flex items-center justify-center rounded-lg border-2 border-gold-500 px-5 py-3 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500 hover:text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              data-analytics="membership_signup_started"
            >
              Start a membership
            </Link>
            <PhoneLink className="text-white hover:text-gold-400" showIcon />
          </div>

          <p className="mt-6 text-sm text-sand-50/70">
            Interested in a full certificate?{" "}
            <Link
              href="/programs/private-pilot/"
              className="font-semibold text-gold-400 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              See Private Pilot training
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
