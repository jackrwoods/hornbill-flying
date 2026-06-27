import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://hornbillaviation.com",
  brandName: "Hornbill Aviation",
  tagline: "Built around how you learn best.",
  nap: {
    name: "Hornbill Aviation",
    streetAddress: "1008 Gentry Way",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89512",
    addressCountry: "US",
    telephone: "+1-555-555-1234",
    telephoneFormatted: "555-555-1234",
    email: "office@hornbillaviation.com",
    geo: {
      latitude: 39.4991,
      longitude: -119.7681,
    },
  },
  priceRange: "$$",
  // TODO: data ticket — confirm actual office hours.
  officeHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  // Display hours used on the contact page and location page.
  contactHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  social: {
    googleBusinessProfile: "https://maps.google.com/?q=Hornbill+Aviation",
    facebook: undefined,
    instagram: undefined,
    linkedin: undefined,
    youtube: undefined,
  },
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  },
  pricing: {
    membershipMonthly: 59,
    memberWetRate: 159,
    nonMemberWetRate: 179,
    discoveryFlight: 199,
  },
  // Map embed URL (OpenStreetMap iframe) centered on RNO / 1008 Gentry Way.
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-119.7781%2C39.4891%2C-119.7581%2C39.5091&layer=mapnik&marker=39.4991%2C-119.7681",
  // External directions link opened by "Get directions" CTAs.
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1008+Gentry+Way%2C+Reno%2C+NV+89512",
  // Backend endpoint for contact-form submissions. Empty until the custom API ships.
  contactFormEndpoint: "",
  // Optional reCAPTCHA or hCaptcha site key. Leave undefined until configured.
  recaptchaSiteKey: undefined,
};

export const BOOKING_ROUTES = {
  discoveryFlight: "/book/?flow=discovery",
  book: "/book/",
  giftVoucher: "/book/?flow=discovery&type=gift",
};

export const PROGRAMS_ROUTE_PREFIX = "/programs/";
export const INSTRUCTORS_ROUTE_PREFIX = "/instructors/";
export const BLOG_ROUTE_PREFIX = "/blog/";
