import type { ToolMeta, ToolFAQItem, SampleRoute } from "@/lib/tools";
import { membershipRates } from "@/content/pricing";

export const tools: ToolMeta[] = [
  {
    slug: "metar",
    title: "KRNO METAR & TAF",
    shortDescription: "Current observation and forecast for Reno–Tahoe, decoded in plain language.",
    href: "/tools/metar/",
    icon: "cloud",
  },
  {
    slug: "density-altitude",
    title: "Density altitude calculator",
    shortDescription: "Estimate pressure altitude and density altitude at RNO and other fields.",
    href: "/tools/density-altitude/",
    icon: "gauge",
  },
  {
    slug: "cross-country-estimator",
    title: "Cross-country estimator",
    shortDescription: "Estimate straight-line flight time and fuel for PA28 trips from RNO.",
    href: "/tools/cross-country-estimator/",
    icon: "route",
  },
  {
    slug: "sunrise-sunset",
    title: "RNO sunrise & sunset",
    shortDescription: "Today’s sunrise, sunset, and civil twilight times for Reno–Tahoe.",
    href: "/tools/sunrise-sunset/",
    icon: "sun",
  },
  {
    slug: "practice-area-map",
    title: "Practice area map",
    shortDescription: "Common training areas and nearby airports around RNO.",
    href: "/tools/practice-area-map/",
    icon: "map",
  },
  {
    slug: "cost-estimator",
    title: "Flight training cost estimator",
    shortDescription: "See a rough cost range and timeline for your target certificate.",
    href: "/tools/cost-estimator/",
    icon: "calculator",
  },
];

export const metarFaqs: ToolFAQItem[] = [
  {
    id: "what-is-metar",
    question: "What is a METAR?",
    answer:
      "A METAR is a routine aviation weather report. It gives pilots a snapshot of wind, visibility, clouds, temperature, dew point, and altimeter setting at an airport.",
  },
  {
    id: "what-is-taf",
    question: "What is a TAF?",
    answer:
      "A TAF is a terminal aerodrome forecast. It predicts wind, visibility, clouds, and significant weather for a roughly 24-hour window near an airport.",
  },
  {
    id: "how-often-updated",
    question: "How often is this data updated?",
    answer:
      "METARs are usually issued hourly, with special updates when conditions change quickly. TAFs are typically updated every 6 hours. This page refreshes data from NOAA every 60 seconds.",
  },
  {
    id: "preflight-briefing",
    question: "Can I use this for my pre-flight briefing?",
    answer:
      "No. This is a quick reference only. Get an official briefing from the FAA Aviation Weather Center or your preferred flight service station before every flight.",
  },
];

export const densityFaqs: ToolFAQItem[] = [
  {
    id: "why-density-altitude-matters",
    question: "Why does density altitude matter at RNO?",
    answer:
      "RNO sits at 4,415 ft. Hot summer days can push density altitude well above 6,000 ft, meaning longer takeoff rolls, reduced climb rate, and less margin over terrain.",
  },
  {
    id: "what-is-pressure-altitude",
    question: "What is pressure altitude?",
    answer:
      "Pressure altitude is what the altimeter reads when it is set to 29.92 inHg. It removes local altimeter setting from the equation so performance calculations can be compared against charts.",
  },
  {
    id: "how-accurate",
    question: "How accurate is this estimate?",
    answer:
      "This tool gives a useful rule-of-thumb. Always verify density altitude with your POH performance charts and current conditions before takeoff.",
  },
];

export const fuelFaqs: ToolFAQItem[] = [
  {
    id: "wind-and-routing",
    question: "Does this include wind and routing?",
    answer:
      "You can add an average wind component. It does not include climbs, descents, turns, or terrain routing. Use the result as a starting estimate, not a flight plan.",
  },
  {
    id: "fuel-reserve",
    question: "How is the fuel reserve calculated?",
    answer:
      "The tool adds a 30-minute day VFR reserve based on your entered fuel burn. Night flights and IFR require a 45-minute reserve per FAA regulations.",
  },
  {
    id: "rent-pa28",
    question: "Can I rent a PA28 for these trips?",
    answer:
      "Yes. Hornbill Aviation members rent the PA28 fleet at $159/hour wet. A checkout flight is required before cross-country rentals.",
  },
];

export const solarFaqs: ToolFAQItem[] = [
  {
    id: "what-is-civil-twilight",
    question: "What is civil twilight?",
    answer:
      "Civil twilight is the period when the sun is 6 degrees below the horizon. For VFR, your last legal landing without night currency is the end of evening civil twilight.",
  },
  {
    id: "last-legal-evening-flight",
    question: "When is the last legal evening flight?",
    answer:
      "For VFR landings without night currency, plan to be on the ground by the end of evening civil twilight. This tool labels that time as the last legal evening flight.",
  },
  {
    id: "exact-for-ramp",
    question: "Are these times exact for the ramp at RNO?",
    answer:
      "Times are calculated for RNO’s latitude and longitude. Local terrain can shift sunrise or sunset by a few minutes, so treat these as close estimates.",
  },
];

export const practiceAreaFaqs: ToolFAQItem[] = [
  {
    id: "where-is-practice-area",
    question: "Where is the practice area relative to RNO?",
    answer:
      "The common practice area lies northeast of RNO over the desert, outside the Class C shelf. Always confirm the current sectional chart and NOTAMs before departing.",
  },
  {
    id: "nearby-airports",
    question: "What airports are nearby for touch-and-go practice?",
    answer:
      "Reno Stead (KRTS), Minden (KMLC), Lovelock (KLOL), and Sparks (KSPZ) are all within reach. Check runway conditions, pattern direction, and any local procedures.",
  },
  {
    id: "map-current",
    question: "Is this map current for airspace?",
    answer:
      "No. This is a simplified training reference. Always use the current sectional chart, TFRs, and NOTAMs for actual flight planning.",
  },
];

export const costFaqs: ToolFAQItem[] = [
  {
    id: "cost-accuracy",
    question: "How accurate is this estimate?",
    answer:
      "It is a rough range based on typical flight hours and our published rates. Your actual cost depends on how often you fly, how quickly you progress, examiner fees, and any extra ground instruction.",
  },
  {
    id: "what-is-included",
    question: "What is included in the cost?",
    answer:
      "The estimate includes aircraft rental at the wet member or non-member rate, instructor time for flight and ground lessons, exam fees, and membership if selected. It does not include medical, headset, or chart subscriptions.",
  },
  {
    id: "membership-saves",
    question: "Does membership really save money?",
    answer:
      `At $${membershipRates.monthly}/month and a $${membershipRates.savingsPerHour}/hour aircraft discount, membership pays for itself at about ${membershipRates.breakEvenHours} flight hours per month. Train more often and the savings add up quickly.`,
  },
];

export const sampleRoutes: SampleRoute[] = [
  {
    name: "RNO → Tahoe",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KTVL",
    destinationName: "Lake Tahoe",
  },
  {
    name: "RNO → Monterey",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KMRY",
    destinationName: "Monterey",
  },
  {
    name: "RNO → Bend",
    origin: "RNO",
    originName: "Reno–Tahoe",
    destination: "KBDN",
    destinationName: "Bend",
  },
];

export const widgetDefaults = {
  densityAltitude: {
    elevationFt: 4403,
    altimeterInHg: 29.92,
    temperatureF: 59,
  },
  fuelEstimator: {
    origin: "RNO",
    cruiseSpeedKt: 115,
    fuelBurnGph: 9,
    windComponentKt: 0,
  },
  costEstimator: {
    programSlug: "private-pilot",
    hoursPerWeek: 2,
    isMember: true,
    instructorRate: 75,
  },
};
