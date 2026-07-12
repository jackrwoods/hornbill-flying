import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export function FleetDetailCTASection() {
  return (
    <section
      id="next-steps"
      className="bg-immersive-bg-night text-on-immersive relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-20 md:py-28">
        <Reveal variant="stagger" className="flex flex-col items-center gap-6 text-center">
          <p className="panel-label-lg text-immersive-accent">Next steps</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/book/"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Book a flight
            </Link>
            <Link
              href="/fleet/"
              className="beak-flash inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-on-immersive transition-colors hover:bg-on-dark-subtle focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Back to fleet
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}