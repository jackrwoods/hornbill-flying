import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PracticeAreaMapSvg } from "@/components/tools/PracticeAreaMapSvg";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { practiceAreaFaqs } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("Reno Training Area & Local Route Map"),
  description:
    "Common practice areas and nearby airports around RNO for student pilots. Static map with airspace and altitude notes.",
  alternates: {
    canonical: buildCanonical("/tools/practice-area-map/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/practice-area-map/"),
    title: buildTitle("Reno Training Area & Local Route Map"),
    description:
      "Common practice areas and nearby airports around RNO for student pilots. Static map with airspace and altitude notes.",
  }),
  twitter: buildTwitter({
    title: buildTitle("Reno Training Area & Local Route Map"),
    description:
      "Common practice areas and nearby airports around RNO for student pilots. Static map with airspace and altitude notes.",
  }),
};

export default function PracticeAreaMapPage() {
  return (
    <ToolLayout
      title="Practice area and local route map"
      subtitle="Common training areas and nearby airports around Reno–Tahoe."
      pageHref="/tools/practice-area-map/"
      faqs={practiceAreaFaqs}
      related={[
        { href: "/location/", label: "Location and RNO" },
        { href: "/programs/mountain-flying/", label: "Mountain Flying course" },
        { href: "/student-resources/", label: "Student resources" },
      ]}
    >
      <div className="rounded-lg bg-callout p-4 text-body">
        <p>
          This is a simplified reference for the common practice area northeast
          of RNO and nearby airports used for touch-and-go practice and cross-country
          training. It is not a sectional chart. Confirm current airspace,
          NOTAMs, and TFRs before every flight.
        </p>
      </div>

      <figure className="mt-6">
        <PracticeAreaMapSvg className="w-full rounded-xl border border-border-subtle bg-white shadow-sm" />
        <figcaption className="mt-3 text-sm text-muted">
          Simplified training reference for RNO. Labels: RNO, common practice area,
          nearby airports KRTS, KMLC, KLOL, KSPZ, Sierra ridge, and a simplified
          Class C boundary. Always use the current sectional chart for flight.
        </figcaption>
      </figure>

      <div className="mt-6 rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm">
        <h3 className="font-heading text-xl text-heading">Notes</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          <li>Confirm with the current sectional chart before flight.</li>
          <li>Practice area altitudes and boundaries vary with traffic and ATC.</li>
          <li>Check runway conditions and pattern direction at nearby airports.</li>
          <li>Keep the Sierra ridge and rising terrain in mind when heading west.</li>
        </ul>
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
