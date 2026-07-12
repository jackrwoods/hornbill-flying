import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIBottomCTASection() {
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
            {cfiProgram.bottomCTA.title}
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTALink
              href={cfiProgram.bottomCTA.primaryHref}
              variant="secondary"
              analytics={cfiProgram.bottomCTA.primaryAnalytics}
              className="px-8 py-4 text-base"
            >
              {cfiProgram.bottomCTA.primaryCta}
            </CTALink>
            <CTALink
              href={cfiProgram.bottomCTA.secondaryHref}
              variant="tertiary"
              className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
            >
              {cfiProgram.bottomCTA.secondaryCta}
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