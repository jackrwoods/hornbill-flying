import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;
const discoveryFlightHref = "/discovery-flight/";
const fleetHref = "/fleet/";
const membershipHref = "/membership/";
const instructorsHref = "/instructors/";
const financingHref = "/financing/";
const sportPilotHref = "/programs/sport-pilot/";
const instrumentRatingHref = "/programs/instrument-rating/";
const commercialPilotHref = "/programs/commercial-pilot/";
const mountainFlyingHref = "/programs/mountain-flying/";

export const privatePilotProgram = {
  slug: "private-pilot",
  title: "Private Pilot",
  fullTitle: "Private Pilot Certificate",
  metaTitle: "Private Pilot License Training in Reno, NV",
  metaDescription:
    "Earn your private pilot license at RNO. Part 61, PA28 fleet, choose your CFI. Book a discovery flight and start training today.",
  hero: {
    title: "Private Pilot License Training in Reno, NV",
    subtitle:
      "Train at your pace, choose your instructor, and earn your certificate in a consistent PA28 fleet at Reno–Tahoe (RNO).",
    image: "/images/programs/private-pilot-hero.webp",
    imageAlt:
      "PA28 Cherokee on the ramp at Reno-Tahoe International Airport",
    cta: {
      primary: {
        label: "Book a discovery flight",
        href: discoveryFlightHref,
        analytics: "private_pilot_discovery_booking_started",
      },
      secondary: {
        label: "See the fleet and rates",
        href: fleetHref,
        analytics: "fleet_click",
      },
    },
  },
  quickAnswer:
    "A private pilot certificate lets you fly a single-engine airplane in visual flight rules, carry passengers, and rent aircraft for cross-country trips. At Hornbill, you train under Part 61 at RNO, choose the CFI you work with, and fly the same PA28 fleet from first lesson to checkride.",
  outcomes: {
    title: "What you'll be able to do after",
    items: [
      "Fly passengers day or night under VFR in the U.S.",
      "Rent Hornbill PA28s for real cross-country flights.",
      "Build the foundation for an Instrument Rating or Commercial certificate.",
    ],
  },
  requirements: {
    title: "Part 61 requirements",
    intro:
      "The FAA sets minimums under Part 61. Most students need more than the minimum to be ready for the checkride.",
    rows: [
      { requirement: "Age", minimum: "17 years old to receive the certificate; 16 to solo" },
      { requirement: "Medical", minimum: "Valid 3rd-class medical certificate (or BasicMed)" },
      { requirement: "Language", minimum: "Read, speak, write, and understand English" },
      { requirement: "Total flight time", minimum: "40 hours" },
      { requirement: "Flight instruction", minimum: "20 hours, including 3 hours night, 3 hours instrument, and 3 hours cross-country" },
      { requirement: "Solo flight", minimum: "10 hours, including 5 hours solo cross-country with one trip of at least 150 NM and full-stop landings at three points" },
      { requirement: "Towered operations", minimum: "3 takeoffs and landings at an airport with an operating control tower" },
      { requirement: "Tests", minimum: "Pass the FAA knowledge test and practical test (checkride)" },
    ],
    note: "These are regulatory minimums. Realistic training time is covered below.",
  },
  timeline: {
    title: "How long it takes",
    intro: "Pace depends on how often you can fly, study, and schedule the checkride.",
    options: [
      {
        label: "Full-time",
        schedule: "3–5 lessons per week",
        duration: "3–4 months",
      },
      {
        label: "Part-time",
        schedule: "1–2 lessons per week",
        duration: "8–12 months",
      },
    ],
    note: "Weather, scheduling, and study pace affect the timeline. Part 61 means we build the schedule around yours.",
  },
  cost: {
    title: "Estimated cost",
    intro:
      "These numbers are realistic starting points, not guarantees. Your total depends on proficiency, preparation, and how often you fly.",
    rows: [
      { label: "PA28 member wet rate", value: memberRate },
      { label: "PA28 non-member wet rate", value: nonMemberRate },
      { label: "Aircraft rental (50 hrs example)", value: `50 × ${memberRate} = $7,950` },
      { label: "Flight instruction (typical dual)", value: "$70/hr" },
      { label: "Ground school / briefings", value: "10–20 hours" },
      { label: "Medical exam", value: "$100–$150" },
      { label: "FAA knowledge test", value: "$175" },
      { label: "Examiner fee (checkride)", value: "$600–$900" },
      { label: "Books, materials, headset", value: "$300–$600" },
      { label: "Monthly membership", value: membershipRate },
    ],
    totalRange: "$12,000–$16,000",
    totalNote:
      `Most students spend roughly $12,000–$16,000 from first lesson to certificate. Membership lowers the aircraft rate to ${memberRate} wet.`,
    links: [
      { label: "See fleet and rates", href: fleetHref },
      { label: "Membership details", href: membershipHref },
    ],
  },
  fleet: {
    title: "Train in the same PA28 fleet",
    description:
      "Switching aircraft should not feel like switching airplanes. Our PA28 fleet is similarly equipped, so handling, panel layout, and performance stay predictable. IFR-capable aircraft have dual Garmin G5 units and WAAS GPS.",
    href: fleetHref,
  },
  instructors: {
    title: "Choose your instructor",
    description:
      "Pick the CFI whose schedule and style fit you. Already have a CFI? You can bring your own instructor to Hornbill.",
    href: instructorsHref,
  },
  financing: {
    title: "Finance your training",
    description:
      "We partner with Stratus Financial to help students spread training costs over time.",
    href: financingHref,
  },
  faq: [
    {
      id: "ppl-age",
      question: "How old do I need to be to get a private pilot certificate?",
      answer:
        "You must be 17 years old to receive a private pilot certificate and 16 years old to solo. You can start training earlier, but you cannot take the checkride until you are 17.",
    },
    {
      id: "ppl-medical",
      question: "Do I need a medical certificate before I start?",
      answer:
        "You need a valid FAA third-class medical certificate or BasicMed before you can solo. You can begin lessons while you schedule your medical exam, but you will need it before your first solo flight.",
    },
    {
      id: "ppl-duration",
      question: "How long does private pilot training take?",
      answer:
        "Full-time students flying 3–5 lessons per week typically finish in 3–4 months. Part-time students flying 1–2 lessons per week usually take 8–12 months. Weather, study pace, and examiner availability affect the exact timeline.",
    },
    {
      id: "ppl-cost",
      question: "How much does it cost to get a PPL at Hornbill?",
      answer:
        `Most students spend roughly $12,000–$16,000 from first lesson to certificate. The biggest variables are aircraft rental rate, instructor time, and how many hours you need to reach proficiency. Members pay ${memberRate} wet; non-members pay ${nonMemberRate} wet.`,
    },
    {
      id: "ppl-instructor-choice",
      question: "Can I choose my flight instructor or bring my own?",
      answer:
        "Yes. You can train with any Hornbill CFI or bring your own certificated flight instructor. Part 61 means the schedule and the instructor relationship fit you.",
    },
    {
      id: "ppl-aircraft",
      question: "What aircraft will I train in?",
      answer:
        "You will train in Hornbill's consistent PA28 fleet. IFR-capable aircraft have dual Garmin G5 units and WAAS GPS, so panel layout and performance stay predictable even when you switch between aircraft.",
    },
    {
      id: "ppl-part-61",
      question: "Is Hornbill Part 61 or Part 141?",
      answer:
        "Hornbill is a Part 61 flight school. That means we build your training schedule around your life, not a rigid syllabus calendar.",
    },
    {
      id: "ppl-discovery",
      question: "What happens on a discovery flight?",
      answer:
        "You spend 45–60 minutes in the air with a certificated flight instructor, sit in the left seat, and handle the controls. You also get a preflight briefing and time to ask questions. No deposit or long-term commitment is required.",
    },
  ] as FAQItem[],
  relatedPrograms: {
    title: "Explore more training",
    items: [
      {
        title: "Sport Pilot",
        description: "A shorter path to a pilot certificate with daytime VFR privileges.",
        href: sportPilotHref,
      },
      {
        title: "Instrument Rating",
        description: "Add instrument privileges after your Private Pilot certificate.",
        href: instrumentRatingHref,
      },
      {
        title: "Commercial Pilot",
        description: "Build advanced proficiency and prepare for a professional pilot career.",
        href: commercialPilotHref,
      },
      {
        title: "Mountain Flying",
        description: "Build Sierra Nevada and high-desert judgment in a single-engine course.",
        href: mountainFlyingHref,
      },
      {
        title: "Discovery Flight",
        description: "See what flying is like before committing to a program.",
        href: discoveryFlightHref,
      },
      {
        title: "Membership",
        description: "Lower your wet rate to $159/hr and get priority scheduling for $49/month.",
        href: membershipHref,
      },
    ],
  },
  bottomCTA: {
    title: "Ready to earn your Private Pilot certificate?",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "private_pilot_booking_started",
    secondaryCta: "Talk to an instructor",
    secondaryHref: "/contact/?subject=Private%20Pilot%20training",
  },
};
