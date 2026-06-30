import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { cfiiProgram } from "@/content/programs/cfii";

export function CFIIBottomCTASection() {
  return (
    <Section background="accent" id="book-consultation">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiiProgram.bottomCTA.title}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href={cfiiProgram.bottomCTA.primaryHref}
            variant="primary"
          >
            {cfiiProgram.bottomCTA.primaryCta}
          </CTALink>
          <CTALink
            href={cfiiProgram.bottomCTA.secondaryHref}
            variant="tertiary"
          >
            {cfiiProgram.bottomCTA.secondaryCta}
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
