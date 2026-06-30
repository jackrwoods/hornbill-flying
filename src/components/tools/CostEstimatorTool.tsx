"use client";

import { useState } from "react";
import * as React from "react";
import { estimateTrainingCost, formatCurrency, costPrograms } from "@/lib/cost";
import { siteConfig } from "@/lib/config";
import { ToolInput } from "./ToolInput";
import { ToolResult } from "./ToolResult";
import type { CostInputs } from "@/lib/tools";

interface CostEstimatorToolProps {
  defaults: CostInputs;
}

export function CostEstimatorTool({ defaults }: CostEstimatorToolProps) {
  const [programSlug, setProgramSlug] = useState(defaults.programSlug);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaults.hoursPerWeek);
  const [isMember, setIsMember] = useState(defaults.isMember);
  const [instructorRate, setInstructorRate] = useState(defaults.instructorRate);

  const results = estimateTrainingCost({
    programSlug,
    hoursPerWeek,
    isMember,
    instructorRate,
  });

  const selectedProgram = costPrograms.find((p) => p.slug === programSlug);

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm">
        <h3 className="font-heading text-xl text-heading">Training plan</h3>
        <div className="mt-4 grid gap-4">
          <ToolInput
            id="program"
            label="Target certificate"
            variant="select"
            value={programSlug}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProgramSlug(e.target.value)}
          >
            {costPrograms.map((program) => (
              <option key={program.slug} value={program.slug}>
                {program.title}
              </option>
            ))}
          </ToolInput>

          <ToolInput
            id="hours-per-week"
            label="Flight hours per week"
            variant="range"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            min={1}
            max={10}
            unit="hr"
          />

          <ToolInput
            id="instructor-rate"
            label="Instructor rate"
            type="number"
            value={instructorRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstructorRate(Number(e.target.value))}
            unit="$/hr"
          />

          <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg p-3">
            <input
              id="membership"
              type="checkbox"
              checked={isMember}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsMember(e.target.checked)}
              className="h-5 w-5 accent-accent"
            />
            <label htmlFor="membership" className="text-sm font-semibold text-heading">
              Include membership at ${siteConfig.pricing.membershipMonthly}/month
              {" "}
              <span className="font-normal text-muted">(saves ${
                siteConfig.pricing.nonMemberWetRate - siteConfig.pricing.memberWetRate
              }/hour on aircraft)</span>
            </label>
          </div>
        </div>
      </div>

      {selectedProgram && (
        <ToolResult
          title="Estimated cost"
          items={[
            {
              label: "Total cost range",
              value: `${formatCurrency(results.lowTotal)} – ${formatCurrency(
                results.highTotal
              )}`,
              highlight: true,
            },
            {
              label: "Estimated timeline",
              value: `${results.weeksLow}–${results.weeksHigh} weeks`,
              highlight: true,
            },
            {
              label: "Flight hours",
              value: `${selectedProgram.minFlightHours}–${selectedProgram.maxFlightHours}`,
            },
            ...results.lineItems.map((item) => ({
              label: item.label,
              value: `${formatCurrency(item.low)}–${formatCurrency(item.high)}`,
            })),
          ]}
          caution="This is a rough estimate. Examiner fees, supplies, medicals, and your own progress can all change the final number."
        />
      )}
    </div>
  );
}
