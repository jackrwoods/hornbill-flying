import * as React from "react";
import { Container } from "./Container";
import { CTALink } from "./CTALink";
import { SunsetPlaceholder } from "./SunsetPlaceholder";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface CinematicHeroAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "header-cta";
  query?: Record<string, string>;
  analytics?: string;
}

interface CinematicHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  actions?: CinematicHeroAction[];
  /** When provided, renders a real <img> over the sunset placeholder. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Sunset placeholder variant for the no-photo backdrop. */
  sunsetVariant?: "default" | "vertical" | "soft" | "dawn";
  /** Optional "coming soon" label for the placeholder slot. */
  placeholderLabel?: string;
  /**
   * "story" → full-viewport immersive hero, poetic display title, bottom panel.
   * "product" → contained hero band, grounded title, left panel.
   */
  register?: "story" | "product";
  /** Optional scrim side for the text panel. */
  scrim?: "bottom" | "left" | "none";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Cinematic hero for story and product pages. At launch, every hero uses the
 * sunset-gradient placeholder; when `image` is provided (post-launch real
 * photography), it layers above the placeholder and the scrim protects text.
 */
export function CinematicHero({
  eyebrow,
  title,
  subhead,
  actions = [],
  image,
  sunsetVariant = "default",
  placeholderLabel,
  register = "product",
  scrim = "bottom",
  className,
  children,
}: CinematicHeroProps) {
  const isStory = register === "story";
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-immersive-bg text-on-immersive",
        isStory ? "story-hero-viewport flex items-end" : "min-h-[60vh] md:min-h-[70vh] flex items-end",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <SunsetPlaceholder
          variant={sunsetVariant}
          label={image ? undefined : placeholderLabel}
          hiddenLabel={Boolean(image)}
          vignette
          className="h-full w-full"
        />
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-0",
            scrim === "bottom" && "bg-panel-scrim-bottom",
            scrim === "left" && "bg-panel-scrim-left"
          )}
        />
      </div>

      <Container className={cn("relative z-10", isStory ? "pb-20 md:pb-28" : "pb-16 md:pb-20")}>
        <Reveal variant="stagger" className="max-w-3xl">
          {eyebrow ? (
            <p className="panel-label-lg text-immersive-accent mb-5">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-heading font-extrabold leading-[1.05] text-on-immersive text-balance",
              isStory
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                : "text-3xl sm:text-4xl md:text-5xl"
            )}
          >
            {title}
          </h1>
          {subhead ? (
            <p
              className={cn(
                "mt-6 text-on-immersive-muted text-pretty",
                isStory ? "text-lg md:text-xl max-w-2xl" : "text-base md:text-lg max-w-xl"
              )}
            >
              {subhead}
            </p>
          ) : null}
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actions.map((action) => (
                <CTALink
                  key={action.href + action.label}
                  href={action.href}
                  variant={action.variant ?? "secondary"}
                  query={action.query}
                  analytics={action.analytics}
                  className={
                    action.variant === "tertiary"
                      ? "border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
                      : undefined
                  }
                >
                  {action.label}
                </CTALink>
              ))}
            </div>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}