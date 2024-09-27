"use client";

import { TypeAnimation } from "react-type-animation";

export const TypeComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "I am a student",
        1000, // wait 1s
        "I am a software developer",
        1000,
        "I am a Red Cross Youth",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "30px", display: "inline-block", textAlign: "center" }}
      repeat={Infinity}
    />
  );
};
