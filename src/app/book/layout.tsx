import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PhoneLink } from "@/components/PhoneLink";
import { CTALink } from "@/components/CTALink";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildEvent,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { BOOKING_FAQ } from "@/content/booking";

const BOOKING_DESCRIPTION =
  "Book a discovery flight or schedule flight training at Hornbill Flight Center in Reno, NV. Part 61 school at RNO with a PA28 fleet.";

export const metadata: Metadata = {
  title: buildTitle("Book a discovery flight or schedule training"),
  description: BOOKING_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/book/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/book/"),
    title: buildTitle("Book a discovery flight or schedule training"),
    description: BOOKING_DESCRIPTION,
    images: [
      {
        url: buildCanonical("/opengraph-booking.jpg"),
        width: 1200,
        height: 630,
        alt: "Book a discovery flight or schedule training at Hornbill Flight Center",
      },
    ],
  }),
  twitter: buildTwitter({
    title: buildTitle("Book a discovery flight or schedule training"),
    description: BOOKING_DESCRIPTION,
    images: [buildCanonical("/opengraph-booking.jpg")],
  }),
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bookSchema = buildSchemaGraph(
    buildWebPage(
      "Book a discovery flight or schedule training",
      "/book/",
      buildCanonical("/book/#webpage")
    ),
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: "Book", url: buildCanonical("/book/") },
    ]),
    buildEvent(),
    buildFAQPage(BOOKING_FAQ)
  );

  return (
    <>
      <SchemaInjector schema={bookSchema} id="book-schema" />
      {children}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy-800 bg-navy-900 p-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <PhoneLink
            className="text-sm text-white hover:text-gold-500"
            showIcon
          />
          <CTALink
            href="/book/"
            query={{ flow: "discovery" }}
            variant="secondary"
            className="px-4 py-2 text-sm"
            analytics="discovery_flight_booking_started"
          >
            Book a discovery flight
          </CTALink>
        </div>
      </div>
    </>
  );
}
