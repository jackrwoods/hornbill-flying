import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Instructor } from "@/types";

interface InstructorPreviewCardProps {
  instructor: Instructor;
  className?: string;
}

export function InstructorPreviewCard({
  instructor,
  className,
}: InstructorPreviewCardProps) {
  const firstName = instructor.name.split(" ")[0];
  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-xl bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-navy-800 text-white font-heading text-xl">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-xl">{instructor.name}</h3>
          <p className="mt-1 text-sm text-ink-light">{instructor.title}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {instructor.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="inline-flex rounded bg-sky-100 px-2 py-0.5 text-xs font-medium text-navy-900"
              >
                {specialty}
              </span>
            ))}
          </div>
          <Link
            href={instructor.bookingLink}
            className="mt-3 inline-block text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Book with {firstName}
          </Link>
        </div>
      </div>
    </div>
  );
}
