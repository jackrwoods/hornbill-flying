import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
  href?: string;
  analytics?: string;
}

export function PhoneLink({
  className,
  showIcon = true,
  children,
  href,
  analytics = "phone_click",
}: PhoneLinkProps) {
  const { telephone, telephoneFormatted } = siteConfig.nap;
  const telHref = href || `tel:${telephone.replace(/\D/g, "")}`;

  return (
    <a
      href={telHref}
      className={cn(
        "inline-flex items-center gap-2 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded",
        className
      )}
      data-analytics={analytics}
      aria-label={`Call ${telephoneFormatted}`}
    >
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )}
      {children || telephoneFormatted}
    </a>
  );
}
