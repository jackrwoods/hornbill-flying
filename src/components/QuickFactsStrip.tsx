import Link from "next/link";
import { siteFacts } from "@/content/siteFacts";
import { cn } from "@/lib/utils";

/**
 * Persistent quick-facts strip — the V2 IA primitive. Surfaces the crawlable
 * facts (Part 61, RNO, member rate, discovery price, address, hours, phone)
 * without requiring scroll. Desktop: sticky ribbon above the header. Mobile:
 * fixed bottom bar with horizontally scrollable facts + persistent Book CTA.
 *
 * The facts are in the DOM first (after the skip link) so crawlers and screen
 * readers see them before any story content. Per v2-ia-and-progressive-disclosure
 * §2.2 and v2-narrative §4.9.
 */

type FactItem = {
  id: string;
  badge?: "gold" | "cyan" | "ink" | "cream";
  label: string;
  href?: string;
  external?: boolean;
};

function buildFacts(): FactItem[] {
  return [
    { id: "part", badge: "gold", label: siteFacts.part },
    { id: "airport", badge: "cyan", label: siteFacts.airport },
    {
      id: "rate",
      label: `PA28 ${siteFacts.memberRate} ${siteFacts.memberRateQualifier}`,
      href: siteFacts.fleetHref,
    },
    {
      id: "discovery",
      label: `Discovery ${siteFacts.discoveryPrice}`,
      href: siteFacts.discoveryHref,
    },
    {
      id: "address",
      label: `${siteFacts.addressLine1}, ${siteFacts.addressLine2}`,
      href: siteFacts.locationHref,
    },
    {
      id: "hours",
      label: siteFacts.hours,
      href: siteFacts.contactHref,
    },
    {
      id: "phone",
      label: siteFacts.phoneTbd ? "Call us" : siteFacts.phoneFormatted,
      href: siteFacts.phoneTbd ? siteFacts.contactHref : `tel:${siteFacts.phone}`,
      external: !siteFacts.phoneTbd,
    },
  ];
}

function FactLi({ item }: { item: FactItem }) {
  const badgeClass = item.badge
    ? {
        gold: "qfs-badge-gold",
        cyan: "qfs-badge-cyan",
        ink: "qfs-badge-ink",
        cream: "qfs-badge-cream",
      }[item.badge]
    : "";

  const content = (
    <>
      {item.badge ? (
        <span
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]",
            badgeClass
          )}
        >
          {item.label}
        </span>
      ) : (
        <span className="whitespace-nowrap">{item.label}</span>
      )}
    </>
  );

  if (!item.href) {
    return <li className="flex-shrink-0">{content}</li>;
  }

  if (item.external) {
    return (
      <li className="flex-shrink-0">
        <a
          href={item.href}
          className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-header-bg"
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className="flex-shrink-0">
      <Link
        href={item.href}
        className="rounded transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-header-bg"
      >
        {content}
      </Link>
    </li>
  );
}

export function QuickFactsStrip() {
  const facts = buildFacts();
  return (
    <>
      {/* Desktop ribbon — Row 1 of the sticky header (h-9), sticky at top */}
      <nav
        aria-label="Quick facts"
        className="sticky top-0 z-40 hidden lg:block bg-header-bg/95 backdrop-blur-sm text-ink border-b border-border-subtle"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex h-9 items-center gap-5 overflow-x-auto text-[12px] font-mono uppercase tracking-[0.08em]">
            {facts.map((item) => (
              <FactLi key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="cheatline-bottom" />
      </nav>

      {/* Mobile bottom bar — fixed, always visible, with persistent Book CTA */}
      <nav
        aria-label="Quick facts"
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-header-bg text-ink border-t border-border-subtle"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex h-14 items-stretch">
          <ul className="flex flex-1 items-center gap-4 overflow-x-auto px-4 text-[11px] font-mono uppercase tracking-[0.08em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {facts.map((item) => (
              <FactLi key={item.id} item={item} />
            ))}
          </ul>
          <Link
            href={siteFacts.discoveryHref}
            data-analytics="discovery_flight_booking_started"
            className="flex w-28 flex-shrink-0 items-center justify-center bg-header-cta-bg text-header-cta-text font-semibold text-sm hover:bg-header-cta-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            Book
          </Link>
        </div>
      </nav>
    </>
  );
}