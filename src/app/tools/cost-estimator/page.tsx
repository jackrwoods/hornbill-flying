import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CostEstimatorTool } from "@/components/tools/CostEstimatorTool";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { costFaqs, widgetDefaults } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("Flight Training Cost Estimator"),
  description:
    "Estimate total cost and timeline for Sport, Private, Instrument, Commercial, CFI, or CFII training at Hornbill.",
  alternates: {
    canonical: buildCanonical("/tools/cost-estimator/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/cost-estimator/"),
    title: buildTitle("Flight Training Cost Estimator"),
    description:
      "Estimate total cost and timeline for Sport, Private, Instrument, Commercial, CFI, or CFII training at Hornbill.",
  }),
  twitter: buildTwitter({
    title: buildTitle("Flight Training Cost Estimator"),
    description:
      "Estimate total cost and timeline for Sport, Private, Instrument, Commercial, CFI, or CFII training at Hornbill.",
  }),
};

export default function CostEstimatorPage() {
  return (
    <ToolLayout
      title="Flight training cost estimator"
      subtitle="Choose your certificate and schedule to see a rough cost range and timeline."
      pageHref="/tools/cost-estimator/"
      faqs={costFaqs}
      related={[
        { href: "/fleet/", label: "Fleet and rates" },
        { href: "/financing/", label: "Financing options" },
        { href: "/membership/", label: "Membership" },
        { href: "/programs/private-pilot/", label: "Private Pilot program" },
      ]}
    >
      <div className="rounded-lg bg-sky-100 p-4 text-ink">
        <p>
          Use this tool to get a rough range for your training budget. It uses
          our published PA28 wet rates, membership savings, and a placeholder
          instructor rate. Talk to a CFI for a personalized plan.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimatorTool defaults={widgetDefaults.costEstimator} />
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </ToolLayout>
  );
}
