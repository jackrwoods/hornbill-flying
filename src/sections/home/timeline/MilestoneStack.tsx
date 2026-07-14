import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { CTALink } from "@/components/CTALink";
import { milestones } from "@/sections/home/timeline/milestones";

/**
 * Mobile / reduced-motion fallback for the cinematic timeline.
 *
 * Renders when `useScrubbedTransform`'s gate returns disabled (viewport < 768px
 * or `prefers-reduced-motion: reduce`). Plain vertical stack of 6 cards, one
 * per milestone, each with a `Reveal variant="glide"` entrance. No pin, no SVG,
 * no Framer scroll. Server component — the `Reveal` child handles its own
 * client-side IntersectionObserver internally.
 */
export function MilestoneStack() {
  return (
    <section
      className="bg-immersive-bg text-on-immersive relative overflow-hidden"
      aria-label="Your flight training journey, step by step"
    >
      <Container className="py-24 md:py-32">
        <header className="mb-16 md:mb-24">
          <p className="panel-label-lg text-immersive-accent mb-4">The journey</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-on-immersive text-balance max-w-2xl">
            From your first discovery flight to teaching instrument students.
          </h2>
          <p className="mt-5 text-on-immersive-muted text-pretty max-w-2xl">
            Six milestones, one PA28 fleet, one Sierra backyard. This is the
            path from your first lesson to your CFI.
          </p>
        </header>

        <div className="divide-y divide-border-subtle">
          {milestones.map((m, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <Reveal
                key={m.index}
                variant="glide"
                className="py-16 md:py-24 first:pt-0 last:pb-0"
              >
                <article className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                  <div
                    className={
                      "aspect-4/3 overflow-hidden rounded-xl " +
                      (imageLeft ? "" : "md:order-2")
                    }
                  >
                    <SunsetPlaceholder
                      variant={m.sunsetVariant}
                      label={m.imageLabel}
                      className="h-full w-full"
                    />
                  </div>
                  <div
                    className={
                      "flex flex-col justify-center " +
                      (imageLeft ? "" : "md:order-1")
                    }
                  >
                    <p className="panel-label-lg text-immersive-accent mb-3">
                      {m.eyebrow}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-on-immersive text-balance">
                      {m.poeticLine}
                    </h3>
                    <p className="mt-4 text-on-immersive-muted text-pretty">
                      {m.groundedLine}
                    </p>
                    <p className="mt-3 text-immersive-accent text-pretty">
                      {m.differentiator}
                    </p>
                    <div className="mt-6">
                      <CTALink
                        href={m.href}
                        variant="secondary"
                        analytics={`timeline_${m.index}_see_program`}
                      >
                        {m.linkLabel}
                      </CTALink>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}