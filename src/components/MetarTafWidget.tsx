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

      <div className="rounded-lg border border-border-subtle bg-white p-4 text-sm text-muted">
        <strong className="text-heading">Always obtain a full preflight weather
        briefing from an official source.</strong> This widget is a quick reference
        only. Data comes from NOAA Aviation Weather Center and refreshes every
        minute.
      </div>
    </div>
  );
}
