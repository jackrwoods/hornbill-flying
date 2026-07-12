import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
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
      <Section background="default" className="flex-1">
        <Container className="py-20 md:py-28">
          <Reveal variant="stagger" className="flex flex-col items-center text-center">
            <Logo showText={false} size={140} className="mb-8" />
            <p className="panel-label-lg text-accent mb-5">Lost · 404</p>
            <h1 className="font-heading font-extrabold text-4xl text-heading md:text-5xl text-balance">
              {notFoundCopy.headline}
            </h1>
            <div className="mt-6 w-full">
              <NotFoundHelp />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}