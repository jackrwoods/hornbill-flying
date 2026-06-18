import { CTALink } from "./CTALink";
import type { ButtonVariant } from "@/types";

interface BookingCTALinkProps {
  instructorSlug: string;
  instructorFirstName?: string;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

export function BookingCTALink({
  instructorSlug,
  instructorFirstName,
  variant = "secondary",
  className,
  children,
}: BookingCTALinkProps) {
  const label =
    children ||
    (instructorFirstName
      ? `Book a discovery flight with ${instructorFirstName}`
      : "Book a discovery flight");

  return (
    <CTALink
      href="/book/"
      query={{ flow: "discovery", instructor: instructorSlug }}
      variant={variant}
      className={className}
      analytics="discovery_flight_booking_started"
    >
      {label}
    </CTALink>
  );
}
