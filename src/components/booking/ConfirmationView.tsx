"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { generateBookingIcal, revokeBookingIcal } from "@/lib/booking/ical";
import { FLIGHT_DURATION_MINUTES } from "./constants";

interface ConfirmationViewProps {
  reference: string;
  title?: string;
  message?: string;
  flightType?: string;
  date?: string;
  instructorName?: string;
  aircraftTail?: string;
  customerEmail?: string;
  isGift?: boolean;
}

/**
 * Confirmation step for the booking widget.
 * Shows booking reference, flight details, an add-to-calendar .ics download,
 * and links to cancellation/weather policy.
 */
export function ConfirmationView({
  reference,
  title,
  message,
  flightType,
  date,
  instructorName,
  aircraftTail,
  customerEmail,
  isGift = false,
}: ConfirmationViewProps) {
  const [icalUrl, setIcalUrl] = useState<string | null>(null);

  const effectiveTitle = title ?? (isGift ? "Voucher ready" : "You’re booked");
  const effectiveMessage =
    message ??
    (isGift
      ? "We sent the voucher to the purchaser’s email. The recipient can book a date that works for them."
      : "We sent a confirmation email with what to bring and where to park. You can cancel or reschedule up to 24 hours before your flight.");

  const formattedDate = useMemo(() => {
    if (!date) return null;
    return new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [date]);

  useEffect(() => {
    if (!isGift && date && customerEmail) {
      const url = generateBookingIcal({
        bookingReference: reference,
        flightType: flightType || "Standard discovery flight",
        date: date.split("T")[0],
        time: date.split("T")[1]?.slice(0, 5) || "08:00",
        durationMinutes: flightType ? FLIGHT_DURATION_MINUTES[flightType] : 60,
        instructorName,
        aircraftTail,
        customerEmail,
      });
      setIcalUrl(url);
      return () => {
        if (url) revokeBookingIcal(url);
      };
    }
  }, [isGift, date, reference, flightType, instructorName, aircraftTail, customerEmail]);

  return (
    <div className="rounded-xl border border-navy-800/10 bg-white p-6 text-center md:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-success"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="mt-4 font-heading text-3xl text-navy-900">{effectiveTitle}</h2>
      <p className="mx-auto mt-2 max-w-md text-ink-light">{effectiveMessage}</p>

      <div className="mt-6 rounded-lg bg-sky-100 p-4">
        <span className="text-sm font-semibold text-navy-900">
          {isGift ? "Voucher code" : "Booking reference"}
        </span>
        <div className="mt-1 font-mono text-xl font-semibold text-navy-900">
          {reference}
        </div>
      </div>

      {!isGift && (
        <div className="mt-6 space-y-2 text-sm text-ink-light">
          {flightType && <p>Flight type: {flightType}</p>}
          {formattedDate && <p>Date: {formattedDate}</p>}
          {instructorName && <p>Instructor: {instructorName}</p>}
          {aircraftTail && <p>Aircraft: {aircraftTail}</p>}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {icalUrl && (
          <a
            href={icalUrl}
            download={`hornbill-discovery-flight-${reference}.ics`}
            className="inline-flex items-center justify-center rounded-lg border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            Add to calendar
          </a>
        )}
        <Link
          href="/cancellation-policy/"
          className="inline-flex items-center justify-center rounded-lg border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          Cancellation / weather policy
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          Back to the site
        </Link>
      </div>
    </div>
  );
}
