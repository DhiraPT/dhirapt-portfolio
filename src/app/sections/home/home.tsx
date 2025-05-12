"use client";

import Link from "next/link";
import { TypeComponent } from "../../components/type-component";
import { BsChevronDoubleDown } from "react-icons/bs";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  return (
    <section
      ref={ref}
      id="home"
      className="flex min-h-dvh flex-col items-center justify-center space-y-4 px-12 pt-20 sm:px-16 xl:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-4xl font-bold">
          Hi, I&apos;m&nbsp;
          <span className="bg-linear-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-300 dark:to-indigo-500">
            Dhira
          </span>
        </p>
        <TypeComponent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <p className="text-center text-xl">
          I&apos;m a student at{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-300">
            National University of Singapore
          </span>
          , pursuing a
          <span className="font-semibold text-indigo-600 dark:text-indigo-300">
            {" "}
            Bachelor of Computing (Honours) in Computer Science
          </span>{" "}
          with a Second Major in{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-300">
            Quantitative Finance
          </span>
          .
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-center text-xl">
          I love discovering unknown life hacks and solving real-world problems.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link href="#experience">
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform cursor-pointer flex-col items-center">
            <p className="mb-2 text-center text-sm text-slate-600 dark:text-slate-400">
              Scroll Down
            </p>
            <BsChevronDoubleDown className="animate-bounce text-3xl text-indigo-600 dark:text-indigo-300" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
