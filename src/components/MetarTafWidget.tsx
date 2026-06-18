"use client";

import { MetarTool } from "@/components/tools/MetarTool";
import { TafTool } from "@/components/tools/TafTool";

export function MetarTafWidget() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <MetarTool />
        <TafTool />
      </div>

      <div className="rounded-lg border border-navy-800/10 bg-white p-4 text-sm text-ink-light">
        <strong className="text-navy-900">Always obtain a full preflight weather
        briefing from an official source.</strong> This widget is a quick reference
        only. Data comes from NOAA Aviation Weather Center and refreshes every
        minute.
      </div>
    </div>
  );
}
