"use client";
import { useEffect, useRef } from "react";

/**
 * IntersectionObserver hook that toggles the `is-visible` class on the
 * attached element when it enters the viewport. Drives the `reveal`,
 * `reveal-horizon`, and `reveal-stagger` motion patterns from globals.css.
 *
 * Respects prefers-reduced-motion: when reduced, the element is marked
 * visible immediately (the CSS layer neutralizes the transition too).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean; rootMargin?: string }
) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -8% 0px" } =
    options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return ref;
}