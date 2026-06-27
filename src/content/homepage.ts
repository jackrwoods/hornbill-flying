import { siteConfig } from "@/lib/config";
import { pricing } from "@/content/pricing";
import type { Testimonial } from "@/types";

/**
 * Central homepage content file.
 * Keeps above-the-fold copy, proof strips, and social-proof data in one place
 * so the page composition and the reusable section components stay in sync.
 */

export const homepageHero = {
  h1: "Part 61 flight school in Reno, NV.",
  subheadline:
    "Earn your PPL, CPL, and CFI around scenic Lake Tahoe and the Sierra Nevada Mountains.",
  ctaPrimary: "Book a discovery flight",
  ctaSecondary: "Buy a gift voucher",
  ctaSecondaryQuery: { type: "gift" },
  image: "/images/hero/homepage-hero.jpeg",
  imageAlt:
    "Aerial view of airport runways with snow-capped mountains in the background near Reno, NV.",
  imageWidth: 1440,
  imageHeight: 1080,
};

export const homepageTrustStrip = {
  items: [
    { id: "part-61-rno", label: "Part 61 Flight Instruction at RNO" },
    {
      id: "pa28-rate",
      label: `Piper PA28 Cherokee rental from $${pricing.memberWetRate}/hr`,
    },
    { id: "named-cfis", label: "Meet our CFIs, or bring your own" },
    { id: "cross-country", label: "Take our planes on real cross-country trips" },
  ],
};

export const homepageDifferentiators = [
  {
    id: "value",
    title: "Value",
    description:
      "Just $159/hr wet with membership. Memberships include unlimited time in our FAA-certified AATD.",
  },
  {
    id: "community",
    title: "Community",
    description:
      "Hornbill is a flight school that's run not-for-profit, like a flying club.",
  },
  {
    id: "real-world",
    title: "Real-world experience",
    description:
      "Cross-country rentals are available. Plan a trip and take our planes on your next overnight adventure. Get real experience while time-building.",
  },
  {
    id: "well-equipped-aircraft",
    title: "Well-equipped aircraft",
    description:
      "Our PA28 fleet is equipped with Garmin avionics, ensuring a plane is always available from first lesson to checkride.",
  },
];

export const homepageDiscoveryTeaser = {
  headline: `Discovery flight: $${pricing.discoveryFlight} for 45–60 minutes`,
  subtext:
    "No deposit required. You sit in the left seat, handle the controls, and decide if flying is for you.",
  bullets: [
    "Take the controls of a real aircraft",
    "Choose your instructor",
    "Gift vouchers available",
  ],
  cta: "Book a discovery flight",
  secondaryCta: "Buy as a gift",
  secondaryQuery: { type: "gift" },
};

export const homepagePricingSnapshot = {
  rates: [
    { id: "membership", label: "Membership", value: `$${pricing.membershipMonthly}/month` },
    { id: "member-rate", label: "Member PA28 wet rate", value: `$${pricing.memberWetRate}/hr` },
    { id: "non-member-rate", label: "Non-member PA28 wet rate", value: `$${pricing.nonMemberWetRate}/hr` },
    { id: "discovery", label: "Discovery flight", value: `$${pricing.discoveryFlight}` },
  ],
  cta: "See full fleet and rates",
  ctaHref: "/fleet/",
};

// No real testimonials at launch; SocialProof will render the founder block.
export const homepageTestimonials: Testimonial[] = [];

export const homepageFounderCredibility = {
  heading: "A flying community founded by pilots.",
  statement:
    "Hornbill Aviation is a Part 61 school at Reno–Tahoe (RNO) built around value and student choice. Our certificated flight instructors have experience in the Sierra and high-desert airspace around Reno.",
  highlights: [
    "Part 61 training",
    "Well-equipped PA28 fleet",
    "The only school allowing you to bring your own CFI",
    "Real cross-country aircraft rentals",
  ],
  cta: "Book a discovery flight",
};

export const homepageFAQ = {
  heading: "Common questions",
};

export const homepageBlog = {
  heading: "From the blog",
  viewAllHref: "/blog/",
  viewAllLabel: "View all posts",
  maxPosts: 3,
};

export const homepageContact = {
  phone: siteConfig.nap.telephoneFormatted,
  email: siteConfig.nap.email,
};
