export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-navy-800/10 bg-white p-4 text-sm text-ink-light ${className ?? ""}`}
    >
      <strong className="text-navy-900">Disclaimer:</strong> These tools are for
      planning and educational reference only. They are not a substitute for an
      official FAA weather briefing, approved performance data, or financial
      advice. Always verify conditions, aircraft performance, and costs before
      you fly.
    </div>
  );
}
