import { CinematicHero } from "@/components/CinematicHero";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialHeroSection() {
  const { hero } = commercialPilotProgram;

  return (
    <CinematicHero
      register="product"
      eyebrow="Commercial Pilot · CPL"
      placeholderLabel="PA28 cross-country over the Sierra — photography coming"
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