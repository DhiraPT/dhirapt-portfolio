import { promises as fs } from "fs";
import { ProjectCard } from "./components/project-card";
import { Key } from "react";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/projects.json",
    "utf8",
  );
  const data = JSON.parse(file);
  return (
    <main className="grid grid-cols-1 gap-4 md:grid-cols-2 md:px-4 xl:grid-cols-3 xl:gap-x-8 xl:px-8">
      {data.projects.map(
        (
          project: {
            title: string;
            date: string;
            description: string;
            image: string;
            video: string;
            link: string;
          },
          index: Key,
        ) => (
          <ProjectCard
            key={index}
            title={project.title}
            date={project.date}
            description={project.description}
            image={project.image}
            video={project.video}
            link={project.link}
          />
        ),
      )}
    </main>
  );
}
