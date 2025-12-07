"use client";

import { Database } from "@/types/database.types";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import Link from "next/link";
import { formatDateComplete } from "@/lib/date";
import { memo, useState, useEffect } from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ArrowLeft, Calendar } from "lucide-react";
import { MarkdownCode } from "./markdown-code";

type BlogPost = Database["public"]["Tables"]["BlogPosts"]["Row"];

const MemoizedMarkdownPreview = memo(MarkdownPreview);

export default function BlogContent({ post }: { post: BlogPost }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 lg:pt-28 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="group text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm font-medium transition-colors sm:mb-8 sm:text-base"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 sm:h-5 sm:w-5" />
          Back to Blog
        </Link>

        <header className="border-border/40 mb-6 border-b pb-4 sm:mb-8 sm:pb-6 lg:mb-10">
          <h1 className="text-foreground mb-3 text-3xl leading-tight font-bold tracking-tight sm:mb-4 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <time dateTime={post.updated_at}>{formatDateComplete(post.updated_at)}</time>
          </div>
        </header>

        <article className="blog-markdown-content">
          <MemoizedMarkdownPreview
            source={post.content || ""}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            wrapperElement={{
              "data-color-mode": resolvedTheme === "dark" ? "dark" : "light",
            }}
            components={{
              code: MarkdownCode,
            }}
          />
        </article>
      </div>
    </main>
  );
}
