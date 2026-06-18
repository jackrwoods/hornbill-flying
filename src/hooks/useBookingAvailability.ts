"use client";

import { useEffect, useMemo, useState } from "react";
import type { TimeSlot } from "@/types/booking";
import { instructors } from "@/content/instructors";

interface UseBookingAvailabilityOptions {
  /** The selected discovery-flight type. */
  flightType: string | null | undefined;
  /** Optional preferred instructor slug. */
  instructorSlug?: string | null;
  /** Whether the hook should fetch data. */
  enabled: boolean;
}

interface UseBookingAvailabilityReturn {
  slots: TimeSlot[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Stub hook that returns mock availability slots for the booking widget.
 * In production this will call `/api/availability` with the selected
 * flight type, date range, and instructor preference.
 */
export function useBookingAvailability({
  flightType,
  instructorSlug,
  enabled,
}: UseBookingAvailabilityOptions): UseBookingAvailabilityReturn {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const eligibleInstructors = useMemo(() => {
    if (instructorSlug) {
      const match = instructors.find((i) => i.slug === instructorSlug);
      return match ? [match] : instructors.slice(0, 2);
    }
    return instructors.slice(0, 2);
  }, [instructorSlug]);

  useEffect(() => {
    if (!enabled || !flightType) {
      setSlots([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const durationMinutes = flightType === "tahoe" ? 105 : 90;
    const now = new Date();
    now.setHours(8, 0, 0, 0);

    const mockSlots: TimeSlot[] = [];
    for (let day = 1; day <= 14; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() + day);

      if (date.getDay() === 0) continue;

      const startTimes = [9, 11, 13, 15];
      for (const hour of startTimes) {
        const start = new Date(date);
        start.setHours(hour, 0, 0, 0);
        const end = new Date(start.getTime() + durationMinutes * 60000);
        const instructor =
          eligibleInstructors[mockSlots.length % eligibleInstructors.length];

        mockSlots.push({
          id: `${start.toISOString()}-${instructor.slug}`,
          start: start.toISOString(),
          end: end.toISOString(),
          instructorSlug: instructor.slug,
          instructorName: instructor.name,
          aircraftTail: ["N6576J", "N7824W"][mockSlots.length % 2],
        });
      }
    }

    const timer = setTimeout(() => {
      try {
        setSlots(mockSlots);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to load availability"));
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [flightType, eligibleInstructors, tick, enabled]);

  const refetch = () => setTick((t) => t + 1);

  return { slots, loading, error, refetch };
}
