import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogPostTeaser } from "@/types";

interface LatestPostsProps {
  posts: BlogPostTeaser[];
  className?: string;
}

export function LatestPosts({ posts, className }: LatestPostsProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="flex flex-col rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="rounded bg-callout px-2 py-0.5 text-heading">
              {post.category}
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <h3 className="mt-3 font-heading text-xl">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">
            {post.description}
          </p>
          <div className="mt-4 text-xs text-muted">By {post.author}</div>
          <Link
            href={post.href}
            className="mt-3 inline-block text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Read more
          </Link>
        </article>
      ))}
    </div>
  );
}
