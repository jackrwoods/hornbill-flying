import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { CTALink } from "./CTALink";
import { PhoneLink } from "./PhoneLink";
import { MobileNav } from "./MobileNav";
import { Container } from "./Container";
import { getHeaderNav } from "@/lib/routes";
import { siteConfig } from "@/lib/config";

export function Header() {
  const navItems = getHeaderNav();

  const navLinkBase =
    "relative px-2 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-active focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-header-bg rounded";
  const navLinkActive =
    "text-active after:absolute after:bottom-1 after:left-1 after:right-1 after:h-0.5 after:rounded-full after:bg-active after:content-['']";

  return (
    <header className="sticky top-0 z-40 bg-header-bg relative">
      {/* Cheatline — 70s livery stripe */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-header-cheatline"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#F9A90C]"
      />
      <Container>
        <div className="flex h-18 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="stacked" size={48} textClassName="text-ink" />
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="hidden min-w-0 flex-1 items-center justify-end gap-0 lg:flex pr-6"
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
                  <div className="absolute left-0 top-full hidden w-64 rounded-md bg-card p-2 shadow-lg group-hover:block">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-bg"
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
            <PhoneLink className="text-sm text-ink hover:text-coral" />
            <CTALink
              href="/discovery-flight/"
              variant="header-cta"
              analytics="discovery_flight_booking_started"
              className="shadow-[inset_0_0_0_2px_transparent] hover:shadow-[inset_0_0_0_2px_var(--color-header-hover-border)]"
            />
          </div>

          <MobileNav items={navItems} />
        </div>
      </Container>
    </header>
  );
}
