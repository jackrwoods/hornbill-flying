import { PageHeader } from "@/components/PageHeader";
import { fleetPage } from "@/content/fleet";

export function FleetPageHeader() {
  return (
    <PageHeader
      title={fleetPage.hero.title}
      subtitle={fleetPage.hero.subtitle}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fleet & Pricing" },
      ]}
      image={{
        src: "/images/fleet/fleet-hero-new.webp",
        alt: "Three Hornbill Aviation PA28 Cherokee aircraft lined up on the ramp under a blue sky.",
        width: 1920,
        height: 1440,
      }}
    />
  );
}
