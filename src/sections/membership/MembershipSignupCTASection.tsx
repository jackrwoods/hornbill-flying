import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { membershipContent } from "@/content/membership";

export function MembershipSignupCTASection() {
  const { signupCTA } = membershipContent;

  return (
    <Section background="gold" id="start">
      <Container className="text-center">
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          {signupCTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-navy-900/90">
          {signupCTA.supporting}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href={signupCTA.primary.href}
            query={signupCTA.primary.query}
            variant="primary"
            analytics={signupCTA.primary.analytics}
          >
            {signupCTA.primary.label}
          </CTALink>
          <PhoneLink
            className="inline-flex items-center justify-center rounded-lg border-2 border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
            analytics="phone_click"
          >
            {signupCTA.secondary.label}
          </PhoneLink>
        </div>
      </Container>
    </Section>
  );
}
