"use client";

import { useState } from "react";
import { NavLink } from "./NavLink";
import { CTALink } from "./CTALink";
import { PhoneLink } from "./PhoneLink";
import type { NavItem } from "@/types";

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
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
          className="absolute left-0 right-0 top-full z-50 border-t border-navy-800 bg-navy-900 px-4 py-6 shadow-xl"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.href} className="flex flex-col gap-3">
                <NavLink
                  href={item.href}
                  className="text-base text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
                {item.children && item.children.length > 0 && (
                  <ul className="ml-4 flex flex-col gap-2 border-l border-navy-800 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          href={child.href}
                          className="text-sm text-cream-50/80"
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

            <div className="mt-4 flex flex-col gap-3 border-t border-navy-800 pt-4">
              <PhoneLink
                className="text-white"
                showIcon
              />
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                className="w-full"
                analytics="discovery_flight_booking_started"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
