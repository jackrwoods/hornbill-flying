import type { Metadata } from "next";
import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
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
      <main className="flex-1">
        <section
          className="relative flex flex-col overflow-hidden bg-bg lg:flex-row"
          style={{ minHeight: "100svh" }}
        >
          {/* Text panel — slanted right edge on desktop only (rectangle on mobile) */}
          <div
            className="relative z-10 flex flex-col justify-center bg-bg px-6 py-12 lg:w-[48%] lg:px-12 xl:px-16 lg:py-0 lg:[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]"
          >
            <div className="mb-8 origin-left scale-125 md:scale-150 lg:scale-[1.75]">
              <Logo
                variant="stacked"
                size={64}
                textClassName="text-[#2E2717]"
                largeText
              />
            </div>
            <h1 className="font-heading text-4xl leading-tight text-heading md:text-5xl lg:text-6xl">
              Aircraft Rentals and Flight Training
            </h1>
            <p className="mt-6 text-lg text-body md:text-xl">
              Hornbill Aviation is getting ready for takeoff. Check back soon
              for our full site, or schedule through Flight Circle today.
            </p>
          </div>

          {/* Horizontal cheat-line divider — mobile only, sits between stacked panels */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-20 flex flex-col lg:hidden"
          >
            <div className="h-3 bg-ink" />
            <div className="h-3 bg-header-cheatline" />
            <div className="h-3 bg-[#F9A90C]" />
          </div>

          {/* Photo panel */}
          <div className="relative flex-1 lg:absolute lg:inset-0 lg:left-auto lg:w-full">
            <Image
              src="/images/hero/homepage-hero.jpeg"
              alt="Aerial view of an airplane wing over airport runways near Reno, NV."
              fill
              priority
              fetchPriority="high"
              loading="eager"
              className="object-cover lg:object-center"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>

          {/* Diagonal cheat-line seam — desktop only.
              Three 12px-thick slanted bands rendered as locked polygons. The
              seam is now more dramatic: x=48% at the top to x=34% at the
              bottom. Stripe order is reversed so the colors read
              gold/coral/ink from left to right. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon
              points="50.42,0 51.74,0 37.74,100 36.42,100"
              fill="var(--palette-gold-400)"
            />
            <polygon
              points="49.10,0 50.42,0 36.42,100 35.10,100"
              fill="var(--palette-coral)"
            />
            <polygon
              points="47.78,0 49.10,0 35.10,100 33.78,100"
              fill="#1C3B61"
            />
          </svg>
        </section>

        <section className="bg-bg py-16 md:py-24">
          <Container>
            <h2 className="font-heading text-3xl text-heading md:text-4xl">
              The fleet
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
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

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {isAircraft(member) ? (
                        <>
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
                      ) : (
                        <span className="inline-flex rounded-full bg-callout px-3 py-1 text-xs font-semibold text-heading">
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

      <footer className="bg-dark py-8">
        <Container>
          <p className="text-center text-sm text-on-dark-soft">
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights
            reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
