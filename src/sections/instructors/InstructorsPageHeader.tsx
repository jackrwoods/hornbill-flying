import Link from "next/link";
import { Container } from "@/components/Container";

export function InstructorsPageHeader() {
  return (
    <section className="bg-dark py-16 md:py-24 text-on-dark">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-on-dark">
            <li>
              <Link
                href="/"
                className="hover:text-on-dark-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
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
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li>
              <span aria-current="page">Instructors</span>
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl leading-tight">
          Part 61 flight instructors in Reno, NV
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-on-dark">
          Choose the CFI who fits your goals and schedule.
        </p>

        <div className="mt-6 max-w-3xl text-on-dark leading-relaxed">
          <p>
            Hornbill Aviation is a Part 61 school, so you choose your instructor
            or bring your own. Every CFI is available in any plane in the
            fleet.
          </p>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-dark-muted px-4 py-2 text-sm font-mono text-on-dark-accent-hover">
          <span>4 CFIs</span>
          <span aria-hidden="true">·</span>
          <span>1 consistent PA28 fleet</span>
          <span aria-hidden="true">·</span>
          <span>train at RNO</span>
        </p>

        <div className="mt-8 max-w-3xl rounded-xl bg-dark-muted p-6 text-on-dark">
          <h2 className="font-heading text-lg text-on-dark">How CFIs work with Hornbill</h2>
          <ul className="mt-4 grid gap-3 text-on-dark/90 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-on-dark-accent">✓</span>
              <span>CFIs set their own rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-on-dark-accent">✓</span>
              <span>CFIs are independent contractors</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-on-dark-accent">✓</span>
              <span>CFIs manage their own schedules</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-on-dark-accent">✓</span>
              <span>All CFIs are approved by Hornbill Aviation via a check flight in our aircraft</span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
