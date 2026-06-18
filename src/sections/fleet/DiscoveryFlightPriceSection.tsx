import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { discoveryFlightPricing } from "@/content/fleet";

export function DiscoveryFlightPriceSection() {
  const { price, duration, deposit, includes } = discoveryFlightPricing;

  return (
    <Section background="sky" id="discovery-flight">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              Discovery flight
            </h2>
            <p className="mt-4 text-lg text-ink-light">
              Your first lesson in the left seat. No deposit, no commitment.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
                Introductory flight
              </p>
              <p className="mt-2 font-heading text-5xl text-navy-900">
                ${price}
              </p>
              <ul className="mt-4 space-y-1 text-ink-light">
                <li>{duration}</li>
                <li>{deposit}</li>
              </ul>
            </div>

            <div className="mt-6">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
              >
                Book a discovery flight
              </CTALink>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl text-navy-900">What is included</h3>
            <ul className="mt-4 space-y-3 text-ink-light">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-gold-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
