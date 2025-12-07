import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  index: number;
  title: string;
  date: string;
  description: string;
  coverMediaUrl: string | null;
  link: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setSelectedProjectIndex: (value: number | null) => void;
}

export const ProjectCard = ({
  index,
  title,
  coverMediaUrl,
  setIsModalOpen,
  setSelectedProjectIndex,
}: ProjectCardProps) => {
  const onViewDetailsClick = () => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div
      className={cn(
        "group/card relative cursor-pointer overflow-hidden rounded-xl border shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "dark:bg-card dark:shadow-none",
      )}
      onClick={onViewDetailsClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {coverMediaUrl ? (
          <Image src={coverMediaUrl} alt={title} fill className="object-contain" />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-4xl">🚀</div>
              <p>Project Preview</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 dark:bg-slate-950/60" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="translate-y-4 text-xl font-bold opacity-0 transition-all duration-300 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
          {title}
        </h3>
        <div
          aria-label={`View details for ${title}`}
          className={cn(
            "bg-accent text-accent-foreground mt-2 inline-flex w-fit translate-y-4 items-center rounded-full px-3 py-1.5 text-sm font-semibold opacity-0 transition-all duration-300 ease-out",
            "group-hover/card:translate-y-0 group-hover/card:opacity-100 group-hover/card:delay-100",
            "hover:bg-accent/90",
          )}
        >
          View Details
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
