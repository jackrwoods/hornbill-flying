import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingBottomCTASection() {
  const { bottomCTA } = mountainFlyingProgram;

  return (
    <Section background="accent" id="book-now">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
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
        <p className="mt-6 text-heading/80">
          Prefer to call?{" "}
          <PhoneLink className="font-semibold text-heading hover:underline" />
        </p>
      </Container>
    </Section>
  );
}
