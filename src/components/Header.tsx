"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { CTALink } from "./CTALink";
import { PhoneLink } from "./PhoneLink";
import { MobileNav } from "./MobileNav";
import { Container } from "./Container";
import { getHeaderNav } from "@/lib/routes";
import { siteConfig } from "@/lib/config";

const SCROLL_FADE_DISTANCE = 120;

export function Header() {
  const navItems = getHeaderNav();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_FADE_DISTANCE);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkBase =
    "beak-flash relative px-2 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-on-dark transition-colors hover:text-on-dark-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded";
  const navLinkActive = "text-on-dark-accent";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: scrolled ? 0.7 : 0.45,
          backgroundImage:
            "linear-gradient(135deg, #f1ca24 0%, #f1a21b 6%, #e11d48 18%, #6b1e36 40%, #2a2f3a 70%, #12141b 100%)",
        }}
      />
      <Container className="relative">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          <div className="flex h-full items-center">
            <Logo fullWordmark variant="light" className="h-10 lg:h-12 w-auto" />
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex px-6"
          >
            {navItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <div key={item.href} className="group relative">
                  <NavLink
                    href={item.href}
                    className={navLinkBase}
                    activeClassName={navLinkActive}
                  >
                    {item.label}
                  </NavLink>
                  <div className="absolute left-0 top-full hidden w-64 rounded-md border border-border-subtle bg-card p-2 shadow-xl group-hover:block">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-bg hover:text-active"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={navLinkBase}
                  activeClassName={navLinkActive}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <a
              href={siteConfig.flightCircleScheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkBase}
              data-analytics="header_schedule_click"
            >
              Schedule
            </a>
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <PhoneLink className="text-sm text-on-dark hover:text-on-dark-accent" />
            <CTALink
              href="/discovery-flight/"
              variant="header-cta"
              analytics="discovery_flight_booking_started"
            />
          </div>

          <MobileNav items={navItems} />
        </div>
      </Container>
    </header>
  );
}