import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;
const discoveryFlightHref = "/discovery-flight/";
const fleetHref = "/fleet/";
const membershipHref = "/membership/";
const contactHref = "/contact/";
const privatePilotHref = "/programs/private-pilot/";
const commercialPilotHref = "/programs/commercial-pilot/";
const cfiiHref = "/programs/cfii/";
const mountainFlyingHref = "/programs/mountain-flying/";

export const instrumentRatingProgram = {
  slug: "instrument-rating",
  title: "Instrument Rating",
  fullTitle: "FAA Instrument Rating — Airplane",
  metaTitle: "Instrument Rating Training in Reno, NV",
  metaDescription:
    "Earn your FAA Instrument Rating at Reno–Tahoe. Part 61 IFR training in a WAAS-equipped PA28 fleet with Garmin G5 avionics. Book a discovery flight or consultation.",
  hero: {
    title: "Instrument Rating training in Reno, NV",
    subtitle:
      "Train in a WAAS-equipped PA28 fleet at Reno–Tahoe (RNO), build real IFR experience in Class C airspace, and keep your schedule. Add the rating that makes you a safer, more capable pilot.",
    image: "/images/programs/instrument-rating-hero.webp",
    imageAlt:
      "PA28 instrument panel with dual Garmin G5 units at Reno–Tahoe International Airport (RNO)",
    cta: {
      primary: {
        label: "Book a discovery flight",
        href: discoveryFlightHref,
        analytics: "instrument_rating_discovery_booking_started",
      },
      secondary: {
        label: "See the fleet and rates",
        href: fleetHref,
        analytics: "fleet_click",
      },
    },
  },
  quickAnswer:
    "Hornbill Aviation offers Part 61 Instrument Rating training at Reno–Tahoe (RNO). You train in a WAAS GPS, dual Garmin G5 PA28 fleet, logging the 40 hours of actual or simulated instrument time the FAA requires, with a schedule built around yours. Members also get unlimited time in our FAA-certified CR-12 AATD, where up to 20 hours can count toward your instrument rating under 14 CFR §61.65(i).",
  benefits: {
    title: "What the Instrument Rating gives you",
    intro:
      "An Instrument Rating lets you fly under instrument flight rules with the right planning and equipment. It is the next step for Private Pilot holders who want more utility and safety.",
    items: [
      {
        title: "Fly in marginal weather",
        description:
          "File and fly IFR when conditions are below VFR minimums, so trips are not canceled by every low cloud layer.",
      },
      {
        title: "Operate in Class A airspace",
        description:
          "Fly above 18,000 ft MSL and through the National Airspace System under instrument rules when appropriate.",
      },
      {
        title: "Build safety margin",
        description:
          "Instrument training sharpens scan, interpretation, and decision-making — skills that help on every flight, even in visual conditions.",
      },
    ],
    links: [
      { label: "Private Pilot prerequisite", href: privatePilotHref },
      { label: "Discovery flight", href: discoveryFlightHref },
    ],
  },
  prerequisites: {
    title: "Prerequisites",
    intro:
      "Before starting Instrument Rating training, make sure you meet these FAA requirements under 14 CFR 61.65:",
    items: [
      "Hold a Private Pilot certificate with Airplane Single-Engine Land privileges.",
      "Be able to read, speak, write, and understand English.",
      "Hold a current FAA medical certificate or BasicMed for operating privileges and the checkride.",
      "Have a current logbook and flight review if required.",
    ],
  },
  experience: {
    title: "Aeronautical experience and training requirements",
    intro:
      "These are the key Part 61 minimums for the Instrument Rating — Airplane. Your CFII will verify the exact requirements for your logbook.",
    rows: [
      { label: "Cross-country PIC", value: "50 hours" },
      { label: "Actual or simulated instrument time", value: "40 hours" },
      { label: "Instrument training with a CFII", value: "15 hours" },
      { label: "Long IFR cross-country", value: "250 nm along airways or ATC-directed routing, with approaches at three airports" },
      { label: "AATD creditable toward instrument time", value: "Up to 20 hours (14 CFR §61.65(i))" },
      { label: "Ground school / written exam", value: "FAA Instrument Rating Airplane (IRA) knowledge test" },
      { label: "Practical test", value: "Instrument Rating checkride with a Designated Pilot Examiner" },
    ],
    note: "Part 61 minimums are just that — minimums. Most students need additional time to reach proficiency for the checkride.",
  },
  trainingStructure: {
    title: "Training structure",
    intro:
      "Instrument training is divided into stages so each skill builds on the last. You move at your pace, with the same PA28 fleet and CFII for consistency.",
    stages: [
      {
        title: "Stage 1 — Basic attitude instrument flying",
        description:
          "Learn to control the aircraft by reference to instruments alone, including partial-panel scenarios and unusual attitude recovery.",
      },
      {
        title: "Stage 2 — Navigation and approach procedures",
        description:
          "Fly radio, GPS, and WAAS approaches; hold at intersections; fly DME arcs; and manage cockpit workflows under the hood.",
      },
      {
        title: "Stage 3 — IFR cross-country",
        description:
          "Plan and fly real IFR cross-countries from RNO, filing routes, copying clearances, and flying approaches at outlying airports.",
      },
      {
        title: "Stage 4 — Checkride prep",
        description:
          "Polish approach flows, oral-exam knowledge, and emergency procedures so you are ready for the practical test.",
      },
    ],
  },
  fleet: {
    title: "Aircraft and avionics",
    intro:
      "IFR dual instruction happens in our WAAS-equipped PA28s. Training in the same aircraft type keeps your scan, buttonology, and performance numbers familiar.",
    aircraft: [
      {
        tail: "N6576J",
        engine: "180 HP Lycoming",
        avionics: "Dual Garmin G5 units, WAAS Garmin 375 GPS",
        notes: "Primary IFR trainer with modern glass-panel attitude reference.",
      },
      {
        tail: "N7824W",
        engine: "180 HP Lycoming",
        avionics: "Dual Garmin G5 units, WAAS Garmin 480 GPS",
        notes: "IFR-capable with performance-friendly configuration for mountain routes.",
      },
    ],
    note: "VFR-only aircraft may be used for select training tasks such as hood work or basic attitude flying, but all IFR dual instruction and approaches are flown in the WAAS-equipped PA28s.",
    links: [
      { label: "See full fleet and rates", href: fleetHref },
      { label: "Membership savings", href: membershipHref },
    ],
  },
  cost: {
    title: "Cost estimate",
    intro:
      "These numbers are a realistic starting point, not a guarantee. Your total depends on prior instrument exposure, proficiency, and how often you fly. Members can shift up to 20 hours of instrument time into our FAA-certified CR-12 AATD, which drops the aircraft rental line below.",
    rows: [
      { label: "PA28 member wet rate", value: memberRate },
      { label: "PA28 non-member wet rate", value: nonMemberRate },
      { label: "CFII instruction", value: "$75/hr (confirm with owner)" },
      { label: "Aircraft rental (15–30 hrs typical after up to 20 hrs AATD credit)", value: `${memberRate} member / ${nonMemberRate} non-member` },
      { label: "AATD time (up to 20 hrs creditable, 14 CFR §61.65(i))", value: "Members: $0 unlimited — saves up to $3,180" },
      { label: "Ground instruction / written prep", value: "$600 (estimate)" },
      { label: "Checkride aircraft + instructor", value: "$700 (estimate)" },
      { label: "Monthly membership", value: membershipRate },
    ],
    totalRange: "$5,300–$8,300 with max AATD credit (member); $8,500–$11,500 without",
    note:
      "AATD savings assume a member uses the full 20-hour AATD credit allowed under 14 CFR §61.65(i) in place of aircraft rental at the $159/hr member wet rate (20 × $159 = $3,180). AATD time still requires an authorized instructor, so CFII time is unchanged. The practical test, IPC, and flight review must still be accomplished in an aircraft. Prices do not include the FAA examiner fee, headset, or materials unless specified. CFII rate, written exam fee, and checkride estimate must be confirmed with the owner.",
    links: [
      { label: "See fleet and rates", href: fleetHref },
      { label: "Membership details", href: membershipHref },
    ],
  },
  whyHornbill: {
    title: "Why train IFR at Hornbill Aviation / RNO",
    items: [
      {
        title: "Uniform PA28 fleet",
        description:
          "Train in the same aircraft type from partial-panel work to checkride prep. Predictable handling means more learning per hour.",
      },
      {
        title: "WAAS GPS approaches locally",
        description:
          "Practice LPV and RNAV approaches in the RNO area, building confidence with modern GPS approach procedures.",
      },
      {
        title: "Real IFR cross-country routes",
        description:
          "File routes to Tahoe, Monterey, Bend, and other Sierra and high-desert destinations instead of repeating the same local pattern.",
      },
      {
        title: "Mountain and density-altitude judgment",
        description:
          "RNO sits at 4,415 ft. You will learn to factor density altitude, mountain weather, and escape options into every IFR decision.",
      },
      {
        title: "Choose your CFII",
        description:
          "Train with a Hornbill Aviation CFII or bring your own. Part 61 means the schedule and instructor relationship fit you.",
      },
      {
        title: "Unlimited CR-12 AATD for members",
        description:
          "Members get unlimited time in our FAA-certified CR-12 Advanced Aviation Training Device. Up to 20 hours logged in the AATD count toward the 40 hours of instrument time required for the rating under 14 CFR §61.65(i), so you can build procedure fluency without burning aircraft time.",
      },
    ],
  },
  discoveryFlightCTA: {
    title: "Start your Instrument Rating",
    description:
      "New to Hornbill Aviation? Book a discovery flight or consultation. You will meet a CFII, see the aircraft, and map out a training plan that fits your schedule. No deposit required.",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "instrument_rating_discovery_booking_started",
    secondaryCta: "Schedule a consultation",
    secondaryHref: `${contactHref}?subject=Instrument%20Rating%20training`,
    secondaryAnalytics: "instrument_rating_consultation_started",
  },
  relatedPathways: {
    title: "Related programs",
    items: [
      {
        title: "Private Pilot",
        description: "The prerequisite for the Instrument Rating. Earn your certificate in the same PA28 fleet.",
        href: privatePilotHref,
      },
      {
        title: "Commercial Pilot",
        description: "Add advanced proficiency and build time toward professional piloting roles.",
        href: commercialPilotHref,
      },
      {
        title: "CFII",
        description: "Add instrument instructor privileges and teach the next generation of instrument students.",
        href: cfiiHref,
      },
      {
        title: "Mountain Flying",
        description: "Build Sierra Nevada and density-altitude judgment that pairs directly with IFR cross-country flying.",
        href: mountainFlyingHref,
      },
    ],
  },
  faq: [
    {
      id: "ir-medical-required",
      question: "Do I need a current medical to start instrument training?",
      answer:
        "You need a current FAA medical certificate or BasicMed to act as pilot in command on training flights and to take the checkride. You can begin ground study and some simulator work while you arrange a medical, but flight training requires a valid medical or BasicMed.",
    },
    {
      id: "ir-part-time-duration",
      question: "How long does the Instrument Rating take part-time?",
      answer:
        "Most part-time students flying 2–3 lessons per week finish in 3–6 months. Full-time students typically finish in 6–10 weeks. Weather, examiner availability, and your starting instrument exposure are the biggest variables.",
    },
    {
      id: "ir-own-aircraft",
      question: "Can I do my instrument training in my own aircraft?",
      answer:
        "Yes, with approval and a checkout. Your aircraft must be legal and equipped for IFR, including a current pitot-static, transponder, and altimeter certification where required. Your CFII will review equipment and insurance before dual instruction begins.",
    },
    {
      id: "ir-avionics",
      question: "What avionics do your IFR trainers have?",
      answer:
        "Our primary IFR trainers are N6576J and N7824W, both PA28s with dual Garmin G5 units and WAAS GPS. N6576J has a WAAS Garmin 375 GPS; N7824W has a WAAS Garmin 480 GPS. This gives you modern glass-panel attitude reference and practice with GPS approach procedures.",
    },
    {
      id: "ir-checkride-included",
      question: "Does the price include the checkride and examiner fee?",
      answer:
        "No. The cost estimate covers aircraft rental, CFII instruction, ground instruction, and an estimated checkride prep aircraft/instructor block. The FAA examiner fee is separate and paid directly to the examiner. Confirm current examiner fees and CFII rates with us before you start.",
    },
    {
      id: "ir-ipc",
      question: "Do you offer IPCs or instrument refresher training?",
      answer:
        "Yes. We offer Instrument Proficiency Checks (IPCs) and instrument refresher sessions for rated pilots who want to regain currency or sharpen their scan. Contact us to schedule a session tailored to your experience.",
    },
    {
      id: "ir-weather-cancellation",
      question: "What happens if weather cancels an IFR lesson?",
      answer:
        "We reschedule. If actual or simulated instrument conditions are not available, your CFII may convert the lesson to ground study, simulator work, or partial-panel practice in VFR. You are not charged for aircraft time we cancel due to weather.",
    },
    {
      id: "ir-aatd",
      question: "Can I use the CR-12 AATD to log instrument time toward the rating?",
      answer:
        "Yes. Our CR-12 is an FAA-certified Advanced Aviation Training Device. Under 14 CFR §61.65(i), up to 20 hours of instrument time logged in an AATD with an authorized instructor may be credited toward the 40 hours of actual or simulated instrument time required for the Instrument Rating — Airplane. The practical test, IPC, and flight-review portions still must be accomplished in an aircraft. Members get unlimited time in the CR-12 AATD, so you can rehearse approaches, holds, and partial-panel drills without burning aircraft rental hours.",
    },
    {
      id: "ir-ground-school",
      question: "Do I need a formal ground school for the written exam?",
      answer:
        "You need to pass the FAA Instrument Rating Airplane (IRA) knowledge test before the checkride. Some students use a home-study course and review questions with a CFII; others prefer structured ground school. We can recommend a study plan that fits your learning style.",
    },
  ] as FAQItem[],
  bottomCTA: {
    title: "Ready to add your Instrument Rating?",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "instrument_rating_booking_started",
    secondaryCta: "Talk to an instructor",
    secondaryHref: `${contactHref}?subject=Instrument%20Rating%20training`,
  },
};
