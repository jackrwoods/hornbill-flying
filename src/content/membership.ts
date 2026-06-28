import type { FAQItem } from "@/types";
import { pricing, membershipRates } from "@/content/pricing";

const fleetHref = "/fleet/";
const discoveryFlightHref = "/discovery-flight/";
const contactHref = "/contact/";
const bookHref = "/book/";
const startMembershipHref = "/discovery-flight/";
const instrumentRatingHref = "/programs/instrument-rating/";

export const membershipContent = {
  meta: {
    title: "PA28 Aircraft Rental Membership in Reno, NV",
    description:
      `Join Hornbill Aviation's $${pricing.membershipMonthly}/month membership for a $${pricing.memberWetRate}/hr PA28 wet rate at RNO. Save $${membershipRates.savingsPerHour}/hr vs. the $${pricing.nonMemberWetRate}/hr non-member rate. No contract.`,
  },

  hero: {
    h1: "The smart way to train at RNO",
    headline: "Members save thousands with a Hornbill Aviation membership.",
    valueProp: `Get unlimited time in our FAA-certified CR-12 AATD, $${membershipRates.savingsPerHour}/hr off the non-member aircraft rate, priority scheduling, cross-country rental eligibility, and no contract.`,
    image: "/images/membership/membership-hero.webp",
    imageAlt:
      "Hornbill Aviation PA28 Cherokee on the ramp at Reno-Tahoe International Airport (RNO).",
    cta: {
      primary: {
        label: "Start membership",
        href: startMembershipHref,
        query: { flow: "membership" },
        analytics: "membership_signup_started",
      },
      secondary: {
        label: "See full fleet and rates",
        href: fleetHref,
      },
    },
  },

  quickAnswer: {
    title: "What is the Hornbill Aviation membership?",
    text: `Hornbill Aviation's membership is a $${pricing.membershipMonthly}/month subscription for pilots training or renting at Reno–Tahoe. Members pay $${pricing.memberWetRate}/hr wet for our PA28 fleet (billed as tach time × 1.3). That saves $${membershipRates.savingsPerHour}/hr over the non-member rate. There is no contract, and it includes priority scheduling, unlimited ground school, unlimited access to our FAA-certified CR-12 AATD, and cross-country rental eligibility. See the Instrument Rating page for details on AATD time creditable toward a rating.`,
  },

  story: {
    title: "The savings speak for themselves.",
    lede:
      "As a Hornbill Aviation member, you can save thousands on your training toward PPL, Instrument Rating, CPL, and CFI.",
    blocks: [
      {
        label: "Low-cost aircraft rental",
        body: `Only $${pricing.memberWetRate}/hr for aircraft. Save $${membershipRates.savingsPerHour}/hr on every aircraft hour.`,
        summary: `Over 250 aircraft hours (for CPL), that's a savings of $${250 * membershipRates.savingsPerHour}.`,
      },
      {
        label: "Save with the sim",
        body: "Hornbill Aviation's CR-12 AATD is FAA-certified and unlimited for members. Use it for 2.5 hours toward your PPL, 20 toward your instrument rating, and 50 toward your commercial.",
        summary: `Students who utilize all 72.5 hours will save almost $16,800 vs renting an aircraft.`,
      },
      {
        label: "Membership pays for itself",
        body: `The membership pays for itself after only 3 hours in an aircraft or 1 hour in the simulator.`,
      },
    ],
  },

  pricing: {
    monthlyLabel: "Monthly membership",
    memberRateLabel: "Member PA28 wet rate",
    nonMemberRateLabel: "Non-member PA28 wet rate",
    savingsLabel: "Savings",
    savingsText: `Save $${membershipRates.savingsPerHour}/hr on every flight hour.`,
    breakEvenText: `At about ${membershipRates.breakEvenHours} hours per month, the membership pays for itself.`,
    disclaimer:
      "Rates are subject to change. Rental availability depends on maintenance and schedule.",
  },

  benefits: {
    title: "What you get with membership",
    items: [
      {
        title: "Discounted PA28 wet rate",
        description: `Members fly the PA28 fleet at $${pricing.memberWetRate}/hr wet, $${membershipRates.savingsPerHour} less per hour than the non-member rate.`,
      },
      {
        title: "Unlimited CR-12 AATD access",
        description:
          "Members get unlimited time in our FAA-certified CR-12 Advanced Aviation Training Device. Up to 20 hours can count toward an Instrument Rating under 14 CFR §61.65(i). See the Instrument Rating page for details.",
      },
      {
        title: "Priority scheduling",
        description:
          "Members get first pick of aircraft and instructor slots when the schedule opens.",
      },
      {
        title: "12-hour cancellation window",
        description:
          "Cancel or reschedule most bookings with at least 12 hours' notice instead of the standard 24-hour window.",
      },
      {
        title: "Cross-country rental eligibility",
        description:
          "Rent the same PA28s you train in for real cross-country trips. IFR-equipped aircraft available for instrument flights.",
      },
      {
        title: "No long-term contract",
        description:
          "Membership is month to month. Cancel anytime — no annual commitment or cancellation fee.",
      },
    ],
  },

  signupCTA: {
    title: "Start flying for less this month.",
    supporting:
      "No contract. Cancel anytime. Sign up online and the member rate applies to your next flight.",
    primary: {
      label: "Start membership",
      href: startMembershipHref,
      query: { flow: "membership" },
      analytics: "membership_signup_started",
    },
    secondary: {
      label: "Questions? Call or text us",
    },
  },

  faqTitle: "Membership questions",

  links: {
    fleet: fleetHref,
    discoveryFlight: discoveryFlightHref,
    contact: contactHref,
    book: bookHref,
    instrumentRating: instrumentRatingHref,
  },
};

export const membershipFAQs: FAQItem[] = [
  {
    id: "included",
    question: `What is included in the $${pricing.membershipMonthly}/month membership?`,
    answer:
      "The membership lowers the PA28 wet rate to $159/hr, gives you priority scheduling, unlimited ground school access, unlimited access to our FAA-certified CR-12 AATD, a 12-hour booking cancellation window, and cross-country rental eligibility. It does not include instructor time or the aircraft rental hours themselves. See the Instrument Rating page for how AATD hours count toward a rating.",
  },
  {
    id: "savings",
    question: "How much do I save per flight hour?",
    answer:
      `Members pay $${pricing.memberWetRate}/hr wet for the PA28 fleet. Non-members pay $${pricing.nonMemberWetRate}/hr. That is a $${membershipRates.savingsPerHour}/hr savings, so the membership pays for itself at just under three flight hours per month.`,
  },
  {
    id: "contract",
    question: "Is there a contract or minimum commitment?",
    answer:
      "No. The membership is month to month. You can cancel anytime with no cancellation fee.",
  },
  {
    id: "non-members",
    question: "Can non-members still rent aircraft?",
    answer:
      `Yes. Non-members can rent the same PA28 fleet at the non-member wet rate of $${pricing.nonMemberWetRate}/hr. The membership is simply a way to save if you fly regularly.`,
  },
  {
    id: "instructor-fees",
    question: "Does the membership include instructor fees?",
    answer:
      "No. Flight and ground instruction are billed separately from aircraft rental. See the Fleet & Pricing page for current CFI rates.",
  },
  {
    id: "cross-country",
    question: "Can I use the member rate for cross-country rentals?",
    answer:
      "Yes. The member rate applies to all PA28 rental flights, including cross-country trips. IFR-equipped aircraft are available for instrument cross-countries.",
  },
  {
    id: "cancel",
    question: "How do I cancel or change my membership?",
    answer:
      "You can manage or cancel your membership through your account, or contact us by phone, text, or email. Changes take effect at your next billing cycle.",
  },
];
