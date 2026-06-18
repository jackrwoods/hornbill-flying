import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialBottomCTASection() {
  const { bottomCTA } = commercialPilotProgram;

  return (
    <Section background="gold" id="book-consultation">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {bottomCTA.title}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href={bottomCTA.primaryHref}
            variant="primary"
            analytics={bottomCTA.primaryAnalytics}
          >
            {bottomCTA.primaryCta}
          </CTALink>
          <CTALink
            href={bottomCTA.secondaryHref}
            variant="tertiary"
          >
            {bottomCTA.secondaryCta}
          </CTALink>
        </div>
        <p className="mt-6 text-navy-900/80">
          Prefer to call?{" "}
          <PhoneLink className="font-semibold text-navy-900 hover:underline" />
        </p>
      </Container>
    </Section>
  );
}
