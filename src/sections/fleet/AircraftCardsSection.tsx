import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { getPublishedFleet, membershipRates } from "@/content/fleet";
import { memberRateBillingNote } from "@/content/pricing";
import { isAircraft } from "@/types";

export function AircraftCardsSection() {
  const { memberRate, nonMemberRate } = membershipRates;
  const publishedFleet = getPublishedFleet();
  const aircraft = publishedFleet.filter(isAircraft);
  const hasSimulator = publishedFleet.some((m) => !isAircraft(m));

  return (
    <Section background="white" id="aircraft">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          The fleet
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">
          {aircraft.length} PA28 {aircraft.length === 1 ? "Cherokee" : "Cherokees"}
          {hasSimulator && " and a flight simulator"}. Same engine, same
          handling, similarly equipped aircraft {hasSimulator && "— plus a place to rehearse procedures before you burn fuel"}.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-ink-light">
          {memberRateBillingNote}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedFleet.map((member, index) => (
            <article
              key={member.slug}
              className="rounded-xl bg-sand-50 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={member.photo}
                  alt={member.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-2xl text-navy-900">
                  {isAircraft(member) ? member.tail : member.name}
                </h3>

                {isAircraft(member) ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-ink-light">Engine</h4>
                      <p>{member.engine}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-light">Avionics</h4>
                      <ul className="list-disc pl-4">
                        {member.avionics.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-light">Notes</h4>
                      <p>{member.notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3 text-sm">
                    <p>{member.tagline}</p>
                    <p>{member.notes}</p>
                  </div>
                )}

                <div className="mt-auto pt-5 flex flex-wrap gap-2">
                  {isAircraft(member) && (
                    <>
                      <span className="inline-flex rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">
                        Member ${memberRate}/hr
                      </span>
                      <span className="inline-flex rounded-full bg-white border border-navy-800/10 px-3 py-1 text-xs font-semibold text-navy-900">
                        Non-member ${nonMemberRate}/hr
                      </span>
                      {member.ifrEquipped && (
                        <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-navy-900">
                          IFR equipped
                        </span>
                      )}
                      {member.crossCountryReady && (
                        <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-navy-900">
                          Cross-country ready
                        </span>
                      )}
                    </>
                  )}
                  {!isAircraft(member) && (
                    <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-navy-900">
                      Procedure training
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm">
                  <Link
                    href={`/fleet/${member.slug}/`}
                    className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                  >
                    View details →
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
