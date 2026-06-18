import { Container } from "@/components/Container";

/**
 * Skeleton loader shown while booking widget data or chunks load.
 */
export function BookingSkeleton() {
  return (
    <Container className="py-8">
      <div className="max-w-3xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-navy-800/10"
        />
        <div className="rounded-xl border border-navy-800/10 bg-white p-6 shadow-sm md:p-8">
          <div className="h-6 w-3/4 animate-pulse rounded bg-navy-800/10"
          />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-navy-800/10"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-32 animate-pulse rounded-lg bg-navy-800/10"
            />
            <div className="h-32 animate-pulse rounded-lg bg-navy-800/10"
            />
          </div>
          <div className="mt-8 h-12 w-40 animate-pulse rounded bg-navy-800/10"
          />
        </div>
      </div>
    </Container>
  );
}
