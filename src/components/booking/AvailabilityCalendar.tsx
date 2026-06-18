"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import type { DiscoveryFlightType, TimeSlot } from "@/types/booking";

interface AvailabilityCalendarProps {
  flightType: DiscoveryFlightType | null;
  instructorSlug?: string | null;
  selectedSlot?: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot | null) => void;
}

/**
 * Thumb-friendly date + time slot picker fed by /api/availability.
 * Shows loading, empty, and error states with large tap targets (≥ 44 px).
 */
export function AvailabilityCalendar({
  flightType,
  instructorSlug,
  selectedSlot,
  onSelectSlot,
}: AvailabilityCalendarProps) {
  const { slots, loading, error, refetch } = useBookingAvailability({
    flightType,
    instructorSlug,
    enabled: !!flightType,
  });

  const [ariaMessage, setAriaMessage] = useState("");

  const handleSelect = (slot: TimeSlot) => {
    const next = selectedSlot?.id === slot.id ? null : slot;
    onSelectSlot(next);
    setAriaMessage(
      next
        ? `Selected ${formatSlotDate(next.start)} at ${formatSlotTime(next.start)}`
        : "Selection cleared"
    );
  };

  const slotsByDate = groupSlotsByDate(slots);

  return (
    <div className="space-y-5">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {ariaMessage}
      </div>

      {loading && (
        <p className="text-ink-light" aria-live="polite">
          Loading available slots…
        </p>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-error/20 bg-error/10 p-4" role="alert">
          <p className="text-sm text-error">
            We could not load availability.{" "}
            <button
              type="button"
              onClick={refetch}
              className="font-semibold underline hover:text-navy-900"
            >
              Try again
            </button>
          </p>
        </div>
      )}

      {!loading && !error && slots.length === 0 && (
        <p className="text-ink-light">
          No slots available for the selected flight type. Choose a different
          option or call us to schedule.
        </p>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="space-y-6">
          {Object.entries(slotsByDate).map(([dateLabel, daySlots]) => (
            <div key={dateLabel}>
              <h3 className="font-heading text-lg text-navy-900">{dateLabel}</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {daySlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSelect(slot)}
                      className={cn(
                        "min-h-[3.25rem] min-w-[6.5rem] rounded-lg border px-3 py-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
                        isSelected
                          ? "border-gold-500 bg-gold-500/10"
                          : "border-navy-800/10 bg-white hover:bg-cream-50"
                      )}
                      aria-pressed={isSelected}
                    >
                      <span className="block font-semibold text-navy-900">
                        {formatSlotTime(slot.start)}
                      </span>
                      <span className="block text-xs text-ink-light">
                        {slot.instructorName} · {slot.aircraftTail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupSlotsByDate(slots: TimeSlot[]): Record<string, TimeSlot[]> {
  return slots.reduce((acc, slot) => {
    const label = formatSlotDate(slot.start);
    acc[label] = acc[label] || [];
    acc[label].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);
}

function formatSlotDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatSlotTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
