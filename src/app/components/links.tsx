"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const Links = () => {
  const pathname = usePathname();

  return (
    <nav className="py-8">
      <ul className="flex flex-row space-x-4 font-semibold text-slate-900 dark:text-slate-100">
        <li>
          <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "/#experience" ? "active" : ""}`}
            href="#experience"
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "/#projects" ? "active" : ""}`}
            href="#projects"
          >
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};
