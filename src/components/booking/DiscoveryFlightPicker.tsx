"use client";

import { cn } from "@/lib/utils";
import {
  DISCOVERY_FLIGHT_TYPES,
} from "@/content/booking";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import type {
  DiscoveryFlightType,
  TimeSlot,
} from "@/types/booking";

interface DiscoveryFlightPickerProps {
  selectedType?: DiscoveryFlightType | null;
  onSelectType: (type: DiscoveryFlightType) => void;
  selectedSlot?: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot | null) => void;
  preferredInstructorSlug?: string | null;
  mode: "flight" | "datetime";
}

/**
 * Stub wrapper for the flight-type + date/time picker.
 * In production the booking widget ticket will replace this with a real
 * calendar fed by `/api/availability`.
 */
export function DiscoveryFlightPicker({
  selectedType,
  onSelectType,
  selectedSlot,
  onSelectSlot,
  preferredInstructorSlug,
  mode,
}: DiscoveryFlightPickerProps) {
  const { slots, loading } = useBookingAvailability({
    flightType: selectedType,
    instructorSlug: preferredInstructorSlug,
    enabled: mode === "datetime" && !!selectedType,
  });

  if (mode === "flight") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {DISCOVERY_FLIGHT_TYPES.filter((t) => !t.isGift).map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelectType(type.id)}
              className={cn(
                "flex flex-col rounded-xl border p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
                isSelected
                  ? "border-gold-500 bg-gold-500/10"
                  : "border-navy-800/10 bg-white hover:bg-cream-50"
              )}
              aria-pressed={isSelected}
            >
              <span className="font-heading text-xl text-navy-900">
                {type.label}
              </span>
              <span className="mt-1 text-sm text-ink-light">{type.duration}</span>
              <span className="mt-3 font-mono text-lg font-semibold text-navy-900">
                ${type.price}
              </span>
              <p className="mt-2 text-sm text-ink-light">{type.description}</p>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading && (
        <p className="text-ink-light">Loading available slots...</p>
      )}
      {!loading && slots.length === 0 && (
        <p className="text-ink-light">
          No slots available for the selected flight type. Choose a different
          option or call us.
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const date = new Date(slot.start);
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlot(isSelected ? null : slot)}
              className={cn(
                "rounded-lg border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
                isSelected
                  ? "border-gold-500 bg-gold-500/10"
                  : "border-navy-800/10 bg-white hover:bg-cream-50"
              )}
              aria-pressed={isSelected}
            >
              <span className="block font-semibold text-navy-900">
                {date.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="block text-sm text-ink-light">
                {date.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {" — "}
                {new Date(slot.end).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
              <span className="mt-1 block text-xs text-ink-light">
                {slot.instructorName} · {slot.aircraftTail}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
