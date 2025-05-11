"use client";

import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";

export const ContactBar = () => {
  return (
    <div className="fixed right-0 bottom-0 pr-2 pb-2">
      <IconContext.Provider value={{ size: "40" }}>
        <div className="flex flex-col items-center space-y-3">
          <Link href="mailto:dhira.pt@gmail.com" target="_blank" rel="noopener">
            <MdOutlineMail />
          </Link>
          <Link
            href="https://github.com/DhiraPT"
            target="_blank"
            rel="noopener"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dhirapt"
            target="_blank"
            rel="noopener"
          >
            <FaLinkedin />
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};
