"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDialogProps {
  title: string;
  date: string;
  description: string;
  mediaUrl: string | null;
  link: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export function ProjectDialog({
  title,
  date,
  description,
  mediaUrl,
  link,
  isModalOpen,
  setIsModalOpen,
}: ProjectDialogProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isImage =
    mediaUrl &&
    (mediaUrl.endsWith(".png") || mediaUrl.endsWith(".jpg") || mediaUrl.endsWith(".jpeg"));

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="w-full max-w-2xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">{date}</p>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="mt-4">
            <div className="relative w-full overflow-hidden rounded-md select-none">
              {mediaUrl ? (
                isImage ? (
                  <>
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600 dark:border-indigo-300"></div>
                      </div>
                    )}
                    <Image
                      src={mediaUrl}
                      alt={title}
                      width={1920}
                      height={1080}
                      className={`h-auto w-full object-contain transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"} `}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </>
                ) : (
                  <video className="h-auto w-full" controls autoPlay>
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  No media available
                </div>
              )}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 mt-4 text-sm delay-200 duration-300 sm:text-base">
            {description}
          </div>

          <div className="animate-in fade-in mt-6 flex gap-3 delay-400 duration-300">
            <Link
              href={link || "#"}
              aria-label={`View ${title} project`}
              target="_blank"
              rel="noopener"
              className={`text-accent-foreground inline-flex items-center justify-center rounded-full px-4 py-2 transition-colors select-none ${
                link
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-muted text-muted-foreground pointer-events-none cursor-not-allowed"
              }`}
            >
              View Project
              <FiArrowUpRight className="ml-1" size={22} />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
