import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Links } from "./components/links";
import { ContactBar } from "./components/contact-bar";
import { Analytics } from "@vercel/analytics/react";
import ThemeSwitcher from "./components/theme-switcher";
import ThemeProvider from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dhiraputta Pathama Tengara",
  description: "Dhiraputta Pathama Tengara's Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={
          inter.className +
          " flex min-h-screen flex-col bg-white dark:bg-zinc-900"
        }
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between bg-white px-4 dark:bg-zinc-900 sm:px-8 xl:px-12">
            <Links />
            <ThemeSwitcher />
          </div>
          {children}
          <ContactBar />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
