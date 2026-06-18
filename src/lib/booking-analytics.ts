import type { BookingAnalyticsEvent } from "@/types/booking";

export type { BookingAnalyticsEvent };

export interface BookingAnalyticsPayload {
  flow?: string | null;
  type?: string;
  step?: string;
  step_index?: number;
  instructor?: string;
  error?: string;
  [key: string]: unknown;
}

/**
 * Safely pushes a booking-related analytics event to the dataLayer or gtag.
 * Falls back silently when analytics are not initialized.
 */
export function trackBookingEvent(
  event: BookingAnalyticsEvent,
  payload?: BookingAnalyticsPayload
): void {
  if (typeof window === "undefined") return;

  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;

  const eventPayload = {
    event,
    ...(payload || {}),
  };

  if (dataLayer) {
    dataLayer.push(eventPayload);
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", event, payload || {});
  }
}

/**
 * Helper for tracking phone clicks from the booking help block.
 */
export function trackPhoneClick(location: string): void {
  trackBookingEvent("phone_click", { location });
}
