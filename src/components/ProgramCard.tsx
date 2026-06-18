import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Program } from "@/types";

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm transition hover:shadow-md",
        className
      )}
    >
      <h3 className="font-heading text-2xl text-navy-900 group-hover:text-gold-500 transition-colors">
        {program.title}
      </h3>
      <p className="mt-2 flex-1 text-ink-light">{program.shortDescription}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-navy-900">
        <span className="rounded bg-sky-100 px-2 py-1">{program.duration}</span>
        <span className="rounded bg-cream-50 px-2 py-1">{program.costRange}</span>
      </div>
      <Link
        href={program.url}
        className="mt-5 inline-flex items-center text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
      >
        See program
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
}
