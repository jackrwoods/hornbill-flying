import { PageHeader } from "@/components/PageHeader";

export function InstructorsPageHeader() {
  return (
    <PageHeader
      eyebrow="Our Team"
      title="Part 61 flight instructors in Reno, NV"
      subtitle="Choose the CFI who fits your goals and schedule."
      image={{
        src: "/images/instructors/person-leaning-airplane-hoodie.png",
        alt: "Hornbill Aviation flight instructor with a PA28 Cherokee on the ramp at KRNO",
      }}
      sunsetVariant="dawn"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Instructors" },
      ]}
      className="-mt-16 lg:-mt-18"
    >
      <p className="mt-6 max-w-2xl text-on-immersive-muted leading-relaxed text-pretty">
        Hornbill Aviation is a Part 61 school, so you choose your instructor
        or bring your own. Every CFI is available in any plane in the fleet.
      </p>
    </PageHeader>
  );
}