import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { MetarTafWidget } from "@/components/MetarTafWidget";
import { ResourceCard } from "@/components/ResourceCard";
import Link from "next/link";

export function WeatherSection() {
  return (
    <Section background="default" id="weather">
      <Container>
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          Reno–Tahoe weather (KRNO)
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Check the current METAR and forecast TAF for Reno–Tahoe, then jump to a
          full briefing or our RNO-specific density altitude tool.
        </p>

        <div className="mt-8">
          <MetarTafWidget />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/tools/density-altitude/"
            className="inline-flex items-center rounded-lg bg-dark px-5 py-3 text-sm font-semibold text-on-dark hover:bg-dark-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Density altitude calculator for RNO
          </Link>
          <Link
            href="/blog/density-altitude-krno/"
            className="inline-flex items-center rounded-lg border-2 border-border px-5 py-3 text-sm font-semibold text-heading hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Density altitude at KRNO
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="Aviation Weather Center"
            description="Official NOAA briefing source for METARs, TAFs, AIRMETs, SIGMETs, and PIREPs."
            links={[
              {
                href: "https://aviationweather.gov/",
                label: "Open full briefing",
                external: true,
              },
            ]}
            tags={["Official briefing"]}
          />
          <ResourceCard
            title="1800WXBrief"
            description="Leidos Flight Service standard and abbreviated briefings plus flight plan filing."
            links={[
              {
                href: "https://www.1800wxbrief.com/",
                label: "Get a briefing",
                external: true,
              },
            ]}
            tags={["Flight Service"]}
          />
          <ResourceCard
            title="METAR / TAF guide"
            description="NOAA reference for reading and decoding METARs and TAFs."
            links={[
              {
                href: "https://www.aviationweather.gov/help?page=metar",
                label: "How to decode",
                external: true,
              },
            ]}
            tags={["Reference"]}
          />
        </div>
      </Container>
    </Section>
  );
}
