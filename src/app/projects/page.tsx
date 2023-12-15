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
    <main className="md-grid-cols-2 grid grid-cols-1 space-x-4 lg:grid-cols-3">
      {data.projects.map(
        (
          project: { title: string; description: string; image: string },
          index: Key,
        ) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
          />
        ),
      )}
    </main>
  );
}
