import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  video: string;
  link: string;
}

export const ProjectCard = ({
  title,
  date,
  description,
  image,
  video,
  link,
}: ProjectCardProps) => {
  return (
    <div className="group/item-card">
      <div className="relative aspect-square overflow-hidden">
        {image ? (
          <Image src={"/" + image} alt={title} fill objectFit="contain" />
        ) : (
          <video className="h-full w-auto" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="flex flex-col justify-between p-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>
        <p className="pb-2 font-semibold text-zinc-900 dark:text-white">
          {date}
        </p>
        <p className="pb-1 text-zinc-900 dark:text-white">{description}</p>
        <Link href={link} target="_blank" className="underline" rel="noopener">
          Go to Project
        </Link>
      </div>
    </div>
  );
};
