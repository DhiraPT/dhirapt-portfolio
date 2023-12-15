import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
}: ProjectCardProps) => {
  return (
    <div className="group/item-card">
      <div className="relative aspect-square overflow-hidden">
        <Image src={"/" + image} alt={title} fill objectFit="contain" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <h2 className="text-xl text-zinc-900 dark:text-slate-100">{title}</h2>
        <p className="text-zinc-900 dark:text-slate-100">{description}</p>
      </div>
    </div>
  );
};
