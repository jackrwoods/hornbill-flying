import { PhoneLink } from "@/components/PhoneLink";
import { BookingStep } from "./BookingStep";
import { BookingActions } from "./BookingActions";

interface LessonSchedulingFlowProps {
  onCancel?: () => void;
}

/**
 * Extension point for future lesson booking.
 * For now, displays a coming-soon state with a direct phone fallback.
 */
export function LessonSchedulingFlow({ onCancel }: LessonSchedulingFlowProps) {
  return (
    <BookingStep
      title="Schedule a lesson"
      description="Recurring lesson scheduling is coming soon."
    >
      <p className="text-muted">
        We are building a scheduling tool that lets you reserve recurring training
        flights with your preferred CFI. Until then, call or text us and we will
        set up a schedule that fits yours.
      </p>
      <div className="mt-4">
        <PhoneLink className="text-heading hover:text-accent" />
      </div>
      <BookingActions onBack={onCancel} backLabel="Choose another option" />
    </BookingStep>
  );
}
