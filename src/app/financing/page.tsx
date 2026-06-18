import type { Metadata } from "next";
import { SchemaInjector } from "@/components/SchemaInjector";
import { buildTitle, buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { financingContent, financingFAQs } from "@/content/financing";
import { FinancingHeroSection } from "@/sections/financing/FinancingHeroSection";
import { StratusPartnershipSection } from "@/sections/financing/StratusPartnershipSection";
import { WhatCanBeFinancedSection } from "@/sections/financing/WhatCanBeFinancedSection";
import { PaymentExpectationsSection } from "@/sections/financing/PaymentExpectationsSection";
import { BudgetScenariosSection } from "@/sections/financing/BudgetScenariosSection";
import { FinancingCTASection } from "@/sections/financing/FinancingCTASection";
import { FinancingFAQSection } from "@/sections/financing/FinancingFAQSection";

const { meta } = financingContent;
const pagePath = "/financing/";
const canonical = buildCanonical(pagePath);

export const metadata: Metadata = {
  title: buildTitle(meta.title),
  description: meta.description,
  alternates: {
    canonical,
  },
  openGraph: buildOpenGraph({
    url: canonical,
    title: buildTitle(meta.title),
    description: meta.description,
  }),
  twitter: buildTwitter({
    title: buildTitle(meta.title),
    description: meta.description,
  }),
};

const pageSchema = buildSchemaGraph(
  buildBreadcrumbList([
    { name: "Home", url: buildCanonical("/") },
    { name: "Financing", url: canonical },
  ]),
  buildFAQPage(financingFAQs),
  {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: meta.title,
    description: meta.description,
    url: canonical,
  }
);

export default function FinancingPage() {
  return (
    <>
      <SchemaInjector schema={pageSchema} id="financing-schema" />
      <FinancingHeroSection />
      <StratusPartnershipSection />
      <WhatCanBeFinancedSection />
      <PaymentExpectationsSection />
      <BudgetScenariosSection />
      <FinancingCTASection />
      <FinancingFAQSection />
    </>
  );
}
