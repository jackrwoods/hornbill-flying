"use client";

import { useState } from "react";
import { BookingStep } from "./BookingStep";
import { BookingActions } from "./BookingActions";
import {
  DEFAULT_GIFT_VOUCHER_DATA,
  DISCOVERY_FLIGHT_TYPES,
} from "@/content/booking";
import type { GiftVoucherData } from "@/types/booking";

interface GiftVoucherFlowProps {
  value?: GiftVoucherData;
  onChange?: (value: GiftVoucherData) => void;
  onComplete?: (reference: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

/**
 * Gift voucher purchase flow.
 * Controlled when used inside BookingWidget; can also run uncontrolled for
 * the /book/ flow.
 */
export function GiftVoucherFlow({
  value,
  onChange,
  onComplete,
  onError,
  onCancel,
}: GiftVoucherFlowProps) {
  const [internalData, setInternalData] = useState<GiftVoucherData>(
    DEFAULT_GIFT_VOUCHER_DATA
  );
  const [step, setStep] = useState<"details" | "confirmation">("details");
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const data = value ?? internalData;

  const update = (field: keyof GiftVoucherData, inputValue: string) => {
    const next = { ...data, [field]: inputValue };
    if (onChange) {
      onChange(next);
    } else {
      setInternalData(next);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Future integration: post to /api/gift-vouchers and collect Stripe payment.
      const generatedCode = `HB-GIFT-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;
      setCode(generatedCode);
      setStep("confirmation");
      onComplete?.(generatedCode);
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Gift voucher purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const voucherType = DISCOVERY_FLIGHT_TYPES.find((t) => t.id === "gift")!;

  if (step === "confirmation" && code) {
    return (
      <BookingStep title="Voucher ready">
        <div className="space-y-4 text-center">
          <p className="text-ink-light">
            Your ${voucherType.price} discovery flight gift voucher has been
            created.
          </p>
          <div className="rounded-lg bg-sky-100 p-4">
            <span className="text-sm font-semibold text-navy-900">Voucher code</span>
            <div className="mt-1 font-mono text-2xl font-semibold text-navy-900">
              {code}
            </div>
          </div>          <p className="text-sm text-ink-light">
            The voucher will be emailed to the purchaser and is redeemable when
            the recipient books a discovery flight.
          </p>
        </div>
      </BookingStep>
    );
  }

  return (
    <BookingStep
      title="Buy a gift voucher"
      description="The recipient books a date that works for them."
    >
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-900">
              Your name
            </span>
            <input
              type="text"
              value={data.purchaserName}
              onChange={(e) => update("purchaserName", e.target.value)}
              className="w-full rounded-lg border border-navy-900 bg-white px-4 py-3 text-ink focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-900">
              Your email
            </span>
            <input
              type="email"
              value={data.purchaserEmail}
              onChange={(e) => update("purchaserEmail", e.target.value)}
              className="w-full rounded-lg border border-navy-900 bg-white px-4 py-3 text-ink focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              required
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-900">
              Recipient name (optional)
            </span>
            <input
              type="text"
              value={data.recipientName || ""}
              onChange={(e) => update("recipientName", e.target.value)}
              className="w-full rounded-lg border border-navy-900 bg-white px-4 py-3 text-ink focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-900">
              Your phone (optional)
            </span>
            <input
              type="tel"
              value={data.purchaserPhone || ""}
              onChange={(e) => update("purchaserPhone", e.target.value)}
              className="w-full rounded-lg border border-navy-900 bg-white px-4 py-3 text-ink focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-navy-900">
            Message (optional)
          </span>
          <textarea
            value={data.recipientMessage || ""}
            onChange={(e) => update("recipientMessage", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-navy-900 bg-white px-4 py-3 text-ink focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </label>
        <div className="rounded-xl border border-navy-800/10 bg-cream-50 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-navy-900">Gift voucher total</span>
            <span className="font-mono text-xl font-semibold text-navy-900">
              ${voucherType.price.toFixed(2)}
            </span>
          </div>
        </div>
      </form>
      <BookingActions
        onBack={onCancel}
        onNext={handleContinue}
        nextLabel={loading ? "Processing…" : "Buy voucher"}
        backLabel="Choose another option"
        isNextDisabled={!data.purchaserName || !data.purchaserEmail || loading}
        isNextLoading={loading}
      />
    </BookingStep>
  );
}
