"use client";

import { cn } from "@/lib/utils";
import { DISCOVERY_FLIGHT_TYPES } from "@/content/booking";
import type { DiscoveryFlightType } from "@/types/booking";

interface FlightTypeSelectorProps {
  selectedType?: DiscoveryFlightType | null;
  onSelectType: (type: DiscoveryFlightType) => void;
  excludeGift?: boolean;
  giftMode?: boolean;
}

/**
 * Cards for selecting a discovery flight type: standard PA28, Tahoe scenic,
 * or gift voucher. Mobile-first with large tap targets and clear pricing.
 */
export function FlightTypeSelector({
  selectedType,
  onSelectType,
  excludeGift = false,
  giftMode = false,
}: FlightTypeSelectorProps) {
  const types = DISCOVERY_FLIGHT_TYPES.filter((t) => {
    if (excludeGift) return !t.isGift;
    return true;
  });

  if (giftMode) {
    const giftType = DISCOVERY_FLIGHT_TYPES.find((t) => t.id === "gift");
    if (!giftType) return null;

    return (
      <div className="rounded-xl border border-accent bg-accent/10 p-5">
        <h3 className="font-heading text-xl text-heading">{giftType.label}</h3>
        <p className="mt-1 text-sm text-muted">{giftType.duration}</p>
        <p className="mt-3 font-mono text-lg font-semibold text-heading">
          ${giftType.price}
        </p>
        <p className="mt-2 text-sm text-muted">{giftType.description}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {types.map((type) => {
        const isSelected = selectedType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelectType(type.id)}
            className={cn(
              "flex min-h-[8rem] min-w-[17.5rem] flex-col rounded-xl border p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring",
              isSelected
                ? "border-accent bg-accent/10"
                : "border-border-subtle bg-white hover:bg-bg"
            )}
            aria-pressed={isSelected}
          >
            <span className="font-heading text-xl text-heading">
              {type.label}
            </span>
            <span className="mt-1 text-sm text-muted">{type.duration}</span>
            <span className="mt-3 font-mono text-lg font-semibold text-heading">
              ${type.price}
            </span>
            <p className="mt-2 text-sm text-muted">{type.description}</p>
          </button>
        );
      })}
    </div>
  );
}
