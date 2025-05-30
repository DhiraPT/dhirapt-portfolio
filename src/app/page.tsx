import { supabase } from "@/utils/supabase";
import Home from "./sections/home/home";
import Experience from "./sections/experience/experience";
import Projects from "./sections/projects/projects";
import OSSContributions from "./sections/oss-contributions/oss-contributions";

export const revalidate = 3600; // Invalidate cache every hour

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
    <main
      className={`
        mb-8 flex flex-1 flex-col items-center justify-center text-slate-900
        dark:text-slate-100
      `}
    >
      <Home />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <OSSContributions />
    </main>
  );
}
