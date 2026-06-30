"use client";

import { Component, ReactNode } from "react";
import { PhoneLink } from "@/components/PhoneLink";
import { Button } from "@/components/Button";

interface BookingErrorBoundaryProps {
  children: ReactNode;
}

interface BookingErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches widget crashes and shows a friendly fallback so the user can
 * finish the booking over the phone.
 */
export class BookingErrorBoundary extends Component<
  BookingErrorBoundaryProps,
  BookingErrorBoundaryState
> {
  constructor(props: BookingErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): BookingErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-error/20 bg-white p-6 md:p-8">
          <h2 className="font-heading text-2xl text-heading">
            Let’s finish this over the phone
          </h2>
          <p className="mt-2 text-muted">
            Something went wrong loading the booking form. We can still get you
            scheduled today.
          </p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <PhoneLink className="text-heading hover:text-accent" />
            <Button
              type="button"
              variant="tertiary"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
