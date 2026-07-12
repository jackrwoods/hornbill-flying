import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { Reveal } from "@/components/Reveal";
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
    <Section background="card" id="aircraft">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Fleet</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            The fleet
          </h2>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            {aircraft.length} PA28 {aircraft.length === 1 ? "Cherokee" : "Cherokees"}
            {hasSimulator && " and a flight simulator"}. Same engine, same
            handling, similarly equipped aircraft {hasSimulator && "— plus a place to rehearse procedures before you burn fuel"}.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {memberRateBillingNote}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedFleet.map((member) => (
            <Reveal
              key={member.slug}
              variant="glide"
              className="card-cinematic overflow-hidden flex flex-col"
            >
              <SunsetPlaceholder
                variant="vertical"
                label={`${isAircraft(member) ? member.tail : member.name} — photography coming`}
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-2xl text-heading">
                  {isAircraft(member) ? member.tail : member.name}
                </h3>

                {isAircraft(member) ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-muted">Engine</h4>
                      <p>{member.engine}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted">Avionics</h4>
                      <ul className="list-disc pl-4">
                        {member.avionics.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted">Notes</h4>
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
                      <span className="nums inline-flex rounded-full bg-dark px-3 py-1 text-xs font-semibold text-on-dark">
                        Member ${memberRate}/hr
                      </span>
                      <span className="nums inline-flex rounded-full bg-bg border border-border-subtle px-3 py-1 text-xs font-semibold text-heading">
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
                    </>
                  )}
                  {!isAircraft(member) && (
                    <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
                      Procedure training
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm">
                  <Link
                    href={`/fleet/${member.slug}/`}
                    className="beak-flash font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                  >
                    View details →
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}