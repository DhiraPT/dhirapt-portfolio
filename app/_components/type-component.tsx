"use client";

import { TypeAnimation } from "react-type-animation";

export default function TypeComponent() {
  return (
    <TypeAnimation
      sequence={[
        "Full Stack Engineer",
        2000,
        "AI & ML Specialist",
        2000,
        "Problem Solver",
        2000,
        "Tech Entrepreneur",
        2000,
      ]}
      wrapper="span"
      speed={50}
      className="text-muted-foreground text-lg sm:text-xl"
      repeat={Infinity}
    />
  );
}
