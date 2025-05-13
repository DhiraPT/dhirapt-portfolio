"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTheme(enabled ? "dark" : "light");
    }
  }, [enabled, mounted, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/50 data-checked:bg-slate-800"
    >
      <IconContext.Provider value={{ size: "40" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <IoMoon className="text-indigo-300 opacity-0 group-data-checked:opacity-100" />
          <IoSunny className="text-amber-400 opacity-100 group-data-checked:opacity-0" />
        </div>
      </IconContext.Provider>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-8 group-data-checked:bg-slate-900"
      />
    </Switch>
  );
};

export default ThemeSwitcher;
