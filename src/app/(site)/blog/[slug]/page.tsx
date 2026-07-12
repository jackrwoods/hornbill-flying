import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Section } from "@/components/Section";
import { siteFacts } from "@/content/siteFacts";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
  buildWebPage,
} from "@/lib/schema";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const canonical = buildCanonical(`/blog/${slug}/`);
  return {
    title: buildTitle(post.title),
    description: post.description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      url: canonical,
      title: buildTitle(post.title),
      description: post.description,
      images: post.heroImage
        ? [
            {
              url: absoluteUrl(post.heroImage, siteConfig.baseUrl),
              alt: post.heroAlt || post.title,
            },
          ]
        : undefined,
    }),
    twitter: buildTwitter({
      title: buildTitle(post.title),
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const pageUrl = `/blog/${slug}/`;

  const schemas = [
    buildWebPage(post.title, pageUrl),
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: "Blog", url: buildCanonical("/blog/") },
      { name: post.title, url: buildCanonical(pageUrl) },
    ]),
  ];

  if (post.faq && post.faq.length > 0) {
    schemas.push(
      buildFAQPage(
        post.faq.map((item, index) => ({
          id: `${slug}-faq-${index}`,
          question: item.question,
          answer: item.answer,
        }))
      )
    );
  }

  return (
    <>
      <SchemaInjector schema={buildSchemaGraph(...schemas)} id="blog-post-schema" />
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/" },
          { label: post.title },
        ]}
        eyebrow="Field notes"
        placeholderLabel={`${post.category} — photography coming`}
        sunsetVariant="default"
      />

      <Section background="card">
        <Container className="max-w-3xl">
          <Reveal variant="glide">
            <article className="prose prose-lg max-w-none">
              <header className="not-prose mb-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <span className="rounded bg-callout px-2 py-0.5 text-heading">
                    {post.category}
                  </span>
                  <time dateTime={post.date} className="nums">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="nums">{post.readTime} min read</span>
                </div>
              </header>

              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />

              <footer className="not-prose mt-12 border-t border-border-subtle pt-8">
                <p className="text-sm text-muted">
                  By {post.authorName}
                </p>
              </footer>
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band — mirrors the homepage Discovery CTA */}
      <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Your first lesson is a discovery flight. You fly. We watch.
            </p>
            <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
              {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
            </p>
            <div className="mt-10">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
                className="px-8 py-4 text-base"
              >
                Book a discovery flight — {siteFacts.discoveryPrice}
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}