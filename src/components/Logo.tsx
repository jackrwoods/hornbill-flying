import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
  textClassName?: string;
  variant?: "inline" | "stacked";
}

export function Logo({
  className,
  showText = true,
  size = 56,
  textClassName = "text-heading",
  variant = "inline",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded",
        className
      )}
      aria-label={`${siteConfig.brandName} home`}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={Math.round(size * 0.856)}
        className="h-auto w-auto"
        priority
        unoptimized
      />
      {showText && variant === "inline" && (
        <span
          className={cn(
            "brand-wordmark text-xl",
            textClassName
          )}
        >
          {siteConfig.brandName}
        </span>
      )}

      {showText && variant === "stacked" && (
        <span className="flex flex-col">
          <span
            className={cn(
              "brand-wordmark text-base leading-none",
              textClassName
            )}
          >
            {siteConfig.brandName.split(" ")[0]}
          </span>
          {siteConfig.brandName.split(" ").slice(1).length > 0 && (
            <span className="font-body text-[0.55rem] font-semibold uppercase leading-none tracking-[0.16em] text-[#007C80]">
              {siteConfig.brandName.split(" ").slice(1).join(" ")}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
