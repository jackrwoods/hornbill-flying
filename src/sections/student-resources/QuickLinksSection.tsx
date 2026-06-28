import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";

export function QuickLinksSection() {
  return (
    <Section background="white" id="quick-links">
      <Container>
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          More from Hornbill Aviation
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">
          Book a first flight, explore the fleet, compare programs, or get in touch
          with the team.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="Book a discovery flight"
            description="Your first lesson is the easiest way to decide if flying is for you."
            links={[{ href: "/discovery-flight/", label: "Book now" }]}
          />
          <ResourceCard
            title="Fleet and pricing"
            description="Transparent wet rates for the PA28 fleet and membership details."
            links={[{ href: "/fleet/", label: "See aircraft and rates" }]}
          />
          <ResourceCard
            title="Membership"
            description="Fly more for less with the Hornbill Aviation monthly membership."
            links={[{ href: "/membership/", label: "Start membership" }]}
          />
          <ResourceCard
            title="Private Pilot"
            description="Part 61 Private Pilot training in a consistent PA28 fleet."
            links={[{ href: "/programs/private-pilot/", label: "View program" }]}
          />
          <ResourceCard
            title="Instrument Rating"
            description="Build instrument proficiency and confidence in the Sierra."
            links={[{ href: "/programs/instrument-rating/", label: "View program" }]}
          />
          <ResourceCard
            title="Blog"
            description="Guides on medical certificates, density altitude, mountain flying, and more."
            links={[{ href: "/blog/", label: "Read the blog" }]}
          />
          <ResourceCard
            title="Instructors"
            description="Meet the CFIs you can choose or bring your own."
            links={[{ href: "/instructors/", label: "Meet instructors" }]}
          />
          <ResourceCard
            title="Contact"
            description="Call, text, or email with questions about training."
            links={[{ href: "/contact/", label: "Get in touch" }]}
          />
          <ResourceCard
            title="Location"
            description="Directions, airport access, and where to find us at RNO."
            links={[{ href: "/location/", label: "Find us" }]}
          />
        </div>
      </Container>
    </Section>
  );
}
