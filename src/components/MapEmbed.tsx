import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface MapEmbedProps {
  title: string;
  src?: string;
  loading?: "lazy" | "eager";
  className?: string;
  directionsUrl?: string;
}

export function MapEmbed({
  title,
  src = siteConfig.mapEmbedUrl,
  loading = "lazy",
  className,
  directionsUrl = siteConfig.googleMapsDirectionsUrl,
}: MapEmbedProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full overflow-hidden rounded-lg bg-sky-100" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          title={title}
          src={src}
          loading={loading}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          referrerPolicy="no-referrer"
          aria-label={title}
        />
      </div>
      <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-light">
          {siteConfig.nap.streetAddress}, {siteConfig.nap.addressLocality},{" "}
          {siteConfig.nap.addressRegion} {siteConfig.nap.postalCode}
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-navy-900 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
