import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildContactPageLocalBusiness,
  buildContactPoint,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { ContactDetailsSection } from "@/sections/contact/ContactDetailsSection";
import { ContactMapSection } from "@/sections/contact/ContactMapSection";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";
import { ContactFAQSection } from "@/sections/contact/ContactFAQSection";
import { contactFAQ } from "@/content/contact";

const PAGE_TITLE = "Contact Hornbill Aviation in Reno, NV";
const PAGE_DESCRIPTION =
  "Call 555-555-1234 or email office@hornbillaviation.com. Visit us at 1008 Gentry Way, Reno, NV. Book a discovery flight or send a message.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/contact/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/contact/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function ContactPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: "Contact", url: buildCanonical("/contact/") },
    ]),
    buildContactPoint(),
    buildContactPageLocalBusiness(),
    buildFAQPage(contactFAQ)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="contact-schema" />
      <PageHeader
        title="Contact Hornbill Aviation"
        subtitle="Call, email, or stop by. We're here to answer questions and help you book your first flight."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <ContactDetailsSection />
      <ContactMapSection />
      <ContactFormSection />
      <ContactFAQSection />
    </>
  );
}
