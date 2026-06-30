"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function FAQAccordion({
  faqs,
  className,
  allowMultiple = false,
}: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {faqs.map((faq) => {
        const isOpen = openItems.has(faq.id);
        return (
          <div
            key={faq.id}
            className="rounded-lg border border-border-subtle bg-white overflow-hidden"
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-body text-base font-semibold text-heading hover:bg-bg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-focus-ring"
              >
                {faq.question}
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
                  aria-hidden="true"
                  className={cn(
                    "flex-shrink-0 text-accent transition-transform",
                    isOpen && "rotate-180"
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-question-${faq.id}`}
              hidden={!isOpen}
              className={cn(
                "px-5 pb-5 text-muted",
                isOpen && "pt-4",
                !isOpen && "hidden"
              )}
            >
              <p id={`faq-question-${faq.id}`} className="sr-only">
                {faq.question}
              </p>
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
