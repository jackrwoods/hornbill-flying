import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingDiscoveryFlightSection() {
  const { discoveryFlightCTA } = instrumentRatingProgram;

  return (
    <Section background="gold" id="start">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
            {discoveryFlightCTA.title}
          </h2>
          <p className="mt-4 text-navy-800">{discoveryFlightCTA.description}</p>

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
              className="border-navy-900 text-navy-900 hover:bg-navy-900/5"
              analytics={discoveryFlightCTA.secondaryAnalytics}
            >
              {discoveryFlightCTA.secondaryCta}
            </CTALink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
