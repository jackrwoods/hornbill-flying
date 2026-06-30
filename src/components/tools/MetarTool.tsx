"use client";

import { useEffect, useState } from "react";
import { fetchMetar, clearWeatherCache } from "@/lib/weather";
import type { MetarData } from "@/lib/tools";

export function MetarTool() {
  const [metar, setMetar] = useState<MetarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMetar();
      setMetar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load METAR.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRefresh = () => {
    clearWeatherCache();
    load();
  };

  return (
    <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl text-navy-900">Current METAR</h3>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-navy-800/20 px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-sand-50 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={loading ? "animate-spin" : ""}
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
          </svg>
          Refresh
        </button>
      </div>

      {loading && <p className="mt-4 text-sm text-ink-light">Loading METAR...</p>}

      {error && (
        <div className="mt-4 rounded-lg bg-error/10 p-4 text-sm text-error">
          <p>{error}</p>
          <p className="mt-2">
            Try the{" "}
            <a
              href="https://aviationweather.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-navy-900"
            >
              Aviation Weather Center
            </a>{" "}
            for the official briefing.
          </p>
        </div>
      )}

      {metar && !loading && (
        <div className="mt-4 grid gap-4">
          <div className="rounded-lg bg-sand-50 p-4">
            <p className="font-mono text-sm font-medium text-navy-900">{metar.raw || "No raw report available."}</p>
            {metar.observationTime && (
              <p className="mt-1 text-xs text-ink-light">Observed {metar.observationTime}</p>
            )}
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-navy-800/10 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">Wind</dt>
              <dd className="mt-1 font-mono text-ink">{metar.wind}</dd>
            </div>
            <div className="rounded-lg border border-navy-800/10 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">Visibility</dt>
              <dd className="mt-1 font-mono text-ink">{metar.visibility}</dd>
            </div>
            <div className="rounded-lg border border-navy-800/10 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">Ceiling / clouds</dt>
              <dd className="mt-1 font-mono text-ink">{metar.ceiling} / {metar.clouds}</dd>
            </div>
            <div className="rounded-lg border border-navy-800/10 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">Temp / dewpoint</dt>
              <dd className="mt-1 font-mono text-ink">{metar.temperature} / {metar.dewpoint}</dd>
            </div>
            <div className="rounded-lg border border-navy-800/10 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">Altimeter</dt>
              <dd className="mt-1 font-mono text-ink">{metar.altimeter}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
