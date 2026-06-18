import { getTimes } from "suncalc";
import { siteConfig } from "./config";
import type { SolarResults } from "./tools";

export const RNO_LATITUDE = siteConfig.nap.geo.latitude;
export const RNO_LONGITUDE = siteConfig.nap.geo.longitude;

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Los_Angeles",
};

/**
 * Calculates sunrise, sunset, civil twilight, and training-slot limits for RNO
 * on a given date. Defaults to today.
 */
export function getRnoSolarTimes(dateInput?: string | Date): SolarResults {
  const date = parseDateInput(dateInput);
  const times = getTimes(date, RNO_LATITUDE, RNO_LONGITUDE);

  const sunrise = formatTime(times.sunrise);
  const sunset = formatTime(times.sunset);
  const dawn = formatTime(times.dawn);
  const dusk = formatTime(times.dusk);

  // Earliest reasonable morning slot: civil dawn + 30 minutes.
  const earliestTrainingDate = addMinutes(times.dawn, 30);
  const earliestTrainingSlot = formatTime(earliestTrainingDate);

  // Last legal evening flight for VFR landings without night currency:
   // end of evening civil twilight.
  const lastLegalEveningFlight = dusk;

  return {
    date: toIsoDate(date),
    sunrise,
    sunset,
    dawn,
    dusk,
    earliestTrainingSlot,
    lastLegalEveningFlight,
  };
}

function parseDateInput(input?: string | Date): Date {
  if (input instanceof Date) return input;
  if (typeof input === "string" && input.includes("-")) {
    const [year, month, day] = input.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date();
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", DATE_FORMAT);
}

function addMinutes(d: Date, minutes: number): Date {
  return new Date(d.getTime() + minutes * 60 * 1000);
}

function toIsoDate(d: Date): string {
  const tz = d.toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
  return tz;
}
