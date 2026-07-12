import { AssetImage as Image } from "@/components/AssetImage";
import { cn } from "@/lib/utils";

interface HeroMediaProps {
  /** Gradient overlay / scrim, if any. */
  children?: React.ReactNode;
  /** Empty at launch; filled when the asset arrives. */
  videoSrc?: string;
  className?: string;
}

/**
 * Hero media slot. Renders the homepage hero photo as the base layer with a
 * semi-transparent sunset gradient overlaid for warm color grade, plus a bottom
 * scrim for text contrast. When `videoSrc` is provided, the video renders above
 * the photo and the gradient overlay still applies.
 */
export function HeroMedia({ children, videoSrc, className }: HeroMediaProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 bg-immersive-bg", className)}
      aria-hidden="true"
    >
      <Image
        src="/images/hero/homepage-hero.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(200deg, rgba(18, 20, 27, 0.85) 0%, rgba(42, 47, 58, 0.78) 22%, rgba(107, 30, 54, 0.70) 48%, rgba(185, 28, 60, 0.55) 70%, rgba(214, 142, 22, 0.35) 88%, rgba(241, 202, 36, 0.20) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-panel-scrim-bottom" />
      {children}
    </div>
  );
}