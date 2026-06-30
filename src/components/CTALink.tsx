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
    "bg-dark text-on-dark hover:bg-dark-muted focus:ring-focus-ring",
  secondary:
    "bg-accent text-on-accent hover:bg-accent-hover focus:ring-dark",
  tertiary:
    "bg-transparent border-2 border-dark text-dark hover:bg-dark-subtle focus:ring-dark",
  accent:
    "bg-alert text-on-alert hover:bg-alert-hover focus:ring-focus-ring",
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
