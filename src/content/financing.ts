import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";
import { membershipRates } from "@/content/pricing";

const { memberWetRate, nonMemberWetRate, membershipMonthly } = siteConfig.pricing;

export const financingContent = {
  meta: {
    title: "Flight Training Financing in Reno, NV",
    description:
      "Finance your flight training at Hornbill Aviation through Stratus Financial. See covered costs, how to apply, and sample monthly budgets at RNO.",
  },

  hero: {
    title: "Flight training financing in Reno, NV",
    subtitle:
      "Train now and pay over time. Hornbill partners with Stratus Financial to help qualified students cover the cost of certificates, ratings, and flight time.",
    reassurance: "No hidden fees. Transparent rates. Flexible scheduling.",
  },

  stratus: {
    name: "Stratus Financial",
    description:
      "Stratus Financial is a lender built for aviation training. They focus on the specific costs flight students face, from aircraft rental to examiner fees.",
    applyUrl: "https://stratusfinancial.com/",
    requirements:
      "Stratus financing may be available to U.S. citizens and permanent residents with qualifying credit. Approval decisions come directly from Stratus, not Hornbill.",
    howItWorks: [
      "Apply directly with Stratus Financial online.",
      "Stratus reviews your credit and training budget.",
      "Approved funds are disbursed to Hornbill as you progress through training.",
      "You sign off on lesson charges as they are applied to your account.",
    ],
  },

  coveredCosts: {
    title: "What flight training costs can be financed",
    intro:
      "Stratus loans can cover the expenses that make up most training budgets. Exact eligible expenses depend on your specific loan terms.",
    items: [
      {
        label: "Aircraft rental / flight time",
        description: "Wet hourly rates for PA28 time during lessons and solo flights.",
      },
      {
        label: "Flight instructor time",
        description: "Dual instruction in the air and ground instruction on the ground.",
      },
      {
        label: "Ground school and training materials",
        description: "Books, online ground school, study guides, and training supplements.",
      },
      {
        label: "FAA written exam fees",
        description: "Knowledge test fees for the certificate or rating you are pursuing.",
      },
      {
        label: "FAA checkride / examiner fees",
        description: "The practical test with a designated pilot examiner.",
      },
      {
        label: "Headset and pilot supplies",
        description: "Headset, logbook, charts, and other supplies if bundled in your Stratus-approved budget.",
      },
    ],
    note: "Exact eligible expenses depend on your Stratus loan terms. We review the budget with you before your first flight.",
  },

  paymentExpectations: {
    title: "How payments work at Hornbill",
    intro:
      "You do not need to pay for an entire certificate upfront. We keep payments simple and predictable.",
    items: [
      {
        label: "Pay-as-you-go",
        description:
          "Students pay after each lesson or as their account balance reaches a small threshold. No large lump sum is required unless your financing covers it.",
      },
      {
        label: "Account deposit",
        description:
          "New students start with a modest deposit — typically $500–$1,000 — to keep the account active. Exact amount is confirmed during enrollment.",
      },
      {
        label: "Financed students",
        description:
          "Stratus disburses funds to the school. You sign off on lesson charges as they are applied to your account.",
      },
      {
        label: "Non-financed students",
        description:
          "We accept credit card, debit, or ACH. Payment is due at time of service or per your deposit balance.",
      },
      {
        label: "Cancellation policy",
        description:
          "Cancellations inside 24 hours may be charged at the instructor and aircraft rate. See our full cancellation and refund policy for details.",
      },
    ],
    disclaimer:
      "Loan approval and terms are determined by Stratus Financial. Hornbill does not guarantee financing eligibility or specific rates.",
  },

  budgetScenarios: {
    title: "Sample monthly training budgets",
    intro:
      "Budgets vary by how often you fly, your membership status, and how much ground school you do at home. These are sample ranges, not quotes.",
    columns: [
      { key: "scenario", label: "Scenario" },
      { key: "flights", label: "Flights / month" },
      { key: "cost", label: "Approx. monthly flight cost*" },
      { key: "notes", label: "Notes" },
    ],
    scenarios: [
      {
        name: "Part-time",
        frequency: "2 flights/week",
        hoursPerMonth: 8,
        memberMonthlyEstimate: 8 * memberWetRate,
        nonMemberMonthlyEstimate: 8 * nonMemberWetRate,
        note: "Steady, lower monthly pressure. Good for students flying on weekends or around a full-time job.",
      },
      {
        name: "Moderate",
        frequency: "3 flights/week",
        hoursPerMonth: 12,
        memberMonthlyEstimate: 12 * memberWetRate,
        nonMemberMonthlyEstimate: 12 * nonMemberWetRate,
        note: "Faster progress; a good pace for students targeting a certificate in 6–9 months.",
      },
      {
        name: "Accelerated",
        frequency: "5+ flights/week",
        hoursPerMonth: 20,
        memberMonthlyEstimate: 20 * memberWetRate,
        nonMemberMonthlyEstimate: 20 * nonMemberWetRate,
        note: "Full-time pace; financing often makes cash flow manageable.",
      },
    ],
    footnote: `*Sample assumes member rate of $${memberWetRate}/hr wet and non-member rate of $${nonMemberWetRate}/hr wet, plus estimated instructor time. Rates and instructor fees are subject to change; see the Fleet & Pricing page for current pricing.`,
    membershipNote: `Add $${membershipMonthly}/month for membership. Membership pays for itself at about ${membershipRates.breakEvenHours} flight hours per month.`,
  },

  faqTitle: "Financing questions",

  cta: {
    title: "Ready to plan your training budget?",
    primary: {
      label: "Book a discovery flight",
      href: "/discovery-flight/",
      analytics: "discovery_flight_booking_started",
    },
    secondary: {
      label: "See Private Pilot training",
      href: "/programs/private-pilot/",
    },
    tertiary: {
      label: "Call us",
      href: "tel:+15555551234",
    },
  },

  links: {
    fleet: "/fleet/",
    membership: "/membership/",
    privatePilot: "/programs/private-pilot/",
    discoveryFlight: "/discovery-flight/",
    cancellationPolicy: "/cancellation-policy/",
    stratus: "https://stratusfinancial.com/",
  },
};

export const financingFAQs: FAQItem[] = [
  {
    id: "finance-entire-ppl",
    question: "Can I finance my entire private pilot license?",
    answer:
      "Many students use Stratus Financial to cover the bulk of their Private Pilot training, including aircraft rental, instructor time, materials, written exam fees, and checkride costs. Exact coverage depends on your approved loan terms.",
  },
  {
    id: "apply-stratus",
    question: "How do I apply for Stratus Financial flight training financing?",
    answer:
      "Apply directly on the Stratus Financial website. You choose Hornbill Aviation as your school and submit the requested financial information. Stratus makes the approval decision and contacts you with next steps.",
  },
  {
    id: "what-costs-covered",
    question: "What flight training costs are covered by Stratus Financial?",
    answer:
      "Stratus loans typically cover aircraft rental, flight instructor time, ground school and training materials, FAA written exam fees, FAA checkride fees, and pilot supplies if they are included in your approved budget.",
  },
  {
    id: "credit-requirements",
    question: "Do I need good credit to qualify for flight training financing?",
    answer:
      "Stratus Financial evaluates your credit as part of the application. Options may be available for U.S. citizens and permanent residents with qualifying credit. Contact Stratus directly to discuss your specific situation and current requirements.",
  },
  {
    id: "finance-discovery-flight",
    question: "Can I finance a discovery flight?",
    answer:
      "Discovery flights are usually paid directly at the time of booking or at the flight. They are typically not financed through Stratus, since they are a single introductory experience rather than part of a training certificate budget.",
  },
  {
    id: "deposit-required",
    question: "Is there a deposit required to start flight training at Hornbill?",
    answer:
      "New students generally start with a modest deposit — often $500–$1,000 — to keep the account active. Your exact deposit is confirmed during enrollment, and pay-as-you-go billing keeps the rest manageable.",
  },
  {
    id: "pay-as-you-go",
    question: "How does pay-as-you-go training work?",
    answer:
      "You pay after each lesson or when your account balance reaches a small threshold. There is no requirement to pay for the full certificate upfront unless your financing plan covers it.",
  },
  {
    id: "combine-membership",
    question: "Can I combine financing with a membership for lower hourly rates?",
    answer:
      "Yes. A $49/month membership lowers the PA28 wet rate from $180/hr to $159/hr. If you are financing your training, lower hourly rates reduce the total loan amount needed and can make your monthly cash flow easier.",
  },
];
