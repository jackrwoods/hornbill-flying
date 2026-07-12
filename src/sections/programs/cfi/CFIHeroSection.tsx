import { CinematicHero } from "@/components/CinematicHero";
import { PhoneLink } from "@/components/PhoneLink";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIHeroSection() {
  const { hero } = cfiProgram;

  return (
    <CinematicHero
      register="product"
      sunsetVariant="soft"
      eyebrow="Certified Flight Instructor · CFI"
      placeholderLabel="CFI candidate and instructor in the PA28 — photography coming"
      title={hero.title}
      subhead={hero.subtitle}
      actions={[
        {
          label: hero.cta.primary.label,
          href: hero.cta.primary.href,
          variant: "secondary",
          analytics: hero.cta.primary.analytics,
        },
      ]}
    >
      <div className="mt-3 sm:mt-4">
        <PhoneLink
          href={hero.cta.secondary.href}
          className="inline-flex items-center justify-center rounded-lg border-2 border-on-immersive/40 px-5 py-3 text-sm font-semibold text-on-immersive transition-colors hover:bg-on-dark-subtle hover:no-underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          showIcon={false}
          analytics={hero.cta.secondary.analytics}
        >
          {hero.cta.secondary.label}
        </PhoneLink>
      </div>
    </CinematicHero>
  );
}