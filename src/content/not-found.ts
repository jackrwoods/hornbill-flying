import { routeHrefs } from "@/lib/routes";

/**
 * Copy and route keys for the 404 page.
 *
 * Keeping the copy here makes it easy to update the friendly, on-brand
 * messaging without touching markup or metadata strings in multiple files.
 */
export const notFoundCopy = {
  metaTitle: "Page Not Found",
  metaDescription:
    "That route is not in our flight plan. Return to Hornbill Flight Center home, book a discovery flight, or view our programs.",
  headline: "Page not found",
  subheadline: "That route is not in our flight plan.",
  body: "You may have mistyped the URL or the page has moved. Try a search, or choose one of the links below to get back on course.",
  searchLabel: "Search the site",
  searchPlaceholder: "e.g., discovery flight, private pilot, fleet",
  searchButton: "Search",
  searchDomain: "hornbillaviation.com",
  quickLinksHeading: "Popular pages",
  allProgramsLabel: "All programs",
  phonePrompt: "Or call us at",
  sitemapLinkText: "See all pages on our sitemap.",
  primaryCTAs: [
    { label: "Home", routeKey: "home", icon: "home" as const },
    {
      label: "Book a discovery flight",
      routeKey: "discoveryFlight",
      icon: "aircraft" as const,
      ctaLink: true as const,
    },
    { label: "View programs", routeKey: "privatePilot", icon: "programs" as const },
    { label: "Contact us", routeKey: "contact", icon: "contact" as const },
  ],
  secondaryCTAs: [
    { label: "Fleet & Pricing", routeKey: "fleet", icon: "fleet" as const },
    { label: "Instructors", routeKey: "instructors", icon: "instructors" as const },
    { label: "Location", routeKey: "location", icon: "location" as const },
    { label: "Blog", routeKey: "blog", icon: "blog" as const },
  ],
};

/**
 * Map route keys from the content file to stable hrefs from routes.ts.
 */
export const notFoundRoutes = {
  ...routeHrefs,
  allPrograms: "/",
};

export type NotFoundIcon =
  | "home"
  | "aircraft"
  | "programs"
  | "contact"
  | "fleet"
  | "instructors"
  | "location"
  | "blog";
