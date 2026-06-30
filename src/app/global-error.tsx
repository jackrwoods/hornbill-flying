'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-bg text-body">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="font-heading text-4xl text-heading md:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            We hit unexpected turbulence. Try again or head back to base.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-lg bg-dark px-5 py-3 text-sm font-semibold text-on-dark transition-colors hover:bg-dark-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-border px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
