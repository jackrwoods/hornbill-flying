import Link from "next/link";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  className?: string;
}

const iconPaths: Record<string, string> = {
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  gauge: "M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-13a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8a1 1 0 0 0-1-1z",
  route: "M3 12h2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h3a2 2 0 0 1 2 2h2",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  map: "M1 6l7-4 8 4 7-4v16l-7 4-8-4-7 4V6z",
  calculator: "M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 4v2h2V6H7zm4 0v2h2V6h-2zm4 0v2h2V6h-2zM7 11v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v6h2v-6h-2zM7 16v2h2v-2H7zm4 0v2h2v-2h-2z",
};

export function ToolCard({ title, description, href, icon, className }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-navy-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {iconPaths[icon] ? (
            <path d={iconPaths[icon]} />
          ) : (
            <circle cx="12" cy="12" r="10" />
          )}
        </svg>
      </div>
      <h3 className="font-heading text-xl text-navy-900 group-hover:text-gold-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-light">{description}</p>
    </Link>
  );
}
