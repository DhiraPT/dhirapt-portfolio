import Image from "next/image";
import { TypeComponent } from "../../components/type-component";

export default function Home() {
  return (
    <section
      id="home"
      className="flex min-h-dvh flex-col items-center justify-center space-y-4 px-12 pt-20 sm:px-16 xl:px-24"
    >
      <p className="text-4xl font-bold">
        Hi, I&apos;m <span className="text-blue-500">Dhira</span>
      </p>
      <TypeComponent />
      <p className="text-center text-xl">
        I&apos;m a student at National University of Singapore pursuing Bachelor
        of Computing (Honours) in Computer Science with a Second Major in
        Quantitative Finance.
        <br />I love discovering unknown life hacks.
      </p>
    </section>
  );
}
