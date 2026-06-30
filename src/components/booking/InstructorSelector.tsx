import { cn } from "@/lib/utils";
import type { InstructorOption } from "@/types/booking";

interface InstructorSelectorProps {
  preferredInstructor: string | null;
  onSelect: (slug: string | null) => void;
  instructors: InstructorOption[];
}

/**
 * Optional preferred-instructor selection for the booking widget.
 * Presents each CFI as a large, tappable radio card.
 */
export function InstructorSelector({
  preferredInstructor,
  onSelect,
  instructors,
}: InstructorSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 text-sm font-semibold text-heading">
        Preferred instructor (optional)
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={cn(
            "min-h-[3.25rem] rounded-lg border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring",
            !preferredInstructor
              ? "border-accent bg-accent/10"
              : "border-border-subtle bg-white hover:bg-bg"
          )}
          aria-pressed={!preferredInstructor}
        >
          <span className="font-semibold text-heading">No preference</span>
          <span className="block text-sm text-muted">
            We will match you with the next available CFI.
          </span>
        </button>
        {instructors.map((instructor) => {
          const isSelected = preferredInstructor === instructor.slug;
          return (
            <button
              key={instructor.slug}
              type="button"
              onClick={() => onSelect(instructor.slug)}
              className={cn(
                "min-h-[3.25rem] rounded-lg border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring",
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border-subtle bg-white hover:bg-bg"
              )}
              aria-pressed={isSelected}
            >
              <span className="font-semibold text-heading">{instructor.name}</span>
              <span className="block text-sm text-muted">
                {instructor.title}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
