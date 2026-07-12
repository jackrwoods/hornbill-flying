import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingDiscoveryFlightSection() {
  const { discoveryFlightCTA } = instrumentRatingProgram;

  return (
    <Section background="accent" id="start">
      <Container>
        <Reveal variant="stagger" className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <p className="panel-label-lg text-on-accent mb-4">Discovery flight</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {discoveryFlightCTA.title}
          </h2>
          <p className="mt-4 text-dark-muted text-pretty">
            {discoveryFlightCTA.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href={discoveryFlightCTA.primaryHref}
              variant="primary"
              analytics={discoveryFlightCTA.primaryAnalytics}
            >
              {discoveryFlightCTA.primaryCta}
            </CTALink>
            <CTALink
              href={discoveryFlightCTA.secondaryHref}
              variant="tertiary"
              className="border-heading text-heading hover:bg-heading/5"
              analytics={discoveryFlightCTA.secondaryAnalytics}
            >
              {discoveryFlightCTA.secondaryCta}
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}