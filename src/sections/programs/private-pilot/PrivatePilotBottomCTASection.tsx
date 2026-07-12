import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotBottomCTASection() {
  const { bottomCTA } = privatePilotProgram;

  return (
    <Section background="immersive-night" id="book-now" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
            {bottomCTA.title}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href={bottomCTA.primaryHref}
              variant="secondary"
              analytics={bottomCTA.primaryAnalytics}
              className="px-8 py-4 text-base"
            >
              {bottomCTA.primaryCta}
            </CTALink>
            <CTALink
              href={bottomCTA.secondaryHref}
              variant="tertiary"
              className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
            >
              {bottomCTA.secondaryCta}
            </CTALink>
          </div>
          <p className="mt-8 text-on-immersive-muted">
            Prefer to call?{" "}
            <PhoneLink className="font-semibold text-on-immersive hover:text-immersive-accent-hover" />
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}