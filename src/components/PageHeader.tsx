import Link from "next/link";
import { AssetImage as Image } from "./AssetImage";
import { Container } from "./Container";
import { SunsetPlaceholder } from "./SunsetPlaceholder";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: PageHeaderImage;
  /** IBM Plex Mono eyebrow label above the title. */
  eyebrow?: string;
  /** Launch photography placeholder label (shown only when no image). */
  placeholderLabel?: string;
  /** Sunset gradient variant for the no-image backdrop. */
  sunsetVariant?: "default" | "vertical" | "soft" | "dawn" | "home";
  /** "product" (default) is a contained band; "story" is full-viewport. */
  register?: "product" | "story";
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  image,
  eyebrow,
  placeholderLabel,
  sunsetVariant = "home",
  register = "product",
  className,
  children,
}: PageHeaderProps) {
  const isStory = register === "story";
  return (
    <section
      className={cn(
        "relative -mt-16 overflow-hidden bg-immersive-bg text-on-immersive lg:-mt-18",
        isStory ? "story-hero-viewport flex items-end" : "min-h-[52vh] md:min-h-[64vh] flex items-end",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fill={image.width === undefined || image.height === undefined}
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-pageheader-scrim" />
          </>
        ) : (
          <SunsetPlaceholder
            variant={sunsetVariant}
            label={placeholderLabel}
            hiddenLabel={false}
            vignette
            grain
            className="h-full w-full"
          />
        )}
        <div className="absolute inset-0 bg-panel-scrim-bottom" />
      </div>

      <Container className={cn("relative z-10", isStory ? "pb-20 md:pb-28" : "pb-16 md:pb-20")}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-on-immersive-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-immersive-accent">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-immersive-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-on-immersive">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal variant="stagger" className="max-w-3xl">
          {eyebrow ? (
            <p className="panel-label-lg text-immersive-accent mb-4">{eyebrow}</p>
          ) : null}
          <h1
            className={cn(
              "font-heading font-extrabold leading-[1.08] text-on-immersive text-balance",
              isStory ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-on-immersive-muted text-pretty max-w-2xl text-base md:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}