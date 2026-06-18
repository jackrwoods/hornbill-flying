import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingBottomCTASection() {
  const { bottomCTA } = instrumentRatingProgram;

  return (
    <Section background="navy" id="bottom-cta">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            {bottomCTA.title}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href={bottomCTA.primaryHref}
              variant="secondary"
              analytics={bottomCTA.primaryAnalytics}
            >
              {bottomCTA.primaryCta}
            </CTALink>
            <CTALink
              href={bottomCTA.secondaryHref}
              variant="tertiary"
              className="text-white hover:bg-white/10"
            >
              {bottomCTA.secondaryCta}
            </CTALink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
