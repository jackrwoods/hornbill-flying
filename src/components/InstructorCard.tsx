import Link from "next/link";
import { InstructorPhoto } from "./InstructorPhoto";
import { cn } from "@/lib/utils";
import type { Instructor } from "@/types";

interface InstructorCardProps {
  instructor: Instructor;
  className?: string;
}

export function InstructorCard({ instructor, className }: InstructorCardProps) {
  const firstName = instructor.name.split(" ")[0];
  const bioPreview = instructor.bio.split("\n\n")[0] ?? instructor.bio;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl bg-white p-5 shadow-sm",
        className
      )}
    >
      <InstructorPhoto
        src={instructor.photo}
        alt={instructor.altText}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      <div className="mt-5 flex flex-col flex-grow">
        <h3 className="font-heading text-2xl text-heading">
          {instructor.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {instructor.specialties.slice(0, 4).map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-heading"
            >
              {specialty}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-3 text-muted leading-relaxed">
          {bioPreview}
        </p>

        {instructor.teachesPrograms.includes("certified-flight-instructor") && (
          <p className="mt-3 text-sm text-muted">
            {firstName} also mentors{" "}
            <Link
              href="/programs/certified-flight-instructor/"
              className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              CFI candidates
            </Link>
            .
          </p>
        )}

        {/* Certificate number intentionally omitted at launch. Enable per-CFI once consent is confirmed. */}
        {instructor.publishCertificate && instructor.certificateNumber && (
          <p className="mt-3 text-xs text-muted">
            Certificate: {instructor.certificateNumber}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Link
            href={instructor.bookingLink}
            className="inline-flex items-center justify-center rounded-lg bg-dark px-5 py-3 text-center text-sm font-semibold text-on-dark transition-colors hover:bg-dark-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Book with {firstName}
          </Link>
          <Link
            href={instructor.bookingLink}
            className="inline-flex items-center justify-center rounded-lg border-2 border-border px-5 py-3 text-center text-sm font-semibold text-heading transition-colors hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2"
          >
            View full profile
          </Link>
        </div>
      </div>
    </article>
  );
}
