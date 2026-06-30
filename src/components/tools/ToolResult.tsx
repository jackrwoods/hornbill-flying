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
        "rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm",
        className
      )}
    >
      {title && <h3 className="font-heading text-xl text-heading">{title}</h3>}
      <dl className={cn("grid gap-4", title && "mt-4")}>
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-baseline justify-between rounded-lg p-3",
              item.highlight ? "bg-callout" : "bg-bg"
            )}
          >
            <dt className="text-sm font-semibold text-muted">{item.label}</dt>
            <dd
              className={cn(
                "font-mono text-lg font-medium",
                item.highlight ? "text-heading" : "text-body"
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {caution && (
        <p className="mt-4 rounded-lg bg-alert/10 p-3 text-sm font-medium text-alert-hover">
          {caution}
        </p>
      )}
    </div>
  );
}
