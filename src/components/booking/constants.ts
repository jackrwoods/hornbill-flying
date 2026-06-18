export {
  DISCOVERY_STEPS,
  DISCOVERY_FLIGHT_TYPES,
  DEFAULT_BOOKING_FORM_DATA,
  DEFAULT_GIFT_VOUCHER_DATA,
  CANCELLATION_WEATHER_POLICY,
  WHAT_TO_EXPECT_ITEMS,
  BOOKING_FAQ,
} from "@/content/booking";

/**
 * Default deposit amount for discovery flights when deposit mode is enabled.
 * Controlled by NEXT_PUBLIC_DISCOVERY_FLIGHT_DEPOSIT_MODE:
 * - "deposit" -> collect this amount at booking
 * - "full" -> collect full flight price at booking
 * - "none" or unset -> $0 deposit, pay at the flight (default at launch)
 */
export const DISCOVERY_FLIGHT_DEPOSIT_AMOUNT = 50;

/**
 * Duration defaults for calendar slot generation and .ics events.
 */
export const FLIGHT_DURATION_MINUTES: Record<string, number> = {
  standard: 60,
  tahoe: 75,
  gift: 60,
};

/**
 * Analytics event names used in the discovery flight booking widget.
 */
export const ANALYTIC_EVENTS = {
  bookingStarted: "discovery_flight_booking_started",
  bookingCompleted: "discovery_flight_booking_completed",
  giftVoucherStarted: "discovery_flight_gift_voucher_started",
  giftVoucherCompleted: "discovery_flight_gift_voucher_completed",
} as const;
