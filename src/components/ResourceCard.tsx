import Link from "next/link";
import { cn } from "@/lib/utils";

interface ResourceLink {
  href: string;
  label: string;
  external?: boolean;
}

interface ResourceCardProps {
  title: string;
  description: string;
  links: ResourceLink[];
  tags?: string[];
  className?: string;
}

export function ResourceCard({
  title,
  description,
  links,
  tags,
  className,
}: ResourceCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm",
        className
      )}
    >
      <h3 className="font-heading text-xl text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-light">{description}</p>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-navy-900"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 underline hover:text-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              {link.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center text-sm font-semibold text-navy-900 underline hover:text-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
