import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotDiscoveryFlightSection() {
  const { discoveryFlightCTA } = sportPilotProgram;

  return (
    <Section background="navy" id="discovery-flight">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-white">
          {discoveryFlightCTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream-50/90">
          {discoveryFlightCTA.description}
        </p>
        <p className="mt-6 font-heading text-4xl text-gold-500">
          {discoveryFlightCTA.price}
        </p>
        <div className="mt-8">
          <CTALink
            href={discoveryFlightCTA.href}
            variant="secondary"
            analytics={discoveryFlightCTA.analytics}
          >
            Book a discovery flight
          </CTALink>
        </div>
      </Container>
    </Section>
  );
}
