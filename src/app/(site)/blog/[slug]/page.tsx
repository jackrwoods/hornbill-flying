import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SchemaInjector } from "@/components/SchemaInjector";
import { Section } from "@/components/Section";
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
      />

      <Section background="white">
        <Container className="max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <header className="not-prose mb-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-light">
                <span className="rounded bg-teal-100 px-2 py-0.5 text-navy-900">
                  {post.category}
                </span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>{post.readTime} min read</span>
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

            <footer className="not-prose mt-12 border-t border-navy-800/10 pt-8">
              <p className="text-sm text-ink-light">
                By {post.authorName}
              </p>
            </footer>
          </article>
        </Container>
      </Section>
    </>
  );
}
