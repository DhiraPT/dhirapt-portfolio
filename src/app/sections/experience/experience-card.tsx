"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

interface ExperienceCardProps {
  key: React.Key;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const ExperienceCard = ({
  title,
  company,
  startDate,
  endDate,
  description,
}: ExperienceCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.div
      ref={ref}
      className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-6 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 dark:hover:shadow-slate-700"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <p className="text-sm font-semibold text-slate-900 sm:text-base dark:text-slate-100">
            {company}
          </p>
          <p className="text-sm font-semibold text-slate-900 sm:text-base dark:text-slate-100">
            {startDate} - {endDate}
          </p>
        </div>
        <button className="text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-400">
          <FiExternalLink size={20} />
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {description.map((desc: string, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start text-sm text-slate-900 sm:text-base dark:text-slate-100"
          >
            <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-300"></span>
            {desc}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
