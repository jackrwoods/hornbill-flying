import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/content/tools";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: buildTitle("Pilot Tools for Reno–Tahoe (RNO)"),
  description:
    "Free pilot tools for RNO: METAR/TAF, density altitude, fuel estimator, sunrise/sunset, practice-area map, and cost calculator.",
  alternates: {
    canonical: buildCanonical("/tools/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/tools/"),
    title: buildTitle("Pilot Tools for Reno–Tahoe (RNO)"),
    description:
      "Free pilot tools for RNO: METAR/TAF, density altitude, fuel estimator, sunrise/sunset, practice-area map, and cost calculator.",
  }),
  twitter: buildTwitter({
    title: buildTitle("Pilot Tools for Reno–Tahoe (RNO)"),
    description:
      "Free pilot tools for RNO: METAR/TAF, density altitude, fuel estimator, sunrise/sunset, practice-area map, and cost calculator.",
  }),
};

export default function ToolsHubPage() {
  return (
    <ToolLayout
      title="Pilot tools for RNO"
      subtitle="Quick, practical tools for student pilots and renters at Reno–Tahoe."
      pageHref="/tools/"
      showCta
    >
      <div className="prose max-w-none text-ink-light">
        <p>
          These tools are built for pilots training at Hornbill Flight Center.
          Check current weather, estimate density altitude, plan cross-country
          fuel, find sunrise and sunset times, review the local practice area,
          and estimate training costs. They are references only — always confirm
          with official sources before flight.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            title={tool.title}
            description={tool.shortDescription}
            href={tool.href}
            icon={tool.icon}
          />
        ))}
      </div>
    </ToolLayout>
  );
}
