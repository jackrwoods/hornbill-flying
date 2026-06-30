import { Container } from "./Container";
import { Logo } from "./Logo";
import { PhoneLink } from "./PhoneLink";
import { NavLink } from "./NavLink";
import { siteConfig } from "@/lib/config";
import { getFooterLinks } from "@/lib/routes";

export function Footer() {
  const linkGroups = getFooterLinks();
  const activeSocial = Object.entries(siteConfig.social).filter(
    ([, url]) => typeof url === "string" && url.length > 0
  );

  return (
    <footer className="bg-footer-bg text-footer-text">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <Logo variant="stacked" size={48} textClassName="text-ink" largeText />
            <address className="mt-6 not-italic">
              <p className="text-sm leading-relaxed text-footer-text">
                {siteConfig.nap.streetAddress}
                <br />
                {siteConfig.nap.addressLocality}, {siteConfig.nap.addressRegion}{" "}
                {siteConfig.nap.postalCode}
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <PhoneLink className="text-footer-link hover:text-footer-link-hover" />
                <a
                  href={`mailto:${siteConfig.nap.email}`}
                  className="text-footer-link hover:text-footer-link-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                  data-analytics="email_click"
                >
                  {siteConfig.nap.email}
                </a>
              </div>
            </address>

            {activeSocial.length > 0 && (
              <div className="mt-6 flex gap-4">
                {activeSocial.map(([name, url]) => (
                  <a
                    key={name}
                    href={url as string}
                    className="text-sm text-footer-muted hover:text-footer-link-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.brandName} on ${name}`}
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-accent">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="text-sm text-footer-link/90 hover:text-footer-link-hover"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                {group.title === "Connect" && (
                  <li>
                    <a
                      href={siteConfig.flightCircleScheduleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-footer-link/90 hover:text-footer-link-hover"
                      data-analytics="footer_schedule_click"
                    >
                      Schedule
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="overflow-hidden rounded-lg bg-card">
          <div className="flex h-48 items-center justify-center text-sm text-footer-muted">
            <span>Map embed placeholder — 1008 Gentry Way, Reno, NV 89512</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-divider py-6 text-sm text-footer-muted">
          <p>
            FAA Part 61 flight school at Reno–Tahoe (RNO). All instruction
            provided by certificated flight instructors.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}