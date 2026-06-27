import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;

export const cfiProgram = {
  slug: "certified-flight-instructor",
  title: "Certified Flight Instructor",
  fullTitle: "Certified Flight Instructor",
  metaTitle: "Certified Flight Instructor Training in Reno, NV",
  metaDescription:
    "Earn your CFI certificate at Hornbill in Reno, NV. Part 61 training: FOI, spin proficiency, lesson planning, and checkride prep. Book a consultation.",
  hero: {
    title: "Certified Flight Instructor (CFI) training in Reno, NV",
    subtitle:
      "Learn to teach pilots in a consistent PA28 fleet at Reno–Tahoe (RNO). Part 61 CFI training that covers Fundamentals of Instruction, spin proficiency, lesson planning, and practical-test preparation.",
    image: "/images/programs/cfi-hero.webp",
    imageAlt:
      "CFI candidate reviewing a flight lesson plan with a Hornbill instructor in a PA28 at Reno-Tahoe International Airport",
    cta: {
      primary: {
        label: "Book a CFI consultation",
        href: "/contact/?subject=CFI%20training",
        analytics: "cfi_consultation_booking_started",
      },
      secondary: {
        label: "Call us",
        href: `tel:${siteConfig.nap.telephone.replace(/\D/g, "")}`,
        analytics: "phone_click",
      },
    },
  },
  quickAnswer:
    "Hornbill's CFI program prepares commercial pilots with instrument privileges to become FAA-certified flight instructors. Training emphasizes the Fundamentals of Instruction, spin proficiency endorsement, lesson planning, and the practical test standards for single-engine airplane instruction in our consistent PA28 fleet at RNO.",
  whoIsFor: {
    title: "Who this is for",
    intro:
      "CFI training is for pilots who already hold advanced certificates and want to teach others to fly. You should meet these requirements before starting:",
    items: [
      "Hold a Commercial Pilot certificate.",
      "Hold an instrument rating (or instrument privileges).",
      "Be at least 18 years old and able to read, speak, write, and understand English.",
      "Hold at least a Third-Class medical certificate when acting as PIC during instruction (or meet the requirements for the flight portions you lead).",
    ],
  },
  whatYouLearn: {
    title: "What you'll learn",
    intro:
      "Initial CFI training is about becoming an educator, not just a proficient pilot. You will develop the knowledge and teaching skills the FAA expects of a certificated flight instructor.",
    items: [
      {
        title: "Fundamentals of Instruction",
        description:
          "The learning process, human behavior and effective communication, the teaching process, assessment, and the responsibilities of a flight instructor.",
      },
      {
        title: "Technical subject areas",
        description:
          "Aerodynamics, aircraft systems, runway incursion avoidance, federal aviation regulations, airspace, and risk management as they apply to instruction.",
      },
      {
        title: "Spin proficiency",
        description:
          "Required spin awareness, prevention, and recovery endorsement before the practical test.",
      },
      {
        title: "Lesson planning and delivery",
        description:
          "Preparing preflight and in-flight lessons, explaining maneuvers, demonstrating, and debriefing student performance.",
      },
      {
        title: "Checkride preparation",
        description:
          "Review of the applicable Airman Certification Standards (ACS) and mock practical-test sessions.",
      },
    ],
  },
  timeline: {
    title: "Training timeline",
    intro:
      "How long CFI training takes depends on your schedule and how much teaching experience you already have. These estimates assume you meet the CPL + instrument prerequisites.",
    options: [
      {
        label: "Full-time",
        schedule: "4–6 lessons per week",
        duration: "4–6 weeks",
      },
      {
        label: "Part-time",
        schedule: "2–3 lessons per week",
        duration: "2–4 months",
      },
    ],
  },
  cost: {
    title: "Cost estimate",
    intro:
      "CFI candidate hours vary widely with prior experience, so we present a transparent range rather than a fixed total. These numbers are a realistic starting point, not a guarantee.",
    rows: [
      { label: "PA28 member wet rate", value: memberRate },
      { label: "PA28 non-member wet rate", value: nonMemberRate },
      { label: "Monthly membership", value: membershipRate },
      { label: "Instructor rate", value: "Published on /fleet/" },
      { label: "Flight time (typical)", value: "10–20 hours" },
      { label: "Ground instruction", value: "15–25 hours" },
      { label: "Examiner fee", value: "$700–$900" },
      { label: "FIA written test", value: "$175" },
    ],
    totalRange: "$4,000–$8,500",
    note: `Membership lowers the aircraft rate to ${memberRate}. See the fleet and membership pages for current rates.`,
  },
  whyHornbill: {
    title: "Why train at Hornbill",
    items: [
      {
        title: "Consistency",
        description:
          "Train and teach in a uniform PA28 fleet — predictable handling, costs, and avionics.",
      },
      {
        title: "Flexibility",
        description:
          "Choose the instructor you work best with, or bring your own. Schedule around your life.",
      },
      {
        title: "Real-world experience",
        description:
          "CFIs at Hornbill fly real cross-country routes, not just practice-area patterns.",
      },
      {
        title: "Value",
        description: `${memberRate} member wet rate, transparent pricing, no hidden fuel surcharges.`,
      },
    ],
  },
  instructorLead: {
    title: "Meet your CFI lead",
    intro:
      "Trygve mentors initial CFI candidates at Hornbill, with experience in instrument instruction, advanced maneuvers, and checkride preparation.",
    instructors: [
      {
        name: "Trygve",
        href: "/instructors/trygve/",
        focus: "CFI training, instrument instruction, and teaching technique",
      },
    ],
  },
  relatedPathways: {
    title: "Related pathways",
    items: [
      {
        title: "Commercial Pilot",
        description:
          "A Commercial Pilot certificate is required before starting CFI training.",
        href: "/programs/commercial-pilot/",
      },
      {
        title: "Instrument Rating",
        description:
          "Instrument privileges prepare you to teach instrument students and add a CFII later.",
        href: "/programs/instrument-rating/",
      },
      {
        title: "CFII add-on",
        description:
          "After your initial CFI, add instrument instruction privileges in the same PA28 fleet.",
        href: "/programs/cfii/",
      },
    ],
  },
  faq: [
    {
      id: "cfi-commercial-required",
      question: "Do I need a Commercial Pilot certificate to start CFI training?",
      answer:
        "Yes. An initial CFI candidate must hold a Commercial Pilot certificate with airplane category privileges, along with an Instrument Rating or instrument privileges.",
    },
    {
      id: "cfi-cfii-addon",
      question: "Does Hornbill offer CFII add-on training?",
      answer:
        "Yes. After you earn your initial CFI certificate, you can add instrument instruction privileges through our CFII program in the same PA28 fleet.",
    },
    {
      id: "cfi-spin-endorsement",
      question: "What is the spin proficiency endorsement?",
      answer:
        "The FAA requires CFI applicants to receive training in stall awareness, spin entry, spins, and spin recovery. Your instructor will sign you off once you can teach and demonstrate these safely.",
    },
    {
      id: "cfi-duration",
      question: "How long does CFI training usually take?",
      answer:
        "Full-time students typically finish in 4–6 weeks. Part-time students usually take 2–4 months. Pace depends on your prior teaching experience and how prepared you are for the FOI and FIA knowledge tests.",
    },
    {
      id: "cfi-instruct-at-hornbill",
      question: "Can I instruct at Hornbill after I earn my CFI?",
      answer:
        "Possibly. We hire based on student demand, instructional quality, and fit. If you train with us and perform well, we are happy to discuss instructing opportunities as they open.",
    },
    {
      id: "cfi-aircraft",
      question: "What aircraft will I train in?",
      answer:
        "You will train in our consistent PA28 fleet, including IFR-capable aircraft equipped with Garmin G5 units and WAAS GPS. Uniform equipment means you spend less time relearning panels and more time learning to teach.",
    },
  ] as FAQItem[],
  bottomCTA: {
    title: "Ready to teach the next generation of pilots?",
    primaryCta: "Book a CFI consultation",
    primaryHref: "/contact/?subject=CFI%20training",
    primaryAnalytics: "cfi_consultation_booking_started",
    secondaryCta: "See the fleet and rates",
    secondaryHref: "/fleet/",
  },
};
