"use client";

import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    href: "mailto:dhira.pt@gmail.com",
    icon: MdOutlineMail,
    ariaLabel: "Email Dhira",
  },
  {
    href: "https://github.com/DhiraPT",
    icon: FaGithub,
    ariaLabel: "Dhira's GitHub",
  },
  {
    href: "https://www.linkedin.com/in/dhirapt",
    icon: FaLinkedin,
    ariaLabel: "Dhira's LinkedIn",
  },
];

const SocialLink = ({ href, icon: Icon, ariaLabel }: (typeof socialLinks)[0]) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={cn(
      "text-muted-foreground transition-colors duration-300",
      "hover:text-accent focus-visible:text-accent",
    )}
  >
    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
  </Link>
);

export default function ContactBar() {
  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50",
        "border-border/20 bg-background/50 rounded-full border p-2 shadow-lg backdrop-blur-md",
        "transition-all duration-300",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {socialLinks.map((link) => (
          <SocialLink key={link.href} {...link} />
        ))}
      </div>
    </div>
  );
}
