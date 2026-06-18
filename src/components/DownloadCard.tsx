import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DownloadableDocument } from "@/content/student-resources";

interface DownloadCardProps {
  document: DownloadableDocument;
  className?: string;
}

export function DownloadCard({ document, className }: DownloadCardProps) {
  const isAvailable = Boolean(document.filePath || document.externalUrl);
  const downloadHref = document.externalUrl || document.filePath;

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-heading text-xl text-navy-900">{document.title}</h3>
        {document.tailNumber && (
          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-navy-900">
            {document.tailNumber}
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm text-ink-light">
        {document.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-light">
        <span className="rounded bg-cream-50 px-2 py-1 font-semibold text-navy-900">
          {document.format}
        </span>
        {document.size && (
          <span>
            {document.size === "Coming soon" ? "Size: coming soon" : document.size}
          </span>
        )}
        {document.lastUpdated && (
          <span>Updated {new Date(document.lastUpdated).toLocaleDateString()}</span>
        )}
      </div>

      <div className="mt-5">
        {isAvailable && downloadHref ? (
          <a
            href={downloadHref}
            download={document.externalUrl ? undefined : true}
            target={document.externalUrl ? "_blank" : undefined}
            rel={document.externalUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            aria-label={`Download ${document.title} ${document.format}`}
          >
            Download {document.format}
          </a>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-lg bg-cream-50 px-4 py-2 text-sm font-semibold text-ink-light">
              Coming soon
            </span>
            {document.tailNumber && (
              <Link
                href="/fleet/"
                className="text-sm font-semibold text-navy-900 underline hover:text-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                See current aircraft
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
