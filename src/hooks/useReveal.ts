"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * IntersectionObserver hook that toggles the `is-visible` class on the
 * attached element when it enters the viewport. Drives the `reveal`,
 * `reveal-horizon`, and `reveal-stagger` motion patterns from globals.css.
 *
 * # Why `reveal-pending` is added on mount (not in SSR)
 *
 * The reveal CSS used to default to `opacity: 0` and only become visible
 * when this hook added `is-visible`. That made the page content depend on
 * React hydration completing — if hydration stalled or failed (e.g., on an
 * old iOS Safari that can't parse a modern syntax in the React bundle),
 * every reveal element stayed invisible forever. The hero text, the mobile
 * timeline cards, every section body — all gone.
 *
 * The CSS now defaults to visible. This hook adds `reveal-pending` on mount
 * (via `useLayoutEffect` so it lands before the browser paints) to hide the
 * element, then adds `is-visible` when it enters the viewport to animate it
 * back in. If JavaScript never hydrates, the hook never runs, the class is
 * never added, and the content stays visible — no entrance animation, but
 * the page is readable.
 *
 * Respects prefers-reduced-motion: when reduced, the element is marked
 * visible immediately (the CSS layer neutralizes the transition too).
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean; rootMargin?: string }
) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -8% 0px" } =
    options ?? {};

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.classList.add("reveal-pending");
  }, []);

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