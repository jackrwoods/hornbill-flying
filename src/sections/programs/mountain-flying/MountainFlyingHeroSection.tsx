import { CinematicHero } from "@/components/CinematicHero";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingHeroSection() {
  const { hero } = mountainFlyingProgram;

  return (
    <CinematicHero
      register="product"
      sunsetVariant="dawn"
      eyebrow="Mountain Flying · Sierra Nevada"
      placeholderLabel="PA28 on the ramp with the Sierra Nevada — photography coming"
      title={hero.title}
      subhead={hero.subtitle}
      actions={[
        {
          label: hero.cta.primary.label,
          href: hero.cta.primary.href,
          variant: "secondary",
          analytics: hero.cta.primary.analytics,
        },
        {
          label: hero.cta.secondary.label,
          href: hero.cta.secondary.href,
          variant: "tertiary",
          analytics: hero.cta.secondary.analytics,
        },
      ]}
    />
  );
}