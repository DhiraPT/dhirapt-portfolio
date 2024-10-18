import { supabase } from "@/utils/supabase";
import Home from "./sections/home/home";
import Experience from "./sections/experience/experience";
import Projects from "./sections/projects/projects";

export const revalidate = 0;

export default async function Page() {
  const { data: experiences } = await supabase
    .from("Experiences")
    .select()
    .order("end_date", { ascending: false });

  const { data: projects } = await supabase
    .from("Projects")
    .select()
    .order("end_date", { ascending: false });

  return (
    <main className="mb-8 flex flex-1 flex-col items-center justify-center text-zinc-900 dark:text-white">
      <Home />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
    </main>
  );
}
