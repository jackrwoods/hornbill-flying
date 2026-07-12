"use client";
import * as React from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealVariant = "glide" | "horizon" | "stagger";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  once?: boolean;
}

const variantClass: Record<RevealVariant, string> = {
  glide: "reveal",
  horizon: "reveal-horizon",
  stagger: "reveal-stagger",
};

/**
 * Wrapper that applies a V2 motion-grammar entrance pattern on intersection.
 * - `glide`   → glide-entrance (both registers)
 * - `horizon` → horizon-reveal (both registers; photos lift and clear)
 * - `stagger` → word-cascade (staggered children, 80ms)
 */
export function Reveal({
  children,
  className,
  variant = "glide",
  as: As = "div",
  threshold,
  once,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ threshold, once });
  return (
    // @ts-expect-error — ref typing across intrinsic elements
    <As ref={ref} className={cn(variantClass[variant], className)}>
      {children}
    </As>
  );
}