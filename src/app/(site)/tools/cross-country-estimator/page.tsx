import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CrossCountryEstimatorTool } from "@/components/tools/CrossCountryEstimatorTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { fuelFaqs, sampleRoutes, widgetDefaults } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("Cross-Country Fuel & Time Estimator"),
  description:
    "Estimate flight time and fuel for PA28 trips from RNO. Pre-loaded routes to Tahoe, Monterey, and Bend.",
  alternates: {
    canonical: buildCanonical("/tools/cross-country-estimator/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/cross-country-estimator/"),
    title: buildTitle("Cross-Country Fuel & Time Estimator"),
    description:
      "Estimate flight time and fuel for PA28 trips from RNO. Pre-loaded routes to Tahoe, Monterey, and Bend.",
  }),
  twitter: buildTwitter({
    title: buildTitle("Cross-Country Fuel & Time Estimator"),
    description:
      "Estimate flight time and fuel for PA28 trips from RNO. Pre-loaded routes to Tahoe, Monterey, and Bend.",
  }),
};

export default function CrossCountryEstimatorPage() {
  return (
    <ToolLayout
      title="Cross-country fuel and time estimator"
      subtitle="Estimate straight-line time and fuel for PA28 trips from Reno–Tahoe."
      pageHref="/tools/cross-country-estimator/"
      faqs={fuelFaqs}
      related={[
        { href: "/fleet/", label: "Fleet and rates" },
        { href: "/cross-country-rentals/", label: "Cross-country rentals" },
        { href: "/programs/private-pilot/", label: "Private Pilot program" },
      ]}
    >
      <div className="rounded-lg bg-sky-100 p-4 text-ink">
        <p>
          Enter origin, destination, cruise speed, and fuel burn to get a
          straight-line distance, time, and fuel estimate. Add a wind component
          for a rough ground-speed adjustment. This is not a flight plan — use
          it to start thinking about routes, fuel stops, and reserve.
        </p>
      </div>

      <div className="mt-6">
        <CrossCountryEstimatorTool defaults={widgetDefaults.fuelEstimator} />
      </div>

      <div className="mt-8">
        <h3 className="font-heading text-xl text-navy-900">Sample routes</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white text-sm">
            <thead className="bg-navy-900 text-cream-50">
              <tr>
                <th className="px-4 py-3 text-left font-body font-semibold">Route</th>
                <th className="px-4 py-3 text-left font-body font-semibold">Origin</th>
                <th className="px-4 py-3 text-left font-body font-semibold">Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/10">
              {sampleRoutes.map((route) => (
                <tr key={route.destination}>
                  <td className="px-4 py-3 font-mono text-navy-900">{route.name}</td>
                  <td className="px-4 py-3 text-ink-light">{route.originName} ({route.origin})</td>
                  <td className="px-4 py-3 text-ink-light">{route.destinationName} ({route.destination})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
