import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { NotFoundHelp } from "@/components/NotFoundHelp";
import { SchemaInjector } from "@/components/SchemaInjector";
import {
  buildTitle,
  buildNotFoundMetadata,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { buildSchemaGraph, buildWebPage } from "@/lib/schema";
import { notFoundCopy } from "@/content/not-found";

const PAGE_TITLE = buildTitle("Page Not Found");

export const metadata: Metadata = {
  ...buildNotFoundMetadata(),
  alternates: {
    canonical: buildCanonical("/404/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/404/"),
    title: PAGE_TITLE,
    description: notFoundCopy.metaDescription,
  }),
  twitter: buildTwitter({
    title: PAGE_TITLE,
    description: notFoundCopy.metaDescription,
  }),
};

export default function NotFoundPage() {
  const pageSchema = buildSchemaGraph(buildWebPage("Page not found", "/404/"));

  return (
    <>
      <SchemaInjector schema={pageSchema} id="404-schema" />
      <Section background="sand" className="flex-1">
        <Container className="py-20">
          <div className="flex flex-col items-center text-center">
            <Logo showText={false} size={140} className="mb-8" />
            <h1 className="font-heading text-4xl text-navy-900 md:text-5xl">
              {notFoundCopy.headline}
            </h1>
            <div className="mt-6 w-full">
              <NotFoundHelp />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
