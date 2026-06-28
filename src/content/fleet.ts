import type { Aircraft, FAQItem, FleetMember, Simulator } from "@/types";
import { isAircraft } from "@/types";
import { siteConfig } from "@/lib/config";

const { membershipMonthly, memberWetRate, nonMemberWetRate, discoveryFlight } =
  siteConfig.pricing;

const fleetMembers: FleetMember[] = [
  {
    kind: "aircraft",
    tail: "N6576J",
    slug: "n6576j",
    engine: "180 HP Lycoming",
    avionics: ["Dual Garmin G5 units", "WAAS Garmin 375 GPS"],
    notes: "Cruise prop for efficient IFR cross-country flying.",
    photo: "/images/fleet/n6576j-wet-ramp.jpeg",
    photoAlt:
      "Hornbill Aviation PA28 Cherokee N6576J reflected in standing water on the ramp at Reno-Tahoe International Airport (RNO).",
    gallery: [
      {
        src: "/images/fleet/n6576j-wet-ramp.jpeg",
        alt: "Hornbill Aviation PA28 Cherokee N6576J reflected in standing water on the ramp at Reno-Tahoe International Airport (RNO).",
      },
      {
        src: "/images/fleet/n6576j.webp",
        alt: "PA28 Cherokee N6576J in flight over snow-covered terrain near Reno, NV.",
      },
      {
        src: "/images/fleet/n6576j-sunset.webp",
        alt: "PA28 Cherokee N6576J on the ramp at sunset at Reno-Tahoe International Airport (RNO).",
      },
      {
        src: "/images/fleet/n6576j-panel.jpeg",
        alt: "N6576J instrument panel with Garmin G5 and WAAS GPS at Reno-Tahoe International Airport (RNO).",
      },
    ],
    ifrEquipped: true,
    crossCountryReady: true,
    metaTitle: "N6576J — PA28 Cherokee for Rent and Training in Reno, NV",
    metaDescription:
      "Rent or train in N6576J, a 180 HP PA28 Cherokee with dual Garmin G5 units and WAAS GPS. See specs, rates, and availability at Hornbill Aviation.",
    documents: [
      {
        title: "PA-28-180 POH",
        slug: "n6576j-poh",
        description:
          "Pilot's Operating Handbook for the PA-28-180. Verify current weight and balance and emergency procedures before every flight.",
        filePath: "/documents/aircraft/PA-28-180-POH.pdf",
        format: "PDF",
        size: "3.4 MB",
        lastUpdated: "2026-06-28",
        tailNumber: "N6576J",
      },
      {
        title: "Weight and balance",
        slug: "n6576j-weight-balance-pdf",
        description:
          "Printed weight-and-balance sheet for N6576J dated November 2022.",
        filePath: "/documents/aircraft/N6576J-weight-and-balance-11-2022.pdf",
        format: "PDF",
        size: "24 KB",
        lastUpdated: "2022-11-01",
        tailNumber: "N6576J",
      },
      {
        title: "Weight and balance worksheet",
        slug: "n6576j-weight-balance-xls",
        description:
          "Editable Excel worksheet for computing N6576J weight and balance.",
        filePath: "/documents/aircraft/N6576J-weight-and-balance.xls",
        format: "XLS",
        size: "38 KB",
        lastUpdated: "2022-11-01",
        tailNumber: "N6576J",
      },
    ],
    published: true,
  },
  {
    kind: "aircraft",
    tail: "N7824W",
    slug: "n7824w",
    engine: "180 HP Lycoming",
    avionics: ["Dual Garmin G5 units", "WAAS Garmin 480 GPS"],
    notes: "Set up for performance around the mountains.",
    photo: "/images/fleet/n7824w.webp",
    photoAlt:
      "PA28 Cherokee N7824W on the ramp at Reno-Tahoe International Airport (RNO).",
    gallery: [
      {
        src: "/images/fleet/n7824w.webp",
        alt: "PA28 Cherokee N7824W on the ramp at Reno-Tahoe International Airport (RNO).",
      },
      {
        src: "/images/fleet/n7824w-flying.webp",
        alt: "PA28 Cherokee N7824W in flight near Reno, NV.",
      },
      {
        src: "/images/fleet/n7824w-panel.webp",
        alt: "N7824W instrument panel with Garmin G5 and WAAS GPS at Reno-Tahoe International Airport (RNO).",
      },
    ],
    ifrEquipped: true,
    crossCountryReady: true,
    metaTitle: "N7824W — PA28 Cherokee for Rent and Training in Reno, NV",
    metaDescription:
      "Rent or train in N7824W, a 180 HP PA28 Cherokee set up for mountain flying with dual Garmin G5 units and WAAS GPS. See specs at Hornbill Aviation.",
    documents: [
      {
        title: "Aircraft Flight Manual",
        slug: "n7824w-afm",
        description:
          "Complete Aircraft Flight Manual for N7824W.",
        filePath: "/documents/aircraft/N7824W-AFM.pdf",
        format: "PDF",
        size: "7.5 MB",
        lastUpdated: "2026-06-28",
        tailNumber: "N7824W",
      },
      {
        title: "PA-28-180C POH",
        slug: "n7824w-poh",
        description:
          "Piper PA-28-180C Pilot's Operating Handbook. Verify current weight and balance and emergency procedures before every flight.",
        filePath: "/documents/aircraft/piper-PA-28-180C.pdf",
        format: "PDF",
        size: "1.9 MB",
        lastUpdated: "2026-06-28",
        tailNumber: "N7824W",
      },
      {
        title: "Weight and balance worksheet",
        slug: "n7824w-weight-balance-xlsx",
        description:
          "Editable Excel worksheet for computing N7824W weight and balance.",
        filePath: "/documents/aircraft/N7824W-weight-and-balance.xlsx",
        format: "XLSX",
        size: "16 KB",
        lastUpdated: "2026-06-28",
        tailNumber: "N7824W",
      },
    ],
    published: true,
  },
  {
    kind: "aircraft",
    tail: "N7969W",
    slug: "n7969w",
    engine: "180 HP Lycoming",
    avionics: ["VFR panel"],
    notes: "Training and local rental workhorse.",
    photo: "/images/fleet/n7969w.webp",
    photoAlt:
      "PA28 Cherokee N7969W on the ramp at Reno-Tahoe International Airport (RNO), with other aircraft and the control tower in the background.",
    gallery: [
      {
        src: "/images/fleet/n7969w.webp",
        alt: "PA28 Cherokee N7969W on the ramp at Reno-Tahoe International Airport (RNO), with other aircraft and the control tower in the background.",
      },
    ],
    ifrEquipped: false,
    crossCountryReady: false,
    metaTitle: "N7969W — PA28 Cherokee for Training in Reno, NV",
    metaDescription:
      "Train in N7969W, a 180 HP PA28 Cherokee with a VFR panel. Reliable, predictable handling for primary training at Hornbill Aviation.",
    documents: [
      {
        title: "PA-28-180C POH",
        slug: "n7969w-poh",
        description:
          "Piper PA-28-180C Pilot's Operating Handbook. Verify current weight and balance and emergency procedures before every flight.",
        filePath: "/documents/aircraft/piper-PA-28-180C.pdf",
        format: "PDF",
        size: "1.9 MB",
        lastUpdated: "2026-06-28",
        tailNumber: "N7969W",
      },
      {
        title: "Weight and balance",
        slug: "n7969w-weight-balance-pdf",
        description:
          "Printed weight-and-balance sheet for N7969W dated April 2025.",
        filePath: "/documents/aircraft/N7969W-weight-and-balance-4-2025.pdf",
        format: "PDF",
        size: "21 KB",
        lastUpdated: "2025-04-01",
        tailNumber: "N7969W",
      },
      {
        title: "Weight and balance worksheet",
        slug: "n7969w-weight-balance-xlsx",
        description:
          "Editable Excel worksheet for computing N7969W weight and balance.",
        filePath: "/documents/aircraft/N7969W-weight-and-balance.xlsx",
        format: "XLSX",
        size: "16 KB",
        lastUpdated: "2025-04-01",
        tailNumber: "N7969W",
      },
    ],
    published: false,
  },
  {
    kind: "simulator",
    slug: "simulator",
    name: "Flight simulator",
    tagline: "Practice procedures before you pay for engine time.",
    description:
      "Our simulator is set up for instrument procedure training, approach practice, and emergency rehearsal. Work through holds, intercepts, and partial-panel scenarios at your own pace, then transfer what you learned to the airplane.",
    photo: "/images/fleet/simulator.webp",
    photoAlt:
      "Flight simulator station with three displays and a full instrument panel at Hornbill Aviation in Reno, NV.",
    notes:
      "Useful for Instrument Rating students, IPC preparation, and anyone who wants to sharpen procedures without weather or fuel concerns.",
    metaTitle: "Flight Simulator Training in Reno, NV",
    metaDescription:
      "Practice instrument procedures, approaches, and emergencies in our flight simulator. Build habit patterns before you fly at Hornbill Aviation.",
    documents: [
      {
        title: "PFC CR12 ProPanel AATD LOA",
        slug: "simulator-loa-03-15-2022",
        description:
          "Letter of Authorization for the PFC CR12 ProPanel Advanced Aviation Training Device, revision signed March 15, 2022.",
        filePath: "/documents/aircraft/PFC-CR12-PROPANEL-AATD-AIRPLANE-Revision-LOA-signed-03-15-2022.pdf",
        format: "PDF",
        size: "315 KB",
        lastUpdated: "2022-03-15",
      },
      {
        title: "PFC CR12 ProPanel AATD revised QAG",
        slug: "simulator-qag-03-31-2022",
        description:
          "Revised Qualification and Approval Guide for the PFC CR12 ProPanel AATD, signed March 31, 2022.",
        filePath: "/documents/aircraft/Signed-03-31-2022-PFC-CR-12-PROPANEL-AATD-revised-QAG-01-19-2022-rev-031522.pdf",
        format: "PDF",
        size: "18.1 MB",
        lastUpdated: "2022-03-31",
      },
      {
        title: "FAA AC 61-136A",
        slug: "faa-ac-61-136a",
        description:
          "FAA Advisory Circular 61-136A on flight simulation training device use in aviation training.",
        filePath: "/documents/aircraft/FAA-AC-61-136A.pdf",
        format: "PDF",
        size: "225 KB",
        lastUpdated: "2026-06-27",
      },
      {
        title: "FAA loggable time guidance",
        slug: "faa-loggable-time",
        description:
          "FAA guidance on what simulator time can be logged and how to log it.",
        filePath: "/documents/aircraft/FAA-Loggable-Time.pdf",
        format: "PDF",
        size: "356 KB",
        lastUpdated: "2026-06-27",
      },
      {
        title: "How to log time",
        slug: "how-to-log-time",
        description:
          "Reference document explaining how to log simulator and training time.",
        filePath: "/documents/aircraft/How-to-Log-Time.pdf",
        format: "PDF",
        size: "248 KB",
        lastUpdated: "2026-06-27",
      },
    ],
    published: true,
  } as Simulator,
];

/**
 * All published fleet members (aircraft + simulator).
 */
export const fleet = fleetMembers;

/**
 * Backwards-compatible aircraft-only export.
 */
export const aircraft: Aircraft[] = fleetMembers.filter(isAircraft);

/**
 * Returns only fleet members that should have public detail pages.
 */
export function getPublishedFleet(): FleetMember[] {
  return fleet.filter((m) => m.published);
}

/**
 * Finds a fleet member by slug, or returns undefined if not found.
 */
export function getFleetMemberBySlug(
  slug: string
): FleetMember | undefined {
  return fleet.find((m) => m.slug === slug);
}

/**
 * Finds an aircraft by slug, or returns undefined if the slug belongs to a
 * simulator or does not exist.
 */
export function getAircraftBySlug(slug: string): Aircraft | undefined {
  const member = getFleetMemberBySlug(slug);
  return member && isAircraft(member) ? member : undefined;
}

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
      `No. Non-members can rent aircraft at the non-member wet rate. The $${membershipRates.monthly}/month membership lowers the rate to $${membershipRates.memberRate}/hr and is worth it if you fly more than about ${Math.ceil(membershipRates.breakEvenHours)} hours per month.`,
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
      `No. Every PA28 wet rate is all-inclusive. Members pay $${membershipRates.memberRate}/hr and non-members pay $${membershipRates.nonMemberRate}/hr with no additional fuel or oil fees.`,
  },
];

export const fleetPage = {
  metaTitle: "PA28 Fleet & Pricing in Reno, NV",
  metaDescription:
    `Transparent PA28 wet rates at RNO. Members fly for $${membershipRates.memberRate}/hr, non-members $${membershipRates.nonMemberRate}/hr. See tails, avionics, instructor rates, and discovery flights.`,
  hero: {
    title: "Our PA28 fleet and transparent rates.",
    subtitle:
      "Every wet rate is listed here. No fuel surcharge, no hidden fees, no surprise markup when you switch aircraft.",
  },
};
