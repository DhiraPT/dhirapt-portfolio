"use client";

import { useRef } from "react";
import { ExperienceCard } from "./experience-card";
import { formatDate } from "@/utils/date";
import { motion, useScroll, useSpring } from "framer-motion";
import { Database } from "@/types/supabase";
import { SectionHeading } from "@/app/components/section-heading";

type Experience = Database["public"]["Tables"]["Experiences"]["Row"];

export default function Experience({
  experiences,
}: {
  experiences: Experience[] | null;
}) {
  const ref = useRef(null);
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
    initial: { scale: 0.8, backgroundColor: "#d1d5db" },
    animate: { scale: 1, backgroundColor: "#3b82f6" },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  return (
    <section
      id="experience"
      className="flex flex-col items-center justify-between px-12 pt-20 sm:px-16 xl:px-24"
    >
      <SectionHeading>My Experience</SectionHeading>
      <div className="relative flex w-full flex-col space-y-12 sm:flex-row sm:space-x-16 xl:space-x-24">
        {/* Container for Timeline Bar and Bullet Points */}
        <div className="relative flex flex-col items-center">
          {/* Background Timeline Bar */}
          <div className="absolute h-full w-1 bg-gray-300 dark:bg-gray-600" />

          {/* Filling Timeline Bar */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute h-full w-1 bg-blue-500 shadow-[0px_0px_10px_rgba(59,130,246,0.6)]"
          />
        </div>

        {/* Experience Cards List */}
        <ul ref={ref} className="flex flex-col space-y-8">
          {experiences?.map((experience) => (
            <li key={experience.id} className="relative">
              <motion.div
                variants={bulletAnimation}
                initial="initial"
                animate="animate"
                viewport={{ once: true, amount: 0.2 }}
                className="absolute top-8 -left-14 h-4 w-4 rounded-full sm:-left-[72px] xl:-left-[104px]"
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
              variants={bulletAnimation}
              initial="initial"
              animate="animate"
              className="absolute top-8 -left-14 h-4 w-4 rounded-full sm:-left-[72px] xl:-left-[104px]"
            />
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-zinc-900">
                Could be your company :&#41;
              </h2>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
