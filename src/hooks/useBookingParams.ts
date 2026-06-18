"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getInitialBookingState,
  parseBookingFlow,
  parseDiscoveryType,
  parseBookingStep,
} from "@/lib/booking";
import type {
  BookingFlowType,
  BookingStepId,
  DiscoveryFlightType,
} from "@/types/booking";

interface UseBookingParamsReturn {
  flow: BookingFlowType | null;
  type: DiscoveryFlightType | null;
  step: BookingStepId;
  stepIndex: number;
  instructorSlug: string | null;
  setFlow: (flow: BookingFlowType | null) => void;
  setType: (type: DiscoveryFlightType | null) => void;
  setStep: (step: BookingStepId) => void;
  setInstructor: (instructorSlug: string | null) => void;
  clearFlow: () => void;
  /** Raw current search params string, useful for building links. */
  searchString: string;
}

/**
 * Reads and updates /book/ URL search params without a full page reload.
 * Preserves flow, type, step, and instructor selections in the URL.
 */
export function useBookingParams(): UseBookingParamsReturn {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initial = useMemo(
    () => getInitialBookingState(searchParams),
    [searchParams]
  );

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      router.replace(`/book/${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  const setFlow = useCallback(
    (flow: BookingFlowType | null) => {
      updateParams({
        flow: flow ?? null,
        type: null,
        step: null,
      });
    },
    [updateParams]
  );

  const setType = useCallback(
    (type: DiscoveryFlightType | null) => {
      updateParams({ type: type ?? null });
    },
    [updateParams]
  );

  const setStep = useCallback(
    (step: BookingStepId) => {
      updateParams({ step });
    },
    [updateParams]
  );

  const setInstructor = useCallback(
    (instructorSlug: string | null) => {
      updateParams({ instructor: instructorSlug ?? null });
    },
    [updateParams]
  );

  const clearFlow = useCallback(() => {
    updateParams({
      flow: null,
      type: null,
      step: null,
      instructor: null,
    });
  }, [updateParams]);

  const searchString = useMemo(
    () => searchParams?.toString() ?? "",
    [searchParams]
  );

  return {
    ...initial,
    setFlow,
    setType,
    setStep,
    setInstructor,
    clearFlow,
    searchString,
  };
}

export { parseBookingFlow, parseDiscoveryType, parseBookingStep };
