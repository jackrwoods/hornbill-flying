import Link from "next/link";
import { SiteSearchForm } from "@/components/SiteSearchForm";
import { QuickLinkGrid } from "@/components/QuickLinkGrid";
import { PhoneLink } from "@/components/PhoneLink";
import { notFoundCopy, notFoundRoutes } from "@/content/not-found";

/**
 * Composes the 404 subheadline, body copy, site-search fallback, and
 * quick-link grid. The H1 and visual anchor live in not-found.tsx so this
 * component stays focused on the recovery paths.
 */
export function NotFoundHelp() {
  const primaryLinks = notFoundCopy.primaryCTAs.map((cta) => ({
    label: cta.label,
    href: notFoundRoutes[cta.routeKey as keyof typeof notFoundRoutes],
    icon: cta.icon,
    ctaLink: "ctaLink" in cta ? (cta as { ctaLink: boolean }).ctaLink : undefined,
  }));

  const secondaryLinks = notFoundCopy.secondaryCTAs.map((cta) => ({
    label: cta.label,
    href: notFoundRoutes[cta.routeKey as keyof typeof notFoundRoutes],
    icon: cta.icon,
    ctaLink: "ctaLink" in cta ? (cta as { ctaLink: boolean }).ctaLink : undefined,
  }));

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-heading text-2xl text-heading md:text-3xl">
        {notFoundCopy.subheadline}
      </h2>
      <p className="mt-4 text-lg text-muted">
        {notFoundCopy.body}
      </p>

      <SiteSearchForm
        label={notFoundCopy.searchLabel}
        placeholder={notFoundCopy.searchPlaceholder}
        buttonLabel={notFoundCopy.searchButton}
        domain={notFoundCopy.searchDomain}
        className="mt-8 text-left"
      />

      <div className="mt-10 text-left">
        <h3 className="sr-only">{notFoundCopy.quickLinksHeading}</h3>
        <QuickLinkGrid items={primaryLinks} variant="primary" />
        <p className="mt-3 text-sm text-muted">
          Looking for another program?{" "}
          <Link
            href={notFoundRoutes.allPrograms}
            className="font-medium text-heading underline underline-offset-4 hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            {notFoundCopy.allProgramsLabel}
          </Link>
        </p>
      </div>

      <div className="mt-8 text-left">
        <QuickLinkGrid items={secondaryLinks} variant="secondary" />
      </div>

      <p className="mt-8 text-muted">
        {notFoundCopy.phonePrompt}{" "}
        <PhoneLink className="text-heading hover:text-accent" />
      </p>

      <p className="mt-6">
        <a
          href="/sitemap.xml"
          className="text-sm font-medium text-heading underline underline-offset-4 hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
        >
          {notFoundCopy.sitemapLinkText}
        </a>
      </p>
    </div>
  );
}
