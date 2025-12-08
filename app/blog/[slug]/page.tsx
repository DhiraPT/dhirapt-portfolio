import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BlogContent from "./_components/blog-content";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: posts } = await supabase.from("BlogPosts").select("slug");
  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase.from("BlogPosts").select("*").eq("slug", slug).single();

  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const url = `${baseUrl}/blog/${slug}`;

  const description =
    post.content
      ?.replace(/[#*`[\]()]/g, "")
      .substring(0, 160)
      .trim() || "";

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ["Dhiraputta Pathama Tengara"],
      url: url,
      siteName: "DhiraPT's Lab",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase.from("BlogPosts").select("*").eq("slug", slug).single();

  if (!post) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dhirapt-portfolio.vercel.app";
  const url = `${baseUrl}/blog/${slug}`;

  // Create JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Dhiraputta Pathama Tengara",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DhiraPT's Lab",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent post={post} />
    </>
  );
}
