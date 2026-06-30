import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { membershipContent } from "@/content/membership";
import {
  membershipRates,
  pricing,
  memberRateBillingNote,
} from "@/content/pricing";

export function MembershipPricingCardSection() {
  const { pricing: pricingCopy } = membershipContent;

  return (
    <Section background="default" id="pricing">
      <Container>
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          Membership pricing
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          One monthly fee. One member wet rate. No fuel surcharge.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              {pricingCopy.monthlyLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-heading">
              ${pricing.membershipMonthly}
              <span className="text-lg font-body text-muted">/month</span>
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-accent">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              {pricingCopy.memberRateLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-heading">
              ${pricing.memberWetRate}
              <span className="text-lg font-body text-muted">/hr</span>
            </p>
            <p className="mt-1 text-sm text-success">{pricingCopy.savingsText}</p>
            <p className="mt-3 text-sm text-muted">{memberRateBillingNote}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              {pricingCopy.nonMemberRateLabel}
            </p>
            <p className="mt-2 font-heading text-4xl text-heading">
              ${pricing.nonMemberWetRate}
              <span className="text-lg font-body text-muted">/hr</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              Transparent alternative for non-members.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-dark p-6 text-on-dark md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-heading text-2xl text-on-dark-accent-hover">
                Save ${membershipRates.savingsPerHour}/hr
              </p>
              <p className="mt-1 text-on-dark">{pricingCopy.breakEvenText}</p>
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

        <p className="mt-6 text-sm text-muted">{pricingCopy.disclaimer}</p>
      </Container>
    </Section>
  );
}
