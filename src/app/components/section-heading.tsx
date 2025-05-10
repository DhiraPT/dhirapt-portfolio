import { motion } from "framer-motion";

export const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-8 mt-4 text-center text-4xl font-extrabold"
    >
      {children}
    </motion.h2>
  );
};
