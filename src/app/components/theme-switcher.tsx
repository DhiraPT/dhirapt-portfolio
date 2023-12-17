"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      checked={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${theme === "dark" ? "bg-white" : "bg-zinc-900"}
          relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <IconContext.Provider value={{ size: "40" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <IoMoon style={{ color: "#18181B" }} />
          <IoSunny style={{ color: "#efe00b" }} />
        </div>
      </IconContext.Provider>
      <span
        aria-hidden="true"
        className={`${
          theme === "dark"
            ? "translate-x-8 bg-zinc-900"
            : "translate-x-0 bg-white"
        }
            pointer-events-none inline-block h-7 w-7 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default ThemeSwitcher;
