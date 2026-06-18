import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DensityAltitudeTool } from "@/components/tools/DensityAltitudeTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { densityFaqs, widgetDefaults } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("Density Altitude Calculator for KRNO"),
  description:
    "Calculate pressure altitude and density altitude for Reno–Tahoe. RNO elevation pre-filled at 4,403 ft. Built for PA28 pilots.",
  alternates: {
    canonical: buildCanonical("/tools/density-altitude/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/density-altitude/"),
    title: buildTitle("Density Altitude Calculator for KRNO"),
    description:
      "Calculate pressure altitude and density altitude for Reno–Tahoe. RNO elevation pre-filled at 4,403 ft. Built for PA28 pilots.",
  }),
  twitter: buildTwitter({
    title: buildTitle("Density Altitude Calculator for KRNO"),
    description:
      "Calculate pressure altitude and density altitude for Reno–Tahoe. RNO elevation pre-filled at 4,403 ft. Built for PA28 pilots.",
  }),
};

export default function DensityAltitudePage() {
  return (
    <ToolLayout
      title="Density altitude calculator"
      subtitle="Estimate pressure altitude and density altitude at RNO. Pre-filled with the field elevation of 4,403 ft."
      pageHref="/tools/density-altitude/"
      faqs={densityFaqs}
      related={[
        { href: "/programs/mountain-flying/", label: "Mountain Flying course" },
        { href: "/blog/", label: "Blog: density altitude at KRNO" },
        { href: "/fleet/", label: "PA28 fleet and rates" },
      ]}
    >
      <div className="rounded-lg bg-sky-100 p-4 text-ink">
        <p>
          Density altitude is pressure altitude corrected for temperature. Hot,
          high days at RNO can make the airplane perform as if it is thousands
          of feet higher than the field elevation. Use this calculator as a
          planning aid, then verify takeoff and climb performance with your
          POH.
        </p>
      </div>

      <div className="mt-6">
        <DensityAltitudeTool defaults={widgetDefaults.densityAltitude} />
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
