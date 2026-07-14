import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotHeroSection() {
  const { hero } = sportPilotProgram;

  return (
    <section className="relative -mt-16 min-h-[60vh] overflow-hidden bg-immersive-bg text-on-immersive flex items-end md:min-h-[70vh] lg:-mt-18">
      <div className="absolute inset-0 z-0">
        <SunsetPlaceholder
          variant="dawn"
          label="PA28 on approach to RNO — photography coming"
          vignette
          grain
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-panel-scrim-bottom" />
      </div>

      <Container className="relative z-10 pt-16 lg:pt-18 pb-16 md:pb-20">
        <Reveal variant="stagger" className="max-w-3xl">
          <p className="panel-label-lg text-immersive-accent mb-4">
            Programs · Sport Pilot
          </p>
          <h1 className="font-heading font-extrabold leading-[1.08] text-3xl sm:text-4xl md:text-5xl text-on-immersive text-balance">
            {hero.title}
          </h1>
          <p className="mt-5 text-on-immersive-muted text-pretty max-w-2xl text-base md:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href={hero.cta.primary.href}
              variant="secondary"
              analytics={hero.cta.primary.analytics}
            >
              {hero.cta.primary.label}
            </CTALink>
            <CTALink
              href={hero.cta.secondary.href}
              variant="tertiary"
              className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
              analytics={hero.cta.secondary.analytics}
            >
              {hero.cta.secondary.label}
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}