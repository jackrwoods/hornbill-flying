import { cn } from "@/lib/utils";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Max-width, readable long-form text wrapper for legal pages and other
 * dense content. Keeps line length close to ~65 characters on desktop,
 * maintains consistent vertical rhythm, and styles headings, lists, and
 * inline links without requiring the Tailwind typography plugin.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-navy-900",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:leading-snug [&_h3]:text-navy-900",
        "[&_p]:mb-4 [&_p]:text-base/relaxed [&_p]:text-ink",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-5",
        "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mb-2 [&_li]:text-ink",
        "[&_a]:text-navy-900 [&_a]:underline [&_a]:decoration-gold-500/50 hover:[&_a]:decoration-gold-500 [&_a]:transition-colors",
        "[&_strong]:font-semibold",
        className
      )}
    >
      {children}
    </div>
  );
}
