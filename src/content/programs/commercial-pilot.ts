import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;
const discoveryFlightHref = "/discovery-flight/";
const fleetHref = "/fleet/";
const membershipHref = "/membership/";
const financingHref = "/financing/";
const contactCplHref = "/contact/?subject=Commercial%20Pilot%20training";

export const commercialPilotProgram = {
  slug: "commercial-pilot",
  title: "Commercial Pilot",
  fullTitle: "Commercial Pilot License",
  metaTitle: "Commercial Pilot License Training in Reno, NV",
  metaDescription:
    "Earn your Commercial Pilot certificate at RNO. Part 61 CPL training in a consistent PA28 fleet with real cross-country experience. Book a consultation.",
  hero: {
    title: "Commercial Pilot training in Reno, NV.",
    subtitle:
      "Build the proficiency, flight time, and aeronautical decision-making required for a professional pilot career. Train in a consistent PA28 fleet at Reno–Tahoe (RNO) with cross-country routes that count.",
    image: "/images/programs/commercial-pilot-hero.webp",
    imageAlt:
      "Hornbill PA28 N6576J in flight near the Sierra Nevada during a cross-country training route from Reno-Tahoe (RNO)",
    cta: {
      primary: {
        label: "Book a consultation",
        href: discoveryFlightHref,
        analytics: "commercial_pilot_consultation_booking_started",
      },
      secondary: {
        label: "See the fleet and rates",
        href: fleetHref,
        analytics: "fleet_click",
      },
    },
  },
  quickAnswer:
    `Hornbill Flight Center offers Part 61 Commercial Pilot training at Reno–Tahoe (RNO). You build the required 250 hours in a consistent PA28 fleet, fly real cross-country routes through high-elevation terrain, and prepare for the FAA Commercial Pilot checkride. Training is flexible — full-time or part-time — with instructor choice and transparent ${memberRate} member wet rates.`,
  benefits: {
    title: "What the Commercial Pilot certificate gives you",
    intro:
      "A Commercial Pilot certificate is the gateway to flying for compensation and advancing toward professional roles.",
    items: [
      {
        title: "Fly for compensation or hire",
        description:
          "You can be paid for certain piloting roles once you hold a Commercial Pilot certificate and meet the operating requirements for each flight.",
      },
      {
        title: "Build flight time",
        description:
          "Use the 250-hour requirement and time-building rentals to move toward CFI, CFII, or airline minimums.",
      },
      {
        title: "Advance your career",
        description:
          "CPL is the standard next step before becoming a CFI or entering other commercial flying roles.",
      },
    ],
    links: [
      {
        label: "Certified Flight Instructor pathway",
        href: "/programs/certified-flight-instructor/",
      },
      { label: "CFII add-on", href: "/programs/cfii/" },
    ],
  },
  prerequisites: {
    title: "Prerequisites",
    intro:
      "Before starting Commercial Pilot training, make sure you meet these FAA requirements:",
    items: [
      "Hold a Private Pilot certificate.",
      "Be able to read, speak, write, and understand English.",
      "Hold at least a second-class medical certificate.",
      "Instrument Rating strongly recommended before the checkride.",
    ],
  },
  experience: {
    title: "Part 61 aeronautical experience",
    intro:
      "These are the key requirements under 14 CFR 61.129 for the Commercial Pilot certificate in a single-engine airplane. Your CFI will verify the exact requirements for your situation.",
    rows: [
      { label: "Total time", value: "250 hours" },
      { label: "Pilot in command", value: "100 hours" },
      { label: "Cross-country flight", value: "50 hours" },
      { label: "Instrument training", value: "10 hours (5 in aircraft)" },
      { label: "Complex or TAA airplane", value: "10 hours" },
      { label: "Day VFR cross-country (within 60 days)", value: "2 hours" },
      { label: "Night VFR (within 60 days)", value: "3 hours" },
      { label: "Instruction within 2 calendar months", value: "3 hours" },
    ],
    note: "Your CFI will verify the exact requirements for your situation.",
  },
  timeline: {
    title: "Training timeline",
    intro:
      "How long CPL training takes depends on how many hours you already have and how often you fly. A single PA28 fleet reduces transition time between aircraft.",
    options: [
      {
        label: "Full-time",
        schedule: "4–5 lessons per week",
        duration: "3–5 months",
        note: "Best if you can dedicate most of your schedule to flying.",
      },
      {
        label: "Part-time",
        schedule: "2–3 lessons per week",
        duration: "6–9 months",
        note: "A realistic pace if you are working or studying around training.",
      },
    ],
  },
  cost: {
    title: "Cost estimate",
    intro:
      "Commercial Pilot training costs vary with prior experience because many students already have hours to count toward the 250-hour total. This range is a realistic starting point, not a guarantee.",
    rows: [
      { label: "PA28 member wet rate", value: memberRate },
      { label: "PA28 non-member wet rate", value: nonMemberRate },
      { label: "Monthly membership", value: membershipRate },
      { label: "Instructor rate", value: "Published on /fleet/" },
      { label: "Flight time (typical additional)", value: "50–100 hours" },
      { label: "Ground instruction", value: "15–25 hours" },
      { label: "Examiner fee", value: "$700–$900" },
      { label: "Commercial written test", value: "$175" },
    ],
    totalRange: "$15,000–$25,000",
    note: `Membership lowers the aircraft rate to ${memberRate}. See the fleet, membership, and financing pages for current rates and payment options.`,
    links: [
      { label: "See fleet and rates", href: fleetHref },
      { label: "Membership details", href: membershipHref },
      { label: "Financing options", href: financingHref },
    ],
  },
  whyHornbill: {
    title: "Why train at Hornbill",
    items: [
      {
        title: "Consistency",
        description:
          "Our uniform PA28 fleet — N6576J, N7824W, N7969W, and N0001J — keeps handling, costs, and procedures predictable.",
      },
      {
        title: "Real-world experience",
        description:
          "WAAS-equipped aircraft and cross-country rental eligibility let you build IFR and long-route experience, not just local maneuvers.",
      },
      {
        title: "High-elevation training",
        description:
          "RNO sits at 4,403 ft. You will gain mountain and density-altitude experience that flatland schools cannot replicate.",
      },
      {
        title: "Value",
        description: `${memberRate} member wet rate with transparent pricing and no hidden fuel surcharges.`,
      },
    ],
  },
  careerPathway: {
    title: "Career pathway",
    intro:
      "Commercial Pilot is a milestone, not the finish line. Most professional pilots build time through instruction and cross-country rentals before moving into commercial roles.",
    steps: [
      { title: "Commercial Pilot", description: "Fly for compensation and meet the foundation for professional roles." },
      { title: "CFI", description: "Teach primary students and build PIC time in the same PA28 fleet." },
      { title: "CFII", description: "Add instrument instruction privileges and expand your teaching repertoire." },
      { title: "Commercial roles", description: "Move toward airline, charter, corporate, or other professional flying paths." },
    ],
    links: [
      { label: "CFI training", href: "/programs/certified-flight-instructor/" },
      { label: "CFII add-on", href: "/programs/cfii/" },
    ],
  },
  faq: [
    {
      id: "cpl-instrument-required",
      question: "Do I need an Instrument Rating first?",
      answer:
        "An Instrument Rating is not a legal prerequisite for the Commercial Pilot certificate, but it is strongly recommended before the checkride. Employers and most career paths expect instrument proficiency.",
    },
    {
      id: "cpl-part-time-duration",
      question: "How long does CPL training take part-time?",
      answer:
        "Part-time students flying 2–3 lessons per week typically finish in 6–9 months. The biggest variable is how many of the required 250 hours you already have logged.",
    },
    {
      id: "cpl-same-pa28",
      question: "Can I train in the same PA28 I rent for cross-country time?",
      answer:
        "Yes. After checkout, you can rent the same PA28 aircraft you train in for cross-country time-building. Consistent equipment keeps your procedures familiar.",
    },
    {
      id: "cpl-complex-taa",
      question: "What counts as a complex or technically advanced aircraft?",
      answer:
        "A complex airplane has retractable landing gear, flaps, and a controllable-pitch propeller. A technically advanced airplane (TAA) has an integrated glass cockpit with primary flight display, multifunction display, and GPS. Your CFI will help you meet the 10-hour requirement in the appropriate aircraft.",
    },
    {
      id: "cpl-membership-saves",
      question: "Does membership save money on time-building?",
      answer:
        "Yes. Members pay ${memberRate} wet versus ${nonMemberRate} non-member. At 6 hours of flying per month, the ${membershipRate} membership pays for itself and then some.",
    },
    {
      id: "cpl-bring-instructor",
      question: "Can I bring my own instructor?",
      answer:
        "Yes. Hornbill is a Part 61 school. You can train with a Hornbill CFI or bring your own certificated flight instructor. The aircraft checkout and scheduling policies still apply.",
    },
    {
      id: "cpl-medical",
      question: "What medical certificate do I need?",
      answer:
        "You need at least a second-class medical certificate to exercise the privileges of a Commercial Pilot certificate. A third-class medical is not sufficient for commercial operations.",
    },
    {
      id: "cpl-checkride",
      question: "What happens on the checkride?",
      answer:
        "The Commercial Pilot practical test follows the Airman Certification Standards. It includes an oral exam on regulations, aerodynamics, and commercial operations, plus a flight portion demonstrating advanced maneuvers, precision landings, and emergency procedures.",
    },
  ] as FAQItem[],
  bottomCTA: {
    title: "Ready to fly for a living?",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "commercial_pilot_booking_started",
    secondaryCta: "Talk to an instructor",
    secondaryHref: contactCplHref,
  },
};
