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
    />
  );
}
