import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { discoveryFlightPricing } from "@/content/fleet";

export function DiscoveryFlightPriceSection() {
  const { price, duration, deposit, includes } = discoveryFlightPricing;

  return (
    <Section background="callout" id="discovery-flight">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Discovery flight</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              Discovery flight
            </h2>
            <p className="mt-4 text-lg text-muted text-pretty">
              Your first lesson in the left seat. No deposit, no commitment.
            </p>

            <div className="card-cinematic mt-6 p-6">
              <p className="panel-label text-muted">Introductory flight</p>
              <p className="nums mt-2 font-heading text-5xl text-heading">
                ${price}
              </p>
              <ul className="nums mt-4 space-y-1 text-muted">
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
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6">
            <h3 className="font-heading text-xl text-heading">What is included</h3>
            <ul className="mt-4 space-y-3 text-muted">
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
                    className="mt-0.5 flex-shrink-0 text-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}