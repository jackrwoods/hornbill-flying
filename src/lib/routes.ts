import type { Instructor, NavItem, RouteMeta } from "@/types";

/**
 * Canonical URL for the instructors index page.
 */
export const INSTRUCTORS_INDEX = "/instructors/";

/**
 * Canonical path for the 404 page.
 */
export const NOT_FOUND_ROUTE = "/404/";

/**
 * Builds the detail-page URL for a given instructor slug.
 */
export function getInstructorDetailUrl(slug: string): string {
  return `/instructors/${slug}/`;
}

/**
 * Returns RouteMeta entries for each published instructor detail page.
 * These are merged into the sitemap independently of the index page.
 */
export function getInstructorRoutes(instructors: Instructor[]): RouteMeta[] {
  return instructors
    .filter((i) => i.published)
    .map((i) => ({
      slug: i.slug,
      label: i.name,
      href: getInstructorDetailUrl(i.slug),
      published: true,
      changefreq: "monthly" as const,
      priority: 0.6,
    }));
}

export const routeMap: RouteMeta[] = [
  {
    slug: "home",
    label: "Home",
    href: "/",
    published: true,
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    slug: "discovery-flight",
    label: "Discovery Flight",
    href: "/discovery-flight/",
    published: true,
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    slug: "programs",
    label: "Programs",
    href: "/programs/",
    published: true,
    changefreq: "monthly",
    priority: 0.8,
    children: [
      {
        slug: "sport-pilot",
        label: "Sport Pilot",
        href: "/programs/sport-pilot/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "private-pilot",
        label: "Private Pilot",
        href: "/programs/private-pilot/",
        published: true,
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        slug: "instrument-rating",
        label: "Instrument Rating",
        href: "/programs/instrument-rating/",
        published: true,
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        slug: "commercial-pilot",
        label: "Commercial Pilot",
        href: "/programs/commercial-pilot/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "certified-flight-instructor",
        label: "Certified Flight Instructor (CFI)",
        href: "/programs/certified-flight-instructor/",
        published: true,
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        slug: "cfii",
        label: "CFII",
        href: "/programs/cfii/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "mountain-flying",
        label: "Mountain Flying",
        href: "/programs/mountain-flying/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
    ],
  },
  {
    slug: "fleet",
    label: "Fleet & Pricing",
    href: "/fleet/",
    published: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    slug: "membership",
    label: "Membership",
    href: "/membership/",
    published: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    slug: "instructors",
    label: "Instructors",
    href: "/instructors/",
    published: true,
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    slug: "cross-country-rentals",
    label: "Cross-Country / Rentals",
    href: "/cross-country-rentals/",
    published: false,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "location",
    label: "Location",
    href: "/location/",
    published: false,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "about",
    label: "About",
    href: "/about/",
    published: false,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "financing",
    label: "Financing",
    href: "/financing/",
    published: true,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "faq",
    label: "FAQ",
    href: "/faq/",
    published: false,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "blog",
    label: "Blog",
    href: "/blog/",
    published: true,
    changefreq: "weekly",
    priority: 0.7,
    children: [
      {
        slug: "flight-training-reno-nv",
        label: "Flight training in Reno, NV",
        href: "/blog/flight-training-reno-nv/",
        published: true,
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        slug: "private-pilot-license-cost-nevada",
        label: "Private Pilot license cost in Nevada",
        href: "/blog/private-pilot-license-cost-nevada/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "part-61-vs-part-141",
        label: "Part 61 vs Part 141",
        href: "/blog/part-61-vs-part-141/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "first-discovery-flight-rno",
        label: "First discovery flight at RNO",
        href: "/blog/first-discovery-flight-rno/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "mountain-flying-sierra-nevada",
        label: "Mountain flying in the Sierra Nevada",
        href: "/blog/mountain-flying-sierra-nevada/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "density-altitude-krno",
        label: "Density altitude at KRNO",
        href: "/blog/density-altitude-krno/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "medical-certificate-student-pilots",
        label: "Medical certificate guide for student pilots",
        href: "/blog/medical-certificate-student-pilots/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        slug: "ppl-timeline-part-time-vs-full-time",
        label: "PPL timeline: part-time vs full-time",
        href: "/blog/ppl-timeline-part-time-vs-full-time/",
        published: true,
        changefreq: "monthly",
        priority: 0.7,
      },
    ],
  },
  {
    slug: "tools",
    label: "Pilot Tools",
    href: "/tools/",
    published: true,
    changefreq: "weekly",
    priority: 0.7,
    children: [
      {
        slug: "metar",
        label: "KRNO METAR & TAF",
        href: "/tools/metar/",
        published: true,
        changefreq: "hourly",
        priority: 0.6,
      },
      {
        slug: "density-altitude",
        label: "Density Altitude Calculator",
        href: "/tools/density-altitude/",
        published: true,
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        slug: "cross-country-estimator",
        label: "Cross-Country Estimator",
        href: "/tools/cross-country-estimator/",
        published: true,
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        slug: "sunrise-sunset",
        label: "RNO Sunrise & Sunset",
        href: "/tools/sunrise-sunset/",
        published: true,
        changefreq: "weekly",
        priority: 0.6,
      },
      {
        slug: "practice-area-map",
        label: "Practice Area Map",
        href: "/tools/practice-area-map/",
        published: true,
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        slug: "cost-estimator",
        label: "Flight Training Cost Estimator",
        href: "/tools/cost-estimator/",
        published: true,
        changefreq: "monthly",
        priority: 0.6,
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    href: "/contact/",
    published: true,
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    slug: "book",
    label: "Book",
    href: "/book/",
    published: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    slug: "gift-voucher",
    label: "Gift Voucher",
    href: "/gift-voucher/",
    published: false,
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    slug: "student-resources",
    label: "Student Resources",
    href: "/student-resources/",
    published: true,
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    slug: "privacy",
    label: "Privacy Policy",
    href: "/privacy/",
    published: true,
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    slug: "terms",
    label: "Terms of Service",
    href: "/terms/",
    published: true,
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    slug: "cancellation-policy",
    label: "Cancellation / Refund Policy",
    href: "/cancellation-policy/",
    published: true,
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    slug: "not-found",
    label: "Page Not Found",
    href: NOT_FOUND_ROUTE,
    published: false,
    changefreq: "yearly",
    priority: 0.0,
  },
];

/**
 * Flattens the route map into a single list of published routes.
 */
export function getPublishedRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  for (const route of routeMap) {
    if (route.published) routes.push(route);
    if (route.children) {
      for (const child of route.children) {
        if (child.published) routes.push(child);
      }
    }
  }
  return routes;
}

/**
 * Returns navigation items for the main header, including the Programs dropdown.
 */
export function getHeaderNav(): NavItem[] {
  const programsGroup = routeMap.find((r) => r.slug === "programs");
  const programsChildren = programsGroup?.children
    ?.filter((c) => c.published)
    .map((c) => ({
      label: c.label,
      href: c.href,
    }));

  return [
    {
      label: "Programs",
      href: "/programs/",
      children: programsChildren || [],
    },
    { label: "Fleet & Pricing", href: "/fleet/" },
    { label: "Membership", href: "/membership/" },
    { label: "Instructors", href: "/instructors/" },
    { label: "Blog", href: "/blog/" },
  ];
}

/**
 * Stable hrefs for common CTAs. Used by components and content files that
 * need route keys rather than hard-coded URLs.
 */
export const routeHrefs = {
  home: "/",
  discoveryFlight: "/discovery-flight/",
  programsIndex: "/programs/",
  privatePilot: "/programs/private-pilot/",
  fleet: "/fleet/",
  instructors: "/instructors/",
  location: "/location/",
  blog: "/blog/",
  contact: "/contact/",
  notFound: NOT_FOUND_ROUTE,
} as const;

export type RouteKey = keyof typeof routeHrefs;

/**
 * Returns footer quick-link groups.
 */
export function getFooterLinks(): { title: string; links: NavItem[] }[] {
  return [
    {
      title: "Fly",
      links: [
        { label: "Discovery Flight", href: "/discovery-flight/" },
        { label: "Programs", href: "/programs/" },
        { label: "Commercial Pilot", href: "/programs/commercial-pilot/" },
        { label: "CFII", href: "/programs/cfii/" },
        { label: "Mountain Flying", href: "/programs/mountain-flying/" },
        { label: "Fleet & Pricing", href: "/fleet/" },
        { label: "Membership", href: "/membership/" },
        { label: "Financing", href: "/financing/" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Instructors", href: "/instructors/" },
        { label: "Discovery Flight", href: "/discovery-flight/" },
        { label: "Blog", href: "/blog/" },
        { label: "Student Resources", href: "/student-resources/" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Blog", href: "/blog/" },
        { label: "Pilot tools", href: "/tools/" },
        { label: "Contact", href: "/contact/" },
        { label: "Student Resources", href: "/student-resources/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy/" },
        { label: "Terms of Service", href: "/terms/" },
        { label: "Cancellation / Refund Policy", href: "/cancellation-policy/" },
      ],
    },
  ];
}
