import { supabase } from "@/utils/supabase";
import { ExperienceCard } from "./components/experience-card";
import { formatDate } from "@/utils/date";

export default async function Page() {
  const { data: experiences } = await supabase
    .from("Experiences")
    .select()
    .order("end_date", { ascending: false });

  return (
    <main className="flex flex-col items-center justify-between md:px-4 xl:px-8">
      <ul className="flex flex-col space-y-8">
        {experiences?.map((experience) => (
          <ExperienceCard
            key={experience.id}
            title={experience.title}
            company={experience.company}
            startDate={formatDate(experience.start_date)}
            endDate={
              experience.end_date ? formatDate(experience.end_date) : "Present"
            }
            description={experience.description}
          />
        ))}
        <li className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-zinc-900">
            Could be your company :&#41;
          </h2>
        </li>
      </ul>
    </main>
  );
}
