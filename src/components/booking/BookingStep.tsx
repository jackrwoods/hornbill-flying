import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BookingStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Consistent card wrapper for a booking step.
 * Includes an aria-live region and a focusable container so screen readers
 * announce step changes.
 */
export const BookingStep = forwardRef<HTMLDivElement, BookingStepProps>(
  function BookingStep({ title, description, children, className }, ref) {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        aria-live="polite"
        className={cn(
          "rounded-xl border border-border-subtle bg-white p-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 md:p-8",
          className
        )}
      >
        <h2 className="font-heading text-2xl text-heading md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-muted">{description}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    );
  }
);
