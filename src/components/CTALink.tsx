import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types";

interface CTALinkProps {
  href?: string;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  query?: Record<string, string>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  analytics?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 focus:ring-gold-500",
  secondary:
    "bg-gold-500 text-navy-900 hover:bg-gold-400 focus:ring-navy-900",
  tertiary:
    "bg-transparent border-2 border-current text-navy-900 hover:bg-navy-900/5 focus:ring-navy-900",
  accent:
    "bg-orange text-white hover:bg-rust focus:ring-gold-500",
  "header-cta":
    "bg-header-cta-bg text-header-cta-text hover:bg-header-cta-hover focus:ring-focus-ring",
};

export function CTALink({
  href = "/discovery-flight/",
  variant = "secondary",
  children = "Book a discovery flight",
  className,
  query,
  onClick,
  analytics = "discovery_flight_booking_started",
}: CTALinkProps) {
  let url = href;
  if (query) {
    const params = new URLSearchParams(query);
    url = `${href}?${params.toString()}`;
  }

  return (
    <Link
      href={url}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-center",
        variantClasses[variant],
        className
      )}
      data-analytics={analytics}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
