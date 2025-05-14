"use client";

import { useEffect, useRef, useState } from "react";
import { ExperienceCard } from "./experience-card";
import { formatDate } from "@/utils/date";
import { motion, useScroll, useSpring } from "framer-motion";
import { Database } from "@/types/supabase";
import { SectionHeading } from "@/app/components/section-heading";
import { useTheme } from "next-themes";

type Experience = Database["public"]["Tables"]["Experiences"]["Row"];

export default function Experience({
  experiences,
}: {
  experiences: Experience[] | null;
}) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const bulletAnimation = {
    initial: { scale: 0.8, backgroundColor: "#cbd5e1" }, // slate-300
    animate: { scale: 1, backgroundColor: "#4f46e5" }, // indigo-600
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  const darkBulletAnimation = {
    initial: { scale: 0.8, backgroundColor: "#475569" }, // slate-600
    animate: { scale: 1, backgroundColor: "#a5b4fc" }, // indigo-300
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  if (!mounted) {
    return null;
  }

  return (
    <section
      id="experience"
      aria-label="Experience"
      className={`
        flex flex-col items-center justify-between px-12 pt-20
        sm:px-16
        xl:px-24
      `}
    >
      <SectionHeading>My Experience</SectionHeading>
      <div
        className={`
          relative flex w-full flex-row space-x-12
          sm:space-x-16
          xl:space-x-24
        `}
      >
        {/* Container for Timeline Bar and Bullet Points */}
        <div className="relative flex flex-col items-center">
          {/* Background Timeline Bar */}
          <div
            className={`
              absolute h-full w-1 bg-slate-200
              dark:bg-slate-700
            `}
          />

          {/* Filling Timeline Bar */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className={`
              absolute h-full w-1 bg-indigo-600 shadow-[0px_0px_10px_rgba(99,102,241,0.5)]
              dark:bg-indigo-300
            `}
          />
        </div>

        {/* Experience Cards List */}
        <ul ref={ref} className="flex flex-col space-y-8">
          {experiences?.map((experience) => (
            <li key={experience.id} className="relative">
              <motion.div
                variants={
                  theme === "dark" ? darkBulletAnimation : bulletAnimation
                }
                initial="initial"
                animate="animate"
                viewport={{ once: true, amount: 0.2 }}
                className={`
                  absolute top-8 -left-14 h-4 w-4 rounded-full
                  sm:-left-[72px]
                  xl:-left-[104px]
                `}
              />
              <ExperienceCard
                key={experience.id}
                title={experience.title}
                company={experience.company}
                startDate={formatDate(experience.start_date)}
                endDate={
                  experience.end_date
                    ? formatDate(experience.end_date)
                    : "Present"
                }
                description={experience.description}
              />
            </li>
          ))}
          <li className="relative">
            {/* Bullet Point for last item */}
            <motion.div
              variants={
                theme === "dark" ? darkBulletAnimation : bulletAnimation
              }
              initial="initial"
              animate="animate"
              className={`
                absolute top-8 -left-14 h-4 w-4 rounded-full
                sm:-left-[72px]
                xl:-left-[104px]
              `}
            />
            <div
              className={`
                rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-md transition-shadow duration-300
                hover:shadow-lg
                dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 dark:hover:shadow-slate-700
              `}
            >
              <h2 className="text-2xl font-bold">
                Could be your company :&#41;
              </h2>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
