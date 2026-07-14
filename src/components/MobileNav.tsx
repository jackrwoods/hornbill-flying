"use client";

import { useRef } from "react";
import { NavLink } from "./NavLink";
import { siteConfig } from "@/lib/config";
import type { NavItem } from "@/types";

interface MobileNavProps {
  items: NavItem[];
}

/**
 * Mobile navigation drawer.
 *
 * Uses a native `<details>` element for the open/close toggle so the menu
 * works without JavaScript. This is a progressive-enhancement fix for iOS
 * Safari where React hydration can stall or fail — with the old `useState`
 * toggle, the hamburger was unresponsive whenever hydration didn't complete.
 * `<details>` toggles via the browser's built-in disclosure behavior, so the
 * menu opens and closes on tap even with JS disabled.
 *
 * The `onClick={close}` handlers on the links are a JS enhancement that
 * auto-closes the drawer after client-side navigation. If JS isn't running,
 * clicking a link does a full page navigation (which resets the `<details>`
 * element on the next page load), so the drawer still ends up closed.
 */
export function MobileNav({ items }: MobileNavProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const mobileNavBase =
    "block rounded-md px-4 py-3 text-base font-semibold uppercase tracking-wide text-ink transition-colors hover:text-active hover:bg-bg focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-header-bg";
  const mobileNavActive = "text-active";

  return (
    <details className="mobile-nav relative lg:hidden" ref={detailsRef}>
      <summary
        aria-label="Open navigation menu"
        className="mobile-nav-summary inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-on-dark hover:text-on-dark-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line className="mobile-nav-icon-open" x1="4" y1="6" x2="20" y2="6" />
          <line className="mobile-nav-icon-open" x1="4" y1="12" x2="20" y2="12" />
          <line className="mobile-nav-icon-open" x1="4" y1="18" x2="20" y2="18" />
          <line className="mobile-nav-icon-close" x1="18" y1="6" x2="6" y2="18" />
          <line className="mobile-nav-icon-close" x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </summary>
      <div className="fixed left-0 right-0 top-16 z-50 bg-header-bg px-4 py-6 shadow-xl">
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.href}>
              <NavLink
                href={item.href}
                onClick={close}
                className={mobileNavBase}
                activeClassName={mobileNavActive}
              >
                {item.label}
              </NavLink>
              {item.children && item.children.length > 0 && (
                <ul className="ml-4 mt-2 flex flex-col gap-1 border-l border-divider pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavLink
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-bg"
                        onClick={close}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <a
            href={siteConfig.flightCircleScheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-header-cta-bg px-5 py-3 text-base font-semibold uppercase tracking-wide text-header-cta-text transition-colors hover:bg-header-cta-hover"
            onClick={close}
            data-analytics="mobile_schedule_click"
          >
            Schedule
          </a>
        </nav>
      </div>
    </details>
  );
}