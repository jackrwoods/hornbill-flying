import type { FAQItem } from "@/types";

export const cfiiProgram = {
  slug: "cfii",
  title: "CFII",
  fullTitle: "Certified Flight Instructor Instrument",
  metaTitle: "CFII Training in Reno, NV | Certified Flight Instructor Instrument",
  metaDescription:
    "Add instrument instruction to your CFI certificate at RNO. Part 61 CFII training in a PA28 fleet with real IFR experience. Contact Hornbill today.",
  hero: {
    title: "CFII training in Reno, NV.",
    subtitle:
      "Add instrument instruction to your CFI certificate. Teach approaches, holds, and partial-panel flying from Reno–Tahoe (RNO).",
    image: "/images/programs/cfii-hero.webp",
    imageAlt:
      "N6576J instrument panel with Garmin G5 and WAAS GPS at Reno-Tahoe International Airport",
  },
  quickAnswer:
    "Hornbill Flight Center offers Part 61 Certified Flight Instructor Instrument (CFII) training at Reno–Tahoe (RNO). You learn to teach instrument procedures in a consistent PA28 fleet, prepare for the Flight Instructor Instrument ACS, and add instrument instruction privileges to your existing CFI certificate.",
  benefits: {
    title: "What the CFII rating gives you",
    items: [
      {
        title: "Teach instrument flying",
        description:
          "Provide instrument flight instruction in aircraft and help students build real IFR proficiency.",
      },
      {
        title: "Endorse applicants",
        description:
          "Endorse instrument rating applicants for the practical test and the knowledge test.",
      },
      {
        title: "Conduct IPCs",
        description:
          "Run instrument proficiency checks for pilots who want to stay current and confident under IFR.",
      },
    ],
  },
  prerequisites: {
    title: "Prerequisites",
    intro:
      "CFII is an add-on to an existing CFI certificate. You must meet these requirements before starting training:",
    items: [
      "Hold a current CFI certificate with airplane category and single-engine class privileges.",
      "Hold at least a Private Pilot certificate with an Instrument Rating and instrument privileges current per 14 CFR 61.197 if giving instruction.",
      "Be able to read, speak, write, and understand English.",
      "Hold at least a third-class medical certificate, or operate within applicable BasicMed limitations.",
      "Meet the aeronautical experience and knowledge standards required to teach instrument flight.",
    ],
  },
  trainingEmphasis: {
    title: "Training emphasis",
    items: [
      "Teaching the instrument scan and attitude instrument flying.",
      "Approach briefings and teaching IFR approach procedures.",
      "Partial-panel and unusual attitude recovery instruction.",
      "Teaching holds, DME arcs, and missed approaches.",
      "Using simulators or a view-limiting device effectively with students.",
      "Evaluating student performance against the Flight Instructor Instrument ACS.",
    ],
  },
  practicalTestAreas: {
    title: "Required practical test areas",
    intro:
      "The CFII checkride follows the FAA Flight Instructor Instrument Airman Certification Standards. Your examiner will evaluate these areas:",
    items: [
      {
        title: "Fundamentals of instructing",
        description:
          "Reviewed if not already evaluated on your initial CFI; your CFI will confirm what the examiner expects for the add-on.",
      },
      {
        title: "Technical subject areas",
        description:
          "Aeromedical factors, regulations, airspace, navigation systems, flight instruments, and IFR flight planning.",
      },
      {
        title: "Preflight preparation and instruction",
        description:
          "Teaching students to plan, brief, and prepare for an instrument training flight.",
      },
      {
        title: "Preflight lesson on a maneuver",
        description:
          "Present and teach a maneuver your student will perform in flight.",
      },
      {
        title: "ATC clearances and procedures",
        description:
          "Teaching students to copy, read back, and comply with IFR clearances.",
      },
      {
        title: "Flight by reference to instruments",
        description:
          "Scan, interpretation, and aircraft control solely by reference to instruments.",
      },
      {
        title: "Navigation aids and ATC instructions",
        description:
          "Teaching tracking, intercepting, and complying with vectors and course guidance.",
      },
      {
        title: "Instrument approach procedures",
        description:
          "Approach briefings, procedure turns, descent management, and missed-approach execution.",
      },
      {
        title: "Emergency operations",
        description:
          "Teaching response to instrument and equipment failures under IFR.",
      },
      {
        title: "Postflight evaluation",
        description:
          "Debriefing students, identifying errors, and planning corrective instruction.",
      },
    ],
    disclaimer:
      "Your CFI will verify the exact ACS edition and task list for your checkride.",
  },
  timeline: {
    title: "Training timeline",
    intro:
      "CFII training is usually shorter than an initial CFI because you already have instructional experience.",
    options: [
      {
        label: "Part-time",
        schedule: "2–3 lessons per week",
        duration: "6–10 weeks",
      },
      {
        label: "Full-time intensive",
        schedule: "4–5 lessons per week",
        duration: "3–5 weeks",
      },
    ],
  },
  cost: {
    title: "Cost estimate",
    intro:
      "These numbers are a realistic starting point, not a guarantee. Your total depends on proficiency, preparation, and how much of the work you complete before the checkride.",
    rows: [
      { label: "PA28 member wet rate", value: "$159/hr" },
      { label: "PA28 non-member wet rate", value: "$185/hr" },
      { label: "Instructor rate", value: "$75–$95/hr" },
      { label: "Flight time (typical)", value: "15–25 hours" },
      { label: "Ground instruction", value: "10–15 hours" },
      { label: "Examiner fee", value: "$600–$900" },
      { label: "FIR written test", value: "$175" },
    ],
    totalRange: "$4,500–$7,500",
    note:
      "Membership lowers the aircraft rate to $159/hr. See fleet, membership, and financing pages for full details.",
  },
  whyHornbill: {
    title: "Why Hornbill for CFII",
    items: [
      {
        title: "Uniform PA28 fleet",
        description:
          "Train in IFR-capable PA28s with WAAS GPS and Garmin G5 units (N6576J, N7824W). Switching aircraft does not mean switching procedures.",
      },
      {
        title: "Real IFR environment",
        description:
          "RNO sits in Class C airspace at 4,403 ft, surrounded by the Sierra and high desert. You teach in actual mountain IFR conditions.",
      },
      {
        title: "Cross-country rentals",
        description:
          "After checkout, rent the same aircraft for real IFR cross-country trips and keep building instrument time.",
      },
      {
        title: "Flexible scheduling",
        description:
          "Part 61 training built around your teaching schedule. Choose the instructor and times that work for you.",
      },
    ],
  },
  relatedPathways: {
    title: "Related pathways",
    items: [
      {
        title: "Certified Flight Instructor",
        description: "Start with the CFI certificate, then add the instrument instructor rating.",
        href: "/programs/certified-flight-instructor/",
      },
      {
        title: "Instrument Rating",
        description: "See how we teach instrument students before you teach them yourself.",
        href: "/programs/instrument-rating/",
      },
    ],
  },
  faq: [
    {
      id: "cfii-cfi-required",
      question: "Do I need a CFI certificate before adding CFII?",
      answer:
        "Yes. CFII is an instructor rating add-on. You must already hold a current CFI certificate with airplane category privileges.",
    },
    {
      id: "cfii-teach-instrument",
      question: "Can I teach instrument flying with a CFII?",
      answer:
        "Yes. A CFII can provide instrument flight instruction in aircraft, endorse instrument rating applicants, and conduct instrument proficiency checks.",
    },
    {
      id: "cfii-vs-cfi-checkride",
      question: "How is the CFII checkride different from the initial CFI?",
      answer:
        "The CFII checkride focuses on instrument instruction and the Flight Instructor Instrument ACS. Because you already have instructional experience, it is typically shorter and more targeted than an initial CFI checkride.",
    },
    {
      id: "cfii-aircraft",
      question: "What aircraft will I use for CFII training?",
      answer:
        "You train in our IFR-capable PA28 fleet, including N6576J and N7824W, both equipped with WAAS GPS and Garmin G5 units.",
    },
    {
      id: "cfii-duration",
      question: "How long does CFII training take?",
      answer:
        "Part-time students typically finish in 6–10 weeks. Full-time intensive training can take 3–5 weeks. Pace depends on your instrument proficiency and instructional experience.",
    },
    {
      id: "cfii-part-time",
      question: "Can I train part-time while teaching as a CFI?",
      answer:
        "Yes. Part 61 training lets you schedule lessons around your own students. Many CFII candidates train while actively instructing.",
    },
    {
      id: "cfii-written",
      question: "What written tests are required?",
      answer:
        "You must pass the Flight Instructor Instrument — Airplane (FII) knowledge test before the practical test if you have not already taken it for a previous CFII.",
    },
    {
      id: "cfii-membership",
      question: "Does membership reduce the cost?",
      answer:
        "Yes. Members pay $159/hr wet for the PA28. Non-members pay $185/hr. At 6 hours per month, the $59 membership pays for itself.",
    },
    {
      id: "cfii-ipc",
      question: "Can a CFII conduct instrument proficiency checks?",
      answer:
        "Yes. A current CFII can conduct IPCs in aircraft for which they are instrument rated and appropriately certificated to instruct.",
    },
  ] as FAQItem[],
  bottomCTA: {
    title: "Ready to teach instrument flying?",
    primaryCta: "Talk to an instructor",
    primaryHref: "/contact/",
    secondaryCta: "Book a consultation",
    secondaryHref: "/discovery-flight/",
  },
};
