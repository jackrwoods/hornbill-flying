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
        <h3 className="font-heading text-2xl text-navy-900">
          {instructor.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {instructor.specialties.slice(0, 4).map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900"
            >
              {specialty}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-3 text-ink-light leading-relaxed">
          {bioPreview}
        </p>

        {instructor.teachesPrograms.includes("certified-flight-instructor") && (
          <p className="mt-3 text-sm text-ink-light">
            {firstName} also mentors{" "}
            <Link
              href="/programs/certified-flight-instructor/"
              className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              CFI candidates
            </Link>
            .
          </p>
        )}

        {/* Certificate number intentionally omitted at launch. Enable per-CFI once consent is confirmed. */}
        {instructor.publishCertificate && instructor.certificateNumber && (
          <p className="mt-3 text-xs text-ink-light">
            Certificate: {instructor.certificateNumber}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Link
            href={instructor.bookingLink}
            className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          >
            Book with {firstName}
          </Link>
          <Link
            href={instructor.bookingLink}
            className="inline-flex items-center justify-center rounded-lg border-2 border-navy-900 px-5 py-3 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
          >
            View full profile
          </Link>
        </div>
      </div>
    </article>
  );
}
