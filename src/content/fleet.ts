import type { Aircraft, FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const { membershipMonthly, memberWetRate, nonMemberWetRate, discoveryFlight } =
  siteConfig.pricing;

export const aircraft: Aircraft[] = [
  {
    tail: "N6576J",
    slug: "n6576j",
    engine: "180 HP Lycoming",
    avionics: ["Dual Garmin G5 units", "WAAS Garmin 375 GPS"],
    notes: "Cruise prop for efficient IFR cross-country flying.",
    photo: "/images/fleet/n6576j.webp",
    photoAlt:
      "PA28 Cherokee N6576J on the ramp at Reno-Tahoe International Airport (RNO).",
    ifrEquipped: true,
    crossCountryReady: true,
  },
  {
    tail: "N7824W",
    slug: "n7824w",
    engine: "180 HP Lycoming",
    avionics: ["Dual Garmin G5 units", "WAAS Garmin 480 GPS"],
    notes: "Set up for performance around the mountains.",
    photo: "/images/fleet/n7824w.webp",
    photoAlt:
      "PA28 Cherokee N7824W on the ramp at Reno-Tahoe International Airport (RNO).",
    ifrEquipped: true,
    crossCountryReady: true,
  },
  {
    tail: "N7969W",
    slug: "n7969w",
    engine: "180 HP Lycoming",
    avionics: ["VFR panel"],
    notes: "Training and local rental workhorse.",
    photo: "/images/fleet/n7969w.webp",
    photoAlt:
      "PA28 Cherokee N7969W on the ramp at Reno-Tahoe International Airport (RNO).",
    ifrEquipped: false,
    crossCountryReady: false,
  },
  {
    tail: "N0001J",
    slug: "n0001j",
    engine: "180 HP Lycoming",
    avionics: ["VFR panel"],
    notes: "Training and local rental workhorse.",
    photo: "/images/fleet/n0001j.webp",
    photoAlt:
      "PA28 Cherokee N0001J on the ramp at Reno-Tahoe International Airport (RNO).",
    ifrEquipped: false,
    crossCountryReady: false,
  },
];

export const membershipRates = {
  monthly: membershipMonthly,
  memberRate: memberWetRate,
  nonMemberRate: nonMemberWetRate,
  savingsPerHour: nonMemberWetRate - memberWetRate,
  breakEvenHours: Number(
    (membershipMonthly / (nonMemberWetRate - memberWetRate)).toFixed(1)
  ),
};

export const instructorRate = {
  // TODO: confirm with operations; set to a number once the hourly CFI rate is finalized.
  hourly: null as number | null,
  note: "Ground and flight instruction billed separately from aircraft rental.",
};

export const discoveryFlightPricing = {
  price: discoveryFlight,
  duration: "45–60 minutes",
  deposit: "No deposit required.",
  includes: [
    "Pre-flight briefing",
    "Hands-on time at the controls",
    "Post-flight debrief",
  ],
};

export const financing = {
  partner: "Stratus Financial",
  description:
    "Stratus Financial offers loans built for flight training. Qualified students can cover certificates, ratings, aircraft rental, instructor time, and checkride costs.",
  applyUrl: "https://stratusfinancial.com/",
  pageUrl: "/financing/",
};

export const cancellationPolicy = {
  text: "Discovery flights and rentals can be cancelled or rescheduled with at least 24 hours' notice. No-shows may be charged the full booking amount. Refunds are processed to the original payment method within 5–10 business days.",
};

export const fleetFAQs: FAQItem[] = [
  {
    id: "wet-rate",
    question: 'What does "wet rate" mean?',
    answer:
      "A wet rate includes fuel and oil. You pay one hourly price for the aircraft; we handle the fuel. There is no separate fuel surcharge.",
  },
  {
    id: "cross-country-rental",
    question: "Can I rent an aircraft for a cross-country trip?",
    answer:
      "Yes. Members can rent the same PA28s they train in for cross-country flights. IFR-equipped aircraft are available for instrument cross-countries. Ask about our cross-country rental requirements before planning an overnight or out-of-state trip.",
  },
  {
    id: "membership-required",
    question: "Do I need a membership to fly?",
    answer:
      "No. Non-members can rent aircraft at the non-member wet rate. The $49/month membership lowers the rate to $159/hr and is worth it if you fly more than about two hours per month.",
  },
  {
    id: "discovery-flight-included",
    question: "What is included in the discovery flight?",
    answer:
      "The $199 discovery flight includes a pre-flight briefing, 45–60 minutes of hands-on flight time with a CFI, and a post-flight debrief. No deposit is required.",
  },
  {
    id: "instructor-billing",
    question: "How are instructor hours billed?",
    answer:
      "CFI time is billed separately from aircraft rental. Ground instruction and flight instruction are tracked individually and charged by the hour. Contact us to confirm the current CFI rate.",
  },
  {
    id: "cancellation-policy",
    question: "What is the cancellation policy?",
    answer: cancellationPolicy.text,
  },
  {
    id: "fuel-surcharges",
    question: "Are there any fuel surcharges?",
    answer:
      "No. Every PA28 wet rate is all-inclusive. Members pay $159/hr and non-members pay $180/hr with no additional fuel or oil fees.",
  },
];

export const fleetPage = {
  metaTitle: "PA28 Fleet & Pricing in Reno, NV",
  metaDescription:
    "Transparent PA28 wet rates at RNO. Members fly for $159/hr, non-members $180/hr. See tails, avionics, instructor rates, discovery flights, and financing.",
  hero: {
    title: "Our PA28 fleet and transparent rates.",
    subtitle:
      "Every wet rate is listed here. No fuel surcharge, no hidden fees, no surprise markup when you switch aircraft.",
  },
};
