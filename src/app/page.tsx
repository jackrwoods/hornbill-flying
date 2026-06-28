import type { Metadata } from "next";
import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { getPublishedFleet } from "@/content/fleet";
import { isAircraft } from "@/types";
import { siteConfig } from "@/lib/config";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

const PAGE_TITLE = "Aircraft Rentals and Flight Training";
const PAGE_DESCRIPTION =
  "Hornbill Aviation is coming soon. Aircraft rentals and flight training in Reno, NV.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function ComingSoonPage() {
  const fleet = getPublishedFleet();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-navy-900">
        <Container>
          <div className="flex h-18 items-center justify-between py-3">
            <div className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt=""
                width={56}
                height={56}
                className="rounded-full"
                priority
              />
              <span className="font-heading text-xl text-white">
                {siteConfig.brandName}
              </span>
            </div>

            <a
              href={siteConfig.flightCircleScheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-3 py-2 text-sm font-medium text-white hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            >
              Schedule
            </a>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-navy-900 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/homepage-hero.jpeg"
              alt="Aerial view of an airplane wing over airport runways near Reno, NV."
              width={1440}
              height={1080}
              priority
              fetchPriority="high"
              loading="eager"
              className="h-full w-full object-cover opacity-40"
              sizes="100vw"
              style={{ minWidth: "100%", minHeight: "100%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/40" />
          </div>

          <Container className="relative z-10">
            <div className="py-20 md:py-32 lg:py-40">
              <div className="max-w-2xl">
                <h1 className="font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
                  Aircraft Rentals and Flight Training
                </h1>
                <p className="mt-6 text-lg text-cream-50/90 md:text-xl">
                  Hornbill Aviation is getting ready for takeoff. Check back soon
                  for our full site, or schedule through Flight Circle today.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-cream-50 py-16 md:py-24">
          <Container>
            <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
              The fleet
            </h2>
            <p className="mt-4 max-w-2xl text-ink-light">
              Our available aircraft and simulator. Same engine, same handling,
              and transparent wet rates.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fleet.map((member, index) => (
                <article
                  key={member.slug}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
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

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {isAircraft(member) ? (
                        <>
                          {member.ifrEquipped && (
                            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-navy-900">
                              IFR equipped
                            </span>
                          )}
                          {member.crossCountryReady && (
                            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-navy-900">
                              Cross-country ready
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-navy-900">
                          Procedure training
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-navy-900 py-8">
        <Container>
          <p className="text-center text-sm text-cream-50/70">
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights
            reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
