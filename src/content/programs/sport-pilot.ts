import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;
const discoveryFlightHref = "/discovery-flight/";
const fleetHref = "/fleet/";
const membershipHref = "/membership/";
const privatePilotHref = "/programs/private-pilot/";
const instructorsHref = "/instructors/";
const faqHref = "/faq/";

export const sportPilotProgram = {
  slug: "sport-pilot",
  title: "Sport Pilot",
  fullTitle: "Sport Pilot Certificate",
  metaTitle: "Sport Pilot Training in Reno, NV",
  metaDescription:
    "Earn your Sport Pilot certificate at RNO. Part 61 training in a PA28 fleet, flexible scheduling, and a $199 discovery flight. See requirements, timeline, and cost.",
  hero: {
    title: "Sport Pilot training in Reno, NV.",
    subtitle:
      "A faster path to the left seat for hobbyist pilots. Train with a CFI you choose, build skills in our consistent PA28 fleet, and fly from Reno–Tahoe (RNO).",
    image: "/images/programs/sport-pilot-hero.webp",
    imageAlt:
      "Hornbill Aviation PA28 on approach to RNO during a flight lesson",
    cta: {
      primary: {
        label: "Book a discovery flight",
        href: discoveryFlightHref,
        analytics: "sport_pilot_discovery_booking_started",
      },
      secondary: {
        label: "See fleet and rates",
        href: fleetHref,
        analytics: "fleet_click",
      },
    },
  },
  quickAnswer:
    "Hornbill Aviation offers Part 61 Sport Pilot training at Reno–Tahoe (RNO). You train with a CFI you choose, build foundational skills in a consistent PA28 fleet, and prepare for the FAA Sport Pilot knowledge and practical tests. The first step is a $199 discovery flight with no deposit required.",
  whatIs: {
    title: "What is a Sport Pilot certificate?",
    intro:
      "A Sport Pilot certificate is the most accessible FAA pilot certificate. It lets you fly a light-sport aircraft during daytime visual flight rules, carry one passenger, and operate in most U.S. airspace with the right endorsements.",
    privileges: [
      {
        label: "Fly light-sport aircraft",
        description:
          "Operate any aircraft that meets the light-sport MOSAIC aircraft definition when you have the proper make and model endorsement.",
      },
      {
        label: "Carry a passenger",
        description:
          "Share the flight with one passenger and split operating costs under the rules.",
      },
      {
        label: "Daytime VFR",
        description:
          "Fly in visual conditions during the day with the appropriate airspace endorsements.",
      },
    ],
    limitations: [
      "Daytime visual flight rules only.",
      "One passenger maximum.",
      "Light-sport aircraft only, with applicable make/model endorsement.",
      "Class B, C, or D airspace requires the proper endorsements.",
      "No instrument flight rules (IFR) operations.",
      "No flying for compensation or hire.",
    ],
    note: "Hornbill Aviation trains in a fleet of 4-seat Piper Cherokee aircraft. Under MOSAIC, these can be operated by Sport Pilots; however, the PA28 is not a light-sport aircraft. If your goal is to operate only light-sport aircraft, contact us to confirm the right training and checkride path. Many students use Sport Pilot as an entry point and continue toward a Private Pilot certificate in our PA28 fleet.",
  },
  requirements: {
    title: "Requirements",
    intro:
      "These are the FAA minimums for a Sport Pilot certificate under 14 CFR 61.313. Your CFI will confirm the exact requirements for your situation.",
    items: [
      "Be at least 17 years old.",
      "Be able to read, speak, write, and understand English.",
      "Hold at least a third-class medical certificate, or a valid U.S. driver's license if you plan to exercise Sport Pilot privileges using the driver's-license medical rule.",
      "Log at least 20 hours of flight time, including 15 hours of flight training from an authorized instructor and 5 hours of solo flight time.",
      "Pass the FAA Sport Pilot knowledge test.",
      "Pass the Sport Pilot practical test (checkride) in a light-sport aircraft.",
    ],
    note: "Hornbill Aviation's PA28 fleet is not a light-sport aircraft category. If you intend to take the Sport Pilot checkride with us, confirm aircraft eligibility with our team, or plan to continue toward a Private Pilot certificate in the same PA28 fleet.",
  },
  timeline: {
    title: "Training timeline",
    intro:
      "Sport Pilot training is the shortest path to a pilot certificate. Pace depends on weather, examiner availability, and how often you can fly.",
    options: [
      {
        label: "Full-time",
        schedule: "4–5 lessons per week",
        duration: "4–6 weeks",
      },
      {
        label: "Part-time",
        schedule: "1–2 lessons per week",
        duration: "3–6 months",
      },
    ],
  },
  cost: {
    title: "Cost estimate",
    intro:
      "These numbers are a realistic starting point for training in our PA28 fleet, not a guarantee. Your total depends on proficiency, preparation, and how often you fly.",
    rows: [
      { label: "PA28 member wet rate", value: memberRate },
      { label: "PA28 non-member wet rate", value: nonMemberRate },
      { label: "Aircraft rental (20 hours typical)", value: `20 × ${memberRate} member / 20 × ${nonMemberRate} non-member` },
      { label: "Flight instruction (15 hours dual typical)", value: "15 × $70/hr" },
      { label: "Ground instruction / briefings", value: "10–15 hours" },
      { label: "Knowledge test fee", value: "$175" },
      { label: "Examiner fee", value: "$500–$800" },
      { label: "Monthly membership", value: membershipRate },
    ],
    memberTotal: "$5,500–$6,500",
    nonMemberTotal: "$6,200–$7,300",
    note: `Members pay ${memberRate} wet versus ${nonMemberRate} non-member. At just over 2 flight hours per month, the ${membershipRate} membership pays for itself.`,
    links: [
      { label: "See fleet and rates", href: fleetHref },
      { label: "Membership details", href: membershipHref },
    ],
  },
  fleetFit: {
    title: "Fleet fit",
    description:
      "Train in the same PA28 fleet as our Private Pilot students. Skills transfer directly if you continue, so switching programs does not mean starting over.",
    href: fleetHref,
  },
  upgradePathway: {
    title: "From Sport Pilot to Private Pilot",
    intro:
      "A Sport Pilot certificate is a solid entry point, but it comes with limits. Upgrading to a Private Pilot certificate removes the light-sport, passenger, and nighttime restrictions.",
    items: [
      {
        title: "Hours count toward Private Pilot",
        description:
          "Some of your Sport Pilot training and solo time may count toward Private Pilot requirements. Your CFI will review your logbook and identify what transfers.",
      },
      {
        title: "Train in the same PA28 fleet",
        description:
          "Continue flying the aircraft you already know. Consistent handling keeps the upgrade straightforward.",
      },
      {
        title: "Remove limitations",
        description:
          "A Private Pilot certificate lets you fly at night, carry more than one passenger, and operate larger single-engine aircraft under VFR.",
      },
    ],
    links: [
      { label: "Private Pilot program", href: privatePilotHref },
      { label: "Discovery flight", href: discoveryFlightHref },
    ],
  },
  discoveryFlightCTA: {
    title: "Your first lesson is a discovery flight.",
    description:
      "Fly for 45–60 minutes with a CFI, handle the controls, and see if training fits your life. No deposit required.",
    price: "$199",
    href: discoveryFlightHref,
    analytics: "sport_pilot_discovery_booking_started",
  },
  whyHornbill: {
    title: "Why train at Hornbill Aviation",
    items: [
      {
        title: "Choose your CFI",
        description:
          "Pick the instructor whose schedule and style fit you. Or bring your own certificated flight instructor.",
      },
      {
        title: "Consistent PA28 fleet",
        description:
          "Train in the same aircraft type, with the same avionics packages, from first lesson to checkride prep.",
      },
      {
        title: "Part 61 flexibility",
        description:
          "Schedule around your life. Full-time or part-time, the pace matches your availability.",
      },
      {
        title: "Transparent costs",
        description: `${memberRate} member wet rate with no hidden fees or surcharges.`,
      },
    ],
  },
  faq: [
    {
      id: "spl-vs-ppl",
      question: "What is the difference between Sport Pilot and Private Pilot?",
      answer:
        "A Sport Pilot certificate lets you fly light-sport aircraft in daytime VFR with one passenger. A Private Pilot certificate lets you fly larger aircraft, carry more passengers, fly at night, and travel farther under VFR. Private Pilot requires more training but offers more flexibility.",
    },
    {
      id: "spl-night",
      question: "Can I fly at night with a Sport Pilot certificate?",
      answer:
        "No. Sport Pilot privileges are limited to daytime visual flight rules. If you want to fly at night, the next step is a Private Pilot certificate.",
    },
    {
      id: "spl-medical",
      question: "What medical certificate do I need for Sport Pilot?",
      answer:
        "You can exercise Sport Pilot privileges with a valid U.S. driver's license instead of an FAA medical certificate, provided you meet the requirements and have not been denied, suspended, or revoked. A third-class medical also satisfies the requirement.",
    },
    {
      id: "spl-duration",
      question: "How long does Sport Pilot training take?",
      answer:
        "Full-time students typically finish in 4–6 weeks. Part-time students flying 1–2 lessons per week usually take 3–6 months. Weather and examiner availability affect the exact timeline.",
    },
    {
      id: "spl-counts-toward-ppl",
      question: "Can I use my Sport Pilot training toward a Private Pilot certificate?",
      answer:
        "Yes. Some flight time and instruction from your Sport Pilot training may count toward Private Pilot requirements. Your CFI will review your logbook to identify what transfers.",
    },
    {
      id: "spl-lsa",
      question: "Does Hornbill Aviation have a light-sport aircraft?",
      answer:
        "Hornbill Aviation trains in a fleet of PA28 aircraft. The PA28 is not a light-sport aircraft. If your goal is to operate only light-sport aircraft, contact us to discuss the right training and checkride path. Many students start with Sport Pilot intent and continue toward Private Pilot in our PA28 fleet.",
    },
    {
      id: "spl-discovery",
      question: "What does the $199 discovery flight include?",
      answer:
        "You spend 45–60 minutes in the air with a certificated flight instructor, sit in the left seat, and handle the controls. You also get a preflight briefing and time to ask questions about training. No deposit or long-term commitment is required.",
    },
  ] as FAQItem[],
  relatedPathways: {
    title: "Related pathways",
    items: [
      {
        title: "Private Pilot",
        description: "Continue your training and remove the Sport Pilot limitations.",
        href: privatePilotHref,
      },
      {
        title: "Discovery Flight",
        description: "See what flying is like before committing to a program.",
        href: discoveryFlightHref,
      },
      {
        title: "Fleet & Pricing",
        description: "See current aircraft rates and membership savings.",
        href: fleetHref,
      },
      {
        title: "Instructors",
        description: "Meet the CFIs who teach Sport Pilot students at Hornbill Aviation.",
        href: instructorsHref,
      },
      {
        title: "FAQ",
        description: "Find answers to common training questions.",
        href: faqHref,
      },
    ],
  },
  bottomCTA: {
    title: "Ready to start Sport Pilot training?",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "sport_pilot_booking_started",
    secondaryCta: "Talk to an instructor",
    secondaryHref: "/contact/?subject=Sport%20Pilot%20training",
  },
};
