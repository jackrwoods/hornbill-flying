import { Container } from "./Container";
import { Logo } from "./Logo";
import { PhoneLink } from "./PhoneLink";
import { NavLink } from "./NavLink";
import { siteConfig } from "@/lib/config";
import { siteFacts } from "@/content/siteFacts";
import { getFooterLinks } from "@/lib/routes";

export function Footer() {
  const linkGroups = getFooterLinks();
  const activeSocial = Object.entries(siteConfig.social).filter(
    ([, url]) => typeof url === "string" && url.length > 0
  );

  return (
    <footer className="bg-footer-bg text-footer-text relative">
      <div aria-hidden="true" className="cheatline-bottom" />
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <Logo fullWordmark width={170} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-footer-muted">
              {siteConfig.tagline}
            </p>
            <address className="mt-6 not-italic">
              <p className="text-sm leading-relaxed text-footer-text">
                {siteFacts.addressLine1}
                <br />
                {siteFacts.addressLine2}
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <PhoneLink className="text-footer-link hover:text-footer-link-hover" />
                <a
                  href={`mailto:${siteFacts.email}`}
                  className="text-footer-link hover:text-footer-link-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
                  data-analytics="email_click"
                >
                  {siteFacts.email}
                </a>
              </div>
            </address>

            {activeSocial.length > 0 && (
              <div className="mt-6 flex gap-4">
                {activeSocial.map(([name, url]) => (
                  <a
                    key={name}
                    href={url as string}
                    className="text-sm text-footer-muted hover:text-footer-link-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
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
              <h3 className="panel-label-lg text-accent">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="beak-flash text-sm text-footer-link/90 hover:text-footer-link-hover"
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
                      className="beak-flash text-sm text-footer-link/90 hover:text-footer-link-hover"
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

        {/* Bottom bar */}
        <div className="border-t border-divider py-6 text-sm text-footer-muted">
          <p>
            FAA {siteFacts.part} flight school at {siteFacts.airportLong} ({siteFacts.airport}). All instruction
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