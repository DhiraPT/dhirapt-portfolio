import { supabase } from "@/lib/supabase";
import { PageShell } from "@/components/custom/page-shell";
import ProjectGallery from "./_components/project-gallery";

// Revalidate data every hour (ISR)
export const revalidate = 3600;

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("Projects")
    .select("*")
    .order("end_date", { ascending: false });

  if (error) {
    return (
      <PageShell
        title="Projects"
        description="A collection of experiments, products, and engineering challenges."
      >
        <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-6 text-center">
          <p className="text-destructive text-lg">
            Error loading projects. Please try again later.
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Projects"
      description="A collection of experiments, products, and engineering challenges."
    >
      <ProjectGallery projects={projects || []} />
    </PageShell>
  );
}
