"use client";

import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";

export const ContactBar = () => {
  return (
    <div
      className={`
        fixed right-0 bottom-0 pr-2 pb-2
        sm:pr-4 sm:pb-4
      `}
    >
      <IconContext.Provider value={{ size: "36" }}>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="mailto:dhira.pt@gmail.com"
            target="_blank"
            rel="noopener"
            className={`
              text-slate-900 transition-colors duration-200
              hover:text-indigo-600
              dark:text-slate-100 dark:hover:text-indigo-400
            `}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <MdOutlineMail />
            </motion.div>
          </Link>
          <Link
            href="https://github.com/DhiraPT"
            target="_blank"
            rel="noopener"
            className={`
              text-slate-900 transition-colors duration-200
              hover:text-indigo-600
              dark:text-slate-100 dark:hover:text-indigo-400
            `}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <FaGithub />
            </motion.div>
          </Link>
          <Link
            href="https://www.linkedin.com/in/dhirapt"
            target="_blank"
            rel="noopener"
            className={`
              text-slate-900 transition-colors duration-200
              hover:text-indigo-600
              dark:text-slate-100 dark:hover:text-indigo-400
            `}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <FaLinkedin />
            </motion.div>
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};
