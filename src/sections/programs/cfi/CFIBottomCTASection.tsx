import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIBottomCTASection() {
  return (
    <Section background="accent" id="book-consultation">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiProgram.bottomCTA.title}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href={cfiProgram.bottomCTA.primaryHref}
            variant="primary"
            analytics={cfiProgram.bottomCTA.primaryAnalytics}
          >
            {cfiProgram.bottomCTA.primaryCta}
          </CTALink>
          <CTALink
            href={cfiProgram.bottomCTA.secondaryHref}
            variant="tertiary"
          >
            {cfiProgram.bottomCTA.secondaryCta}
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
