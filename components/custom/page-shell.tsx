"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function PageShell({ children, title, description, className }: PageShellProps) {
  return (
    <main
      className={cn(
        "bg-background relative min-h-screen w-full overflow-hidden",
        "px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 lg:pt-28 lg:pb-20",
        className,
      )}
    >
      {/* Background Pattern - Subtle & Vignetted */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-5 dark:opacity-5" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-8 max-w-3xl sm:mb-10 lg:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-muted-foreground mt-3 text-base leading-relaxed sm:text-lg"
          >
            {description}
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
