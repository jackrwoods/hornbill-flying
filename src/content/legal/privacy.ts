import type { NAP } from "@/types";
import { siteConfig } from "@/lib/config";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface PrivacyContent {
  effectiveDate: string;
  nap: NAP;
  sections: LegalSection[];
}

export const privacyContent: PrivacyContent = {
  effectiveDate: "June 18, 2026",
  nap: siteConfig.nap,
  sections: [
    {
      id: "introduction",
      heading: "Introduction",
      paragraphs: [
        "Hornbill Aviation respects your privacy. This policy explains what information we collect when you visit our website, book a flight, or contact us; how we use and protect that information; and the choices you have.",
        "By using our website or submitting a booking request, you agree to the practices described here. If you do not agree, please do not use the site.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      paragraphs: [
        "We collect only the information we need to schedule flights, communicate with you, and improve the site.",
      ],
      items: [
        "Contact information: your name, email address, and phone number.",
        "Booking details: flight type, preferred date and time, preferred instructor, and optional information such as weight for weight-and-balance planning.",
        "Website usage: pages visited, device type, browser, and approximate location, collected through cookies and analytics tools.",
        "Payment information: card details are collected and processed by our PCI-compliant payment processor. We do not store full card numbers on our servers.",
      ],
    },
    {
      id: "how-we-use-it",
      heading: "How we use it",
      paragraphs: ["We use your information to:"],
      items: [
        "Schedule and confirm discovery flights, lessons, and rentals.",
        "Communicate booking details, reminders, and updates.",
        "Process payments and refunds through our payment processor.",
        "Improve the website and understand which pages help prospective students most.",
        "Send occasional marketing emails if you have opted in. You can opt out at any time.",
      ],
    },
    {
      id: "how-we-share-it",
      heading: "How we share it",
      paragraphs: [
        "We do not sell your personal information. We share information only with the service providers needed to operate the school and the website:",
      ],
      items: [
        "Your assigned flight instructor, to prepare for your lesson.",
        "Our payment processor, to charge or refund your card.",
        "Our email and SMS provider, to send confirmations and reminders.",
        "Analytics providers, to measure site performance and usage.",
      ],
    },
    {
      id: "cookies-and-analytics",
      heading: "Cookies and analytics",
      paragraphs: [
        "We use Google Analytics 4, Google Tag Manager, and Microsoft Clarity to understand how visitors use the site. These tools may set cookies and collect data such as pages viewed, time on site, and clicks.",
        "You can manage or disable cookies through your browser settings. You can also opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on.",
      ],
    },
    {
      id: "data-security",
      heading: "Data security",
      paragraphs: [
        "We use reasonable technical and organizational safeguards to protect your information. No online system is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-choices",
      heading: "Your choices",
      paragraphs: ["You can:"],
      items: [
        "Opt out of marketing emails by clicking the unsubscribe link in any email.",
        "Request access to the personal information we hold about you.",
        "Ask us to correct or delete your contact information.",
        "Update your preferences by contacting the office.",
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children's privacy",
      paragraphs: [
        "Our website is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us so we can delete it.",
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this privacy policy as our services or the law changes. The effective date at the top of the page shows when it was last revised. Continued use of the site after changes means you accept the revised policy.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact us",
      paragraphs: [
        "If you have questions about this privacy policy or how we handle your information, contact us at the information below or visit our Contact page.",
      ],
      items: [
        `${siteConfig.nap.streetAddress}, ${siteConfig.nap.addressLocality}, ${siteConfig.nap.addressRegion} ${siteConfig.nap.postalCode}`,
        siteConfig.nap.email,
        siteConfig.nap.telephoneFormatted,
      ],
    },
  ],
};
