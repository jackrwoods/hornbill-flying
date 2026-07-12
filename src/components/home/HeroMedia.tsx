import { cn } from "@/lib/utils";

interface HeroMediaProps {
  /** Gradient overlay / scrim, if any. */
  children?: React.ReactNode;
  /** Empty at launch; filled when the asset arrives. */
  videoSrc?: string;
  className?: string;
}

/**
 * Hero media slot. Renders a <video> element layered over a sunset-gradient
 * CSS background. At launch videoSrc is undefined and the gradient is the LCP
 * element. When the real video arrives, only videoSrc changes — no refactor,
 * no CLS, no LCP regression (the gradient paints in HTML before video loads).
 */
export function HeroMedia({ children, videoSrc, className }: HeroMediaProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 bg-sunset-placeholder-dawn",
        className
      )}
      aria-hidden="true"
    >
      {videoSrc ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-panel-scrim-bottom" />
      {children}
    </div>
  );
}