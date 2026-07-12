import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotDiscoveryFlightSection() {
  const { discoveryFlightCTA } = sportPilotProgram;

  return (
    <Section background="immersive" id="discovery-flight">
      <Container className="text-center">
        <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="panel-label-lg text-immersive-accent mb-4">Discovery flight</p>
          <h2 className="font-heading text-3xl md:text-4xl text-on-immersive text-balance">
            {discoveryFlightCTA.title}
          </h2>
          <p className="mt-4 max-w-2xl text-on-immersive-muted text-pretty">
            {discoveryFlightCTA.description}
          </p>
          <p className="nums mt-6 font-heading text-4xl text-immersive-accent">
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
        </Reveal>
      </Container>
    </Section>
  );
}