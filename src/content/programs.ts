import type { Program } from "@/types";

export const programs: Program[] = [
  {
    slug: "sport-pilot",
    title: "Sport Pilot",
    shortDescription:
      "Earn a Sport Pilot certificate at your pace. Train in a consistent PA28 fleet, choose your CFI, and fly from Reno–Tahoe (RNO).",
    url: "/programs/sport-pilot/",
    icon: "sport-pilot",
    targetCertificate: "Sport Pilot Certificate",
    duration: "3–6 months part-time",
    costRange: "From $5,500 with membership",
  },
  {
    slug: "private-pilot",
    title: "Private Pilot",
    shortDescription:
      "Train for your Private Pilot checkride in a consistent PA28 fleet. Fly passengers anywhere in the U.S. under VFR.",
    url: "/programs/private-pilot/",
    icon: "private-pilot",
    targetCertificate: "Private Pilot Certificate",
    duration: "4–6 months",
    costRange: "From $12,000",
  },
  {
    slug: "instrument-rating",
    title: "Instrument Rating",
    shortDescription:
      "Add the rating that lets you fly in instrument conditions and through Class A airspace with confidence.",
    url: "/programs/instrument-rating/",
    icon: "instrument-rating",
    targetCertificate: "Instrument Rating",
    duration: "3–4 months",
    costRange: "From $9,500",
  },
  {
    slug: "commercial-pilot",
    title: "Commercial Pilot",
    shortDescription:
      "Prepare for a career in aviation. Build advanced maneuver proficiency and the aeronautical decision-making airlines value.",
    url: "/programs/commercial-pilot/",
    icon: "commercial-pilot",
    targetCertificate: "Commercial Pilot Certificate",
    duration: "4–6 months",
    costRange: "From $15,000",
  },
  {
    slug: "certified-flight-instructor",
    title: "Certified Flight Instructor",
    shortDescription:
      "Turn your experience into teaching. CFI training focuses on instruction technique, evaluations, and safety of flight.",
    url: "/programs/certified-flight-instructor/",
    icon: "cfi",
    targetCertificate: "Certified Flight Instructor Certificate",
    duration: "2–3 months",
    costRange: "From $5,000",
  },
  {
    slug: "cfii",
    title: "CFII",
    shortDescription:
      "Add the instrument instructor rating and teach instrument students in PA28s set up for IFR training.",
    url: "/programs/cfii/",
    icon: "cfii",
    targetCertificate: "Certified Flight Instructor Instrument Rating",
    duration: "1–2 months",
    costRange: "From $3,500",
  },
  {
    slug: "mountain-flying",
    title: "Mountain Flying",
    shortDescription:
      "A single-engine mountain and density-altitude course built for the Sierra Nevada and high-desert terrain around RNO.",
    url: "/programs/mountain-flying/",
    icon: "mountain-flying",
    targetCertificate: "Mountain Flying Course Certificate",
    duration: "2–3 days",
    costRange: "From $1,800",
  },
];
