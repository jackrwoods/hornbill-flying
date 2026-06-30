"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { BookingFormData, TimeSlot } from "@/types/booking";
import type { PaymentMethod } from "./types";

interface LegacyPaymentStepProps {
  amount: number;
  depositAmount: number;
  onPayDeposit?: () => void;
  onPayFull?: () => void;
}

interface PaymentStepProps extends LegacyPaymentStepProps {
  flightType?: string;
  formData?: BookingFormData;
  slot?: TimeSlot | null;
  onComplete?: (reference: string) => void;
  onError?: (error: string) => void;
  onMethodChange?: (method: PaymentMethod) => void;
}

/**
 * Payment step for the discovery flight booking widget.
 *
 * Future implementation will mount Stripe Payment Element here and collect
 * Apple Pay / Google Pay via Stripe.js. The current stub lets the visitor
 * choose deposit vs. full payment and simulates a secure checkout completion.
 */
export function PaymentStep({
  amount,
  depositAmount,
  onPayDeposit,
  onPayFull,
  flightType,
  slot,
  onComplete,
  onError,
  onMethodChange,
}: PaymentStepProps) {
  const depositMode = process.env.NEXT_PUBLIC_DISCOVERY_FLIGHT_DEPOSIT_MODE;
  const defaultMethod: PaymentMethod =
    depositMode === "deposit" ? "deposit" : depositMode === "full" ? "full" : "none";

  const [method, setMethod] = useState<PaymentMethod>(defaultMethod);
  const [loading, setLoading] = useState(false);

  const effectiveAmount = method === "full" ? amount : method === "deposit" ? depositAmount : 0;

  const handleMethodChange = (next: PaymentMethod) => {
    setMethod(next);
    onMethodChange?.(next);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Stripe integration point: create PaymentIntent/Checkout session here
      // using @stripe/stripe-js and confirm with the collected payment method.
      // await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      // const result = await stripe.confirmPayment(...);

      const reference = `HB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      // Legacy handlers
      if (method === "deposit" && onPayDeposit) onPayDeposit();
      if (method === "full" && onPayFull) onPayFull();

      // New widget handler
      onComplete?.(reference);
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-navy-800/10 bg-white p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-ink-light">Total</span>
          <span className="font-mono text-3xl font-semibold text-navy-900">
            ${amount.toFixed(2)}
          </span>
        </div>
        {flightType && (
          <div className="mt-2 text-sm text-ink-light">
            Flight type: {flightType}
            {slot && (
              <span className="ml-2">
                · {new Date(slot.start).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-semibold text-navy-900">
          Choose how to pay
        </legend>
        <button
          type="button"
          onClick={() => handleMethodChange("deposit")}
          className={cn(
            "flex min-h-[3.25rem] w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
            method === "deposit"
              ? "border-gold-500 bg-gold-500/10"
              : "border-navy-800/10 bg-white hover:bg-sand-50"
          )}
          aria-pressed={method === "deposit"}
          disabled={depositAmount <= 0}
        >
          <span className="font-semibold text-navy-900">Pay ${depositAmount} deposit</span>
          <span className="text-sm text-ink-light">Balance at the flight</span>
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange("full")}
          className={cn(
            "flex min-h-[3.25rem] w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
            method === "full"
              ? "border-gold-500 bg-gold-500/10"
              : "border-navy-800/10 bg-white hover:bg-sand-50"
          )}
          aria-pressed={method === "full"}
        >
          <span className="font-semibold text-navy-900">Pay ${amount.toFixed(2)} in full</span>
          <span className="text-sm text-ink-light">Skip the counter</span>
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange("none")}
          className={cn(
            "flex min-h-[3.25rem] w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500",
            method === "none"
              ? "border-gold-500 bg-gold-500/10"
              : "border-navy-800/10 bg-white hover:bg-sand-50"
          )}
          aria-pressed={method === "none"}
        >
          <span className="font-semibold text-navy-900">Pay at the flight</span>
          <span className="text-sm text-ink-light">No deposit required</span>
        </button>
      </fieldset>

      <div className="rounded-xl border border-navy-800/10 bg-sand-50 p-4">
        <p className="text-sm text-ink-light">
          Payment processing will be handled securely through Stripe, including
          Apple Pay and Google Pay when your device supports them. This demo
          does not charge a card.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleConfirm(); }} className="space-y-4">
        <div className="min-h-[4rem] rounded-lg border border-dashed border-navy-800/20 bg-white p-4 text-sm text-ink-light">
          Stripe Payment Element will appear here once the backend payment-intent
          endpoint is connected.
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading
            ? "Processing…"
            : effectiveAmount > 0
              ? `Pay $${effectiveAmount.toFixed(2)}`
              : "Book without payment"}
        </button>
      </form>
    </div>
  );
}
