import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") || "";

  // STORIES SUBDOMAIN ROBOTS FILE
  if (host.includes("stories.")) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [
            "/profile",
            "/bookmarked",
            "/write",
            "/api/",
          ],
        },
      ],
      sitemap: "https://stories.yourhourapp.com/sitemap.xml",
    };
  }

  // YOURHOUR WEBSITE ROBOTS FILE
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.yourhourapp.com/sitemap.xml",
  };
}
