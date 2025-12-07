"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import ThemeSwitcher from "@/components/custom/theme-switcher";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/oss-contributions", label: "Open Source" },
];

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-background/80 border-border/40 border-b py-3 backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="group relative z-50 flex items-center space-x-2.5"
          aria-label="Home"
        >
          <div className="from-accent to-accent/80 shadow-accent/20 relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br shadow-lg transition-transform duration-300 group-hover:scale-105">
            <span className="text-accent-foreground font-mono text-sm font-bold">DP</span>
          </div>
          <span className="text-foreground hidden text-lg font-bold tracking-tight sm:block">
            DhiraPT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <ul className="bg-background/50 border-border/40 flex items-center gap-1 rounded-full border p-1 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive =
                item.href === "/blog" ? pathname.startsWith("/blog") : pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="bg-accent absolute inset-0 -z-1 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-border/40 ml-4 border-l pl-4">
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeSwitcher />
          <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
            <DrawerTrigger asChild>
              <button
                className={cn(
                  "relative z-50 rounded-full p-2.5 transition-colors",
                  "hover:bg-accent/10 text-foreground",
                )}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="border-border/40 bg-background/95 h-full rounded-none border-l backdrop-blur-xl">
              <div className="flex h-full flex-col p-6">
                <DrawerHeader className="border-border/40 flex items-center justify-between border-b px-0 pb-8">
                  <DrawerTitle className="flex items-center text-xl font-bold">
                    <span className="from-accent bg-linear-to-r to-purple-400 bg-clip-text text-transparent">
                      Navigation
                    </span>
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <button className="hover:bg-accent/10 rounded-full p-2 transition-colors">
                      <X className="text-muted-foreground h-6 w-6" />
                    </button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="mt-8 flex flex-col gap-6">
                  {navItems.map((item, i) => {
                    const isActive =
                      item.href === "/blog" ? pathname.startsWith("/blog") : pathname === item.href;
                    return (
                      <DrawerClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          onClick={closeDrawer}
                          className={cn(
                            "hover:text-accent text-3xl font-bold tracking-tight transition-colors",
                            isActive ? "text-accent" : "text-muted-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </DrawerClose>
                    );
                  })}
                </div>

                <div className="mt-auto pb-8">
                  <p className="text-muted-foreground font-mono text-sm">
                    © {new Date().getFullYear()} DhiraPT
                  </p>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
