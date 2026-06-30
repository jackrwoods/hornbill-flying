import { Container } from "./Container";
import { homepageTrustStrip } from "@/content/homepage";

export function TrustStrip({ className }: { className?: string }) {
  return (
    <section className={`bg-callout py-8 ${className ?? ""}`}>
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homepageTrustStrip.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 text-sm font-medium text-heading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-accent"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-mono uppercase tracking-wide">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
