import type { DensityInputs, DensityResults } from "./tools";

export const RNO_ELEVATION_FT = 4403;
export const STANDARD_ALTIMETER_INHG = 29.92;
export const ISA_SEA_LEVEL_TEMP_F = 59;
export const ISA_LAPSE_RATE_F_PER_1000FT = 2;
export const DENSITY_CAUTION_THRESHOLD_FT = 6500;

/**
 * Converts Fahrenheit to Celsius.
 */
export function fToC(f: number): number {
  return ((f - 32) * 5) / 9;
}

/**
 * Converts Celsius to Fahrenheit.
 */
export function cToF(c: number): number {
  return (c * 9) / 5 + 32;
}

/**
 * Calculates pressure altitude from field elevation and altimeter setting.
 */
export function pressureAltitude(elevationFt: number, altimeterInHg: number): number {
  return elevationFt + (STANDARD_ALTIMETER_INHG - altimeterInHg) * 1000;
}

/**
 * Calculates ISA temperature at a given pressure altitude.
 */
export function isaTempAtAltitude(pressureAltFt: number): number {
  return ISA_SEA_LEVEL_TEMP_F - (pressureAltFt / 1000) * ISA_LAPSE_RATE_F_PER_1000FT;
}

/**
 * Estimates density altitude from the given inputs.
 *
 * Uses the approximation:
 *   DA ≈ PA + 120 ft × (OAT − ISA) per 1,000 ft pressure altitude correction,
 * simplified to a constant 120 ft per °F above standard.
 */
export function calculateDensityAltitude(inputs: DensityInputs): DensityResults {
  const pa = pressureAltitude(inputs.elevationFt, inputs.altimeterInHg);
  const isaTemp = isaTempAtAltitude(pa);
  const isaDeviation = inputs.temperatureF - isaTemp;
  const da = pa + isaDeviation * 120;

  return {
    pressureAltitudeFt: Math.round(pa),
    densityAltitudeFt: Math.round(da),
    isaDeviationF: Math.round(isaDeviation * 10) / 10,
    caution: da > DENSITY_CAUTION_THRESHOLD_FT,
  };
}
