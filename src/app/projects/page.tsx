import { promises as fs } from "fs";
import { ProjectCard } from "./components/project-card";
import { Key } from "react";
import { supabase } from "@/utils/supabase";
import { parse } from "path";
import { formatDate } from "@/utils/date";

export default async function Page() {
  const { data: projects } = await supabase
    .from("Projects")
    .select()
    .order("end_date", { ascending: false });

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
    <main className="grid grid-cols-1 gap-4 md:grid-cols-2 md:px-4 xl:grid-cols-3 xl:gap-x-8 xl:px-8">
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
    </main>
  );
}
