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
    "Train in a consistent PA28 fleet, choose your instructor, and fly real cross-country routes from Reno–Tahoe (RNO).",
  ctaPrimary: "Book a discovery flight",
  ctaSecondary: "Buy a gift voucher",
  ctaSecondaryQuery: { type: "gift" },
  image: "/images/hero/hero-image.BhmeJT7E_Z1oh9we.webp",
  imageAlt:
    "PA28 Cherokee on the ramp at Reno-Tahoe International Airport (RNO)",
  imageWidth: 1920,
  imageHeight: 1280,
};

export const homepageTrustStrip = {
  items: [
    { id: "part-61-rno", label: "Part 61 school at RNO" },
    {
      id: "pa28-rate",
      label: `Wet PA28 rental from $${pricing.memberWetRate}/hr with membership`,
    },
    { id: "named-cfis", label: "4 named CFIs with certificate numbers" },
    { id: "cross-country", label: "Real cross-country rentals" },
  ],
};

export const homepageDifferentiators = [
  {
    id: "flexibility",
    title: "Flexibility",
    description:
      "Part 61 training means your schedule, your pace. Choose your instructor or bring your own.",
  },
  {
    id: "consistency",
    title: "Consistency",
    description:
      "One PA28 fleet, similarly equipped. Predictable handling and costs from first lesson to checkride.",
  },
  {
    id: "real-world",
    title: "Real-world experience",
    description:
      "Cross-country rentals from day one. Plan a route, file, and go — instead of repeating the same practice area.",
  },
  {
    id: "value",
    title: "Value",
    description:
      "$159/hr wet with membership. Transparent pricing, no fuel surcharge, no hidden fees.",
  },
];

export const homepageDiscoveryTeaser = {
  headline: `Discovery flight: $${pricing.discoveryFlight} for 45–60 minutes`,
  subtext:
    "No deposit required. You sit in the left seat, handle the controls, and decide if flying is for you.",
  bullets: [
    "Real aircraft at RNO",
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
  heading: "Built by pilots, for pilots",
  statement:
    "Hornbill Flight Center is a Part 61 school at Reno–Tahoe (RNO) built around student choice. Our instructors — Alex Rivera, Jordan Chen, Morgan Patel, and Taylor Brooks — are certificated flight instructors with experience in the Sierra and high-desert airspace around Reno.",
  highlights: [
    "Part 61 training with instructor choice",
    "Consistent PA28 fleet",
    "Real cross-country rentals from day one",
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
