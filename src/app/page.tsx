import Image from "next/image";
import { TypeComponent } from "./components/type-component";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 text-zinc-900 dark:text-slate-100">
      <p className="text-4xl font-bold">
        Hi, I&apos;m <span className="text-blue-500">Dhira</span>
      </p>
      <TypeComponent />
      <p className="text-center text-2xl">
        I&apos;m a Year 2 student at National University of Singapore pursuing
        Bachelor of Computing (Honours) in Computer Science with a Second Major
        in Quantitative Finance
      </p>
    </main>
  );
}
