"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { formatDate } from "@/utils/date";
import { Database } from "@/types/database.types";
import { ProjectDialog } from "./project-dialog";
import { SectionHeading } from "@/app/components/section-heading";

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
      className={`
        flex w-full flex-col items-center justify-between px-12 pt-20
        sm:px-16
        xl:px-24
      `}
    >
      <SectionHeading>My Projects</SectionHeading>
      <div
        className={`
          grid w-full grid-cols-1 gap-6
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
        `}
      >
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
