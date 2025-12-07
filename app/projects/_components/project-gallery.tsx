"use client";

import { useState } from "react";
import { Database } from "@/types/database.types";
import { ProjectCard } from "./project-card";
import { ProjectDialog } from "./project-dialog";
import { formatDateRange } from "@/lib/date";
import { motion } from "motion/react";

type Project = Database["public"]["Tables"]["Projects"]["Row"];

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  if (projects.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">No projects found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProjectCard
              index={index}
              title={project.title}
              date={formatDateRange(project.start_date, project.end_date)}
              description={project.description}
              coverMediaUrl={project.cover_media_url}
              link={project.link}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setSelectedProjectIndex={setSelectedProjectIndex}
            />
          </motion.div>
        ))}
      </div>

      {selectedProjectIndex !== null && (
        <ProjectDialog
          title={projects[selectedProjectIndex].title}
          date={formatDateRange(
            projects[selectedProjectIndex].start_date,
            projects[selectedProjectIndex].end_date,
          )}
          description={projects[selectedProjectIndex].description}
          mediaUrl={projects[selectedProjectIndex].media_url}
          link={projects[selectedProjectIndex].link}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
