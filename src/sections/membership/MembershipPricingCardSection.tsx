import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
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
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Pricing</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Membership pricing
          </h2>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            One monthly fee. One member wet rate. No fuel surcharge.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Reveal variant="glide" className="card-cinematic p-6 flex flex-col">
            <p className="panel-label text-muted">{pricingCopy.monthlyLabel}</p>
            <p className="nums mt-2 font-heading text-4xl text-heading">
              ${pricing.membershipMonthly}
              <span className="text-lg font-body text-muted">/month</span>
            </p>
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6 flex flex-col border-t-4 border-accent">
            <p className="panel-label text-muted">{pricingCopy.memberRateLabel}</p>
            <p className="nums mt-2 font-heading text-4xl text-heading">
              ${pricing.memberWetRate}
              <span className="text-lg font-body text-muted">/hr</span>
            </p>
            <p className="mt-1 text-sm text-success">{pricingCopy.savingsText}</p>
            <p className="mt-3 text-sm text-muted">{memberRateBillingNote}</p>
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6 flex flex-col">
            <p className="panel-label text-muted">{pricingCopy.nonMemberRateLabel}</p>
            <p className="nums mt-2 font-heading text-4xl text-heading">
              ${pricing.nonMemberWetRate}
              <span className="text-lg font-body text-muted">/hr</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              Transparent alternative for non-members.
            </p>
          </Reveal>
        </div>

        <Reveal variant="glide" className="mt-8 card-immersive p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="nums font-heading text-2xl text-immersive-accent">
                Save ${membershipRates.savingsPerHour}/hr
              </p>
              <p className="mt-1 text-on-immersive">{pricingCopy.breakEvenText}</p>
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
        </Reveal>

        <Reveal variant="glide" className="mt-6">
          <p className="text-sm text-muted">{pricingCopy.disclaimer}</p>
        </Reveal>
      </Container>
    </Section>
  );
}