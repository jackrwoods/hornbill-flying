import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
  textClassName?: string;
}

export function Logo({
  className,
  showText = true,
  size = 56,
  textClassName = "text-navy-900",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded",
        className
      )}
      aria-label={`${siteConfig.brandName} home`}
    >
      <Image
        src="/logo.jpeg"
        alt=""
        width={size}
        height={size}
        className="rounded-full"
        priority
      />
      {showText && (
        <span
          className={cn(
            "font-heading text-xl leading-tight",
            textClassName
          )}
        >
          {siteConfig.brandName}
        </span>
      )}
    </Link>
  );
}
