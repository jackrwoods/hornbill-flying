import type { Metadata } from "next";
import { siteConfig } from "./config";
import { absoluteUrl } from "./utils";

const TITLE_TEMPLATE = "%s | Hornbill Aviation";
const DEFAULT_TITLE_SEGMENT = "Part 61 flight school in Reno, NV";
const DEFAULT_DESCRIPTION =
  "Train with a Part 61 flight school at Reno-Tahoe (RNO). Choose your instructor, fly a consistent PA28 fleet, and book a discovery flight today.";

/**
 * Builds a full page title using the site template.
 */
export function buildTitle(segment?: string): string {
  const title = segment || DEFAULT_TITLE_SEGMENT;
  return TITLE_TEMPLATE.replace("%s", title);
}

/**
 * Builds an absolute canonical URL for a given path.
 */
export function buildCanonical(path: string): string {
  return absoluteUrl(path, siteConfig.baseUrl);
}

/**
 * Builds OpenGraph metadata for a page.
 */
export function buildOpenGraph(
  overrides?: Partial<Metadata["openGraph"]>
): Metadata["openGraph"] {
  const defaultImage = {
    url: absoluteUrl("/opengraph-default.jpg", siteConfig.baseUrl),
    width: 1200,
    height: 630,
    alt: `${siteConfig.brandName} — Part 61 flight school in Reno, NV`,
  };

  return {
    type: "website",
    siteName: siteConfig.brandName,
    locale: "en_US",
    images: [defaultImage],
    ...overrides,
  };
}

/**
 * Builds Twitter card metadata for a page.
 */
export function buildTwitter(
  overrides?: Partial<Metadata["twitter"]>
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    images: [absoluteUrl("/opengraph-default.jpg", siteConfig.baseUrl)],
    ...overrides,
  };
}

/**
 * Returns the default meta description.
 */
export function getDefaultDescription(): string {
  return DEFAULT_DESCRIPTION;
}

/**
 * Builds metadata for the 404 page. Callers should still set a canonical
 * and OpenGraph/Twitter overrides because the host is expected to serve
 * this page with a 404 HTTP status.
 */
export function buildNotFoundMetadata(): Metadata {
  return {
    title: buildTitle("Page Not Found"),
    description:
      "That route is not in our flight plan. Return to Hornbill Aviation home, book a discovery flight, or view our programs.",
  };
}
