import type { FAQItem } from "@/types";

export type ToolFAQItem = FAQItem;

export interface ToolMeta {
  slug: string;
  title: string;
  shortDescription: string;
  href: string;
  icon: string;
}

export interface SampleRoute {
  name: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
}

export interface DensityInputs {
  elevationFt: number;
  altimeterInHg: number;
  temperatureF: number;
}

export interface DensityResults {
  pressureAltitudeFt: number;
  densityAltitudeFt: number;
  isaDeviationF: number;
  caution: boolean;
}

export interface FuelInputs {
  origin: string;
  destination: string;
  cruiseSpeedKt: number;
  fuelBurnGph: number;
  windComponentKt: number;
}

export interface FuelResults {
  distanceNm: number;
  groundSpeedKt: number;
  timeHours: number;
  timeDisplay: string;
  fuelGallons: number;
  reserveGallons: number;
  totalFuelGallons: number;
  error?: string;
}

export interface SolarResults {
  date: string;
  sunrise: string;
  sunset: string;
  dawn: string;
  dusk: string;
  earliestTrainingSlot: string;
  lastLegalEveningFlight: string;
}

export interface CostInputs {
  programSlug: string;
  hoursPerWeek: number;
  isMember: boolean;
  instructorRate: number;
}

export interface CostLineItem {
  label: string;
  low: number;
  high: number;
}

export interface CostResults {
  lowTotal: number;
  highTotal: number;
  weeksLow: number;
  weeksHigh: number;
  lineItems: CostLineItem[];
}

export interface CostProgram {
  slug: string;
  title: string;
  minFlightHours: number;
  maxFlightHours: number;
  groundHours: number;
  examFees: number;
}

export interface MetarData {
  raw: string;
  station: string;
  observationTime: string;
  wind: string;
  visibility: string;
  ceiling: string;
  clouds: string;
  temperature: string;
  dewpoint: string;
  altimeter: string;
  flightCategory?: string;
}

export interface TafPeriod {
  raw: string;
  from: string;
  to: string;
  summary: string;
}

export interface TafData {
  raw: string;
  station: string;
  issued: string;
  periods: TafPeriod[];
}
