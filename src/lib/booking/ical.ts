import { siteConfig } from "@/lib/config";

export interface IcalBookingDetails {
  bookingReference: string;
  flightType: string;
  date: string;
  time: string;
  durationMinutes?: number;
  instructorName?: string;
  aircraftTail?: string;
  customerEmail: string;
}

function formatIcalDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcalValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

/**
 * Generates a client-side .ics calendar invite from booking details.
 * Returns a data URI that can be used as a download link href.
 */
export function generateBookingIcal(details: IcalBookingDetails): string {
  const durationMinutes = details.durationMinutes ?? 90;
  const startDate = new Date(`${details.date}T${details.time}`);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  const title = escapeIcalValue(
    `Discovery Flight — ${details.flightType} (${details.bookingReference})`
  );
  const description = escapeIcalValue(
    [
      `Booking reference: ${details.bookingReference}`,
      `Flight type: ${details.flightType}`,
      details.instructorName ? `Instructor: ${details.instructorName}` : "",
      details.aircraftTail ? `Aircraft: ${details.aircraftTail}` : "",
      "",
      "Cancellation / weather policy: https://hornbillaviation.com/cancellation-policy/",
    ]
      .filter(Boolean)
      .join("\\n")
  );

  const location = escapeIcalValue(
    `${siteConfig.nap.streetAddress}, ${siteConfig.nap.addressLocality}, ${siteConfig.nap.addressRegion} ${siteConfig.nap.postalCode}`
  );

  const organizer = escapeIcalValue(siteConfig.nap.email);
  const organizerName = escapeIcalValue(siteConfig.brandName);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hornbill Aviation//Discovery Flight//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${details.bookingReference}@hornbillaviation.com`,
    `DTSTAMP:${formatIcalDate(new Date())}`,
    `DTSTART:${formatIcalDate(startDate)}`,
    `DTEND:${formatIcalDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `ORGANIZER;CN=${organizerName}:mailto:${organizer}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const icsContent = lines.join("\r\n");
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

/**
 * Revokes a generated object URL to avoid leaking blobs.
 */
export function revokeBookingIcal(url: string): void {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}
