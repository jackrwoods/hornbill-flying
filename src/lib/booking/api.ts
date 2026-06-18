import type { TimeSlot } from "@/types/booking";

export interface AvailabilityParams {
  flightType: string;
  start: string;
  days?: number;
  instructorSlug?: string | null;
}

export interface AvailabilitySlot {
  date: string;
  time: string;
  instructorId: string;
  aircraftTail: string;
  durationMinutes: number;
}

export interface CustomerPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  weight?: string;
}

export interface BookingPayload {
  flightType: string;
  date: string;
  time: string;
  instructorPreference?: string | null;
  customer: CustomerPayload;
  payment: {
    method: "deposit" | "full" | "none";
    stripePaymentMethodId?: string;
    amount?: number;
  };
  notes?: string;
}

export interface BookingResponse {
  bookingReference: string;
  status: "confirmed" | "pending" | "cancelled";
  flight: {
    type: string;
    date: string;
    time: string;
    aircraftTail?: string;
    instructorName?: string;
    durationMinutes?: number;
  };
  customer: CustomerPayload;
  paymentAmount: number;
  icalUrl?: string;
}

export interface GiftVoucherPayload {
  flightType: "gift";
  purchaser: {
    name: string;
    email: string;
    phone?: string;
  };
  recipient?: {
    name?: string;
    email?: string;
  };
  payment: {
    stripePaymentMethodId?: string;
    amount?: number;
  };
}

export interface GiftVoucherResponse {
  voucherCode: string;
  expiryDate: string;
  status: "confirmed" | "pending";
  price?: number;
}

export class BookingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BookingApiError";
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new BookingApiError(
      text || `Request failed with status ${response.status}`,
      response.status
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Fetches available discovery-flight slots from the backend.
 * The backend must return slots where an aircraft and CFI are simultaneously free.
 */
export async function fetchAvailability(
  params: AvailabilityParams
): Promise<AvailabilitySlot[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("flightType", params.flightType);
  searchParams.set("start", params.start);
  if (params.days) searchParams.set("days", String(params.days));
  if (params.instructorSlug) searchParams.set("instructorSlug", params.instructorSlug);

  const response = await fetch(`/api/availability?${searchParams.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  return handleResponse<AvailabilitySlot[]>(response);
}

/**
 * Creates a discovery flight booking.
 * The backend creates the booking and returns a reference plus optional .ics URL.
 */
export async function createBooking(
  payload: BookingPayload
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<BookingResponse>(response);
}

/**
 * Creates a gift voucher purchase.
 * The backend contract is configurable: this function posts to /api/gift-vouchers
 * when available, otherwise callers can use createBooking with type: "gift".
 */
export async function createGiftVoucher(
  payload: GiftVoucherPayload
): Promise<GiftVoucherResponse> {
  const response = await fetch("/api/gift-vouchers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<GiftVoucherResponse>(response);
}

/**
 * Normalizes backend availability slots into the TimeSlot shape used by the
 * booking widget, preserving the same identifiers the widget expects.
 */
export function mapAvailabilityToTimeSlots(
  slots: AvailabilitySlot[],
  instructorNameBySlug?: Record<string, string>
): TimeSlot[] {
  return slots.map((slot) => {
    const startIso = `${slot.date}T${slot.time}`;
    const start = new Date(startIso);
    const end = new Date(start.getTime() + slot.durationMinutes * 60000);

    return {
      id: `${slot.date}-${slot.time}-${slot.instructorId}-${slot.aircraftTail}`,
      start: start.toISOString(),
      end: end.toISOString(),
      instructorSlug: slot.instructorId,
      instructorName: instructorNameBySlug?.[slot.instructorId] || slot.instructorId,
      aircraftTail: slot.aircraftTail,
    };
  });
}
