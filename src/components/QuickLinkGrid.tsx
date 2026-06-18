import * as React from "react";
import Link from "next/link";
import { CTALink } from "@/components/CTALink";
import { cn } from "@/lib/utils";
import type { NotFoundIcon } from "@/content/not-found";

interface QuickLinkItem {
  label: string;
  href: string;
  icon: NotFoundIcon;
  ctaLink?: boolean;
}

interface QuickLinkGridProps {
  items: QuickLinkItem[];
  variant?: "primary" | "secondary";
  className?: string;
}

const iconPaths: Record<NotFoundIcon, React.ReactNode> = {
  home: (
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  aircraft: (
    <path d="M22 2L11 13M22 2l-7 18-4-7-7-4 18-7z" />
  ),
  programs: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  contact: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  fleet: (
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  instructors: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="16.5" cy="7.5" r="3.5" />
    </>
  ),
  location: (
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
  ),
  blog: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4v16h16V4H4z" />
  ),
};

function QuickLinkIcon({ icon }: { icon: NotFoundIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[icon]}
    </svg>
  );
}

export function QuickLinkGrid({
  items,
  variant = "primary",
  className,
}: QuickLinkGridProps) {
  const isPrimary = variant === "primary";

  return (
    <ul
      className={cn(
        "grid gap-4",
        isPrimary
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => {
        const iconColor = isPrimary
          ? "text-gold-500"
          : "text-navy-900 group-hover:text-gold-500";
        const content = (
          <>
            <span className={cn("shrink-0", iconColor)}>
              <QuickLinkIcon icon={item.icon} />
            </span>
            <span className="text-sm font-semibold">{item.label}</span>
          </>
        );

        return (
          <li key={item.href}>
            {item.ctaLink ? (
              <CTALink
                href={item.href}
                variant="primary"
                analytics="discovery_flight_booking_started"
                className={cn(
                  "w-full justify-start gap-3 px-5 py-4 focus:ring-offset-2",
                  isPrimary ? "bg-navy-900 text-white hover:bg-navy-800" : ""
                )}
              >
                {content}
              </CTALink>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
                  isPrimary
                    ? "bg-navy-900 px-5 py-4 text-white hover:bg-navy-800"
                    : "text-navy-900 hover:text-gold-500"
                )}
              >
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
