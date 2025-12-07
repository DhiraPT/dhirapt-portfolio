// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dhirapt-portfolio.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [], // Add any private routes here
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
