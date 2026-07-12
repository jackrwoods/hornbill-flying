import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { membershipContent } from "@/content/membership";

export function MembershipSignupCTASection() {
  const { signupCTA } = membershipContent;

  return (
    <section
      id="start"
      className="bg-immersive-bg-night text-on-immersive relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="panel-label-lg text-immersive-accent mb-6">Start</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-immersive text-balance">
            {signupCTA.title}
          </h2>
          <p className="mt-4 max-w-2xl text-on-immersive-muted text-pretty">
            {signupCTA.supporting}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href={signupCTA.primary.href}
              query={signupCTA.primary.query}
              variant="secondary"
              analytics={signupCTA.primary.analytics}
            >
              {signupCTA.primary.label}
            </CTALink>
            <PhoneLink
              className="inline-flex items-center justify-center rounded-lg border-2 border-on-immersive/40 px-5 py-3 text-sm font-semibold text-on-immersive transition-colors hover:bg-on-dark-subtle focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              analytics="phone_click"
            >
              {signupCTA.secondary.label}
            </PhoneLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}