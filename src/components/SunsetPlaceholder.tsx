import * as React from "react";
import { cn } from "@/lib/utils";

type SunsetVariant =
  | "default"
  | "vertical"
  | "soft"
  | "dawn"
  | "home";

interface SunsetPlaceholderProps {
  label?: string;
  variant?: SunsetVariant;
  className?: string;
  grain?: boolean;
  vignette?: boolean;
  /**
   * When true, the label is visually hidden but kept for screen readers
   * (useful for decorative slots where the label is purely descriptive).
   */
  hiddenLabel?: boolean;
}

const variantClass: Record<SunsetVariant, string> = {
  default: "bg-sunset-home",
  vertical: "bg-sunset-placeholder-vertical",
  soft: "bg-sunset-placeholder-soft",
  dawn: "bg-sunset-placeholder-dawn",
  home: "bg-sunset-home",
};

/**
 * Launch photography placeholder. Per v2-resolutions.md §4, every image slot
 * ships with a sunset-gradient box until real photos are commissioned.
 * Renders a div (not an <img>) with the warm gold→rose→night gradient and
 * an optional IBM Plex Mono "coming soon" label. Never AI-generated imagery.
 */
export function SunsetPlaceholder({
  label,
  variant = "default",
  className,
  grain = true,
  vignette = false,
  hiddenLabel = false,
}: SunsetPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variantClass[variant],
        grain && "film-grain",
        vignette && "cinema-vignette",
        className
      )}
    >
      {label ? (
        <div
          className={cn(
            "absolute inset-0 flex items-end p-4 sm:p-5",
            hiddenLabel && "visually-hidden"
          )}
        >
          <span className="panel-label text-on-immersive/80 bg-immersive-bg-night/40 rounded px-2 py-1 backdrop-blur-sm">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}