import Link from "next/link";

export const Links = () => {
  return (
    <nav className="py-8">
      <ul
        className={`
          flex flex-row space-x-4 font-semibold text-slate-900 select-none
          dark:text-slate-100
        `}
      >
        <li>
          <Link
            className={`
              relative py-1.5 transition-colors duration-200 outline-none
              after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0
              after:bg-indigo-600 after:transition-transform after:duration-200
              hover:text-indigo-600 hover:after:scale-x-100
              dark:after:bg-indigo-300 dark:hover:text-indigo-300
            `}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`
              relative py-1.5 transition-colors duration-200 outline-none
              after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0
              after:bg-indigo-600 after:transition-transform after:duration-200
              hover:text-indigo-600 hover:after:scale-x-100
              dark:after:bg-indigo-300 dark:hover:text-indigo-300
            `}
            href="#experience"
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            className={`
              relative py-1.5 transition-colors duration-200 outline-none
              after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0
              after:bg-indigo-600 after:transition-transform after:duration-200
              hover:text-indigo-600 hover:after:scale-x-100
              dark:after:bg-indigo-300 dark:hover:text-indigo-300
            `}
            href="#projects"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            className={`
              relative py-1.5 transition-colors duration-200 outline-none
              after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0
              after:bg-indigo-600 after:transition-transform after:duration-200
              hover:text-indigo-600 hover:after:scale-x-100
              dark:after:bg-indigo-300 dark:hover:text-indigo-300
            `}
            href="#oss-contributions"
          >
            Open Source
          </Link>
        </li>
      </ul>
    </nav>
  );
};
