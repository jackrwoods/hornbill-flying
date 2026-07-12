import { CinematicHero } from "@/components/CinematicHero";
import { PhoneLink } from "@/components/PhoneLink";
import { membershipContent } from "@/content/membership";

export function MembershipHeroSection() {
  const { hero } = membershipContent;

  return (
    <CinematicHero
      register="product"
      sunsetVariant="default"
      placeholderLabel="PA28 on the ramp at RNO — photography coming"
      eyebrow="Membership"
      title={hero.h1}
      subhead={
        <>
          <span className="font-display text-on-immersive text-xl md:text-2xl block">
            {hero.headline}
          </span>
          <span className="mt-3 block">{hero.valueProp}</span>
        </>
      }
      actions={[
        {
          label: hero.cta.primary.label,
          href: hero.cta.primary.href,
          variant: "secondary",
          query: hero.cta.primary.query,
          analytics: hero.cta.primary.analytics,
        },
        {
          label: hero.cta.secondary.label,
          href: hero.cta.secondary.href,
          variant: "tertiary",
          analytics: "fleet_click",
        },
      ]}
    >
      <div className="mt-6">
        <PhoneLink
          className="inline-flex min-h-[44px] items-center text-on-immersive hover:text-immersive-accent-hover"
          showIcon
        />
      </div>
    </CinematicHero>
  );
}