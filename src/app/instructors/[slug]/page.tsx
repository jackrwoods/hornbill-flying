import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildPersonSchema,
  buildInstructorBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { InstructorHeroSection } from "@/sections/instructor/InstructorHeroSection";
import { InstructorBioSection } from "@/sections/instructor/InstructorBioSection";
import { InstructorCredentialsSection } from "@/sections/instructor/InstructorCredentialsSection";
import { InstructorSpecialtiesSection } from "@/sections/instructor/InstructorSpecialtiesSection";
import { InstructorProgramsSection } from "@/sections/instructor/InstructorProgramsSection";
import { InstructorAvailabilitySection } from "@/sections/instructor/InstructorAvailabilitySection";
import { InstructorFAQSection } from "@/sections/instructor/InstructorFAQSection";
import { InstructorBottomNavSection } from "@/sections/instructor/InstructorBottomNavSection";
import {
  getPublishedInstructors,
  getInstructorBySlug,
} from "@/content/instructors";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

interface InstructorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<
  { slug: string }[]
> {
  return getPublishedInstructors().map((instructor) => ({
    slug: instructor.slug,
  }));
}

export async function generateMetadata(
  { params }: InstructorPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);

  if (!instructor || !instructor.published) {
    return {
      title: "Instructor not found",
    };
  }

  const canonical = buildCanonical(`/instructors/${instructor.slug}/`);
  const ogImage = instructor.photo
    ? {
        url: absoluteUrl(instructor.photo, siteConfig.baseUrl),
        width: 1200,
        height: 630,
        alt: instructor.altText,
      }
    : undefined;

  return {
    title: buildTitle(instructor.metaTitle),
    description: instructor.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: buildOpenGraph({
      type: "profile",
      url: canonical,
      title: buildTitle(instructor.metaTitle),
      description: instructor.metaDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    }),
    twitter: buildTwitter({
      title: buildTitle(instructor.metaTitle),
      description: instructor.metaDescription,
    }),
  };
}

export default async function InstructorPage({
  params,
}: InstructorPageProps) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);

  if (!instructor || !instructor.published) {
    notFound();
  }

  const schemas = [buildPersonSchema(instructor), buildInstructorBreadcrumbList(instructor)];
  if (instructor.faq && instructor.faq.length > 0) {
    schemas.push(buildFAQPage(instructor.faq));
  }

  return (
    <>
      <SchemaInjector schema={buildSchemaGraph(...schemas)} id="instructor-schema" />
      <PageHeader
        title={instructor.name}
        subtitle="Certified Flight Instructor, Hornbill Flight Center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Instructors", href: "/instructors/" },
          { label: instructor.name },
        ]}
      />
      <InstructorHeroSection instructor={instructor} />
      <InstructorBioSection instructor={instructor} />
      <InstructorCredentialsSection instructor={instructor} />
      <InstructorSpecialtiesSection instructor={instructor} />
      <InstructorProgramsSection instructor={instructor} />
      <InstructorAvailabilitySection instructor={instructor} />
      <InstructorFAQSection instructor={instructor} />
      <InstructorBottomNavSection />
    </>
  );
}
