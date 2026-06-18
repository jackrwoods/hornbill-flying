import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-ink-light">
                  &gt;
                </span>
              )}
              {isLast || !item.href ? (
                <span className={isLast ? "font-medium text-navy-900" : "text-ink-light"}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-ink-light hover:text-navy-900 hover:underline focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
