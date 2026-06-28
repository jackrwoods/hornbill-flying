import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MetarTool } from "@/components/tools/MetarTool";
import { TafTool } from "@/components/tools/TafTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
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
    >
      <div className="rounded-lg bg-sky-100 p-4 text-ink">
        <p>
          The current METAR below shows wind, visibility, ceiling, temperature,
          and altimeter at RNO. The TAF gives you the next forecast periods.
          Data comes from NOAA Aviation Weather Center and refreshes every 60
          seconds. Use it as a quick check, not a legal briefing.
        </p>
      </div>

      <div className="mt-6 grid gap-6">
        <MetarTool />
        <TafTool />
      </div>

      <div className="mt-6">
        <a
          href="https://aviationweather.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-semibold text-navy-900 underline hover:text-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          Full briefing on Aviation Weather Center
        </a>
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
