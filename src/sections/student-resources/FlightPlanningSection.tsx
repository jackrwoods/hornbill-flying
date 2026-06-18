import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";

export function FlightPlanningSection() {
  return (
    <Section background="white" id="flight-planning">
      <Container>
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          Flight-planning tools
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">
          Plan routes, estimate fuel, check sunrise and sunset times, and review
          local practice areas. These tools are references only — always confirm
          with current charts and an official briefing.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="Cross-country estimator"
            description="Estimate straight-line flight time and fuel for PA28 trips from RNO."
            links={[{ href: "/tools/cross-country-estimator/", label: "Estimate fuel and time" }]}
            tags={["Internal tool"]}
          />
          <ResourceCard
            title="Sunrise and sunset at RNO"
            description="Today's sunrise, sunset, and civil twilight times for Reno–Tahoe."
            links={[{ href: "/tools/sunrise-sunset/", label: "Check times" }]}
            tags={["Internal tool"]}
          />
          <ResourceCard
            title="Practice area map"
            description="Common training areas and nearby airports around RNO."
            links={[{ href: "/tools/practice-area-map/", label: "View the map" }]}
            tags={["Internal tool"]}
          />
          <ResourceCard
            title="Flight training cost estimator"
            description="See a rough cost range and timeline for your target certificate."
            links={[{ href: "/tools/cost-estimator/", label: "Estimate cost" }]}
            tags={["Internal tool"]}
          />
          <ResourceCard
            title="Mountain Flying course"
            description="Build confidence flying in the Sierra and high-density-altitude conditions."
            links={[{ href: "/programs/mountain-flying/", label: "See the course" }]}
            tags={["Program"]}
          />
          <ResourceCard
            title="ForeFlight"
            description="Electronic flight bag, charts, weather, and route planning."
            links={[
              {
                href: "https://foreflight.com/",
                label: "Visit ForeFlight",
                external: true,
              },
            ]}
            tags={["External"]}
          />
          <ResourceCard
            title="SkyVector"
            description="Free online sectional and IFR charts with airport data."
            links={[
              {
                href: "https://skyvector.com/",
                label: "Open SkyVector",
                external: true,
              },
            ]}
            tags={["External"]}
          />
          <ResourceCard
            title="1800WXBrief"
            description="Official flight service briefing, NOTAMs, and flight plan filing."
            links={[
              {
                href: "https://www.1800wxbrief.com/",
                label: "Get a briefing",
                external: true,
              },
            ]}
            tags={["External"]}
          />
          <ResourceCard
            title="FAA chart supplemental"
            description="Digital charts, airport diagrams, and chart supplements from the FAA."
            links={[
              {
                href: "https://aeronav.faa.gov/",
                label: "Browse charts",
                external: true,
              },
            ]}
            tags={["FAA"]}
          />
        </div>
      </Container>
    </Section>
  );
}
