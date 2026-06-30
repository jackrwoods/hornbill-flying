import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LatestPosts } from "@/components/LatestPosts";
import { PageHeader } from "@/components/PageHeader";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Section } from "@/components/Section";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import { buildBreadcrumbList, buildSchemaGraph, buildWebPage } from "@/lib/schema";
import { getBlogTeasers } from "@/lib/blog";

const PAGE_URL = "/blog/";
const PAGE_TITLE = "Flight Training Blog";
const PAGE_DESCRIPTION =
  "Guides, tips, and local knowledge for pilots training at Reno–Tahoe (RNO). Read about costs, medical certificates, mountain flying, and more.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical(PAGE_URL),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical(PAGE_URL),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default async function BlogIndexPage() {
  const posts = await getBlogTeasers();

  const schema = buildSchemaGraph(
    buildWebPage(PAGE_TITLE, PAGE_URL),
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: buildCanonical(PAGE_URL) },
    ])
  );

  return (
    <>
      <SchemaInjector schema={schema} id="blog-index-schema" />
      <PageHeader
        title={PAGE_TITLE}
        subtitle={PAGE_DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
        image={{
          src: "/images/blog/blog-hero.jpg",
          alt: "Aerial view of a town and university campus with green hills and mountain ranges in the background.",
          width: 3024,
          height: 1701,
        }}
      />

      <Section background="default">
        <Container>
          <LatestPosts posts={posts} />
        </Container>
      </Section>
    </>
  );
}
