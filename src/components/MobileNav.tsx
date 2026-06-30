"use client";

import { useState } from "react";
import { NavLink } from "./NavLink";
import { CTALink } from "./CTALink";
import { PhoneLink } from "./PhoneLink";
import { siteConfig } from "@/lib/config";
import type { NavItem } from "@/types";

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mobileNavBase =
    "block rounded-md px-4 py-3 text-base font-semibold uppercase tracking-wide text-ink transition-colors hover:text-active hover:bg-bg focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-header-bg";
  const mobileNavActive = "text-active";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:text-coral focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-header-bg"
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
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="absolute left-0 right-0 top-full z-50 bg-header-bg px-4 py-6 shadow-xl"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
                          onClick={() => setIsOpen(false)}
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
              className={mobileNavBase}
              onClick={() => setIsOpen(false)}
              data-analytics="mobile_schedule_click"
            >
              Schedule
            </a>
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-divider pt-4">
            <PhoneLink className="text-ink" showIcon />
            <CTALink
              href="/discovery-flight/"
              variant="header-cta"
              className="w-full shadow-[inset_0_0_0_2px_transparent] hover:shadow-[inset_0_0_0_2px_var(--color-header-hover-border)]"
              analytics="discovery_flight_booking_started"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}