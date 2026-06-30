"use client";

import { useState } from "react";
import * as React from "react";
import { calculateDensityAltitude, cToF, fToC } from "@/lib/density";
import { ToolInput } from "./ToolInput";
import { ToolResult } from "./ToolResult";
import type { DensityInputs } from "@/lib/tools";

interface DensityAltitudeToolProps {
  defaults: DensityInputs;
}

export function DensityAltitudeTool({ defaults }: DensityAltitudeToolProps) {
  const [elevation, setElevation] = useState(defaults.elevationFt);
  const [altimeter, setAltimeter] = useState(defaults.altimeterInHg);
  const [tempF, setTempF] = useState(defaults.temperatureF);
  const [unit, setUnit] = useState<"F" | "C">("F");

  const inputs: DensityInputs = {
    elevationFt: elevation,
    altimeterInHg: altimeter,
    temperatureF: unit === "F" ? tempF : cToF(tempF),
  };
  const results = calculateDensityAltitude(inputs);

  const handleTempChange = (value: number) => {
    setTempF(unit === "F" ? value : fToC(value));
  };

  const displayTemp = unit === "F" ? tempF : fToC(tempF);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-xl text-navy-900">Inputs</h3>
        <div className="mt-4 grid gap-4">
          <ToolInput
            id="elevation"
            label="Field elevation"
            type="number"
            value={elevation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElevation(Number(e.target.value))}
            unit="ft"
          />
          <ToolInput
            id="altimeter"
            label="Altimeter setting"
            type="number"
            step={0.01}
            value={altimeter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAltimeter(Number(e.target.value))}
            unit="inHg"
          />
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <ToolInput
              id="temperature"
              label="Temperature"
              type="number"
              step={0.1}
              value={Math.round(displayTemp * 10) / 10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTempChange(Number(e.target.value))}
              unit={unit === "F" ? "°F" : "°C"}
            />
            <div className="flex items-end">
              <div className="flex rounded-lg border border-navy-800/20 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setUnit("F")}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${
                    unit === "F"
                      ? "bg-navy-900 text-white"
                      : "text-navy-900 hover:bg-sand-50"
                  }`}
                >
                  °F
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("C")}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${
                    unit === "C"
                      ? "bg-navy-900 text-white"
                      : "text-navy-900 hover:bg-sand-50"
                  }`}
                >
                  °C
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToolResult
        title="Results"
        items={[
          {
            label: "Pressure altitude",
            value: `${results.pressureAltitudeFt.toLocaleString()} ft`,
          },
          {
            label: "Density altitude",
            value: `${results.densityAltitudeFt.toLocaleString()} ft`,
            highlight: true,
          },
          {
            label: "ISA deviation",
            value: `${results.isaDeviationF > 0 ? "+" : ""}${results.isaDeviationF}°F`,
          },
        ]}
        caution={
          results.caution
            ? `Density altitude is above 6,500 ft. Expect reduced climb performance and longer takeoff distance. Verify with your POH.`
            : undefined
        }
      />
    </div>
  );
}
