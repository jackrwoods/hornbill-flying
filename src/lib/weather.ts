import type { MetarData, TafData, TafPeriod } from "./tools";

const NOAA_METAR_URL = "https://aviationweather.gov/api/data/metar?ids=KRNO&format=json";
const NOAA_TAF_URL = "https://aviationweather.gov/api/data/taf?ids=KRNO&format=json";
const STATION = "KRNO";
const CACHE_TTL_MS = 60_000;

interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

let metarCache: CacheEntry<MetarData> | null = null;
let tafCache: CacheEntry<TafData> | null = null;

/**
 * Fetches current METAR for KRNO from Aviation Weather Center, with a short
 * in-memory cache and a fallback to the Hornbill API proxy if CORS fails.
 */
export async function fetchMetar(): Promise<MetarData> {
  const now = Date.now();
  if (metarCache && now - metarCache.fetchedAt < CACHE_TTL_MS) {
    return metarCache.data;
  }

  const data = await fetchWithFallback<MetarData>(
    NOAA_METAR_URL,
    "metar",
    parseMetarResponse
  );

  metarCache = { data, fetchedAt: now };
  return data;
}

/**
 * Fetches the current TAF for KRNO from Aviation Weather Center.
 */
export async function fetchTaf(): Promise<TafData> {
  const now = Date.now();
  if (tafCache && now - tafCache.fetchedAt < CACHE_TTL_MS) {
    return tafCache.data;
  }

  const data = await fetchWithFallback<TafData>(
    NOAA_TAF_URL,
    "taf",
    parseTafResponse
  );

  tafCache = { data, fetchedAt: now };
  return data;
}

/**
 * Clears cached weather data so the next call fetches fresh reports.
 */
export function clearWeatherCache(): void {
  metarCache = null;
  tafCache = null;
}

/**
 * Returns the proxy URL if NEXT_PUBLIC_API_BASE_URL is configured.
 */
function getProxyUrl(type: "metar" | "taf"): string | undefined {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return undefined;
  return `${base.replace(/\/$/, "")}/api/weather?type=${type}&station=${STATION}`;
}

async function fetchWithFallback<T>(
  noaaUrl: string,
  type: "metar" | "taf",
  parse: (json: unknown) => T
): Promise<T> {
  let lastError: unknown;

  try {
    const res = await fetch(noaaUrl);
    if (res.ok) {
      const json = await res.json();
      return parse(json);
    }
    lastError = new Error(`NOAA returned ${res.status}`);
  } catch (err) {
    lastError = err;
  }

  const proxyUrl = getProxyUrl(type);
  if (proxyUrl) {
    try {
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const json = await res.json();
        return parse(json);
      }
      lastError = new Error(`Proxy returned ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Unable to load ${type.toUpperCase()} for ${STATION}.`);
}

function parseMetarResponse(json: unknown): MetarData {
  const reports = Array.isArray(json) ? json : [json];
  const report = reports.find(
    (r: Record<string, unknown>) =>
      typeof r.icaoId === "string" && r.icaoId.toUpperCase() === STATION
  ) as Record<string, unknown> | undefined;

  if (!report) {
    return {
      raw: "No METAR available for KRNO.",
      station: STATION,
      observationTime: "",
      wind: "—",
      visibility: "—",
      ceiling: "—",
      clouds: "—",
      temperature: "—",
      dewpoint: "—",
      altimeter: "—",
    };
  }

  const raw = String(report.rawOb || report.raw || "");
  const wdir = normalizeNumber(report.wdir);
  const wspd = normalizeNumber(report.wspd);
  const wind = wdir != null && wspd != null ? `${formatWindDir(wdir)} at ${wspd} kt` : "—";

  const visib = report.visib != null ? String(report.visib) : "—";
  const clouds = parseClouds(report.clouds);
  const ceiling = report.ceil != null ? `${report.ceil} ft` : "—";

  const temp = report.temp != null ? `${Math.round(Number(report.temp))}°C` : "—";
  const dewp = report.dewp != null ? `${Math.round(Number(report.dewp))}°C` : "—";

  const altim = report.altim != null ? `${report.altim} hPa` : "—";

  const obsTime =
    report.reportTime && typeof report.reportTime === "string"
      ? report.reportTime
      : "";

  return {
    raw,
    station: STATION,
    observationTime: obsTime,
    wind,
    visibility: `${visib} SM`,
    ceiling,
    clouds,
    temperature: temp,
    dewpoint: dewp,
    altimeter: altim,
  };
}

function parseTafResponse(json: unknown): TafData {
  const reports = Array.isArray(json) ? json : [json];
  const report = reports.find(
    (r: Record<string, unknown>) =>
      typeof r.icaoId === "string" && r.icaoId.toUpperCase() === STATION
  ) as Record<string, unknown> | undefined;

  if (!report) {
    return {
      raw: "No TAF available for KRNO.",
      station: STATION,
      issued: "",
      periods: [],
    };
  }

  const raw = String(report.rawTAF || report.raw || "");
  const issued =
    typeof report.issueTime === "string" ? report.issueTime : "";
  const periods: TafPeriod[] = [];

  const forecast = Array.isArray(report.forecast) ? report.forecast : [];
  for (const f of forecast) {
    const from =
      typeof f.validTimeFrom === "number"
        ? formatTimestamp(f.validTimeFrom)
        : String(f.validTimeFrom || "");
    const to =
      typeof f.validTimeTo === "number"
        ? formatTimestamp(f.validTimeTo)
        : String(f.validTimeTo || "");
    const summary = buildTafPeriodSummary(f);
    periods.push({
      raw: String(f.raw || ""),
      from,
      to,
      summary,
    });
  }

  return {
    raw,
    station: STATION,
    issued,
    periods,
  };
}

function parseClouds(clouds: unknown): string {
  if (!Array.isArray(clouds) || clouds.length === 0) {
    return "Sky clear";
  }

  return clouds
    .map((c: Record<string, unknown>) => {
      const cover = String(c.cover || "").toUpperCase();
      const base = c.base != null ? `${c.base} ft` : "";
      if (!cover) return base;
      return base ? `${cover} ${base}` : cover;
    })
    .join(", ");
}

function buildTafPeriodSummary(f: Record<string, unknown>): string {
  const parts: string[] = [];

  const wdir = normalizeNumber(f.wdir);
  const wspd = normalizeNumber(f.wspd);
  if (wdir != null && wspd != null) {
    parts.push(`${formatWindDir(wdir)} at ${wspd} kt`);
  }

  if (f.visib != null) {
    parts.push(`visibility ${String(f.visib)} SM`);
  }

  const clouds = parseClouds(f.clouds);
  if (clouds && clouds !== "Sky clear") {
    parts.push(clouds);
  }

  const wx = f.wxString ? String(f.wxString) : "";
  if (wx) {
    parts.push(`weather: ${wx}`);
  }

  return parts.join("; ") || "No significant weather.";
}

function normalizeNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatWindDir(deg: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(((deg % 360) / 22.5)) % 16;
  return `${directions[index]} (${deg}°)`;
}

function formatTimestamp(seconds: number): string {
  const d = new Date(seconds * 1000);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
