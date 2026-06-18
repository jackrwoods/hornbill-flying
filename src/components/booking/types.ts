export type {
  BookingFlowType,
  DiscoveryFlightType,
  BookingStepId,
  TimeSlot,
  BookingFormData,
  GiftVoucherData,
  InstructorOption,
  DiscoveryFlightTypeConfig,
  BookingStepDefinition,
  BookingAnalyticsEvent,
  GiftVoucherSummary,
  BookingSummary,
} from "@/types/booking";

export type PaymentMethod = "deposit" | "full" | "none";

export interface PaymentDetails {
  method: PaymentMethod;
  stripePaymentMethodId?: string;
  amount?: number;
}

export interface BookingConfirmation {
  bookingReference: string;
  flightType: string;
  date: string;
  time: string;
  durationMinutes?: number;
  aircraftTail?: string;
  instructorName?: string;
  customerEmail: string;
  icalUrl?: string;
}

export type BookingWidgetMode = "discovery" | "gift";

export interface BookingWidgetProps {
  initialType?: "standard" | "tahoe" | "gift";
  mode?: BookingWidgetMode;
}
