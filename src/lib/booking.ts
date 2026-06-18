import {
  DISCOVERY_STEPS,
} from "@/content/booking";
import type {
  BookingFlowType,
  BookingStepId,
  DiscoveryFlightType,
} from "@/types/booking";

export const VALID_FLOWS: BookingFlowType[] = ["discovery", "lesson"];
export const VALID_DISCOVERY_TYPES: DiscoveryFlightType[] = [
  "standard",
  "tahoe",
  "gift",
];
export const VALID_BOOKING_STEPS: BookingStepId[] = DISCOVERY_STEPS.map(
  (s) => s.id
);

export interface InitialBookingState {
  flow: BookingFlowType | null;
  type: DiscoveryFlightType | null;
  step: BookingStepId;
  stepIndex: number;
  instructorSlug: string | null;
}

export function parseBookingFlow(
  value: string | null | undefined
): BookingFlowType | null {
  if (!value) return null;
  if (VALID_FLOWS.includes(value as BookingFlowType)) {
    return value as BookingFlowType;
  }
  return null;
}

export function parseDiscoveryType(
  value: string | null | undefined
): DiscoveryFlightType | null {
  if (!value) return null;
  if (VALID_DISCOVERY_TYPES.includes(value as DiscoveryFlightType)) {
    return value as DiscoveryFlightType;
  }
  return null;
}

export function parseBookingStep(
  value: string | null | undefined
): BookingStepId | null {
  if (!value) return null;
  if (VALID_BOOKING_STEPS.includes(value as BookingStepId)) {
    return value as BookingStepId;
  }
  return null;
}

export function getStepIndex(stepId: BookingStepId): number {
  return DISCOVERY_STEPS.findIndex((s) => s.id === stepId);
}

export function getStepByIndex(index: number): BookingStepId | null {
  return DISCOVERY_STEPS[index]?.id ?? null;
}

export function isValidDiscoveryStep(stepId: BookingStepId): boolean {
  return VALID_BOOKING_STEPS.includes(stepId);
}

export function isDiscoveryGift(type: DiscoveryFlightType | null): boolean {
  return type === "gift";
}

function readParam(
  params: URLSearchParams | null,
  key: string
): string | null {
  if (!params) return null;
  return params.get(key);
}

/**
 * Parses the current URL search params into an initial booking state.
 * Falls back to safe defaults when flow/type/step are missing or invalid.
 */
export function getInitialBookingState(
  params: URLSearchParams | null
): InitialBookingState {
  const flow = parseBookingFlow(readParam(params, "flow"));
  const type = parseDiscoveryType(readParam(params, "type"));
  const requestedStep = parseBookingStep(readParam(params, "step"));
  const instructorSlug = readParam(params, "instructor");

  let step: BookingStepId = "flight";

  if (flow === "discovery") {
    if (type === "gift") {
      step = requestedStep ?? "flight";
    } else if (requestedStep) {
      step = requestedStep;
    }
  } else if (flow === "lesson") {
    step = "flight";
  }

  const stepIndex = getStepIndex(step);

  return {
    flow,
    type,
    step,
    stepIndex,
    instructorSlug,
  };
}

/**
 * Returns the next step ID for a discovery flight booking, or null at confirmation.
 */
export function getNextStep(stepId: BookingStepId): BookingStepId | null {
  const index = getStepIndex(stepId);
  return DISCOVERY_STEPS[index + 1]?.id ?? null;
}

/**
 * Returns the previous step ID, or null at the first step.
 */
export function getPreviousStep(stepId: BookingStepId): BookingStepId | null {
  const index = getStepIndex(stepId);
  return DISCOVERY_STEPS[index - 1]?.id ?? null;
}
