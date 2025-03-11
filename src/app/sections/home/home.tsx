import Link from "next/link";
import { TypeComponent } from "../../components/type-component";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function Home() {
  return (
    <section
      id="home"
      className="flex min-h-dvh flex-col items-center justify-center space-y-4 px-12 pt-20 sm:px-16 xl:px-24"
    >
      <p className="text-4xl font-bold">
        Hi, I&apos;m&nbsp;
        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          Dhira
        </span>
      </p>
      <TypeComponent />
      <p className="text-center text-xl">
        I&apos;m a student at{" "}
        <span className="font-semibold">National University of Singapore</span>,
        pursuing a
        <span className="font-semibold">
          {" "}
          Bachelor of Computing (Honours) in Computer Science
        </span>{" "}
        with a Second Major in{" "}
        <span className="font-semibold">Quantitative Finance</span>.
      </p>
      <p className="text-center text-xl">
        I love discovering unknown life hacks and leveraging technology to solve
        real-world problems.
      </p>
      <Link href="#experience">
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform cursor-pointer flex-col items-center">
          <p className="mb-2 text-center text-sm">Scroll Down</p>
          <BsChevronDoubleDown className="animate-bounce text-3xl" />
        </div>
      </Link>
    </section>
  );
}
