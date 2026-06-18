"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { parseDiscoveryType, isDiscoveryGift } from "@/lib/booking";
import { trackBookingEvent } from "@/lib/booking-analytics";
import { getPublishedInstructors } from "@/content/instructors";
import { DISCOVERY_STEPS } from "@/content/booking";
import { useBookingReducer } from "./bookingReducer";
import { BookingStepper } from "./BookingStepper";
import { FlightTypeSelector } from "./FlightTypeSelector";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { BookingForm } from "./BookingForm";
import { InstructorSelector } from "./InstructorSelector";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationView } from "./ConfirmationView";
import { GiftVoucherFlow } from "./GiftVoucherFlow";
import type {
  DiscoveryFlightType,
  TimeSlot,
  BookingFormData,
  GiftVoucherData,
} from "@/types/booking";
import type { BookingWidgetProps } from "./types";
import { ANALYTIC_EVENTS } from "./constants";

/**
 * Client container for the /discovery-flight/ booking widget.
 * Reads `?type=gift` from the URL, manages step state with a reducer,
 * renders the stepper, and coordinates the flight-type, calendar, form,
 * payment, and confirmation sub-components.
 */
export function BookingWidget({
  initialType: propType,
  mode = "discovery",
}: BookingWidgetProps) {
  const searchParams = useSearchParams();
  const urlType = parseDiscoveryType(searchParams?.get("type"));
  const initialType = propType || urlType || "standard";
  const isGift = isDiscoveryGift(initialType);

  const { state, ...actions } = useBookingReducer(
    isGift ? "gift" : initialType
  );

  const stepRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus();
    }
  }, [state.step]);

  useEffect(() => {
    if (state.type) {
      const event = isDiscoveryGift(state.type)
        ? ANALYTIC_EVENTS.giftVoucherStarted
        : ANALYTIC_EVENTS.bookingStarted;
      trackBookingEvent(event, {
        type: state.type,
        step: state.step,
        step_index: state.stepIndex,
      });
    }
    // Fire once on mount when the type is resolved from the URL/props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instructorOptions = getPublishedInstructors().map((i) => ({
    slug: i.slug,
    name: i.name,
    title: i.title,
  }));

  const handleSelectType = (type: DiscoveryFlightType) => {
    actions.selectType(type);
  };

  const handleSelectSlot = (slot: TimeSlot | null) => {
    actions.selectSlot(slot);
  };

  const handleFormChange = (value: BookingFormData) => {
    actions.updateForm(value);
  };

  const handleInstructorChange = (slug: string | null) => {
    actions.updateForm({ preferredInstructor: slug || "" });
  };

  const handleGiftChange = (value: GiftVoucherData) => {
    actions.updateGift(value);
  };

  const handlePaymentComplete = (reference: string) => {
    actions.setReference(reference);
    const event = isDiscoveryGift(state.type)
      ? ANALYTIC_EVENTS.giftVoucherCompleted
      : ANALYTIC_EVENTS.bookingCompleted;
    trackBookingEvent(event, {
      type: state.type || undefined,
      reference,
    });
  };

  const handlePaymentError = (error: string) => {
    actions.setError(error);
  };

  const renderStepContent = () => {
    if (isDiscoveryGift(state.type)) {
      return (
        <GiftVoucherFlow
          value={state.giftData}
          onChange={handleGiftChange}
          onComplete={handlePaymentComplete}
          onError={handlePaymentError}
        />
      );
    }

    switch (state.step) {
      case "flight":
        return (
          <div className="space-y-5">
            <h2
              ref={stepRef}
              tabIndex={-1}
              className="font-heading text-2xl text-navy-900 focus:outline-none"
            >
              Choose your flight type
            </h2>
            <p className="text-ink-light">
              Pick the discovery flight that fits your schedule and budget.
            </p>
            <FlightTypeSelector
              selectedType={state.type}
              onSelectType={handleSelectType}
              excludeGift={mode === "discovery"}
            />
            <p className="text-sm text-ink-light">
              Select a flight type to continue to date and time.
            </p>
          </div>
        );

      case "datetime":
        return (
          <div className="space-y-5">
            <h2
              ref={stepRef}
              tabIndex={-1}
              className="font-heading text-2xl text-navy-900 focus:outline-none"
            >
              Choose a date and time
            </h2>
            <p className="text-ink-light">
              Slots show aircraft and CFI availability.
            </p>
            <AvailabilityCalendar
              flightType={state.type}
              instructorSlug={state.formData.preferredInstructor}
              selectedSlot={state.slot}
              onSelectSlot={handleSelectSlot}
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={actions.previousStep}
                className="rounded-lg border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={actions.nextStep}
                disabled={!state.slot}
                className="rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="space-y-5">
            <h2
              ref={stepRef}
              tabIndex={-1}
              className="font-heading text-2xl text-navy-900 focus:outline-none"
            >
              Your details
            </h2>
            <p className="text-ink-light">
              We need this to confirm your flight and send updates.
            </p>
            <BookingForm value={state.formData} onChange={handleFormChange} />
            <div className="mt-6">
              <InstructorSelector
                preferredInstructor={state.formData.preferredInstructor || null}
                onSelect={handleInstructorChange}
                instructors={instructorOptions}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={actions.previousStep}
                className="rounded-lg border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={actions.nextStep}
                disabled={
                  !state.formData.firstName ||
                  !state.formData.lastName ||
                  !state.formData.phone ||
                  !state.formData.email
                }
                className="rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-5">
            <h2
              ref={stepRef}
              tabIndex={-1}
              className="font-heading text-2xl text-navy-900 focus:outline-none"
            >
              Payment
            </h2>
            <p className="text-ink-light">
              Pay a deposit now or the full amount. No deposit is required to book.
            </p>
            <PaymentStep
              amount={state.type === "tahoe" ? 299 : 199}
              depositAmount={50}
              flightType={state.type || "standard"}
              formData={state.formData}
              slot={state.slot}
              onComplete={handlePaymentComplete}
              onError={handlePaymentError}
            />
            <div className="flex justify-start">
              <button
                type="button"
                onClick={actions.previousStep}
                className="rounded-lg border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                Back
              </button>
            </div>
          </div>
        );

      case "confirmation":
        return (
          <ConfirmationView
            reference={state.reference || state.voucherCode || "Pending"}
            flightType={state.type || undefined}
            date={state.slot?.start}
            instructorName={state.slot?.instructorName}
            aircraftTail={state.slot?.aircraftTail}
            customerEmail={state.formData.email || state.giftData.purchaserEmail}
            isGift={isDiscoveryGift(state.type)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {!isDiscoveryGift(state.type) && (
        <BookingStepper
          steps={DISCOVERY_STEPS}
          currentIndex={state.stepIndex}
        />
      )}

      {state.error && (
        <div className="rounded-xl border border-error/20 bg-error/10 p-4" role="alert">
          <p className="text-sm text-error">{state.error}</p>
        </div>
      )}

      <div className="min-h-[20rem] rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm md:p-8">
        {renderStepContent()}
      </div>
    </div>
  );
}
