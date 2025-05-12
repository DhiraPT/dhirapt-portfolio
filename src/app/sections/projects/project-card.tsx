import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

interface ProjectCardProps {
  index: number;
  title: string;
  date: string;
  description: string;
  coverMediaUrl: string | null;
  link: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setSelectedProjectIndex: (value: number | null) => void;
}

export const ProjectCard = ({
  index,
  title,
  coverMediaUrl,
  setIsModalOpen,
  setSelectedProjectIndex,
}: ProjectCardProps) => {
  const onViewDetailsClick = () => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group/project-card relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg dark:shadow-slate-800 dark:hover:shadow-slate-700"
    >
      <div className="relative aspect-square overflow-hidden">
        {coverMediaUrl ? (
          <Image
            src={coverMediaUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover/project-card:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            No image available
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover/project-card:opacity-100 dark:bg-slate-950/60" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-slate-100 dark:text-slate-200">
        <h2 className="mb-1 transform text-2xl font-bold opacity-0 transition-all duration-300 ease-in-out group-hover/project-card:-translate-y-1 group-hover/project-card:opacity-100">
          {title}
        </h2>
        {/* <p className="font-semibold mb-2 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover/project-card:opacity-100 group-hover/project-card:translate-y-0">{date}</p>
        <p className="mb-4 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover/project-card:opacity-100 group-hover/project-card:translate-y-0">{description}</p> */}
        <motion.span
          aria-label={`View details for ${title}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex translate-y-2 transform cursor-pointer items-center rounded-full bg-indigo-600 px-4 py-2 text-slate-100 opacity-0 transition-all duration-300 ease-in-out group-hover/project-card:translate-y-0 group-hover/project-card:opacity-100 hover:bg-indigo-700"
          onClick={onViewDetailsClick}
        >
          View Details
          <FiArrowUpRight className="ml-1" size={22} />
        </motion.span>
      </div>
    </motion.div>
  );
};
