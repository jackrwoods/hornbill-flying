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
    "beak-flash relative px-2 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:text-active focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-header-bg rounded";
  const navLinkActive = "text-active";

  return (
    <header className="sticky top-0 z-30 bg-header-bg/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 lg:h-18 items-center justify-between">
          <div className="flex h-full items-center">
            <Logo fullWordmark className="h-10 lg:h-12 w-auto" />
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
            <PhoneLink className="text-sm text-ink hover:text-active" />
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