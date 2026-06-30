import { cn } from "@/lib/utils";
import type { BookingStepDefinition } from "@/types/booking";

interface BookingStepperProps {
  steps: BookingStepDefinition[];
  currentIndex: number;
  className?: string;
}

/**
 * Horizontal stepper that collapses to a compact progress indicator on mobile.
 * Sticks below the header so progress stays visible while scrolling.
 */
export function BookingStepper({
  steps,
  currentIndex,
  className,
}: BookingStepperProps) {
  return (
    <nav
      aria-label="Booking steps"
      className={cn(
        "sticky top-[4.5rem] z-30 border-b border-border-subtle bg-bg py-4 shadow-sm",
        className
      )}
    >
      <ol className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-11 w-11 min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isCurrent && "bg-alert text-on-alert",
                    isCompleted && "bg-dark text-on-dark",
                    isUpcoming && "border-2 border-dark-muted/20 bg-white text-muted"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    isCurrent && "text-heading",
                    isUpcoming && "text-muted"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded-full transition-colors",
                    isCompleted ? "bg-dark" : "bg-dark-muted/10"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
