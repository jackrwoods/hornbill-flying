import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ResourceCard } from "@/components/ResourceCard";

export function QuickLinksSection() {
  return (
    <Section background="card" id="quick-links">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Quick links</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            More from Hornbill Aviation
          </h2>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            Book a first flight, explore the fleet, compare programs, or get in touch
            with the team.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal variant="glide">
            <ResourceCard
              title="Book a discovery flight"
              description="Your first lesson is the easiest way to decide if flying is for you."
              links={[{ href: "/discovery-flight/", label: "Book now" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Fleet and pricing"
              description="Transparent wet rates for the PA28 fleet and membership details."
              links={[{ href: "/fleet/", label: "See aircraft and rates" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Membership"
              description="Fly more for less with the Hornbill Aviation monthly membership."
              links={[{ href: "/membership/", label: "Start membership" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Private Pilot"
              description="Part 61 Private Pilot training in a PA28 fleet."
              links={[{ href: "/programs/private-pilot/", label: "View program" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Instrument Rating"
              description="Build instrument proficiency and confidence in the Sierra."
              links={[{ href: "/programs/instrument-rating/", label: "View program" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Blog"
              description="Guides on medical certificates, density altitude, mountain flying, and more."
              links={[{ href: "/blog/", label: "Read the blog" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Instructors"
              description="Meet the CFIs you can choose or bring your own."
              links={[{ href: "/instructors/", label: "Meet instructors" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Contact"
              description="Call, text, or email with questions about training."
              links={[{ href: "/contact/", label: "Get in touch" }]}
            />
          </Reveal>
          <Reveal variant="glide">
            <ResourceCard
              title="Location"
              description="Directions, airport access, and where to find us at RNO."
              links={[{ href: "/location/", label: "Find us" }]}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}