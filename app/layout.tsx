import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NavBar } from "@/components/custom/navbar";
import ContactBar from "@/components/custom/contact-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("https://dhirapt-portfolio.vercel.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "DhiraPT's Lab",
    template: "%s | DhiraPT's Lab", // Allows child pages to append their title
  },
  description:
    "My personal R&D lab. Building and documenting my experiments with scalable AI/ML systems.",
  openGraph: {
    title: "DhiraPT's Lab",
    description:
      "My personal R&D lab. Building and documenting my experiments with scalable AI/ML systems.",
    url: baseUrl,
    siteName: "DhiraPT's Lab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("DhiraPT's Lab")}`,
        width: 1200,
        height: 630,
        alt: "DhiraPT's Lab",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <ContactBar />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
