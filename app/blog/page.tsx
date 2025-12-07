import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { formatDateComplete } from "@/lib/date";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageShell } from "@/components/custom/page-shell";

type BlogPost = Database["public"]["Tables"]["BlogPosts"]["Row"];

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("BlogPosts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PageShell title="Blog" description="Thoughts, tutorials, and documentation of my experiments.">
      {error ? (
        <div className="border-destructive/20 bg-destructive/5 rounded-xl border p-8 text-center backdrop-blur-sm">
          <p className="text-destructive text-lg font-medium">
            Could not load posts. Please try again later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts && posts.length > 0 ? (
            posts.map((post: BlogPost, index) => (
              <article
                key={post.id}
                className="group relative"
                style={{
                  animationName: "slideUpFade",
                  animationDuration: "0.5s",
                  animationFillMode: "both",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="border-border/40 bg-card/30 hover:border-accent/50 hover:bg-accent/5 hover:shadow-accent/5 flex flex-col gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                >
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <h2 className="text-foreground group-hover:text-accent text-lg font-bold tracking-tight transition-colors sm:text-xl">
                      {post.title}
                    </h2>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <time dateTime={post.updated_at}>{formatDateComplete(post.updated_at)}</time>
                    </div>
                  </div>

                  <div className="text-muted-foreground group-hover:text-accent mt-2 flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:mt-0">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="border-border/60 bg-muted/5 flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
              <div className="mb-3 text-3xl opacity-50 grayscale">📝</div>
              <p className="text-muted-foreground text-base font-medium">
                No blog posts published yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Inline Animation Style for simple entrances */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PageShell>
  );
}
