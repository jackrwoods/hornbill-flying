import Link from "next/link";
import { Container } from "@/components/Container";

export function InstructorsPageHeader() {
  return (
    <section className="bg-navy-900 py-16 md:py-24 text-white">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-cream-50/80">
            <li>
              <Link
                href="/"
                className="hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
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

        <p className="mt-4 max-w-2xl text-lg text-cream-50/90">
          Choose the CFI who fits your goals and schedule.
        </p>

        <div className="mt-6 max-w-3xl text-cream-50/90 leading-relaxed">
          <p>
            Hornbill Aviation is a Part 61 school, so you choose your instructor
            or bring your own. Every CFI is available in any plane in the
            fleet.
          </p>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-2 text-sm font-mono text-gold-400">
          <span>4 CFIs</span>
          <span aria-hidden="true">·</span>
          <span>1 consistent PA28 fleet</span>
          <span aria-hidden="true">·</span>
          <span>train at RNO</span>
        </p>
      </Container>
    </section>
  );
}
