import { Fragment } from "react";
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-2xl font-semibold leading-6 text-gray-900">
                  {title}
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                  {date}
                </p>
                <div className="mt-4">
                  <div className="max-w-screen relative w-full overflow-hidden rounded-md">
                    {isImage ? (
                      <Image
                        src={mediaUrl}
                        alt={title}
                        width={1920}
                        height={1080}
                        className="object-contain"
                      />
                    ) : (
                      <video className="h-auto w-full" controls>
                        <source src={mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 sm:text-base">
                  {description}
                </p>
                <div className="mt-6">
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View Project
                    <FiArrowUpRight className="ml-1" size={22} />
                  </Link>
                </div>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
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
