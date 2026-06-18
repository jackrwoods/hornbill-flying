import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { membershipContent } from "@/content/membership";
import { membershipRates, pricing } from "@/content/pricing";

export function MembershipPricingCardSection() {
  const { pricing: pricingCopy } = membershipContent;

  return (
    <Section background="cream" id="pricing">
      <Container>
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          Membership pricing
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">
          One monthly fee. One member wet rate. No fuel surcharge.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-gold-500">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
              {pricingCopy.monthlyLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-navy-900">
              ${pricing.membershipMonthly}
              <span className="text-lg font-body text-ink-light">/month</span>
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
              {pricingCopy.memberRateLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-navy-900">
              ${pricing.memberWetRate}
              <span className="text-lg font-body text-ink-light">/hr</span>
            </p>
            <p className="mt-1 text-sm text-success">{pricingCopy.savingsText}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
              {pricingCopy.nonMemberRateLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-navy-900">
              ${pricing.nonMemberWetRate}
              <span className="text-lg font-body text-ink-light">/hr</span>
            </p>
            <p className="mt-1 text-sm text-ink-light">
              Transparent alternative for non-members.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-navy-900 p-6 text-white md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-heading text-2xl text-gold-400">
                Save ${membershipRates.savingsPerHour}/hr
              </p>
              <p className="mt-1 text-cream-50/90">{pricingCopy.breakEvenText}</p>
            </div>
            <CTALink
              href={membershipContent.signupCTA.primary.href}
              query={membershipContent.signupCTA.primary.query}
              variant="secondary"
              analytics={membershipContent.signupCTA.primary.analytics}
            >
              {membershipContent.signupCTA.primary.label}
            </CTALink>
          </div>
        </div>

        <p className="mt-6 text-sm text-ink-light">{pricingCopy.disclaimer}</p>
      </Container>
    </Section>
  );
}
