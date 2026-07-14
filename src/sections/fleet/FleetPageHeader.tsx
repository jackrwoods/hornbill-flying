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
      eyebrow="Fleet & Pricing"
      image={{
        src: "/images/fleet/fleet-hero.webp",
        alt: "Hornbill Aviation PA28 Cherokee fleet on the ramp at KRNO",
      }}
      className="-mt-16 lg:-mt-18"
    />
  );
}