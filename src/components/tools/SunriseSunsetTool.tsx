"use client";

import { useState } from "react";
import * as React from "react";
import { getRnoSolarTimes } from "@/lib/solar";
import { ToolInput } from "./ToolInput";
import { ToolResult } from "./ToolResult";

export function SunriseSunsetTool() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const results = getRnoSolarTimes(date);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-xl text-navy-900">Select date</h3>
        <div className="mt-4">
          <ToolInput
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </div>
      </div>

      <ToolResult
        title={`Solar times for ${results.date}`}
        items={[
          { label: "Sunrise", value: results.sunrise, highlight: true },
          { label: "Sunset", value: results.sunset, highlight: true },
          { label: "Morning civil twilight", value: results.dawn },
          { label: "Evening civil twilight", value: results.dusk },
          {
            label: "Earliest morning training slot",
            value: results.earliestTrainingSlot,
          },
          {
            label: "Last legal evening flight",
            value: results.lastLegalEveningFlight,
            highlight: true,
          },
        ]}
      />
    </div>
  );
}
