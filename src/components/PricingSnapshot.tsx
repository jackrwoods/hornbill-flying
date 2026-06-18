import Link from "next/link";
import { Container } from "./Container";
import { homepagePricingSnapshot } from "@/content/homepage";

export function PricingSnapshot({ className }: { className?: string }) {
  return (
    <Container className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {homepagePricingSnapshot.rates.map((rate) => (
          <div
            key={rate.id}
            className={`rounded-xl bg-white p-6 shadow-sm ${
              rate.id === "member-rate" ? "border-t-4 border-gold-500" : ""
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
              {rate.label}
            </p>
            <p className="mt-2 font-heading text-4xl text-navy-900">
              {rate.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={homepagePricingSnapshot.ctaHref}
          className="inline-block text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
        >
          {homepagePricingSnapshot.cta}
        </Link>
      </div>
    </Container>
  );
}
