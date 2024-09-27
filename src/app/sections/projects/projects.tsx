"use client";

import { ProjectCard } from "./project-card";
import { formatDate } from "@/utils/date";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["Projects"]["Row"];

export default function Projects({ projects }: { projects: Project[] | null }) {
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
      className="flex flex-col items-center justify-between px-12 pt-20 sm:px-16 xl:px-24"
    >
      <h2 className="mb-8 mt-4 text-center text-4xl font-extrabold">
        My Projects
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            date={parseDate(project.start_date, project.end_date)}
            description={project.description}
            mediaUrl={project.media_url}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}
