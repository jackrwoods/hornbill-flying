import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SunriseSunsetTool } from "@/components/tools/SunriseSunsetTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { solarFaqs } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("RNO Sunrise & Sunset Times"),
  description:
    "Today's sunrise, sunset, and civil twilight times for Reno–Tahoe (RNO). Plan your last legal evening flight.",
  alternates: {
    canonical: buildCanonical("/tools/sunrise-sunset/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/sunrise-sunset/"),
    title: buildTitle("RNO Sunrise & Sunset Times"),
    description:
      "Today's sunrise, sunset, and civil twilight times for Reno–Tahoe (RNO). Plan your last legal evening flight.",
  }),
  twitter: buildTwitter({
    title: buildTitle("RNO Sunrise & Sunset Times"),
    description:
      "Today's sunrise, sunset, and civil twilight times for Reno–Tahoe (RNO). Plan your last legal evening flight.",
  }),
};

export default function SunriseSunsetPage() {
  return (
    <ToolLayout
      title="Sunrise and sunset at RNO"
      subtitle="Plan your training schedule around civil twilight and night-currency rules."
      pageHref="/tools/sunrise-sunset/"
      faqs={solarFaqs}
      related={[
        { href: "/book/", label: "Book a flight" },
        { href: "/discovery-flight/", label: "Book a discovery flight" },
      ]}
    >
      <div className="rounded-lg bg-callout p-4 text-body">
        <p>
          Pick any date to see sunrise, sunset, and civil twilight for
          Reno–Tahoe. The last legal evening flight time marks the end of evening
          civil twilight — the VFR landing limit if you are not night current.
        </p>
      </div>

      <div className="mt-6">
        <SunriseSunsetTool />
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
