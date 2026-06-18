import type { FuelInputs, FuelResults, SampleRoute } from "./tools";

export const NM_PER_DEGREE_LAT = 60.0;

export interface AirportCoords {
  lat: number;
  lon: number;
  name: string;
}

/**
 * Table of airport coordinates used by the fuel estimator.
 * Coordinates are approximate for planning only.
 */
export const airportCoordinates: Record<string, AirportCoords> = {
  RNO: { lat: 39.4991, lon: -119.7681, name: "Reno–Tahoe" },
  KRNO: { lat: 39.4991, lon: -119.7681, name: "Reno–Tahoe" },
  KTVL: { lat: 38.8936, lon: -119.9966, name: "Lake Tahoe" },
  KMRY: { lat: 36.587, lon: -121.8429, name: "Monterey" },
  KBDN: { lat: 44.0946, lon: -121.2002, name: "Bend" },
  KRTS: { lat: 39.668, lon: -119.8758, name: "Reno Stead" },
  KMLC: { lat: 39.2003, lon: -119.9511, name: "Minden" },
  KLOL: { lat: 40.0734, lon: -118.9561, name: "Lovelock" },
  KSPZ: { lat: 39.403, lon: -119.2511, name: "Sparks" },
  KTRK: { lat: 39.32, lon: -120.1396, name: "Truckee" },
};

const R = 3440.065; // Earth radius in nautical miles

/**
 * Converts degrees to radians.
 */
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculates great-circle distance in nautical miles between two coordinates.
 */
export function greatCircleDistanceNm(a: AirportCoords, b: AirportCoords): number {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return R * c;
}

/**
 * Normalizes an airport identifier to uppercase and strips the leading "K"
 * if a matching coordinate is found without it.
 */
function normalizeAirport(id: string): string {
  const upper = id.trim().toUpperCase();
  if (airportCoordinates[upper]) return upper;
  if (upper.startsWith("K") && airportCoordinates[upper.slice(1)]) {
    return upper.slice(1);
  }
  return upper;
}

/**
 * Looks up an airport by identifier, returning coordinates or undefined.
 */
export function getAirport(id: string): AirportCoords | undefined {
  return airportCoordinates[normalizeAirport(id)];
}

/**
 * Estimates straight-line distance, time, and fuel for a VFR cross-country.
 *
 * The wind component is signed: positive is a headwind, negative is a tailwind.
 * Time is based on straight-line distance and does not include climb/descent or
 * routing around terrain.
 */
export function estimateFuelAndTime(inputs: FuelInputs): FuelResults {
  const origin = getAirport(inputs.origin);
  const destination = getAirport(inputs.destination);

  if (!origin) {
    return { ...emptyResults(), error: `Origin "${inputs.origin}" not found in the route table.` };
  }
  if (!destination) {
    return {
      ...emptyResults(),
      error: `Destination "${inputs.destination}" not found. Try KTVL, KMRY, KBDN, or another identifier from the list.`,
    };
  }

  const distanceNm = greatCircleDistanceNm(origin, destination);
  const groundSpeedKt = Math.max(20, inputs.cruiseSpeedKt - inputs.windComponentKt);
  const timeHours = distanceNm / groundSpeedKt;
  const fuelGallons = timeHours * inputs.fuelBurnGph;
  const reserveGallons = inputs.fuelBurnGph * 0.5; // 30-minute day VFR reserve
  const totalFuelGallons = fuelGallons + reserveGallons;

  return {
    distanceNm: Math.round(distanceNm * 10) / 10,
    groundSpeedKt: Math.round(groundSpeedKt),
    timeHours,
    timeDisplay: formatHours(timeHours),
    fuelGallons: Math.round(fuelGallons * 10) / 10,
    reserveGallons: Math.round(reserveGallons * 10) / 10,
    totalFuelGallons: Math.round(totalFuelGallons * 10) / 10,
  };
}

function emptyResults(): FuelResults {
  return {
    distanceNm: 0,
    groundSpeedKt: 0,
    timeHours: 0,
    timeDisplay: "—",
    fuelGallons: 0,
    reserveGallons: 0,
    totalFuelGallons: 0,
  };
}

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m} min`;
  return `${h} h ${m} min`;
}

/**
 * Pre-loaded sample routes shown in the cross-country estimator.
 */
export const sampleRoutes: SampleRoute[] = [
  {
    name: "RNO → Tahoe",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KTVL",
    destinationName: "Lake Tahoe",
  },
  {
    name: "RNO → Monterey",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KMRY",
    destinationName: "Monterey",
  },
  {
    name: "RNO → Bend",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KBDN",
    destinationName: "Bend",
  },
];

/**
 * Returns the available airport identifiers in the route table.
 */
export function getAirportList(): string[] {
  return Object.keys(airportCoordinates);
}
