import Link from "next/link";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("bg-navy-900 py-16 md:py-24 text-white", className)}>
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-cream-50/80">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="font-heading text-4xl md:text-5xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-cream-50/90">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
