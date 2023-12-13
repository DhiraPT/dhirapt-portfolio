import { promises as fs } from "fs";
import { Card } from "./components/card";
import { Key } from "react";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/projects.json",
    "utf8",
  );
  const data = JSON.parse(file);
  return (
    <main className="flex flex-col items-center justify-between">
      <ul className="flex flex-col space-y-4">
        {data.projects.map(
          (
            project: { title: string; description: string; imageUrl: string },
            index: Key,
          ) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
            />
          ),
        )}
      </ul>
    </main>
  );
}
