import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface LogoProps {
  className?: string;
  /** Render the full wordmark image (includes icon + text). Defaults to the icon-only SVG. */
  fullWordmark?: boolean;
  /** Width of the rendered logo in pixels. */
  width?: number;
}

export function Logo({
  className,
  fullWordmark = false,
  width = 160,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded",
        className
      )}
      aria-label={`${siteConfig.brandName} home`}
    >
      {fullWordmark ? (
        <Image
          src="/images/logos/logo-dark.png"
          alt={siteConfig.brandName}
          width={width}
          height={Math.round(width * 0.31)}
          className="h-full w-auto"
          priority
          unoptimized
        />
      ) : (
        <Image
          src="/images/logos/logo.svg"
          alt=""
          width={56}
          height={48}
          className="h-auto w-auto"
          priority
          unoptimized
        />
      )}
    </Link>
  );
}
