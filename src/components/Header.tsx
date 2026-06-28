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

  return (
    <header className="sticky top-0 z-40 bg-navy-900 shadow-md">
      <Container>
        <div className="flex h-18 items-center justify-between py-3">
          <Logo showText textClassName="text-white" />

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 lg:flex"
          >
            {navItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <div key={item.href} className="group relative">
                  <NavLink
                    href={item.href}
                    className="text-sm font-medium text-white hover:text-gold-500"
                  >
                    {item.label}
                  </NavLink>
                  <div className="absolute left-0 top-full hidden w-64 rounded-lg bg-white p-2 shadow-lg group-hover:block">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-navy-900 hover:bg-cream-50"
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
                  className="text-sm font-medium text-white hover:text-gold-500"
                >
                  {item.label}
                </NavLink>
              )
            )}
            <a
              href={siteConfig.flightCircleScheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              data-analytics="header_schedule_click"
            >
              Schedule
            </a>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <PhoneLink className="text-sm text-white hover:text-gold-500" />
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
            />
          </div>

          <MobileNav items={navItems} />
        </div>
      </Container>
    </header>
  );
}
