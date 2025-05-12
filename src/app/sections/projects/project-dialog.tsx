import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

interface ProjectDialogProps {
  title: string;
  date: string;
  description: string;
  mediaUrl: string;
  link: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ProjectDialog = ({
  title,
  date,
  description,
  mediaUrl,
  link,
  isModalOpen,
  setIsModalOpen,
}: ProjectDialogProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isImage = mediaUrl.endsWith(".png") || mediaUrl.endsWith(".jpg");
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 dark:bg-slate-950/40" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-md transition-all dark:bg-slate-900 dark:shadow-slate-800">
                <DialogTitle className="text-2xl leading-6 font-semibold">
                  {title}
                </DialogTitle>

                <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
                  {date}
                </p>

                <div className="mt-4">
                  <div className="relative w-full max-w-screen overflow-hidden rounded-md">
                    {isImage ? (
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
                          className={`h-auto w-full object-contain transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                          onLoad={() => setIsImageLoaded(true)}
                        />
                      </>
                    ) : (
                      <video className="h-auto w-full" controls autoPlay>
                        <source src={mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-sm sm:text-base"
                >
                  {description}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex gap-3"
                >
                  <Link
                    href={link}
                    aria-label={`View ${title} project`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-slate-100 hover:bg-indigo-700"
                  >
                    View Project
                    <FiArrowUpRight className="ml-1" size={22} />
                  </Link>
                </motion.div>

                <button
                  type="button"
                  aria-label="Close dialog"
                  className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  <AiOutlineClose size={24} aria-hidden="true" />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
