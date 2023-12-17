import { promises as fs } from "fs";
import { ExperienceCard } from "./components/experience-card";
import { Key } from "react";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/experience.json",
    "utf8",
  );
  const data = JSON.parse(file);
  return (
    <main className="flex flex-col items-center justify-between md:px-4 xl:px-8">
      <ul className="flex flex-col space-y-8">
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
            <ExperienceCard
              key={index}
              title={experience.title}
              company={experience.company}
              startDate={experience.startDate}
              endDate={experience.endDate}
              description={experience.description}
            />
          ),
        )}
        <li className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-zinc-900">
            Could be your company :&#41;
          </h2>
        </li>
      </ul>
    </main>
  );
}
