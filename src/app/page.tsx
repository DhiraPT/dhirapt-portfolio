import Image from "next/image";
import { TypeComponent } from "./components/type_component";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <p className="text-4xl font-bold">
        Hi, I'm <span className="text-blue-500">Dhira</span>
      </p>
      <TypeComponent />
      <p className="text-4xl">
        I'm a Year 2 student at National University of Singapore pursuing
        Bachelor of Computing (Honours) in Computer Science with a Second Major
        in Quantitative Finance
      </p>
    </main>
  );
}
