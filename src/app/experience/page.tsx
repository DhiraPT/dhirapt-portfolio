import { promises as fs } from "fs";
import { Card } from "./components/card";
import { Key } from "react";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/experience.json",
    "utf8",
  );
  const data = JSON.parse(file);
  return (
    <main className="flex flex-col items-center justify-between">
      <ul className="flex flex-col space-y-4">
        {data.experience.map(
          (
            experience: {
              title: String;
              company: String;
              startDate: String;
              endDate: String;
              description: String[];
            },
            index: Key,
          ) => (
            <Card
              key={index}
              title={experience.title}
              company={experience.company}
              startDate={experience.startDate}
              endDate={experience.endDate}
              description={experience.description}
            />
          ),
        )}
      </ul>
    </main>
  );
}
