import { CTALink } from "@/components/CTALink";
import { FLOW_SELECTOR_OPTIONS } from "@/content/booking";

/**
 * Card selector shown at the top of /book/ when no flow param is present.
 */
export function FlowSelector() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FLOW_SELECTOR_OPTIONS.map((option) => (
        <div
          key={option.id}
          className="flex flex-col rounded-xl border border-navy-800/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-xl text-navy-900">{option.label}</h3>
            {option.comingSoon && (
              <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-navy-900">
                Coming soon
              </span>
            )}
          </div>
          <p className="mt-2 flex-1 text-ink-light">{option.description}</p>
          <div className="mt-6">
            {option.comingSoon ? (
              <CTALink
                href={option.href}
                variant="tertiary"
                className="w-full"
                analytics="booking_flow_started"
              >
                {option.label}
              </CTALink>
            ) : (
              <CTALink
                href={option.href}
                variant="secondary"
                className="w-full"
                analytics="booking_flow_started"
              >
                {option.id === "gift" ? "Buy a gift voucher" : option.label}
              </CTALink>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
