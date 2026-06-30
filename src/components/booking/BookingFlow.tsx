"use client";

import { useEffect, useRef, useState } from "react";
import { useBookingParams } from "@/hooks/useBookingParams";
import { trackBookingEvent } from "@/lib/booking-analytics";
import {
  DISCOVERY_STEPS,
  DEFAULT_BOOKING_FORM_DATA,
  DISCOVERY_FLIGHT_TYPES,
} from "@/content/booking";
import { getPublishedInstructors } from "@/content/instructors";
import { getNextStep, getPreviousStep, isDiscoveryGift } from "@/lib/booking";
import { BookingShell } from "./BookingShell";
import { BookingStep } from "./BookingStep";
import { BookingActions } from "./BookingActions";
import { BookingErrorBoundary } from "./BookingErrorBoundary";
import { FlowSelector } from "./FlowSelector";
import { DiscoveryFlightPicker } from "./DiscoveryFlightPicker";
import { InstructorSelector } from "./InstructorSelector";
import { BookingForm } from "./BookingForm";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationView } from "./ConfirmationView";
import { GiftVoucherFlow } from "./GiftVoucherFlow";
import { LessonSchedulingFlow } from "./LessonSchedulingFlow";
import type {
  DiscoveryFlightType,
  TimeSlot,
  BookingFormData,
} from "@/types/booking";

/**
 * Core booking state machine. Reads the initial flow/type/step/instructor from
 * the URL, manages the active sub-flow and current step, renders the correct
 * widget wrapper, and keeps the URL in sync.
 */
export function BookingFlow() {
  const {
    flow,
    type: urlType,
    step: currentStep,
    stepIndex,
    instructorSlug,
    setType,
    setStep,
    setInstructor,
    clearFlow,
  } = useBookingParams();

  const [selectedType, setSelectedType] = useState<DiscoveryFlightType | null>(
    urlType
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    ...DEFAULT_BOOKING_FORM_DATA,
    preferredInstructor: instructorSlug || "",
  });
  const [reference, setReference] = useState<string | null>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedType(urlType);
  }, [urlType]);

  useEffect(() => {
    if (instructorSlug) {
      setFormData((prev) => ({ ...prev, preferredInstructor: instructorSlug }));
    }
  }, [instructorSlug]);

  useEffect(() => {
    if (flow) {
      trackBookingEvent("booking_flow_started", {
        flow,
        type: selectedType || undefined,
        instructor: instructorSlug || undefined,
      });
    }
    // Only fire once when a flow first appears in the URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow]);

  useEffect(() => {
    if (flow) {
      trackBookingEvent("booking_step_changed", {
        flow,
        step: currentStep,
        step_index: stepIndex,
        type: selectedType || undefined,
      });
    }
    stepRef.current?.focus();
  }, [currentStep, flow, stepIndex, selectedType]);

  const publishedInstructorOptions = getPublishedInstructors().map((i) => ({
    slug: i.slug,
    name: i.name,
    title: i.title,
  }));

  const handleSelectType = (type: DiscoveryFlightType) => {
    setSelectedType(type);
    setType(type);
  };

  const handleSelectInstructor = (slug: string | null) => {
    setFormData((prev) => ({ ...prev, preferredInstructor: slug || "" }));
    setInstructor(slug);
  };

  const handleNext = () => {
    const next = getNextStep(currentStep);
    if (next) {
      if (next === "confirmation") {
        setReference(
          `Hornbill-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
        );
        trackBookingEvent("booking_completed", {
          flow,
          type: selectedType || undefined,
          instructor: formData.preferredInstructor || undefined,
        });
      }
      setStep(next);
    }
  };

  const handleBack = () => {
    const prev = getPreviousStep(currentStep);
    if (prev) {
      setStep(prev);
    }
  };

  const activeTypeConfig = DISCOVERY_FLIGHT_TYPES.find(
    (t) => t.id === selectedType
  );
  const depositAmount = activeTypeConfig ? 25 : 0;

  const renderDiscoveryContent = () => {
    if (isDiscoveryGift(selectedType)) {
      return (
        <GiftVoucherFlow
          onComplete={() =>
            trackBookingEvent("booking_completed", {
              flow: "discovery",
              type: "gift",
            })
          }
          onCancel={clearFlow}
        />
      );
    }

    switch (currentStep) {
      case "flight":
        return (
          <BookingStep
            ref={stepRef}
            title="Choose your flight type"
            description="Pick the discovery flight that fits your schedule and budget."
          >
            <BookingErrorBoundary>
              <DiscoveryFlightPicker
                mode="flight"
                selectedType={selectedType}
                onSelectType={handleSelectType}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            </BookingErrorBoundary>
            <BookingActions
              onCancel={clearFlow}
              onNext={handleNext}
              nextLabel="Continue"
              isNextDisabled={!selectedType}
            />
          </BookingStep>
        );
      case "datetime":
        return (
          <BookingStep
            ref={stepRef}
            title="Choose a date and time"
            description="Slots show aircraft and CFI availability."
          >
            <BookingErrorBoundary>
              <DiscoveryFlightPicker
                mode="datetime"
                selectedType={selectedType}
                onSelectType={handleSelectType}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                preferredInstructorSlug={formData.preferredInstructor}
              />
            </BookingErrorBoundary>
            <BookingActions
              onBack={handleBack}
              onCancel={clearFlow}
              onNext={handleNext}
              isNextDisabled={!selectedSlot}
            />
          </BookingStep>
        );
      case "details":
        return (
          <BookingStep
            ref={stepRef}
            title="Your details"
            description="We need this to confirm your flight and send updates."
          >
            <BookingErrorBoundary>
              <BookingForm value={formData} onChange={setFormData} />
              <div className="mt-6">
                <InstructorSelector
                  preferredInstructor={formData.preferredInstructor || null}
                  onSelect={handleSelectInstructor}
                  instructors={publishedInstructorOptions}
                />
              </div>
            </BookingErrorBoundary>
            <BookingActions
              onBack={handleBack}
              onCancel={clearFlow}
              onNext={handleNext}
              isNextDisabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.phone ||
                !formData.email
              }
            />
          </BookingStep>
        );
      case "payment":
        return (
          <BookingStep
            ref={stepRef}
            title="Payment"
            description="Pay a deposit now or the full amount. No deposit is required to book."
          >
            <BookingErrorBoundary>
              <PaymentStep
                amount={activeTypeConfig?.price || 0}
                depositAmount={depositAmount}
                onPayDeposit={handleNext}
                onPayFull={handleNext}
              />
            </BookingErrorBoundary>
            <BookingActions
              onBack={handleBack}
              onCancel={clearFlow}
              onNext={handleNext}
              nextLabel="Skip payment, book now"
            />
          </BookingStep>
        );
      case "confirmation":
        return (
          <BookingErrorBoundary>
            <ConfirmationView reference={reference || "Pending"} />
          </BookingErrorBoundary>
        );
      default:
        return null;
    }
  };

  const renderFlowContent = () => {
    if (!flow) {
      return (
        <>
          <h2 className="mb-6 font-heading text-2xl text-heading">
            What would you like to book?
          </h2>
          <FlowSelector />
        </>
      );
    }

    if (flow === "lesson") {
      return <LessonSchedulingFlow onCancel={clearFlow} />;
    }

    return renderDiscoveryContent();
  };

  return (
    <BookingShell
      title="Book your flight"
      subtitle="Choose a discovery flight, schedule training, or buy a gift voucher."
      steps={flow === "discovery" && !isDiscoveryGift(selectedType) ? DISCOVERY_STEPS : undefined}
      currentStepIndex={
        flow === "discovery" && !isDiscoveryGift(selectedType) ? stepIndex : undefined
      }
    >
      <div className="min-h-[24rem]">{renderFlowContent()}</div>
    </BookingShell>
  );
}
