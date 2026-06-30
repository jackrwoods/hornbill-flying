"use client";

import { useState } from "react";
import * as React from "react";
import {
  estimateFuelAndTime,
  sampleRoutes,
  getAirportList,
} from "@/lib/flightPlanning";
import { ToolInput } from "./ToolInput";
import { ToolResult } from "./ToolResult";
import type { FuelInputs } from "@/lib/tools";

interface CrossCountryEstimatorToolProps {
  defaults: Omit<FuelInputs, "destination">;
}

export function CrossCountryEstimatorTool({
  defaults,
}: CrossCountryEstimatorToolProps) {
  const [origin, setOrigin] = useState(defaults.origin);
  const [destination, setDestination] = useState("KTVL");
  const [cruiseSpeed, setCruiseSpeed] = useState(defaults.cruiseSpeedKt);
  const [fuelBurn, setFuelBurn] = useState(defaults.fuelBurnGph);
  const [wind, setWind] = useState(defaults.windComponentKt);

  const results = estimateFuelAndTime({
    origin,
    destination,
    cruiseSpeedKt: cruiseSpeed,
    fuelBurnGph: fuelBurn,
    windComponentKt: wind,
  });

  const applyRoute = (dest: string) => {
    setDestination(dest);
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-xl text-navy-900">Route and performance</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ToolInput
            id="origin"
            label="Origin"
            type="text"
            value={origin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrigin(e.target.value.toUpperCase())}
            hint={`Known airports: ${getAirportList().join(", ")}`}
          />
          <ToolInput
            id="destination"
            label="Destination"
            type="text"
            value={destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value.toUpperCase())}
            error={results.error}
          />
          <ToolInput
            id="cruise-speed"
            label="Cruise speed"
            type="number"
            value={cruiseSpeed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCruiseSpeed(Number(e.target.value))}
            unit="kt"
          />
          <ToolInput
            id="fuel-burn"
            label="Fuel burn"
            type="number"
            step={0.1}
            value={fuelBurn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFuelBurn(Number(e.target.value))}
            unit="gph"
          />
          <ToolInput
            id="wind"
            label="Wind component"
            type="number"
            value={wind}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWind(Number(e.target.value))}
            unit="kt"
            hint="Positive = headwind, negative = tailwind"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-navy-900">Quick-fill routes:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sampleRoutes.map((route) => (
              <button
                key={route.destination}
                type="button"
                onClick={() => applyRoute(route.destination)}
                className="rounded-lg bg-teal-100 px-3 py-1.5 text-sm font-semibold text-navy-900 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {route.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!results.error && (
        <ToolResult
          title="Estimate"
          items={[
            {
              label: "Straight-line distance",
              value: `${results.distanceNm} nm`,
            },
            {
              label: "Ground speed",
              value: `${results.groundSpeedKt} kt`,
            },
            {
              label: "Estimated flight time",
              value: results.timeDisplay,
              highlight: true,
            },
            {
              label: "Fuel required",
              value: `${results.fuelGallons} gal`,
            },
            {
              label: "30-min VFR reserve",
              value: `${results.reserveGallons} gal`,
            },
            {
              label: "Total fuel",
              value: `${results.totalFuelGallons} gal`,
              highlight: true,
            },
          ]}
        />
      )}
    </div>
  );
}
