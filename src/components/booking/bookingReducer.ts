import { useReducer, useCallback } from "react";
import {
  DISCOVERY_STEPS,
  DEFAULT_BOOKING_FORM_DATA,
  DEFAULT_GIFT_VOUCHER_DATA,
} from "@/content/booking";
import { getStepIndex, getNextStep, getPreviousStep } from "@/lib/booking";
import type {
  BookingStepId,
  DiscoveryFlightType,
  TimeSlot,
  BookingFormData,
  GiftVoucherData,
} from "@/types/booking";

export interface BookingState {
  step: BookingStepId;
  stepIndex: number;
  type: DiscoveryFlightType | null;
  slot: TimeSlot | null;
  formData: BookingFormData;
  giftData: GiftVoucherData;
  reference: string | null;
  voucherCode: string | null;
  error: string | null;
}

export type BookingAction =
  | { type: "SELECT_TYPE"; payload: DiscoveryFlightType }
  | { type: "SELECT_SLOT"; payload: TimeSlot | null }
  | { type: "UPDATE_FORM"; payload: Partial<BookingFormData> }
  | { type: "UPDATE_GIFT"; payload: Partial<GiftVoucherData> }
  | { type: "GO_TO_STEP"; payload: BookingStepId }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "SET_REFERENCE"; payload: string }
  | { type: "SET_VOUCHER"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

function getInitialStep(type: DiscoveryFlightType | null): BookingStepId {
  if (type === "gift") return "details";
  return "flight";
}

export function createInitialBookingState(
  initialType: DiscoveryFlightType | null = null
): BookingState {
  const step = getInitialStep(initialType);
  return {
    step,
    stepIndex: getStepIndex(step),
    type: initialType,
    slot: null,
    formData: { ...DEFAULT_BOOKING_FORM_DATA },
    giftData: { ...DEFAULT_GIFT_VOUCHER_DATA },
    reference: null,
    voucherCode: null,
    error: null,
  };
}

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case "SELECT_TYPE": {
      const nextStep = action.payload === "gift" ? "details" : "datetime";
      return {
        ...state,
        type: action.payload,
        slot: null,
        step: nextStep,
        stepIndex: getStepIndex(nextStep),
        error: null,
      };
    }

    case "SELECT_SLOT":
      return {
        ...state,
        slot: action.payload,
        error: null,
      };

    case "UPDATE_FORM":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        error: null,
      };

    case "UPDATE_GIFT":
      return {
        ...state,
        giftData: { ...state.giftData, ...action.payload },
        error: null,
      };

    case "GO_TO_STEP": {
      const targetIndex = getStepIndex(action.payload);
      if (targetIndex < 0) return state;
      return {
        ...state,
        step: action.payload,
        stepIndex: targetIndex,
        error: null,
      };
    }

    case "NEXT_STEP": {
      const next = getNextStep(state.step);
      if (!next) return state;
      return {
        ...state,
        step: next,
        stepIndex: getStepIndex(next),
        error: null,
      };
    }

    case "PREVIOUS_STEP": {
      const prev = getPreviousStep(state.step);
      if (!prev) return state;
      return {
        ...state,
        step: prev,
        stepIndex: getStepIndex(prev),
        error: null,
      };
    }

    case "SET_REFERENCE":
      return {
        ...state,
        reference: action.payload,
        step: "confirmation",
        stepIndex: getStepIndex("confirmation"),
        error: null,
      };

    case "SET_VOUCHER":
      return {
        ...state,
        voucherCode: action.payload,
        step: "confirmation",
        stepIndex: getStepIndex("confirmation"),
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "RESET":
      return createInitialBookingState(null);

    default:
      return state;
  }
}

export function useBookingReducer(initialType: DiscoveryFlightType | null = null) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    createInitialBookingState(initialType)
  );

  const selectType = useCallback((type: DiscoveryFlightType) => {
    dispatch({ type: "SELECT_TYPE", payload: type });
  }, []);

  const selectSlot = useCallback((slot: TimeSlot | null) => {
    dispatch({ type: "SELECT_SLOT", payload: slot });
  }, []);

  const updateForm = useCallback((updates: Partial<BookingFormData>) => {
    dispatch({ type: "UPDATE_FORM", payload: updates });
  }, []);

  const updateGift = useCallback((updates: Partial<GiftVoucherData>) => {
    dispatch({ type: "UPDATE_GIFT", payload: updates });
  }, []);

  const goToStep = useCallback((step: BookingStepId) => {
    dispatch({ type: "GO_TO_STEP", payload: step });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const previousStep = useCallback(() => {
    dispatch({ type: "PREVIOUS_STEP" });
  }, []);

  const setReference = useCallback((reference: string) => {
    dispatch({ type: "SET_REFERENCE", payload: reference });
  }, []);

  const setVoucherCode = useCallback((code: string) => {
    dispatch({ type: "SET_VOUCHER", payload: code });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    state,
    dispatch,
    selectType,
    selectSlot,
    updateForm,
    updateGift,
    goToStep,
    nextStep,
    previousStep,
    setReference,
    setVoucherCode,
    setError,
    reset,
  };
}

export { DISCOVERY_STEPS };
