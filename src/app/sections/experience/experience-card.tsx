"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      className="rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
      <p className="font-semibold text-zinc-900">{company}</p>
      <p className="font-semibold text-zinc-900">
        {startDate} - {endDate}
      </p>
      <ul>
        {description.map((desc: String, index) => (
          <li key={index} className="text-zinc-900">
            &#8226; {desc}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
