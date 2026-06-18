import type { NAP, FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";
import { routeMap } from "@/lib/routes";

export interface CancellationPolicy {
  effectiveDate: string;
  // TODO: operator approval — confirm actual windows and fees before launch.
  discoveryWindow: string;
  discoveryLateFee: string;
  lessonWindow: string;
  membershipPolicy: {
    summary: string;
    items: string[];
  };
  weatherPolicy: {
    summary: string;
    items: string[];
  };
  refundPolicy: {
    summary: string;
    items: string[];
  };
  giftVoucherPolicy: {
    summary: string;
    items: string[];
  };
  faq: FAQItem[];
  nap: NAP;
  cta: {
    primary: { label: string; href: string; analytics: string };
    secondary: { label: string; href: string };
  };
}

export const cancellationPolicy: CancellationPolicy = {
  effectiveDate: "June 18, 2026",
  // TODO: operator approval — confirm actual cancellation window before launch.
  discoveryWindow: "24 hours before your scheduled flight",
  // TODO: operator approval — confirm late cancellation fee amount before launch.
  discoveryLateFee: "the full discovery flight deposit",
  lessonWindow: "24 hours before your scheduled lesson",
  membershipPolicy: {
    summary:
      "Membership is month-to-month. You can cancel anytime with no long-term contract.",
    items: [
      "Cancel anytime through your account or by contacting the office.",
      "No cancellation fee.",
      // TODO: operator approval — confirm whether prorated refunds or partial-month credits apply.
      "Prorated refunds are not offered for partial months unless required by law.",
    ],
  },
  weatherPolicy: {
    summary:
      "If weather or aircraft availability makes a flight unsafe, we reschedule at no charge or offer a full refund. The instructor or pilot in command makes the final call.",
    items: [
      "We monitor conditions including wind, ceiling, visibility, density altitude, and aircraft maintenance status.",
      "If a flight is cancelled for weather or maintenance, we notify you as early as possible.",
      "Examples that may cancel a flight: high surface winds, low ceilings, reduced visibility, density-altitude concerns, or unscheduled maintenance.",
    ],
  },
  refundPolicy: {
    summary:
      "Refunds are returned to the original payment method. Processing times depend on your bank or card issuer.",
    items: [
      "Eligible refunds are issued to the card or account used for the original purchase.",
      "Most refunds appear within 5 to 10 business days.",
      "Gift vouchers are refunded as voucher credit unless otherwise required.",
    ],
  },
  giftVoucherPolicy: {
    summary:
      "Discovery flight gift vouchers do not expire and can be transferred to another person.",
    items: [
      "Vouchers do not expire.",
      "The recipient books through the standard discovery flight flow.",
      "Rescheduling follows the same 24-hour window as standard discovery flights.",
    ],
  },
  faq: [
    {
      id: "running-late",
      question: "What if I'm running late?",
      answer:
        "Call or text the office as soon as you can. If you arrive too late to complete the preflight briefing and scheduled flight safely, we may need to reschedule and apply the late cancellation policy.",
    },
    {
      id: "reschedule-online",
      question: "Can I reschedule my discovery flight online?",
      answer:
        "Yes. Use the reschedule link in your confirmation email, or call the office. Changes made at least 24 hours in advance are free.",
    },
    {
      id: "weather-conditions",
      question: "What weather conditions cancel a flight?",
      answer:
        "Common reasons include high winds, low ceilings, poor visibility, density-altitude concerns, and aircraft maintenance. Your instructor makes the final decision based on safety.",
    },
    {
      id: "voucher-expiration",
      question: "Do gift vouchers expire?",
      answer: "No. Discovery flight gift vouchers do not expire and can be transferred to someone else.",
    },
    {
      id: "membership-cancellation",
      question: "What is the membership cancellation policy?",
      answer:
        "You can cancel your month-to-month membership anytime. There is no long-term contract and no cancellation fee. Contact the office or manage it through your account.",
    },
  ],
  nap: siteConfig.nap,
  cta: {
    primary: {
      label: "Book a discovery flight",
      href: routeMap.find((r) => r.slug === "discovery-flight")!.href,
      analytics: "discovery_flight_booking_started",
    },
    secondary: {
      label: "Contact us",
      href: routeMap.find((r) => r.slug === "contact")!.href,
    },
  },
};
