import * as React from "react";
import { cn } from "@/lib/utils";
import type { SectionBackground } from "@/types";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: SectionBackground;
  id?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-bg",
  card: "bg-card",
  dark: "bg-dark text-on-dark",
  accent: "bg-accent text-on-accent",
  callout: "bg-callout",
};

export function Section({
  children,
  className,
  background = "default",
  id,
  as: As = "section",
}: SectionProps) {
  return (
    <As
      id={id}
      className={cn("py-16 md:py-24", backgroundClasses[background], className)}
    >
      {children}
    </As>
  );
}
