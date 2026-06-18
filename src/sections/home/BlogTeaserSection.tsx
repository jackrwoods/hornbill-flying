import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { LatestPosts } from "@/components/LatestPosts";
import { latestPosts } from "@/content/blog";
import { homepageBlog } from "@/content/homepage";

export function BlogTeaserSection() {
  const posts = latestPosts.slice(0, homepageBlog.maxPosts);

  return (
    <Section background="cream">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
            {homepageBlog.heading}
          </h2>
          <Link
            href={homepageBlog.viewAllHref}
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            {homepageBlog.viewAllLabel}
          </Link>
        </div>
        <div className="mt-10">
          <LatestPosts posts={posts} />
        </div>
      </Container>
    </Section>
  );
}
