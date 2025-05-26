import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./theme-provider";
import { Links } from "./components/links";
import ThemeSwitcher from "./components/theme-switcher";
import { ContactBar } from "./components/contact-bar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhiraputta Pathama Tengara",
  description: "Dhiraputta Pathama Tengara's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          flex min-h-screen flex-col bg-slate-50 antialiased
          dark:bg-slate-950
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={`
              fixed top-0 left-0 z-50 flex w-full flex-row items-center justify-between bg-slate-50 px-8
              xl:px-12
              dark:bg-slate-950
            `}
          >
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
