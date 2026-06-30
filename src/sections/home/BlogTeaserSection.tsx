import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { LatestPosts } from "@/components/LatestPosts";
import { getBlogTeasers } from "@/lib/blog";
import { homepageBlog } from "@/content/homepage";

export async function BlogTeaserSection() {
  const posts = (await getBlogTeasers()).slice(0, homepageBlog.maxPosts);

  return (
    <Section background="default">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            {homepageBlog.heading}
          </h2>
          <Link
            href={homepageBlog.viewAllHref}
            className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
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
