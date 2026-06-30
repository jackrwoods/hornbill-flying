import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { PhoneLink } from "./PhoneLink";
import { cn } from "@/lib/utils";

interface ContactInfoCardProps {
  className?: string;
  showDirections?: boolean;
}

function formatHoursLabel(dayOfWeek: string | string[]): string {
  if (Array.isArray(dayOfWeek)) {
    if (dayOfWeek.length <= 2) return dayOfWeek.join("–");
    return `${dayOfWeek[0]}–${dayOfWeek[dayOfWeek.length - 1]}`;
  }
  return dayOfWeek;
}

function formatTime(time24: string): string {
  const [hoursStr, minutes] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  const suffix = hours >= 12 ? "p.m." : "a.m.";
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${minutes} ${suffix}`;
}

export function ContactInfoCard({
  className,
  showDirections = true,
}: ContactInfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="font-heading text-xl text-heading">
            {siteConfig.nap.name}
          </h3>
          <address className="mt-2 not-italic text-body">
            <p>{siteConfig.nap.streetAddress}</p>
            <p>
              {siteConfig.nap.addressLocality}, {siteConfig.nap.addressRegion}{" "}
              {siteConfig.nap.postalCode}
            </p>
          </address>
          {showDirections && (
            <Link
              href={siteConfig.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-heading hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              Get directions
            </Link>
          )}
        </div>

        <div className="border-t border-border-subtle pt-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Phone
          </h4>
          <PhoneLink className="mt-1 text-heading" />
        </div>

        <div className="border-t border-border-subtle pt-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Email
          </h4>
          <a
            href={`mailto:${siteConfig.nap.email}?subject=${encodeURIComponent(
              "Question about flight training"
            )}`}
            className="mt-1 inline-block font-medium text-heading hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            data-analytics="email_click"
          >
            {siteConfig.nap.email}
          </a>
        </div>

        <div className="border-t border-border-subtle pt-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Office hours
          </h4>
          <dl className="mt-2 space-y-1 text-body">
            {siteConfig.contactHours.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 text-sm"
              >
                <dt className="font-medium">{formatHoursLabel(entry.dayOfWeek)}</dt>
                <dd className="tabular-nums">
                  {formatTime(entry.opens)} – {formatTime(entry.closes)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
