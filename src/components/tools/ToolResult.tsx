import { cn } from "@/lib/utils";

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ToolResultProps {
  title?: string;
  items: ResultItem[];
  className?: string;
  caution?: string;
}

export function ToolResult({ title, items, className, caution }: ToolResultProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm",
        className
      )}
    >
      {title && <h3 className="font-heading text-xl text-navy-900">{title}</h3>}
      <dl className={cn("grid gap-4", title && "mt-4")}>
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-baseline justify-between rounded-lg p-3",
              item.highlight ? "bg-sky-100" : "bg-cream-50"
            )}
          >
            <dt className="text-sm font-semibold text-ink-light">{item.label}</dt>
            <dd
              className={cn(
                "font-mono text-lg font-medium",
                item.highlight ? "text-navy-900" : "text-ink"
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {caution && (
        <p className="mt-4 rounded-lg bg-orange-500/10 p-3 text-sm font-medium text-orange-700">
          {caution}
        </p>
      )}
    </div>
  );
}
