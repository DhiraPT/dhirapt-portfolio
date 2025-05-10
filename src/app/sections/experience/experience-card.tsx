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
      className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 sm:p-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
          <p className="text-sm font-semibold text-zinc-900 sm:text-base">
            {company}
          </p>
          <p className="text-sm font-semibold text-zinc-900 sm:text-base">
            {startDate} - {endDate}
          </p>
        </div>
        <button className="text-blue-500 transition-colors hover:text-blue-700">
          <FiExternalLink size={20} />
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {description.map((desc: String, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start text-sm text-zinc-900 sm:text-base"
          >
            <span className="mr-2 mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
            {desc}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
