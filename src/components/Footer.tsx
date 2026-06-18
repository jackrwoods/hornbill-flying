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
    <footer className="bg-navy-900 text-cream-50">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <Logo showText textClassName="text-white" />
            <address className="mt-6 not-italic">
              <p className="text-sm leading-relaxed">
                {siteConfig.nap.streetAddress}
                <br />
                {siteConfig.nap.addressLocality}, {siteConfig.nap.addressRegion}{" "}
                {siteConfig.nap.postalCode}
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <PhoneLink className="text-cream-50 hover:text-gold-500" />
                <a
                  href={`mailto:${siteConfig.nap.email}`}
                  className="hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
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
                    className="text-sm text-cream-50/80 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
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
              <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-gold-500">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="text-sm text-cream-50/90 hover:text-gold-500"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="overflow-hidden rounded-lg bg-navy-800">
          <div className="flex h-48 items-center justify-center text-sm text-cream-50/60">
            <span>Map embed placeholder — 1008 Gentry Way, Reno, NV 89512</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 py-6 text-sm text-cream-50/70">
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
