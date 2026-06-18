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
  cream: "bg-cream-50",
  white: "bg-white",
  navy: "bg-navy-900 text-white",
  gold: "bg-gold-500 text-navy-900",
  sky: "bg-sky-100",
};

export function Section({
  children,
  className,
  background = "cream",
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
