"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/config";

interface SiteSearchFormProps {
  label: string;
  placeholder: string;
  buttonLabel: string;
  domain?: string;
  className?: string;
}

function getSearchDomain(): string {
  return siteConfig.baseUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
}

/**
 * Lightweight client-side search form that redirects to Google with a
 * `site:` operator. No backend call is made.
 */
export function SiteSearchForm({
  label,
  placeholder,
  buttonLabel,
  domain = getSearchDomain(),
  className,
}: SiteSearchFormProps) {
  const [query, setQuery] = React.useState("");
  const inputId = React.useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const q = encodeURIComponent(trimmed);
    window.location.href = `https://www.google.com/search?q=site:${domain}%20${q}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      role="search"
      aria-label={label}
    >
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-body"
      >
        {label}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-body placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-focus-ring"
          required
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}
