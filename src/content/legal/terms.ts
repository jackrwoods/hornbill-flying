import type { NAP } from "@/types";
import { siteConfig } from "@/lib/config";

export interface TermsContent {
  effectiveDate: string;
  governingLaw: string;
  nap: NAP;
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    items?: string[];
  }[];
}

export const termsContent: TermsContent = {
  effectiveDate: "June 18, 2026",
  governingLaw: "State of Nevada",
  nap: siteConfig.nap,
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of terms",
      paragraphs: [
        "These terms of service apply to everyone who visits hornbillaviation.com, books a flight or lesson, or rents an aircraft from Hornbill Flight Center. By using the site or booking a service, you agree to these terms. If you do not agree, do not use the site or services.",
      ],
    },
    {
      id: "use-of-the-website",
      heading: "Use of the website",
      paragraphs: [
        "You may use the site for lawful purposes only. You may not misuse the booking system, attempt to access restricted areas, or interfere with the site's operation.",
        "We do our best to keep schedules, rates, and aircraft information accurate, but details can change. Always confirm important information directly with the office.",
      ],
    },
    {
      id: "flight-training-and-rentals",
      heading: "Flight training and rentals",
      paragraphs: ["All flight training and aircraft rental are subject to:"],
      items: [
        "FAA regulations, including medical, citizenship, and pilot-certification requirements.",
        "Completion of a checkout or review with a Hornbill certificated flight instructor before solo or rental operations.",
        "The pilot in command's responsibility to conduct a thorough preflight inspection and accept the aircraft as airworthy.",
        "Instructor assignments based on availability, qualifications, and student preference.",
      ],
    },
    {
      id: "bookings-and-payments",
      heading: "Bookings and payments",
      paragraphs: [
        "Bookings are confirmed once payment is received or a deposit is placed through our payment processor. Rates and deposits are shown at checkout.",
        "Full refund and cancellation rules are described in our Cancellation, Refund & Weather Policy.",
      ],
    },
    {
      id: "cancellations-and-weather",
      heading: "Cancellations and weather",
      paragraphs: [
        "You can reschedule or cancel a discovery flight or lesson up to 24 hours before the scheduled time without penalty. Inside that window, deposits may be forfeited. See the Cancellation, Refund & Weather Policy for full details.",
        "If weather or maintenance makes a flight unsafe, we will reschedule at no charge or offer a full refund. The instructor or pilot in command makes the final weather decision.",
      ],
    },
    {
      id: "assumption-of-risk",
      heading: "Assumption of risk",
      paragraphs: [
        "Aviation involves inherent risk. By flying with us, you acknowledge those risks and agree that Hornbill Flight Center's liability is limited to the extent permitted by Nevada law. A release or assumption-of-risk agreement may be required before flight.",
        "This section is intended for operator and legal review before launch.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "All content on this site, including text, photography, the Hornbill crest, logos, and course materials, is owned by Hornbill Flight Center or used with permission. You may not copy, reproduce, or distribute site content without written permission.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      paragraphs: [
        "The site may link to third-party resources such as the FAA, weather services, aviation charts, or financing partners. We are not responsible for the content, accuracy, or practices of those sites.",
      ],
    },
    {
      id: "changes-to-terms",
      heading: "Changes to terms",
      paragraphs: [
        "We may update these terms at any time. The effective date at the top of the page shows the latest revision. Continued use of the site or services after changes means you accept the updated terms.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the State of Nevada, without regard to conflict-of-law principles.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact us",
      paragraphs: [
        "Questions about these terms can be directed to:",
      ],
      items: [
        `${siteConfig.nap.streetAddress}, ${siteConfig.nap.addressLocality}, ${siteConfig.nap.addressRegion} ${siteConfig.nap.postalCode}`,
        siteConfig.nap.email,
        siteConfig.nap.telephoneFormatted,
      ],
    },
  ],
};
