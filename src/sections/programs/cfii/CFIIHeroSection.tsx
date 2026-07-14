import { CinematicHero } from "@/components/CinematicHero";

export function CFIIHeroSection() {
  return (
    <CinematicHero
      register="product"
      eyebrow="CFII · Certified Flight Instructor Instrument"
      placeholderLabel="PA28 instrument panel, G5 and WAAS GPS — photography coming"
      title="CFII training in Reno, NV."
      subhead="Add instrument instruction to your CFI certificate. Teach approaches, holds, and partial-panel flying from Reno–Tahoe (RNO)."
      actions={[
        {
          label: "Talk to an instructor",
          href: "/contact/",
          variant: "secondary",
        },
        {
          label: "See the fleet and rates",
          href: "/fleet/",
          variant: "tertiary",
        },
      ]}
    />
  );
}