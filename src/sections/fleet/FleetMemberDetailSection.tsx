import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { AssetImage as Image } from "@/components/AssetImage";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { membershipRates } from "@/content/fleet";
import { memberRateBillingNote } from "@/content/pricing";
import { isAircraft, type FleetMember } from "@/types";

interface FleetMemberDetailSectionProps {
  member: FleetMember;
}

export function FleetMemberDetailSection({
  member,
}: FleetMemberDetailSectionProps) {
  const { memberRate, nonMemberRate } = membershipRates;

  return (
    <Section background="card" id="details">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal variant="horizon">
            {isAircraft(member) && member.gallery.length > 0 ? (
              <ImageCarousel images={member.gallery} aspectRatio="aspect-[4/3]" />
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-immersive-bg">
                <Image
                  src={member.photo}
                  alt={member.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
          </Reveal>

          <Reveal variant="glide" className="flex flex-col gap-6">
            {isAircraft(member) ? (
              <>
                <p className="panel-label-lg text-accent">PA28 Cherokee</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
                  {member.tail}
                </h2>
                <p className="text-lg text-muted leading-relaxed text-pretty">
                  {member.notes}
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-muted">Engine</h3>
                    <p>{member.engine}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted">Avionics</h3>
                    <ul className="list-disc pl-5">
                      {member.avionics.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="nums inline-flex rounded-full bg-dark px-3 py-1 text-xs font-semibold text-on-dark">
                    Member ${memberRate}/hr
                  </span>
                  <span className="nums inline-flex rounded-full bg-card border border-border-subtle px-3 py-1 text-xs font-semibold text-heading">
                    Non-member ${nonMemberRate}/hr
                  </span>
                  {member.ifrEquipped && (
                    <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                      IFR equipped
                    </span>
                  )}
                  {member.crossCountryReady && (
                    <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                      Cross-country ready
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{memberRateBillingNote}</p>

                <p className="text-sm text-muted">
                  Wet rate includes fuel and oil. Ground and flight instruction
                  are billed separately. See{" "}
                  <Link
                    href="/fleet/"
                    className="beak-flash font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                  >
                    fleet and pricing
                  </Link>{" "}
                  for full details.
                </p>
              </>
            ) : (
              <>
                <p className="panel-label-lg text-accent">Training device</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
                  {member.name}
                </h2>
                <p className="text-lg text-muted leading-relaxed text-pretty">
                  {member.description}
                </p>
                <p className="text-body leading-relaxed">{member.notes}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                    Procedure training
                  </span>
                  <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                    Approach practice
                  </span>
                  <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                    IPC prep
                  </span>
                </div>
              </>
            )}
          </Reveal>
        </div>

        {member.documents && member.documents.length > 0 && (
          <Reveal variant="glide" className="mt-16">
            <p className="panel-label-lg text-accent mb-4">Manuals</p>
            <h2 className="font-heading text-2xl text-heading md:text-3xl text-balance">
              Documents
            </h2>
            <p className="mt-3 max-w-3xl text-muted text-pretty">
              Download the current manuals and reference documents for{" "}
              {isAircraft(member) ? member.tail : member.name}. Verify all
              numbers and procedures with the physical aircraft or current
              simulator materials before flight or training.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {member.documents.map((doc) => (
                <DownloadCard key={doc.slug} document={doc} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}