"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { formatDate } from "@/utils/date";
import { Database } from "@/types/supabase";
import { ProjectDialog } from "./project-dialog";

type Project = Database["public"]["Tables"]["Projects"]["Row"];

export default function Projects({ projects }: { projects: Project[] | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);

  const parseDate = (startDate: string, endDate: string | null) => {
    const fomattedStartDate = formatDate(startDate);
    const formattedEndDate = endDate ? formatDate(endDate) : null;
    if (formattedEndDate && formattedEndDate !== fomattedStartDate) {
      return `${fomattedStartDate} - ${formattedEndDate}`;
    } else {
      return fomattedStartDate;
    }
  };

  return (
    <section
      id="projects"
      className="flex w-full flex-col items-center justify-between px-12 pt-20 sm:px-16 xl:px-24"
    >
      <h2 className="mb-8 mt-4 text-center text-4xl font-extrabold">
        My Projects
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {projects?.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            title={project.title}
            date={parseDate(project.start_date, project.end_date)}
            description={project.description}
            coverMediaUrl={project.cover_media_url}
            link={project.link}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedProjectIndex={setSelectedProjectIndex}
          />
        ))}
      </div>
      {projects && selectedProjectIndex !== null && (
        <ProjectDialog
          title={projects[selectedProjectIndex].title}
          date={parseDate(
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
    </section>
  );
}
