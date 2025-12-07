"use client";

import { motion } from "motion/react";
import TypeComponent from "./_components/type-component";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Terminal, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  return (
    <main
      id="home"
      className="bg-background relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Text & Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8 text-center lg:text-left"
        >
          <div className="space-y-6">
            <h1 className="text-foreground text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span
                  className="bg-accent/20 absolute -inset-1 block -skew-y-3"
                  aria-hidden="true"
                ></span>
                <span
                  className={cn(
                    "relative bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent",
                    "dark:from-indigo-400 dark:to-violet-400",
                  )}
                >
                  Dhira
                </span>
              </span>
            </h1>

            <div className="text-muted-foreground flex items-center justify-center gap-3 text-lg font-medium sm:text-xl md:text-2xl lg:justify-start">
              <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Terminal className="text-accent h-5 w-5" />
              </div>
              <TypeComponent />
            </div>
          </div>

          <div className="text-muted-foreground max-w-2xl space-y-6 text-base leading-relaxed sm:text-lg">
            <p>
              Final year student at{" "}
              <span className="text-foreground decoration-accent/30 hover:decoration-accent font-semibold underline underline-offset-4 transition-colors">
                National University of Singapore
              </span>
              , pursuing a Bachelor of Computing (Honours) in Computer Science with a Minor in
              Quantitative Finance.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4 lg:justify-start">
            <Button
              onClick={() => router.push("/blog")}
              size="lg"
              className={cn(
                "group shadow-accent/20 hover:shadow-accent/30 relative h-11 overflow-hidden rounded-full px-8 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl",
                "bg-accent hover:bg-accent/90 border-0 text-white",
              )}
              aria-label="Read my blog"
            >
              <span className="relative z-10 flex items-center gap-2">
                Read My Blog
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  "https://lfjzmnveejtlimxyhvaa.supabase.co/storage/v1/object/public/general/Dhira_Tengara_Resume.pdf",
                  "_blank",
                )
              }
              className={cn(
                "border-border/60 h-11 rounded-full border px-8 text-sm font-semibold transition-all hover:scale-105",
                "bg-background/50 hover:bg-accent/5 hover:border-accent/50 hover:text-accent backdrop-blur-sm",
              )}
              aria-label="View my resume"
            >
              View My Resume
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Decorative Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="relative hidden lg:block"
        >
          {/* Refined Glow */}
          <div className="bg-accent/15 pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">
            {/* Inner Content Grid - Kept for the card texture specifically */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative flex h-full w-full flex-col items-center justify-center p-10 text-center">
              <div className="group relative mb-8 cursor-default">
                <div className="bg-accent/20 group-hover:bg-accent/40 absolute inset-0 rounded-full blur-2xl transition-all duration-500" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                  <Code2 className="text-foreground/90 h-12 w-12 drop-shadow-sm" />
                </div>
              </div>

              <h3 className="text-foreground mb-3 text-3xl font-bold tracking-tight">
                Let&apos;s Build
              </h3>

              <p className="text-muted-foreground max-w-[260px] text-lg font-medium">
                Turning complex problems into elegant solutions.
              </p>

              {/* Decorative Elements */}
              <div className="animate-float-slow absolute top-10 right-10">
                <Sparkles className="h-5 w-5 text-amber-400/80" />
              </div>
              <div className="animate-float-slower absolute bottom-16 left-12">
                <div className="bg-accent/60 h-3 w-3 rounded-full blur-[1px]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
