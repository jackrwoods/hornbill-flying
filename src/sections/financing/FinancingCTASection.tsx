import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { financingContent } from "@/content/financing";

export function FinancingCTASection() {
  const { cta } = financingContent;

  return (
    <Section background="gold" id="plan-budget">
      <Container className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cta.title}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href={cta.primary.href}
            variant="primary"
            analytics={cta.primary.analytics}
          >
            {cta.primary.label}
          </CTALink>
          <CTALink
            href={cta.secondary.href}
            variant="tertiary"
          >
            {cta.secondary.label}
          </CTALink>
          <PhoneLink
            href={cta.tertiary.href}
            className="inline-flex items-center justify-center rounded-lg border-2 border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
            analytics="phone_click"
          >
            {cta.tertiary.label}
          </PhoneLink>
        </div>
      </Container>
    </Section>
  );
}
