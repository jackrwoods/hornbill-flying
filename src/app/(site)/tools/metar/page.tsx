import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MetarTool } from "@/components/tools/MetarTool";
import { TafTool } from "@/components/tools/TafTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { Reveal } from "@/components/Reveal";
import { metarFaqs } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("KRNO METAR & TAF"),
  description:
    "Current METAR and forecast TAF for Reno–Tahoe (KRNO). Decoded in plain language for student pilots and renters.",
  alternates: {
    canonical: buildCanonical("/tools/metar/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/metar/"),
    title: buildTitle("KRNO METAR & TAF"),
    description:
      "Current METAR and forecast TAF for Reno–Tahoe (KRNO). Decoded in plain language for student pilots and renters.",
  }),
  twitter: buildTwitter({
    title: buildTitle("KRNO METAR & TAF"),
    description:
      "Current METAR and forecast TAF for Reno–Tahoe (KRNO). Decoded in plain language for student pilots and renters.",
  }),
};

export default function MetarPage() {
  return (
    <ToolLayout
      title="Reno–Tahoe (KRNO) METAR and TAF"
      subtitle="Live observation and forecast from NOAA, decoded for quick reference."
      pageHref="/tools/metar/"
      faqs={metarFaqs}
      related={[
        { href: "/discovery-flight/", label: "Book a discovery flight" },
        { href: "/student-resources/", label: "Student resources" },
      ]}
      eyebrow="Weather"
      placeholderLabel="Windsock at KRNO, dusk — photography coming"
      sunsetVariant="default"
    >
      <Reveal variant="glide">
        <div className="card-cinematic p-5 text-body">
          <p>
            The current METAR below shows wind, visibility, ceiling, temperature,
            and altimeter at RNO. The TAF gives you the next forecast periods.
            Data comes from NOAA Aviation Weather Center and refreshes every 60
            seconds. Use it as a quick check, not a legal briefing.
          </p>
        </div>
      </Reveal>

      <Reveal variant="glide" className="mt-6 grid gap-6">
        <MetarTool />
        <TafTool />
      </Reveal>

      <Reveal variant="glide" className="mt-6">
        <a
          href="https://aviationweather.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="beak-flash inline-flex items-center font-semibold text-heading hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring"
        >
          Full briefing on Aviation Weather Center
        </a>
      </Reveal>

      <Reveal variant="glide" className="mt-6">
        <Disclaimer />
      </Reveal>
    </ToolLayout>
  );
}