import { siteConfig } from "@/lib/config";
import { programs } from "@/content/programs";
import type { FAQItem } from "@/types";
import type {
  BookingStepDefinition,
  DiscoveryFlightTypeConfig,
  FlowSelectorOption,
} from "@/types/booking";

export const DISCOVERY_STEPS: BookingStepDefinition[] = [
  { id: "flight", label: "Flight type", short: "Type" },
  { id: "datetime", label: "Date & time", short: "When" },
  { id: "details", label: "Your details", short: "Info" },
  { id: "payment", label: "Payment", short: "Pay" },
  { id: "confirmation", label: "Confirmation", short: "Done" },
];

export const DISCOVERY_FLIGHT_TYPES: DiscoveryFlightTypeConfig[] = [
  {
    id: "standard",
    label: "Standard discovery flight",
    description:
      "A 45–60 minute introductory flight around the Reno area. You sit in the left seat and handle the controls with a CFI.",
    duration: "45–60 minutes",
    price: siteConfig.pricing.discoveryFlight,
    deposit: 0,
    isGift: false,
  },
  {
    id: "tahoe",
    label: "Tahoe scenic discovery flight",
    description:
      "A longer 75-minute flight with views of Lake Tahoe and the Sierra. You still handle the controls under CFI guidance.",
    duration: "75 minutes",
    price: siteConfig.pricing.discoveryFlight + 100,
    deposit: 0,
    isGift: false,
  },
  {
    id: "gift",
    label: "Gift voucher",
    description:
      "Buy a discovery flight as a gift. The recipient books a date that works for them.",
    duration: "Valid for 12 months",
    price: siteConfig.pricing.discoveryFlight,
    deposit: 0,
    isGift: true,
  },
];

export const DEFAULT_BOOKING_FORM_DATA = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  weight: "",
  preferredInstructor: "",
  notes: "",
};

export const DEFAULT_GIFT_VOUCHER_DATA = {
  purchaserName: "",
  purchaserEmail: "",
  purchaserPhone: "",
  recipientName: "",
  recipientMessage: "",
  delivery: "email" as const,
};

export const CANCELLATION_WEATHER_POLICY =
  "You can cancel or reschedule up to 24 hours before your discovery flight. If weather is below VFR minimums or the aircraft is unavailable, we will reschedule at no charge.";

export const WHAT_TO_EXPECT_ITEMS = [
  "Arrive 15 minutes early to meet your instructor and sign a waiver.",
  "Spend 45–60 minutes in the left seat of a PA28 with a certificated flight instructor.",
  "Handle the controls, ask questions, and decide if flying is for you.",
  "No deposit or commitment is required for a standard discovery flight.",
];

export const FLOW_SELECTOR_OPTIONS: FlowSelectorOption[] = [
  {
    id: "discovery",
    label: "Discovery flight",
    description: "Book a 45–60 minute introductory flight in a PA28 at RNO.",
    href: "/book/?flow=discovery",
  },
  {
    id: "lesson",
    label: "Schedule a lesson",
    description:
      "Reserve recurring flight training with the CFI and schedule that fit you.",
    href: "/book/?flow=lesson",
    comingSoon: true,
  },
  {
    id: "gift",
    label: "Gift voucher",
    description:
      "Buy a discovery flight gift voucher. The recipient books their own date.",
    href: "/book/?flow=discovery&type=gift",
  },
];

export const RELATED_PROGRAM_LINKS = programs
  .filter((p) => ["private-pilot", "sport-pilot", "instrument-rating"].includes(p.slug))
  .map((p) => ({
    slug: p.slug,
    label: p.title,
    href: p.url,
    description: p.shortDescription,
  }));

export const BOOKING_FAQ: FAQItem[] = [
  {
    id: "booking-cancel",
    question: "What if I need to cancel or reschedule?",
    answer:
      "You can cancel or reschedule up to 24 hours before your flight. If weather is below VFR minimums, we will reschedule at no charge.",
  },
  {
    id: "booking-deposit",
    question: "Do I pay a deposit for a discovery flight?",
    answer:
      "No. Standard discovery flights do not require a deposit. You can pay at the flight or prepay in full during booking.",
  },
  {
    id: "booking-weight",
    question: "Why do you ask for my weight?",
    answer:
      "Weight helps us plan the flight within the PA28's weight and balance limits. It is optional and kept private.",
  },
  {
    id: "booking-guest",
    question: "Can I bring a guest?",
    answer:
      "Discovery flights are one student and one instructor in the PA28. There is not room for an additional passenger.",
  },
  {
    id: "booking-gift-redeem",
    question: "How does a gift voucher work?",
    answer:
      "You buy the voucher online. The recipient receives a code and books a discovery flight at a time that works for them.",
  },
];
