"use client";
import {
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useEffect, useState } from "react";

interface ScrubbedTransformOptions {
  target: React.RefObject<HTMLElement | null>;
  /** Range of the scrubbed value across the pin's scroll range. */
  output: [number, number];
  /** Offset within the target's scroll range. Defaults to ["start end", "end start"]. */
  offset?: NonNullable<UseScrollOptions["offset"]>;
}

/**
 * Returns a MotionValue<number> scoped to the target element's scroll progress.
 * Returns `null` on the server, under prefers-reduced-motion, or below the mobile
 * breakpoint (768px) — callers render the final-state value directly in those cases.
 *
 * Hooks are called unconditionally; the `enabled` gate only controls whether the
 * returned MotionValue is surfaced to the caller (so rules-of-hooks hold even when
 * the gate flips from false → true after mount).
 */
export function useScrubbedTransform(
  opts: ScrubbedTransformOptions
): MotionValue<number> | null {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduce && desktop);
  }, []);
  const { scrollYProgress } = useScroll({
    target: opts.target,
    offset: opts.offset ?? ["start end", "end start"],
  });
  const transform = useTransform(scrollYProgress, [0, 1], opts.output);
  return enabled ? transform : null;
}