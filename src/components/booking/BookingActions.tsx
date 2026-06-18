import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface BookingActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
  backLabel?: string;
  nextLabel?: string;
  cancelLabel?: string;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  className?: string;
}

/**
 * Back / Next / Cancel button group used by every booking step.
 */
export function BookingActions({
  onBack,
  onNext,
  onCancel,
  backLabel = "Back",
  nextLabel = "Continue",
  cancelLabel = "Cancel",
  isNextDisabled = false,
  isNextLoading = false,
  className,
}: BookingActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse items-center justify-between gap-3 pt-6 sm:flex-row",
        className
      )}
    >
      <div className="flex w-full gap-3 sm:w-auto">
        {onCancel && (
          <Button
            type="button"
            variant="tertiary"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            {cancelLabel}
          </Button>
        )}
        {onBack && (
          <Button
            type="button"
            variant="tertiary"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            {backLabel}
          </Button>
        )}
      </div>
      {onNext && (
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          disabled={isNextDisabled || isNextLoading}
          className="w-full sm:w-auto min-h-[44px]"
        >
          {isNextLoading ? "Loading..." : nextLabel}
        </Button>
      )}
    </div>
  );
}
