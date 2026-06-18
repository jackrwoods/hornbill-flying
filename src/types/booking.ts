export type BookingFlowType = "discovery" | "lesson";

export type DiscoveryFlightType = "standard" | "tahoe" | "gift";

export type BookingStepId = "flight" | "datetime" | "details" | "payment" | "confirmation";

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  instructorSlug: string;
  instructorName: string;
  aircraftTail: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  weight?: string;
  preferredInstructor?: string;
  notes?: string;
}

export interface GiftVoucherData {
  purchaserName: string;
  purchaserEmail: string;
  purchaserPhone?: string;
  recipientName?: string;
  recipientMessage?: string;
  delivery: "email" | "print";
}

export interface InstructorOption {
  slug: string;
  name: string;
  title: string;
}

export interface DiscoveryFlightTypeConfig {
  id: DiscoveryFlightType;
  label: string;
  description: string;
  duration: string;
  price: number;
  deposit: number;
  isGift: boolean;
}

export interface BookingStepDefinition {
  id: BookingStepId;
  label: string;
  short: string;
}

export type BookingAnalyticsEvent =
  | "booking_flow_started"
  | "booking_step_changed"
  | "booking_completed"
  | "discovery_flight_booking_started"
  | "discovery_flight_booking_completed"
  | "discovery_flight_gift_voucher_started"
  | "discovery_flight_gift_voucher_completed"
  | "phone_click";

export interface FlowSelectorOption {
  id: BookingFlowType | "gift";
  label: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export interface GiftVoucherSummary {
  code: string;
  recipientName?: string;
  price: number;
}

export interface BookingSummary {
  flow: BookingFlowType;
  type: DiscoveryFlightType;
  slot?: TimeSlot;
  formData: BookingFormData;
  voucher?: GiftVoucherSummary;
  reference?: string;
}
