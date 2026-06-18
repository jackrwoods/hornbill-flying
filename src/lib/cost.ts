import { siteConfig } from "./config";
import type { CostInputs, CostProgram, CostResults, CostLineItem } from "./tools";

export const DEFAULT_INSTRUCTOR_RATE = 75;

export const costPrograms: CostProgram[] = [
  {
    slug: "sport-pilot",
    title: "Sport Pilot",
    minFlightHours: 20,
    maxFlightHours: 30,
    groundHours: 15,
    examFees: 500,
  },
  {
    slug: "private-pilot",
    title: "Private Pilot",
    minFlightHours: 40,
    maxFlightHours: 55,
    groundHours: 25,
    examFees: 700,
  },
  {
    slug: "instrument-rating",
    title: "Instrument Rating",
    minFlightHours: 35,
    maxFlightHours: 50,
    groundHours: 20,
    examFees: 600,
  },
  {
    slug: "commercial-pilot",
    title: "Commercial Pilot",
    minFlightHours: 120,
    maxFlightHours: 150,
    groundHours: 15,
    examFees: 700,
  },
  {
    slug: "certified-flight-instructor",
    title: "Certified Flight Instructor",
    minFlightHours: 15,
    maxFlightHours: 25,
    groundHours: 20,
    examFees: 600,
  },
  {
    slug: "cfii",
    title: "CFII",
    minFlightHours: 10,
    maxFlightHours: 20,
    groundHours: 10,
    examFees: 600,
  },
];

/**
 * Calculates a rough cost range and timeline for a given training program.
 *
 * Assumptions:
 * - Aircraft rental uses the member or non-member wet PA28 rate.
 * - Instructor time is billed for all flight hours plus ground hours.
 * - Membership is billed monthly for the estimated duration.
 * - Exam fees are a fixed estimate and may change with the DPE.
 */
export function estimateTrainingCost(inputs: CostInputs): CostResults {
  const program = costPrograms.find((p) => p.slug === inputs.programSlug);
  if (!program) {
    return {
      lowTotal: 0,
      highTotal: 0,
      weeksLow: 0,
      weeksHigh: 0,
      lineItems: [],
    };
  }

  const aircraftRate = inputs.isMember
    ? siteConfig.pricing.memberWetRate
    : siteConfig.pricing.nonMemberWetRate;

  const aircraftLow = program.minFlightHours * aircraftRate;
  const aircraftHigh = program.maxFlightHours * aircraftRate;

  const flightInstructionLow = program.minFlightHours * inputs.instructorRate;
  const flightInstructionHigh = program.maxFlightHours * inputs.instructorRate;
  const groundInstruction = program.groundHours * inputs.instructorRate;

  const weeksLow = Math.ceil(program.minFlightHours / inputs.hoursPerWeek);
  const weeksHigh = Math.ceil(program.maxFlightHours / inputs.hoursPerWeek);

  const membershipMonthsLow = Math.max(1, Math.ceil(weeksLow / 4));
  const membershipMonthsHigh = Math.max(1, Math.ceil(weeksHigh / 4));
  const membershipCost = inputs.isMember
    ? siteConfig.pricing.membershipMonthly * membershipMonthsHigh
    : 0;

  const examFees = program.examFees;

  const lineItems: CostLineItem[] = [
    { label: "Aircraft rental (wet)", low: aircraftLow, high: aircraftHigh },
    { label: "Flight instruction", low: flightInstructionLow, high: flightInstructionHigh },
    { label: "Ground instruction", low: groundInstruction, high: groundInstruction },
    { label: "Exam fees (estimate)", low: examFees, high: examFees },
  ];

  if (inputs.isMember) {
    lineItems.push({
      label: `Membership ($${siteConfig.pricing.membershipMonthly}/mo)`,
      low: siteConfig.pricing.membershipMonthly * membershipMonthsLow,
      high: membershipCost,
    });
  }

  const lowTotal = lineItems.reduce((sum, item) => sum + item.low, 0);
  const highTotal = lineItems.reduce((sum, item) => sum + item.high, 0);

  return {
    lowTotal: Math.round(lowTotal),
    highTotal: Math.round(highTotal),
    weeksLow,
    weeksHigh,
    lineItems: lineItems.map((item) => ({
      label: item.label,
      low: Math.round(item.low),
      high: Math.round(item.high),
    })),
  };
}

/**
 * Formats a dollar amount with a thousands separator.
 */
export function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}
