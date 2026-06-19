import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter, BlogPostTeaser } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getBlogPostHref(slug: string): string {
  return `/blog/${slug}/`;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      ...frontmatter,
      content,
      readTime: estimateReadTime(content),
      authorName: frontmatter.author,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getBlogPostBySlug(slug))
  );
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogTeasers(): Promise<BlogPostTeaser[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.authorName,
    category: post.category,
    href: getBlogPostHref(post.slug),
  }));
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
