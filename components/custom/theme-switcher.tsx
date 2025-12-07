"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { IoMoon, IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to avoid layout shifts
    return <div className="h-8 w-16" />;
  }

  const isDarkMode = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <SwitchPrimitives.Root
      checked={isDarkMode}
      onCheckedChange={toggleTheme}
      className={cn(
        "group relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "bg-slate-200 transition-colors duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/50",
        "data-[state=checked]:bg-slate-800",
      )}
    >
      <IconContext.Provider value={{ size: "40" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <IoMoon
            className={cn("text-indigo-300 opacity-0", "group-data-[state=checked]:opacity-100")}
          />
          <IoSunny
            className={cn("text-amber-400 opacity-100", "group-data-[state=checked]:opacity-0")}
          />
        </div>
      </IconContext.Provider>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-lg ring-0",
          "transition duration-200 ease-in-out",
          "data-[state=checked]:translate-x-8 data-[state=checked]:bg-slate-900",
        )}
      />
    </SwitchPrimitives.Root>
  );
}
