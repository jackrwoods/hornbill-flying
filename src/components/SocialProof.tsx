import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "./Container";
import { CTALink } from "./CTALink";
import {
  homepageTestimonials,
  homepageFounderCredibility,
} from "@/content/homepage";
import type { Testimonial } from "@/types";

interface SocialProofProps {
  testimonials?: Testimonial[];
}

export function SocialProof({ testimonials }: SocialProofProps) {
  const reviews = testimonials ?? homepageTestimonials;
  const hasEnoughReviews = reviews.length >= 3;

  if (hasEnoughReviews) {
    const featured = reviews.slice(0, 3);
    return (
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              {t.image && (
                <Image
                  src={t.image}
                  alt={`Photo of ${t.name}`}
                  width={48}
                  height={48}
                  className="mb-4 h-12 w-12 rounded-full object-cover"
                />
              )}
              <p className="text-muted">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <p className="font-semibold text-heading">{t.name}</p>
                {t.role && (
                  <p className="text-sm text-muted">{t.role}</p>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    );
  }

  // Credibility block for launch until 3+ reviews exist.
  return (
    <Container>
      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl">
              {homepageFounderCredibility.heading}
            </h3>
            <p className="mt-3 text-muted">
              {homepageFounderCredibility.statement}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <ul className="space-y-2 text-muted">
              {homepageFounderCredibility.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              className="mt-2 w-full sm:w-auto"
              analytics="discovery_flight_booking_started"
            >
              {homepageFounderCredibility.cta}
            </CTALink>
          </div>
        </div>
      </div>
    </Container>
  );
}
