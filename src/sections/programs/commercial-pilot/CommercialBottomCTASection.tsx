import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialBottomCTASection() {
  const { bottomCTA } = commercialPilotProgram;

  return (
    <Section
      background="immersive-night"
      id="book-consultation"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal
          variant="stagger"
          className="mx-auto max-w-3xl flex flex-col items-center"
        >
          <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-immersive text-balance">
            {bottomCTA.title}
          </h2>
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
          <p className="mt-6 text-on-immersive-muted">
            Prefer to call?{" "}
            <PhoneLink className="font-semibold text-immersive-accent hover:underline" />
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}